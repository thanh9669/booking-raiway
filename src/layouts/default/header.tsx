import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link';
import { getCookie } from 'cookies-next'
import { store } from '@/stores'
import { setTheme } from '@/stores/employer'
import { 
  setUserReceiverState,
  setUserState,
  setMessageUpdateStatusState,
  setMessageState,
  setOnlinesState,
  convertMessage,
  setMessagesState,
  setMessageReceivedState,
  setNotificationsState,
  setUsersState
} from '@/stores/message'
import { useSelector } from 'react-redux';

function Header() {
    const theme = useSelector((state: any) => state.employer.theme)
    const [openMenu, setOpenMenu] = useState(null)
    useEffect(() => {
        if (typeof window !== 'undefined') {
          document.documentElement.setAttribute('data-bs-theme', theme);
        }
    }, [theme]);
    useEffect(() => {
        if (typeof window !== 'undefined') {
          document.documentElement.setAttribute('class', openMenu);
        }
    }, [openMenu]);
    
    const [isShow, setIsShow] = useState(false)
    const [isShowMenu, setIsShowMenu] = useState(false)
    const [isShowTheme, setIsShowTheme] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false);
    const socketRef = useRef(null); 
    const user = useSelector((state: any) => state.message.user)
    const message = useSelector((state: any) => state.message.message)
    const messageUpdateStatus = useSelector((state: any) => state.message.messageUpdateStatus)
    const onlines = useSelector((state: any) => state.message.onlines)
    const info = useSelector((state: any) => state.employer.info)
    const notifications = useSelector((state: any) => state.message.notifications)
    const messageReceived = useSelector((state: any) => state.message.messageReceived)
    const ref = useRef(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    let reconnectDelay = 1000; // Thời gian chờ ban đầu
    const maxReconnectDelay = 30000; // Thời gian chờ tối đa
    const users = useSelector((state: any) => state.message.users)
    const changeShow = () => {
      setIsShow(!isShow)
    }
    const changeShowMenu = () => {
      setIsShowMenu(!isShowMenu)
    }
    const changeShowTheme = () => {
      setIsShowTheme(!isShowTheme)
    }
    const setThemes = (value: string) =>{
      store.dispatch(setTheme(value))
      // location.reload()
    }
    useEffect(() => {
      document.addEventListener("mousedown", handleOutsideClick);
      setIsLoaded(true);
    }, []);

    useEffect(() => {
      // console.log(message?.action,socketRef.current)
      if (message?.action && socketRef.current) {
        socketRef.current.send(JSON.stringify(message));
        store.dispatch(setMessageState({}))
      }
    }, [message]);
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
    const connectWS = () => {
      setIsLoaded(true)
      const socket = new WebSocket("wss://base-golang-wz41.onrender.com/ws?token=" + getCookie("token"));
      // const socket = new WebSocket("ws://localhost:8080/ws?token=" + getCookie("token"));
      socketRef.current = socket;


      socket.onopen = () => {
          console.log("✅ Kết nối WebSocket thành công!");
          const mes = {
            action: "connect",
            token: getCookie("token"),
          }
          store.dispatch(setMessageState(mes))
          store.dispatch(setUserReceiverState(null))
          socketRef.current.send(JSON.stringify(mes));
      };

      socket.onmessage = (event) => {
        const mes = JSON.parse(event.data);
        console.log(mes, 'onmessage', mes.action);
        if (mes.action === "connect" || mes.action === "off") {
            if (mes.action === "connect") {
              if (mes.token == getCookie("token")) {
                store.dispatch(setUserState(mes))
              } else {
                store.dispatch(setOnlinesState( [...onlines, {id: mes.user_id}]))
              }
            } else {
              const usersNew = [...users]
              usersNew.map(us => {
                if (us.id == mes.user_id && us.connect == 1) {
                  us.connect = 0
                }
              })
              store.dispatch(setUsersState(usersNew))
            }
            return
          }
          store.dispatch(convertMessage(mes))
      };

      socket.onerror = (error) => {
        console.error("❌ WebSocket Lỗi:", error);
      };

      socket.onclose = () => {
        console.warn("⚠️ Kết nối WebSocket đã đóng.");
        setIsLoaded(false)
      };
    }
    useEffect(() => {
        if (isLoaded && !socketRef.current && getCookie("token")) {
          connectWS()
        }

        return () => {
            if (socketRef.current) {
              socketRef.current.close();
              socketRef.current = null;
            }
        };
    }, [isLoaded]); // Chỉ chạy khi isLoaded = true
  
    const handlerClearModal = () => {
      setIsShowMenu(false)
      setIsShowTheme(false)
      setIsShow(false)
    }
  
    const handleOutsideClick = (e: any) =>{
      if (ref.current && !ref.current.contains(e.target)) {
        handlerClearModal()
      }
    }

    useEffect(() => {
      if (audioRef.current && messageReceived) {
        playAudio()
      }
    }, [messageReceived]);
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play();
        store.dispatch(setMessageReceivedState(false))
      }
    };
    const readNotifice = () =>{
      store.dispatch(setNotificationsState([]))
      console.log(1)
    }
    useEffect(() => {
      if (messageUpdateStatus?.length && socketRef.current) {
          console.log(messageUpdateStatus, 'messageUpdateStatus')
          messageUpdateStatus.map(item => {
            socketRef.current.send(JSON.stringify(item));
          })
          store.dispatch(setMessageUpdateStatusState([]))
      }
    }, [messageUpdateStatus]);
    return <>
      <audio ref={audioRef} src="/mp3/message.mp3" style={{ display: "none" }} />
      <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
              <a onClick={() => setOpenMenu("layout-menu-expanded")} className="nav-item nav-link px-0 me-xl-4" href="#" >
                <i className="bx bx-menu bx-sm"></i>
              </a>
            </div>

            <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
              <ul ref={ref} className="navbar-nav flex-row align-items-center ms-auto">
                <li className="nav-item dropdown-style-switcher dropdown me-2 me-xl-0">
                  <a className="nav-link dropdown-toggle hide-arrow show" 
                  href="#" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="true"
                  onClick={changeShowTheme}
                  >
                    <i className="bx bx-sm bx-desktop"></i>
                  </a>
                  <ul className={`dropdown-menu dropdown-menu-end dropdown-styles ${isShowTheme ? 'show' : ''}`} data-bs-popper="static">
                    <li>
                      <b className="dropdown-item" onClick={()=>setThemes("light")}>
                        <span className="align-middle"><i className="bx bx-sun me-2"></i>Light</span>
                      </b>
                    </li>
                    <li>
                      <b className="dropdown-item" onClick={()=>setThemes("dark")}>
                        <span className="align-middle"><i className="bx bx-moon me-2"></i>Dark</span>
                      </b>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-1">
                  <a className="nav-link dropdown-toggle hide-arrow" 
                  href="#" 
                  data-bs-toggle="dropdown" 
                  data-bs-auto-close="outside" aria-expanded="false"
                  onClick={changeShowMenu}
                  >
                    <i className="bx bx-bell bx-sm"></i>
                    {
                      notifications?.length ?
                        <span className="badge bg-danger rounded-pill badge-notifications">{notifications.length}</span>
                      : ''
                    }
                  </a>
                  <ul className={`dropdown-menu dropdown-menu-end py-0 ${isShowMenu ? 'show' : ''}`} data-bs-popper="static">
                    <li className="dropdown-menu-header border-bottom">
                      <div className="dropdown-header d-flex align-items-center py-3">
                        <h5 className="text-body mb-0 me-auto">Notification</h5>
                        <a href="#" className="dropdown-notifications-all text-body" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Mark all as read" data-bs-original-title="Mark all as read"><i className="bx fs-4 bx-envelope-open"></i></a>
                      </div>
                    </li>
                    <li className="dropdown-notifications-list scrollable-container ps ps--active-y">
                    <ul className="list-group list-group-flush">
                    {notifications?.length 
                    ? notifications.map(item => 
                      <li className="list-group-item list-group-item-action dropdown-notifications-item">
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar">
                              {/* <Image src={user?.avatar ?? ''} alt="" className="w-px-40 h-auto rounded-circle" fill/> */}
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mb-1">{item.title} 🎉</h6>
                            <p className="mb-0">{item.message}</p>
                            <small className="text-muted">{item.time_text}</small>
                          </div>
                          <div className="flex-shrink-0 dropdown-notifications-actions">
                            <a href="#" className="dropdown-notifications-read"><span className="badge badge-dot"></span></a>
                            <a href="#" className="dropdown-notifications-archive"><span className="bx bx-x"></span></a>
                          </div>
                        </div>
                      </li>
                    )
                    : ''}
                    </ul>
                  </li>
                  </ul>
                </li>
                <li className="nav-item navbar-dropdown dropdown-user dropdown">
                  <a  className="nav-link dropdown-toggle hide-arrow show" href="#" data-bs-toggle="dropdown" aria-expanded="false" onClick={changeShow}>
                    <div className="avatar avatar-online">
                      {/* <Image src={user?.avatar ?? ''} alt="" className="w-px-40 h-auto rounded-circle" fill/> */}
                    </div>
                  </a>
                  <ul className={`dropdown-menu dropdown-menu-end ${isShow ? 'show' : ''}`} data-bs-popper="none">
                    <li>
                      <a className="dropdown-item" href="#">
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar avatar-online">
                              {/* <Image src={user?.avatar} alt="" className="w-px-40 h-auto rounded-circle" fill/> */}
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <span className="fw-semibold d-block">{info.name}</span>
                            <small className="text-muted">{info.role}</small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div className="dropdown-divider"></div>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/employer" onClick={() => setIsShow(false)}>
                        <i className="bx bx-user me-2"></i>
                        <span className="align-middle">Tài khoản</span>
                      </Link>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <i className="bx bx-cog me-2"></i>
                        <span className="align-middle">Settings</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <span className="d-flex align-items-center align-middle">
                          <i className="flex-shrink-0 bx bx-credit-card me-2"></i>
                          <span className="flex-grow-1 align-middle">Billing</span>
                          <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <div className="dropdown-divider"></div>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/logout">
                        <i className="bx bx-power-off me-2"></i>
                        <span className="align-middle">Log Out</span>
                      </Link>
                    </li>
                  </ul>
                </li>

              </ul>
            </div>
      </nav>
      <div onClick={() => setOpenMenu(null)} className="layout-overlay layout-menu-toggle"></div>
    </>
}

export default Header