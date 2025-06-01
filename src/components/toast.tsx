

import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { setNotificationsState } from '@/stores/message'
import { store } from '@/stores'
import { timeAgo } from '@/helpers/str'

const ToastBox = () => {
    const dispatch = useDispatch();

    const notifications = useSelector((state: any) => state.message.notifications)
    useEffect(() => {
        if (!notifications.length) return; // Nếu không có thông báo thì không làm gì

        const interval = setInterval(() => {
            dispatch(setNotificationsState(
                notifications.map((noti, index) => {return { ...noti, show: 0, time_text: timeAgo(noti.created_at) }})
            ));
        }, 1000);

        return () => clearInterval(interval);
    }, [dispatch, notifications]);
    return (
        <>
            <div className={`toast-container toast-box ${notifications.length ? 'show': ''}`}>
                {notifications ? notifications.map(item => 
                    <div className={`bs-toast toast toast-ex animate__animated my-2 fade bg-info animate__bounce fade bg-primary ${item.show ? 'show': ''}`} role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="toast-header">
                            <i className="icon-base bx bx-bell me-2"></i>
                            <div className="me-auto fw-medium">{item.title}</div>
                            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div className="toast-body">{item.message}</div>
                    </div>
                ): ''
                }

            </div>
        </>
    )
}

export default ToastBox;