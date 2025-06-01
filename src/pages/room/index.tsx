import { useState, useRef } from 'react';
import useWebRTC from '@/hooks/useWebRTC';
import RemoteVideo from '@/components/RemoteVideo';
import LocalVideo from '@/components/LocalVideo';

export default function Home() {
  const [roomId, setRoomId] = useState('');
  const [activeRoom, setActiveRoom] = useState('');
  const { peers: peerInstances, localStream } = useWebRTC(activeRoom);
  const peers = peerInstances.map(peer => peer.peer);

  const joinRoom = () => {
    if (!roomId) return;
    setActiveRoom(roomId);
  };

  return (
    <div className="container">
      <h1>WebRTC Video Chat</h1>
      
      <div className="room-control">
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID"
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>

      <div className="video-container">
        <div className="video-box">
          <h2>You</h2>
          <LocalVideo stream={localStream} />
        </div>

        {peerInstances.map(({ peer, stream }, index) => (
          <div key={index} className="video-box">
            <h2>Peer {index + 1}</h2>
            <RemoteVideo peer={peer} stream={stream} />
          </div>
        ))}
      </div>

      {/* ... (giữ nguyên style) */}
    </div>
  );
}