import { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';

export default function RemoteVideo({ peer, stream }: { peer: Peer.Instance | null; stream: MediaStream | null }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!peer || !stream) {
      console.error('Peer or stream is undefined');
      setLoading(false);
      return;
    }

    const handleStream = (stream: MediaStream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setLoading(false);
      }
    };

    // Sử dụng stream được truyền vào thay vì lắng nghe event
    if (stream) {
      // Không cần lắng nghe event stream vì stream đã được truyền vào
      handleStream(stream);
    }

    // Chỉ lắng nghe error nếu peer tồn tại
    if (peer) {
      peer.on('error', (err) => {
        console.error('Peer error:', err);
        setLoading(false);
      });
    }

    return () => {
      if (peer) {
        peer.off('stream', handleStream);
      }
      peer.off('stream', handleStream);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [peer]);

  return (
    <div className="video-container">
      {loading && <div className="loading">Connecting...</div>}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        style={{ display: loading ? 'none' : 'block' }}
      />
    </div>
  );
}