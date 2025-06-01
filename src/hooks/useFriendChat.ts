import { useEffect, useState } from 'react';
import type { Friend } from '@/components/common/FriendList';
import ModulesApi from '@/api/moduleApi';
import { store } from '@/stores'
import {
  setUsersState,
  setMessageUpdateStatusState,
  setMessagesState,
  setUserReceiverState,
  setMessageLastState,
} from '@/stores/message'
import { useSelector } from 'react-redux';
import { USER } from '@/types/user';
export interface Message {
  sender: string;
  content: string;
  time: string;
}

export function useFriendChat() {
  const messages = useSelector((state: any) => state.message.messages)
  const [openChats, setOpenChats] = useState<USER[]>([]); // Tối đa 3 friend
  const [loading, setLoading] = useState(false)
  const [lastIdMessage, setLastIdMessage] = useState(0)
  const users = useSelector((state: any) => state.message.users)
  const { userApi } = ModulesApi()
  const userReceiver = useSelector((state: any) => state.message.userReceiver)
  const user = useSelector((state: any) => state.message.user)
  const limit = 10
  useEffect(() => {
      const fetchData = async () => {
        setLoading(true)
        const resp = await userApi.get({all: 1});
        store.dispatch(setUsersState(resp?.data.data || []))
        setLoading(false)
      };
      fetchData();
  }, []);
  
  useEffect(() => {
    if (userReceiver?.id) {
      store.dispatch(setMessageLastState({}))
      store.dispatch(setMessagesState([]))
      getMessage(userReceiver, true)
    }
}, [userReceiver]);
  // Khi click vào friend
  const getMessage = async (friend: USER, newMessage?: boolean) => {
      setLoading(true)
      let messageIdLast = 0
      if (messages && messages.length > 0 && !newMessage) {
        store.dispatch(setMessageLastState(messages[0]))
        messageIdLast = messages[0].id
      }
      console.log(messageIdLast, lastIdMessage)
      if (messageIdLast == lastIdMessage && lastIdMessage) {
        setLoading(false)
        return
      }
      console.log(messageIdLast, lastIdMessage)
      const resp = await userApi.getMessage(friend?.id, {limit: limit, message_id: messageIdLast});
      let result = resp?.data?.data?.result ? resp?.data?.data?.result.reverse(): []
      if (messageIdLast && !newMessage) {
        result = [...result, ...messages]
      }
      const dataUnread = result.filter(item => item.status == 1 && item.user_receiver == user.user_id)
      if (dataUnread) {
        store.dispatch(setMessageUpdateStatusState(dataUnread))
      }
      store.dispatch(setMessagesState(result))
      setLastIdMessage(resp?.data.lastId)
      setOpenChats(prev => {
        const filtered = prev.filter(f => f.id !== friend.id);
        const updated = [...filtered, friend];
        return updated.slice(-3);
      });
      setLoading(false)
  };
  const handleSelect = (friend: USER) => {
    // call api để lấy message
    getMessage(friend)
  };
  // Đóng chat box
  const handleClose = () => {
    store.dispatch(setUserReceiverState(null))
  };
  // Lấy nội dung chat cuối cùng mỗi bạn

  return {
    loading,
    openChats,
    messages,
    users,
    // lastMessages,
    getMessage,
    handleSelect,
    handleClose,
    userReceiver,
  };
}
