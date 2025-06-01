import { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';

interface Message {
  type: 'join' | 'offer' | 'answer' | 'ice' | 'joined' | 'left';
  roomId: string;
  payload?: any;
}

interface PeerState {
  peer: Peer.Instance;
  stream: MediaStream;
}

export default function useWebRTC(roomId: string) {
    const [peers, setPeers] = useState<PeerState[]>([]);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const socketRef = useRef<WebSocket>();
    const peersRef = useRef<Record<string, Peer.Instance>>({});
  
    // Khởi tạo local stream
    const startLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
        return stream;
      } catch (err) {
        console.error("Failed to get media", err);
        return null;
      }
    };

    useEffect(() => {
        const initConnection = async () => {
          // 1. Lấy local stream
          const stream = await startLocalStream();
          if (!stream) return;
    
          // 2. Kết nối WebSocket
          const socket = new WebSocket('wss://base-golang-wz41.onrender.com/wsv');
          socketRef.current = socket;
    
          socket.onopen = () => {
            const joinMsg: Message = { type: 'join', roomId };
            socket.send(JSON.stringify(joinMsg));
          };
          socket.onmessage = (event) => {
            const msg: Message = JSON.parse(event.data);
    
            switch (msg.type) {
              case 'joined':
                createPeer(msg.roomId, true, stream);
                break;
              case 'offer':
                handleOffer(msg, stream);
                break;
              case 'answer':
                handleAnswer(msg);
                break;
              case 'ice':
                handleICECandidate(msg);
                break;
              case 'left':
                removePeer(msg.roomId);
                break;
            }
          };
        };
    
        initConnection();
    
        return () => {
          socketRef.current?.close();
          localStream?.getTracks().forEach(track => track.stop());
          Object.values(peersRef.current).forEach(peer => peer.destroy());
        };
      }, [roomId]);
    

      const createPeer = (targetRoomId: string, initiator: boolean, stream: MediaStream) => {
        // Kiểm tra xem đã có peer chưa
        if (peersRef.current[targetRoomId]) {
            console.log('Peer already exists for this roomId:', targetRoomId);
            return;
        }

        const peer = new Peer({ 
          initiator,
          trickle: false,
          stream,
          config: {
            iceServers: [
              { urls: 'stun:stun.l.google.com:19302' }
            ]
          }
        });
    
        // Kiểm tra peer đã được khởi tạo thành công
        if (!peer) {
          console.error('Failed to create peer');
          return;
        }

        peer.on('signal', (data) => {
            console.log('Sending signal:', data);
            const type = data.type === 'offer' ? 'offer' : 'answer';
            socketRef.current?.send(JSON.stringify({
                type,
                roomId: targetRoomId,
                payload: data
            }));
        });
    
        peer.on('stream', (remoteStream) => {
            console.log('Received remote stream:', remoteStream);
            // Cập nhật UI thông qua state
            if (!peersRef.current[targetRoomId]) {
                peersRef.current[targetRoomId] = peer;
                const newPeerState: PeerState = { peer, stream: remoteStream };
                setPeers(prev => [...prev.filter(p => p.peer !== peer), newPeerState]);
            }
        });
    
        peer.on('error', (err) => {
          console.error('Peer error:', err);
          removePeer(targetRoomId);
        });
    
        peersRef.current[targetRoomId] = peer;
      };
    

      const handleOffer = (msg: Message, stream: MediaStream) => {
        // Kiểm tra xem đã có peer chưa
        if (peersRef.current[msg.roomId]) {
            console.log('Peer already exists for this roomId:', msg.roomId);
            return;
        }

        const peer = new Peer({ 
          initiator: false,
          trickle: false,
          stream,
          config: {
            iceServers: [
              { urls: 'stun:stun.l.google.com:19302' }
            ]
          }
        }) as Peer.Instance;

        // Kiểm tra peer đã được khởi tạo thành công
        if (!peer) {
          console.error('Failed to create peer');
          return;
        }
    
        peer.on('signal', (data) => {
          if (data.type === 'answer') {
            socketRef.current?.send(JSON.stringify({
              type: 'answer',
              roomId: msg.roomId,
              payload: data
            }));
          }
        });
    
        peer.on('stream', (remoteStream) => {
          if (!peersRef.current[msg.roomId]) {
            peersRef.current[msg.roomId] = peer;
            const newPeerState: PeerState = { peer, stream: remoteStream };
            setPeers(prev => [...prev.filter(p => p.peer !== peer), newPeerState]);
          }
        });
    
        peer.signal(msg.payload);
      };

  const handleAnswer = (msg: Message) => {
    const peer = peersRef.current[msg.roomId];
    if (peer) peer.signal(msg.payload);
  };

  const handleICECandidate = (msg: Message) => {
    const peer = peersRef.current[msg.roomId];
    if (peer) peer.signal(msg.payload);
  };

  const removePeer = (roomId: string) => {
    const peer = peersRef.current[roomId];
    if (peer) {
      peer.destroy();
      delete peersRef.current[roomId];
      setPeers(prev => prev.filter(p => p.peer !== peer));
    }
  };

  return { peers,localStream };
}