import { ADDRESS } from '@/types/index'

export interface Message {
    user_send: number,
    user_receiver: number,
    message: string,
    created_at: string,
    updated_at: string
    type: string,
    time_text: string,
    time_send: number,
    status: number,
    id: number
}

export interface USER {
    name: string,
    login?: string, // timestamp (milliseconds), dùng để tính 'đã login bao lâu rồi'
    email: string,
    province_id: string,
    district_id: string,
    ward_id:string,
    address: string,
    cmnd: string,
    cmnd_after:string,
    cmnd_before: string,
    avatar: string,
    money: string,
    user_confirm: number,
    news_confirm: number,
    phone:  string,
    status:  string,
    process:  string,
    device:  string,
    role: string,
    id: number,
    user_id: number,
    status_name: string,
    role_name: string,
    connect: null| number,
    messages: Message[]
    unread: number
}
export interface Configs {
    address: ADDRESS
}
export interface UserI {
    employer: {
        info: object
        configs: Configs,
        isLoad: Boolean,
        status: string,
        theme: string
        errors: object,
        error: null,
    }
}
export interface Toast {
    user_send: number,
    action: string,
    message: string,
    title: string,
    show: number,
    created_at: string,
    time_text: string
}
