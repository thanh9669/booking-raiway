import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';

export default function VideoCall({  }) {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const socket = useRef(null);
  const [peerId, setPeerId] = useState(null);
  const router = useRouter();
  const { userId } = router.query;
  useEffect(() => {
    if (!userId){
      return
    }
    socket.current = new WebSocket(`ws://localhost:8001/ws?user_id=${userId}`);

    socket.current.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      console.log("Received:", message);

      if (message.type === "online_users") {
        const users = message.sdp.split(",");
        const otherUser = users.find((u) => u !== userId);
        if (otherUser) setPeerId(otherUser);
      } else if (message.type === "offer") {
        if (peerConnection.current.signalingState !== "stable") return;
        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(message)
        );
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        sendMessage({ type: "answer", sdp: answer.sdp, receiver: message.sender });
      } else if (message.type === "answer") {
        if (peerConnection.current.signalingState === "have-local-offer") {
          await peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(message)
          );
        }
      } else if (message.type === "candidate") {
        await peerConnection.current.addIceCandidate(
          new RTCIceCandidate({ candidate: message.candidate })
        );
      }
    };

    socket.current.onclose = () => console.log("WebSocket closed");
    return () => socket.current.close();
  }, [userId]);

  const sendMessage = (msg) => {
    msg.sender = userId;
    socket.current.send(JSON.stringify(msg));
  };

  const startCall = async () => {
    if (!peerId) return;

    peerConnection.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        sendMessage({ type: "candidate", candidate: event.candidate.candidate, receiver: peerId });
      }
    };

    peerConnection.current.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideoRef.current.srcObject = stream;
    stream.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream));

    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    sendMessage({ type: "offer", sdp: offer.sdp, receiver: peerId });
  };

  return (
    <div>
      <h2>Your ID: {userId}</h2>
      {peerId && <h3>Connected to: {peerId}</h3>}
      <video ref={localVideoRef} autoPlay playsInline muted />
      <video ref={remoteVideoRef} autoPlay playsInline />
      <button onClick={startCall} disabled={!peerId}>Start Call</button>
    </div>
  );
}