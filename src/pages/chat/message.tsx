import LayoutDefault from '@/layouts/DefaultLayout'
import React from 'react'
import ModulesApi from '@/api/moduleApi'
import { useState, useEffect, useRef } from 'react'
import { convertFileToBase64 } from '@/helpers/common'
import { store } from '@/stores'
import {
    setMessageUpdateStatusState,
    setUsersState,
    setUserReceiverState,
    setMessageState,
    setMessagesState,
    setOnlinesState
} from '@/stores/message'
import { useSelector, useDispatch } from 'react-redux'
import Head from 'next/head.js'
import withAuth from '@/middleware/auth'
import TableLoading from '@/components/tables/table-loading'

const ChatPage = () => {
    const dispatch = useDispatch();
    const users = useSelector((state: any) => state.message.users)
    const user = useSelector((state: any) => state.message.user)
    const messages = useSelector((state: any) => state.message.messages)
    const { userApi } = ModulesApi()
    const userReceiver = useSelector((state: any) => state.message.userReceiver)
    const onlines = useSelector((state: any) => state.message.onlines)
    // const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const scrollRef = useRef(null);
    const [appContact, setAppContact] = useState("")
    const [loading, setLoading] = useState(false)
    const handleScroll = async () => {
        if (scrollRef.current && scrollRef.current.scrollTop == 0 && messages.length) {
            const resp = await userApi.getMessage(userReceiver?.id, {message_id: messages[0].id});
            const result = resp?.data.result.reverse()
            const dataUnread = result.filter(item => item.status == 1 && item.user_receiver == user.user_id)
            if (dataUnread) {
                store.dispatch(setMessageUpdateStatusState(dataUnread))
            }
            const mesNew = [...result, ...messages]
            store.dispatch(setMessagesState(mesNew))
            // setMessages(result)
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const resp = await userApi.get();
            store.dispatch(setUsersState(resp?.data.data || []))
            setLoading(false)
        };
        fetchData();
    }, []);


    const getMessage = async () => {
        setLoading(true)
        const resp = await userApi.getMessage(userReceiver?.id);
        const result = resp?.data.result ? resp?.data.result.reverse(): []
        const dataUnread = result.filter(item => item.status == 1 && item.user_receiver == user.user_id)
        if (dataUnread) {
            store.dispatch(setMessageUpdateStatusState(dataUnread))
        }
        store.dispatch(setMessagesState(result))
        setLoading(false)
    };

    const handleChangeFile = async (event: any) => {
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                const base64 = await convertFileToBase64(file);
                console.log("Base64:", base64); // In ra base64 của file
                const mes = {
                    "id": null,
                    "message": "image",
                    "user_sender": 0,
                    "user_receiver": parseInt(userReceiver?.id.toString()),
                    "created_at": new Date().toISOString(),
                    "updated_at": new Date().toISOString(),
                    "time_send": Date.now(),
                    "status": 0,
                    "type": "file",
                    "file": base64,
                }
                // socketRef.current.send(JSON.stringify(mes));
                // setMessages((prev) => [...prev, mes]);
            } catch (error) {
                console.error("Lỗi khi convert file:", error);
            }
        }
    }
    const sendMessage = (event) => {
        event.preventDefault(); // Ngăn chặn hành động mặc định của form
        const mes = {
            "id": null,
            "message": message,
            "user_sender": 0,
            "user_receiver": parseInt(userReceiver?.id.toString()),
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
    useEffect(() => {
        if (userReceiver?.id) {
            getMessage()
        }
    }, [userReceiver]);

    useEffect(() => {
        if (onlines?.length && users) {
            const onlineUsersSet = new Set(onlines.map(user => user.id));
            const usersNew = [...users]
            const updatedUsers = usersNew.map(user => ({
                ...user,
                connect: !user?.connect ? onlineUsersSet.has(Number(user.id.toString())) : true,
            }));
            store.dispatch(setUsersState(updatedUsers))
            store.dispatch(setOnlinesState([]))
        }
    }, [onlines]);

    const setUserChat = (item) => {
        store.dispatch(setUserReceiverState({...item, unread: 0}))
        store.dispatch(setUsersState(users.map((it) => it.id == item.id ? {...item, unread: 0}: it)))
        console.log({...item, unread: 0}, 'setUserChat')
    }
    
    return <>
        <Head>
            <title>Messages</title>
        </Head>
        { loading ? <TableLoading/> : '' } 
        <div className="app-chat card overflow-hidden">
            <div className='row g-0'>
                <div className={`col app-chat-contacts app-sidebar flex-grow-0 overflow-hidden border-end ${appContact}`}>
                    <div className="sidebar-header px-6 border-bottom d-flex align-items-center">
                        <div className="d-flex align-items-center me-6 me-lg-0">
                            <div className="flex-shrink-0 avatar avatar-online me-4" data-bs-toggle="sidebar" data-overlay="app-overlay-ex" data-target="#app-chat-sidebar-left">
                                <img className="user-avatar rounded-circle cursor-pointer" src={user?.avatar} alt="Avatar" />
                            </div>
                            <div className="flex-grow-1 input-group input-group-merge rounded-pill">
                                <span className="input-group-text" id="basic-addon-search31"><i className="icon-base bx bx-search icon-sm"></i></span>
                                <input type="text" className="form-control chat-search-input" placeholder="Search..." aria-label="Search..." aria-describedby="basic-addon-search31" />
                            </div>
                        </div>
                        <i 
                        className="icon-base bx bx-x icon-lg cursor-pointer position-absolute top-50 end-0 translate-middle d-lg-none d-block" 
                        onClick={() => setAppContact("")}></i>
                    </div>

                    <div className="sidebar-body ps ps--active-y">
                        {/* <!-- Chats --> */}
                        <ul className="list-unstyled chat-contact-list py-2 mb-0" id="chat-list">
                            <li className="chat-contact-list-item chat-contact-list-item-title mt-0">
                                <h5 className="text-primary mb-0">Chats</h5>
                            </li>
                            <li className="chat-contact-list-item chat-list-item-0 d-none">
                                <h6 className="text-body-secondary mb-0">No Chats Found</h6>
                            </li>
                            {users ? 
                                users.map((item) =>(
                                <li className="chat-contact-list-item mb-1">
                                    <a onClick={()=> setUserChat(item)} className="d-flex align-items-center">
                                        <div className={`flex-shrink-0 avatar avatar-${item.connect ? 'online' : 'offline'}`}>
                                            <img src={item.avatar} alt="Avatar" className="rounded-circle" />
                                            {item.unread ? 
                                                <span className="badge bg-label-danger rounded-pill badge-notifications r-0 t-0">{item.unread}</span>
                                            : '' }
                                        </div>
                                        <div className="chat-contact-info flex-grow-1 ms-4">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h6 className="chat-contact-name text-truncate m-0 fw-normal">{item.name}</h6>
                                                {item.connect && item.login ?''
                                                : <small className="chat-contact-list-item-time">{item.login}</small>
                                                }
                                            </div>
                                            <small className="chat-contact-status text-truncate">
                                                {item.messages ? (item.messages[item.messages.length -1 ].type == "file"? "Image" :item.messages[item.messages.length -1 ].message) : '' }
                                            </small>
                                        </div>
                                    </a>
                                </li>
                            )) : ''} 
                        </ul>
                    </div>
                </div>
                {!userReceiver ?
                    <div className="col app-chat-conversation d-flex align-items-center justify-content-center flex-column" id="app-chat-conversation">
                        <div className="bg-label-primary p-8 rounded-circle">
                            <i className="icon-base bx bx-message-alt-detail icon-48px"></i>
                        </div>
                        <p className="my-4">Select a contact to start a conversation.</p>
                        <button 
                            className="btn btn-primary app-chat-conversation-btn" 
                            onClick={() => setAppContact("show")}
                        >
                            Select Contact
                        </button>
                    </div>
                :
                    <div className='col app-chat-history d-block'>
                        <div className="chat-history-wrapper">

                            <div className="chat-history-header border-bottom">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex overflow-hidden align-items-center">
                                        <i 
                                        className="icon-base bx bx-menu icon-lg cursor-pointer d-lg-none d-block me-4" onClick={() => setAppContact("show")}></i>
                                        <div className="flex-shrink-0 avatar avatar-online">
                                            <img src={userReceiver.avatar} alt="Avatar" className="rounded-circle" data-bs-toggle="sidebar" data-overlay="" data-target="#app-chat-sidebar-right" />
                                        </div>
                                        <div className="chat-contact-info flex-grow-1 ms-4">
                                            <h6 className="m-0 fw-normal">{userReceiver.name}</h6>
                                            <small className="user-status text-body">NextJS developer</small>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <span className="btn btn-text-secondary text-secondary cursor-pointer d-sm-inline-flex d-none me-1 btn-icon rounded-pill">
                                            <i className="icon-base bx bx-phone icon-md"></i>
                                        </span>
                                        <span className="btn btn-text-secondary text-secondary cursor-pointer d-sm-inline-flex d-none me-1 btn-icon rounded-pill">
                                            <i className="icon-base bx bx-video icon-md"></i>
                                        </span>
                                        <span className="btn btn-text-secondary text-secondary cursor-pointer d-sm-inline-flex d-none me-1 btn-icon rounded-pill">
                                            <i className="icon-base bx bx-search icon-md"></i>
                                        </span>
                                        <div className="dropdown">
                                            <button className="btn btn-icon btn-text-secondary text-secondary rounded-pill dropdown-toggle hide-arrow" data-bs-toggle="dropdown" aria-expanded="true" id="chat-header-actions"><i className="icon-base bx bx-dots-vertical-rounded icon-md"></i></button>
                                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="chat-header-actions">
                                                <a className="dropdown-item" href="javascript:void(0);">View Contact</a>
                                                <a className="dropdown-item" href="javascript:void(0);">Mute Notifications</a>
                                                <a className="dropdown-item" href="javascript:void(0);">Block Contact</a>
                                                <a className="dropdown-item" href="javascript:void(0);">Clear Chat</a>
                                                <a className="dropdown-item" href="javascript:void(0);">Report</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div 
                                className="chat-history-body ps ps--active-y" 
                                ref={scrollRef}
                                onScroll={handleScroll}
                            >
                                <ul className="list-unstyled chat-history">
                                    {messages ? messages.map((ite)=> (
                                        <li className={`chat-message ${ite.user_send != userReceiver?.id ? 'chat-message-right' : ''}`}>
                                            <div className="d-flex overflow-hidden">
                                                {ite.user_send == userReceiver?.id ? 
                                                    <div className="user-avatar flex-shrink-0 ms-4">
                                                        <div className="avatar avatar-sm">
                                                            <img src={userReceiver.avatar} alt="Avatar" className="rounded-circle" />
                                                        </div>
                                                    </div>
                                                    : ''
                                                }
                                                <div className="chat-message-wrapper flex-grow-1">
                                                        { ite.type =="text" ?
                                                            <div className="chat-message-text">
                                                                <p className="mb-0">{ite.message}</p>
                                                            </div>
                                                        : 
                                                            <div>
                                                                <img width="150" src={ite.message}/>
                                                            </div>
                                                        }
                                                    <div className="text-end text-body-secondary mt-1">
                                                        {ite.status == 0 ? 
                                                            <i className="icon-base bx bx-loader icon-16px text-error me-1"></i>
                                                        : (ite.status == 1) ?
                                                            <i className="icon-base bx bx-check icon-16px text-success  me-1"></i> 
                                                        : 
                                                            <i className="icon-base bx bx-check-double icon-16px text-success me-1"></i> 
                                                        }
                                                        <small>{ite.created_at}</small>
                                                    </div>
                                                </div>
                                                {ite.user_send != userReceiver?.id ? 
                                                    <div className="user-avatar flex-shrink-0 ms-4">
                                                        <div className="avatar avatar-sm">
                                                            <img src={user.avatar} alt="Avatar" className="rounded-circle" />
                                                        </div>
                                                    </div>
                                                    : ''
                                                }
                                            </div>
                                        </li>
                                    )) : null}
                                </ul>
                                {/* <!-- Chat message form --> */}

                            </div>

                            <div className="chat-history-footer shadow-xs">
                                <form onSubmit={sendMessage} className="form-send-message d-flex justify-content-between align-items-center ">
                                    <input 
                                        onChange={(e)=>setMessage(e.target.value)} 
                                        className="form-control message-input border-0 me-4 shadow-none" 
                                        placeholder="Type your message here..."
                                        value={message ?? ''}
                                    />
                                    <div className="message-actions d-flex align-items-center">
                                        <span className="btn btn-text-secondary btn-icon rounded-pill cursor-pointer">
                                            <i className="speech-to-text icon-base bx bx-microphone icon-md text-heading"></i>
                                        </span>
                                        <label htmlFor="attach-doc" className="form-label mb-0">
                                            <span className="btn btn-text-secondary btn-icon rounded-pill cursor-pointer mx-1">
                                                <i className="icon-base bx bx-paperclip icon-md text-heading"></i>
                                            </span>
                                            <input type="file" id="attach-doc" hidden onChange={handleChangeFile}/>
                                        </label>
                                        <button    
                                            disabled={!message} // Disable nếu message rỗng
                                            className="btn btn-primary d-flex send-msg-btn"
                                            type="submit"
                                        >
                                            <span className="align-middle d-md-inline-block d-none">Send</span>
                                            <i className="icon-base bx bx-paper-plane icon-sm ms-md-2 ms-0"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    </>
}
ChatPage.getLayout = function getLayout(page) {
    return <>
        <LayoutDefault>
            {page}
        </LayoutDefault>
    </>
}
export default withAuth(ChatPage)