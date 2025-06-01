import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [pc, setPc] = useState(null);
  const socket = useRef(null);
  const [clientId, setClientId] = useState(null);
  const [remoteClientId, setRemoteClientId] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket("ws://localhost:8080/ws");

    socket.current.onmessage = async (event) => {
      const msg = JSON.parse(event.data);

      if (msg.type === "id") {
        setClientId(msg.sender_id);
      } else if (msg.type === "offer") {
        setRemoteClientId(msg.sender_id);
        await handleOffer(msg.data);
      } else if (msg.type === "answer") {
        await handleAnswer(msg.data);
      } else if (msg.type === "candidate") {
        await handleCandidate(msg.data);
      }
    };

    return () => {
      socket.current.close();
    };
  }, []);

  const startCall = async () => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.current.send(
          JSON.stringify({ type: "candidate", sender_id: clientId, data: event.candidate })
        );
      }
    };

    peerConnection.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideoRef.current.srcObject = stream;
    stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

    setPc(peerConnection);
  };

  const call = async () => {
    if (!pc) return alert("Hãy bấm 'Start Camera' trước!");

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    socket.current.send(
      JSON.stringify({ type: "offer", sender_id: clientId, data: offer })
    );
  };

  const handleOffer = async (offer) => {
    if (!pc) await startCall();

    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    socket.current.send(
      JSON.stringify({ type: "answer", sender_id: clientId, data: answer })
    );
  };

  const handleAnswer = async (answer) => {
    await pc.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const handleCandidate = async (candidate) => {
    if (pc) {
      await pc.addIceCandidate(new RTCIceCandidate(candidate));
    }
  };

  return (
    <div>
      <h1>WebRTC Video Call</h1>
      <p>Client ID: {clientId}</p>
      <p>Đang kết nối với: {remoteClientId || "Chưa có ai"}</p>

      <video ref={localVideoRef} autoPlay playsInline style={{ width: "300px" }} />
      <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "300px" }} />

      <button onClick={startCall}>Start Camera</button>
      <button onClick={call}>Call</button>
    </div>
  );
}
