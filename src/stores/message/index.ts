import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Toast, Message, USER } from '@/types/user'

const initialState = {
  messages: [] as Message[],
  messageLast: {} as Message,
  message: {} as Message,
  messageUpdateStatus: {} as Message,
  users: [] as USER[],
  user: {} as Message,
  userReceiver: {} as USER,
  onlines: [] as Message[],
  notifications: [] as Toast[],
  messageReceived: false,
}


const messageStore = createSlice({
  name: 'employer',
  initialState,
  reducers: {
    setOnlinesState(state, action) {
      state.onlines = action.payload
    },
    setMessagesState(state, action) {
       state.messages = action.payload
    },
    setMessageLastState(state, action) {
        state.messageLast = action.payload
     },
    setMessageUpdateStatusState(state, action) {
        state.messageUpdateStatus = action.payload
    },
    setMessageState(state, action) {
        console.log(action.payload, "setMessageState")
        state.message = action.payload
     },
    setUsersState(state, action) {
        state.users = action.payload
    },
    setUserState(state, action) {
        state.user = action.payload
    },
    setUserReceiverState(state, action) {
        state.userReceiver = action.payload
        console.log(action.payload)
    },
    setNotificationsState(state, action) {
        state.notifications = action.payload
    },
    setMessageReceivedState(state, action) {
        state.messageReceived = action.payload
    },
    convertMessage(state, action) {
        const stateJson = JSON.parse(JSON.stringify(state));
        const mes = action.payload
        const userC = stateJson.userReceiver;
        const usersLocal = stateJson.users;
        const user = stateJson.user;
        if (userC && userC?.id && 
            (
                (mes.user_receiver == parseInt(userC.id.toString()) && mes.user_send == parseInt(user.user_send.toString())) ||
                (mes.user_receiver == parseInt(user.user_send.toString()) && mes.user_send == parseInt(userC.id.toString()))
            )
        ) {
            const mess = [...stateJson.messages]
            // khi người khác nhận được tin và đọc nó thì update lại 
            if (mes.action == "update") {
                if (mes?.time_send) {
                    const index = mess.findIndex(obj => obj.time_send === mes.time_send);
                    if (index !== -1) {
                        mess[index] = mes;
                    }
                } else {
                    const index = mess.findIndex(obj => obj.id === mes.id);
                    if (index !== -1) {
                        mess[index] = mes;
                    }
                }
                state.messages = mess
                return
            }
            // khi người nhận tin nhắn 
            if (mes.user_receiver == parseInt(user?.user_send.toString())) {
                state.messageReceived = true
                mess.push(mes)
                const index = usersLocal.findIndex(obj => parseInt(obj.id.toString()) === mes.user_send);
                if (index !== -1) {
                    if (!usersLocal[index].messages) {
                        usersLocal[index].messages = []
                    }
                    usersLocal[index].messages.push(mes)
                    state.users = usersLocal
                }
                state.messages = mess
                //  gui laij mess toi da nhan 
                state.message = mes
            }
            // khi tin nhắn được gửi lại cho người gửi đi (update đã gửi thành công chưa)
            if (mes.user_send == parseInt(user?.user_send.toString())) {
                const newMess = mess.map((msg) =>
                    msg.time_send === mes.time_send ? { ...msg, ...mes } : msg
                );
                state.messages = newMess
                console.log(newMess)
                // setMessagesState(newMess)
            }
            if (mes.status == 1 && mes.user_send == parseInt(user?.user_send.toString())) {
                const index = usersLocal.findIndex(obj => parseInt(obj.id.toString()) === mes.user_receiver);
                if (index !== -1) {
                    usersLocal[index].message = usersLocal[index].message ? usersLocal[index].message.push(mes): [mes]
                    state.users = usersLocal
                }
            }
        } else {
            const index = usersLocal.findIndex(obj => parseInt(obj.id.toString()) === mes.user_send);
            const newNotification = {
                user_send: mes.user_send,
                action: mes.action,
                message: mes.message,
                title: mes.name,
                show: 1,
                created_at: mes.created_at,
                time_text: '0s ago'
            }
            const notis = [...stateJson.notifications]
            const i = notis.findIndex(noti => noti.user_send === newNotification.user_send);
            i !== -1 ? (notis[i] = newNotification) : notis.push(newNotification);
            // console.log(notis)
            state.messageReceived = true
            state.notifications = notis
            if (index !== -1) {
                usersLocal[index].unread +=1 
                if (!usersLocal[index].messages) {
                    usersLocal[index].messages = []
                }
                usersLocal[index].messages.push(mes)
                state.users = usersLocal
            }
            
        }
        
    }
  },

})

// export const { getInfo } = employerStore.actions
export const {
    setUsersState,
    setUserState,
    setUserReceiverState,
    setMessagesState,
    setMessageState,
    setOnlinesState,
    convertMessage,
    setNotificationsState,
    setMessageReceivedState,
    setMessageUpdateStatusState,
    setMessageLastState,
} = messageStore.actions

export default messageStore.reducer

