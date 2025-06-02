import axios from 'axios'
import toast from '@/helpers/toast'
import { getCookie, deleteCookie } from 'cookies-next'
import { ReposeError } from '@/types'
import employer from '@/configs/employer'
import { Repose } from '@/types/index';
import { decryptAES } from '@/helpers/aes'
type configHeaderType = {
    Authorization: string
    [key: string]: string 
}
  
const configHeader: configHeaderType = {
    'Content-Type': 'multipart/form-data',
    Authorization: ''
}
if (getCookie(employer.AUTH)) {
    configHeader.Authorization =  'Bearer ' + getCookie(employer.AUTH)
}
let axiosInstance = axios.create({
    baseURL: "https://golang-railway-production-f313.up.railway.app/api/v1",
    // baseURL: "https://golang-railway-production-f313.up.railway.app/api/v1",
    // baseURL: "http://127.0.0.1:8001/api/v1",
    // baseURL: "https://base-golang-wz41.onrender.com/api/v1",
    // process.env.BACKEND_API,
    // timeout: 10000,
    headers: configHeader
})

const setUse = () => {
    axiosInstance.interceptors.response.use(
        response => {
            if (response?.data?.data) {
                console.log(response?.data?.data)
                const result = decryptAES(response?.data?.data)
                response.data.data = result ? JSON.parse(result) : result
            }
            return response
        },
        error => {
            const { response } = error as ReposeError
            // toast.error(response?.data?.message ?? "Kết nối máy chủ không thành công")
            return response
        }
    )
}
setUse()
const device = getCookie(employer.DEVICE)
const messageError = "Kết nối máy chủ không thành công"

export default {
    setDefault(config: configHeaderType|null = null) {
        let configHeadNew = configHeader
        const token = localStorage.getItem(employer.AUTH) || '';
        if (config) {
            configHeadNew = config
        }
        if (configHeader.Authorization) {
            configHeadNew.Authorization =  configHeader.Authorization
        }
        if (configHeader.Authorization) {
            configHeadNew.Authorization =  configHeader.Authorization
        }
        if (!configHeader.Authorization && token) {
            configHeadNew.Authorization =  token
        }
        axiosInstance = axios.create({
            baseURL: "https://golang-railway-production-f313.up.railway.app/api/v1",
            // baseURL: "http://127.0.0.1:8001/api/v1",
            // baseURL: "https://base-golang-wz41.onrender.com/api/v1",
            // process.env.BACKEND_API,
            // timeout: 10000,
            headers: configHeadNew
        })
        setUse()
    },
    redirectLogin(code: string | number) {
        // if (code === "ERR_NETWORK") {
        //     deleteCookie(employer.AUTH)
        //     deleteCookie(employer.DEVICE)
        // }
    },
    async get(url: string, params = {}, auth = "") {
        let response
        // this.setDefault()
        try {
            // params.device = device
            response = await axiosInstance.get(url, { params: params })
          } catch (err) {
            const { response, code } = err as ReposeError
            console.error(response)
            toast.error(response?.data?.message ?? messageError)
            // this.redirectLogin(code)
        }
        return response
    },
    async post(url: string, params: object) {
        let response
        // this.setDefault()
        try {
            // params.device = device
            response = await axiosInstance.post(url, params) as Repose
        } catch (err) {
            const {error, response, code} = err as ReposeError
            // toast.error(response?.data.message ?? messageError)
            console.log(err)
            this.redirectLogin(code)
            return response
        }
        return response
    },
    async patch(url: string, params: object) {
        let resp
        // this.setDefault()
        try {
            // params.device = device
            resp =  await axiosInstance.patch(url, params)
        } catch (err) {
            const { response, code } = err as ReposeError
            resp = response
            this.redirectLogin(code)
        }
        console.log(resp)
        return resp
    },
    // async patch(url: string, params) {
    //     try {
    //         // params.device = device
    //         return await axiosInstance.patch(url, params)
    //     } catch ({error, response}) {
    //         toast.error(response?.data?.message ?? messageError)
    //         return response?.data
    //     }
    // },
    async delete(url: string, id: string) {
        // this.setDefault()
        try {
            // params.device = device
            return await axiosInstance.delete(url +"/"+ id)
        } catch (err) {
            const { response, code } = err as ReposeError
            toast.error(response?.data?.message ?? messageError)
            return response?.data
        }
    },
}
