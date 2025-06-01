import React, { useState, useRef, useEffect } from 'react';
import { Message, USER } from '@/types/user'
import { useSelector } from 'react-redux';
import { store } from '@/stores'
import { setMessageState, setMessagesState } from '@/stores/message'

interface ChatBoxProps {
  messages?: Message[];
  onSend?: (msg: string) => void;
  onClose?: () => void;
  onLoadMore?: () => void;
}

const ChatBox: React.FC<ChatBoxProps & { onLoadMore?: () => void }> = ({ messages = [], onSend, onClose, onLoadMore }) => {
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(true);
  const [drag, setDrag] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const user = useSelector((state: any) => state.message.user)
  const [messageIdLast, setMessageIdLast]= useState(0)
  const [message, setMessage] = useState("")
  const messageLast = useSelector((state: any) => state.message.messageLast)
  const friend = useSelector((state: any) => state.message.userReceiver)
  useEffect(() => {
    
    if (messages.length > 0 && messageIdLast !== messages[messages.length - 1].id) {
      setMessageIdLast(messages[messages.length - 1].id)
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    if (messageLast?.id) {
      const container = messagesContainerRef.current;
      const target = document.querySelector(`.message-item-${messageLast?.id}`);
      if (container && target) {
        const parentRect = container.getBoundingClientRect();
        const childRect = target.getBoundingClientRect();
        const relativeOffsetTop = childRect.top - parentRect.top;
        container.scrollTo({
          top: relativeOffsetTop,
          behavior: 'smooth',
        });
      }
    }
  }, [messages, open, messageLast]);

  // Handler for scroll top to load more messages
  const handleScroll = async () => {
    const container = messagesContainerRef.current;
    if (!container || loadingMore) return;
    if (container.scrollTop === 0 && onLoadMore) {
      setLoadingMore(true);
      try {
        await onLoadMore();
      } finally {
        setLoadingMore(false);
      }
    }
  };

  // Xử lý kéo thả chatbox
  const handleMouseDown = (e: React.MouseEvent) => {
    if (chatBoxRef.current) {
      setDragging(true);
      setRel({
        x: e.clientX - drag.x,
        y: e.clientY - drag.y,
      });
      e.preventDefault();
    }
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
      setDrag({
        x: e.clientX - rel.x,
        y: e.clientY - rel.y,
      });
    }
  };
  const handleMouseUp = () => setDragging(false);
  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    console.log(dragging, "dragging")
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() !== '') {
      onSend?.(input);
      setInput('');
    }
  };
  const sendMessage = (event) => {
      event.preventDefault(); // Ngăn chặn hành động mặc định của form
      const mes = {
          "id": null,
          "message": message,
          "user_send": user.user_id,
          "user_receiver": parseInt(friend?.id.toString()),
          "created_at": new Date().toISOString(),
          "updated_at": new Date().toISOString(),
          "time_send": Date.now(),
          "status": 0,
          "type": "text",
          "action": "message",
          "name": user.name
      }
      store.dispatch(setMessageState(mes))
      store.dispatch(setMessagesState([...messages, mes]))
      setMessage("")
  }
  if (!open) {
    return (
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
        <button className="btn btn-primary rounded-circle shadow" style={{ width: 56, height: 56 }} onClick={() => setOpen(true)}>
          <i className="bx bx-chat" style={{ fontSize: 24 }}></i>
        </button>
      </div>
    );
  }

  return (
    <div
      ref={chatBoxRef}
      style={{
        position: 'relative',
        boxShadow: '0 8px 24px 0 rgba(0,0,0,0.13), 0 2px 8px 0 rgba(0,183,255,0.10)',
        borderRadius: 16,
        background: '#fff',
        width: 320,
        maxWidth: '95vw',
        minHeight: 260,
        maxHeight: 480,
        display: open ? 'flex' : 'none',
        flexDirection: 'column',
        userSelect: 'none',
        fontFamily: 'Segoe UI, Arial, sans-serif',
      }}
    >
      <div
        style={{
          height: 48,
          background: 'linear-gradient(90deg, #4e54c8, #8f94fb)',
          color: '#fff',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
        onMouseDown={handleMouseDown}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px 4px 16px', borderBottom: '1px solid #e0e0e0', fontWeight: 600, fontSize: 15, letterSpacing: 0.5, color: '#222', background: 'rgba(238,246,255,0.7)', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
          <img src={friend?.avatar || '/default-avatar.png'} alt={friend?.name} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', border: '1px solid #e0e0e0' }} />
          <span>{friend?.name}</span>
        </div>
        {onClose && (
          <button
            aria-label="Đóng"
            style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', color: '#888', fontSize: 20, cursor: 'pointer', zIndex: 2 }}
            onClick={onClose}
          >
            ×
          </button>
        )}
      </div>
      {/* Messages */}
      <div
        className="chatbox-messages"
        ref={messagesContainerRef}
        onScroll={handleScroll}
        style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', background: '#f7f7fa' }}
      >
        {messages.map((msg, idx) => (
          <div key={idx} 
            style={{ 
              marginBottom: 12, 
              display: 'flex', 
              flexDirection: msg.user_send !== user.user_id ? `row` : 'row-reverse' 
            }}
            className={`message-item-${msg?.id}`}
          >
            <div
              style={{
                background: msg.user_send !== user.user_id ? '#e4e6eb' : '#4e54c8',
                color: msg.user_send !== user.user_id ? '#333' : '#fff',
                borderRadius: 18,
                padding: '8px 16px',
                maxWidth: '75%',
                alignSelf: 'flex-end',
                fontSize: 15,
                boxShadow: msg.user_send !== user.user_id ? '0 1px 4px #8882' : '0 2px 8px #4e54c844',
                position: 'relative',
              }}
            >
              <span>{msg.message}</span>
              {/* Nếu chưa gửi thành công thì hiện giờ, nếu đã gửi hoặc đã đọc thì không hiện */}
              {(msg.time_send === 0 || !msg.time_send) && (
                <div style={{ fontSize: 11, color: '#888', marginTop: 4, textAlign: msg.user_send === user.user_id ? 'right' : 'left' }}>{msg.created_at}</div>
              )}
            </div>
            {/* Icon trạng thái gửi/đọc, chỉ hiện nếu là tin nhắn của mình */}
            { (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: 2, marginRight: 2, minHeight: 18 }}>
                {msg.status === 0 && (
                  <span title="Đang gửi" style={{ marginLeft: 8 }}>
                    {/* SVG đồng hồ */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </span>
                )}
                {msg.status === 1 && (
                  <span title="Đã gửi" style={{ marginLeft: 8 }}>
                    {/* SVG check */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                )}
                {msg.status === 2 && (
                  <span title="Đã đọc" style={{ marginLeft: 8 }}>
                    {/* SVG double check */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4e54c8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /><polyline points="20 12 14 18 11 15" /></svg>
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <form onSubmit={sendMessage} className="form-send-message d-flex justify-content-between align-items-center ">
        <input 
            onChange={(e)=>setMessage(e.target.value)} 
            className="form-control message-input border-0 me-4 shadow-none" 
            placeholder="Type your message here..."
            value={message ?? ''}
        />
        <button className="btn btn-primary" type="submit" style={{ borderRadius: 24, minWidth: 64 }} disabled={!message.trim()}>
          <i className="bx bx-send"></i>
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
