import React from 'react';
import { USER } from '@/types/user'
import { store } from '@/stores';
import { setUserReceiverState, setUsersState } from '@/stores/message';
export interface Friend {
  id: number;
  name: string;
  avatar?: string;
  connect?: boolean;
  isMe?: boolean;
}

interface FriendListProps {
  friends: USER[];
  onSelect: (friend: USER) => void;
  selectedId?: number;
  lastMessages?: { [id: number]: string };
}

const FriendList: React.FC<FriendListProps> = ({ friends, onSelect, selectedId, lastMessages = {} }) => {
  const setUserChat = (item) => {
      store.dispatch(setUserReceiverState({...item, unread: 0}))
      store.dispatch(setUsersState(friends.map((it) => it.id == item.id ? {...item, unread: 0}: it)))
  }
  return (
    <div style={{
      position: 'fixed',
      right: 20,
      bottom: 110,
      zIndex: 9,
      width: 64,
      background: 'rgba(255,255,255,0.95)',
      borderRadius: 18,
      boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
      padding: 6,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      border: '1px solid #e6e8ee',
      backdropFilter: 'blur(2px)',
      maxHeight: 370,
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: '#b2ebf2 #fff',
    }}>
      {friends && friends?.map(friend => (
        <div key={friend.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <button
            onClick={() => setUserChat(friend)}
            style={{
              border: selectedId === friend.id ? '2px solid #4e54c8' : '1px solid #e0e0e0',
              background: selectedId === friend.id ? '#e3f6fd' : 'transparent',
              borderRadius: '50%',
              padding: 0,
              cursor: 'pointer',
              boxShadow: selectedId === friend.id ? '0 2px 8px #00bfff44' : 'none',
              position: 'relative',
              width: 36,
              height: 36,
              marginBottom: 2,
              transition: 'box-shadow .2s, border .2s',
            }}
            title={friend.name}
          >
            <img
              src={friend.avatar || '/img/avatars/default-avatar.png'}
              alt={friend.name}
              style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: 'none', transition: 'border .2s' }}
            />
            {/* Online dot */}
            { <span style={{ position: 'absolute', right: 2, bottom: 2, width: 8, height: 8, borderRadius: '50%', background:friend.connect? '#2ecc40': '#ccc', border: '1.5px solid #fff', boxShadow: '0 0 4px #2ecc40aa' }} />}
          </button>
          <div style={{ fontSize: 10, color: '#444', fontWeight: 400, textAlign: 'center', maxWidth: 48, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={friend.name}>{friend.name.split(' ')[0]}</div>
          {/* Online time ago */}
          {!friend.connect && friend.login && (
            <div
              style={{
                fontSize: 10,
                color: '#888',
                marginTop: 0,
                marginBottom: 1,
                textAlign: 'center',
                maxWidth: 48,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                lineHeight: 1.2,
                fontStyle: 'italic',
              }}
              title={friend.login}
            >
              {friend.login}
            </div>
          )}
          {/* Last message preview */}
          {friend.messages && (
            <div style={{ fontSize: 9, color: '#6d6d6d', opacity: 0.8, maxWidth: 52, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 1 }} title={lastMessages[friend.id]}>
              {friend.messages[0].message}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FriendList;
