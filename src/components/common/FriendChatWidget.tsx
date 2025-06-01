import React from 'react';
import WeatherBox from '@/components/WeatherBox';
import FriendList, { Friend } from '@/components/common/FriendList';
import ChatBox from '@/components/common/ChatBox';
import { useFriendChat } from '@/hooks/useFriendChat';
import TableLoading from '../tables/table-loading';

// Danh sách bạn bè demo (có thể thay bằng lấy từ redux hoặc props)

const FriendChatWidget: React.FC = () => {
  const {
    openChats,
    messages,
    // lastMessages,
    handleSelect,
    handleClose,
    users,
    loading,
    userReceiver,
    getMessage,
  } = useFriendChat();

  return (
    <>
      {loading ? <TableLoading/> : ''}
      {/* WeatherBox ở góc trái dưới */}
      <div style={{position: 'fixed', left: 16, bottom: 16, zIndex: 9999}}>
        <WeatherBox />
      </div>
      {/* FriendList nổi bên phải */}
      {users.length > 0 && (
        <FriendList friends={users} onSelect={handleSelect} selectedId={openChats.length ? openChats[openChats.length-1].id : undefined} lastMessages={[]} />
      )}
      {/* Hiển thị tối đa 3 box chat nổi cạnh nhau */}
        {userReceiver?.id &&
          <div style={{
            position: 'fixed',
            right: '10%',
            bottom: 4,
            zIndex: 10,
            transition: 'right .3s',
          }}>
            <ChatBox
              messages={messages}
              // onSend={msg => handleSend(friend.id, msg)}
              onClose={() => handleClose()}
              onLoadMore={() => getMessage(userReceiver, false)}
              // friend={friend}
            />
          </div>
        }
    </>
  );
};

export default FriendChatWidget;
