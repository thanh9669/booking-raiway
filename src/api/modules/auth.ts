import axiosInstance from '@/api/axios'
import { getCookie, deleteCookie } from 'cookies-next'

const login = "login"
const loginGoogle = "login-google"
const user = 'user'
const register = 'register'
const report = 'user/report'
const configs = 'configs'
const file = 'upload/image'
const weather = 'weather'
const authModule = {
  setDefault(tokenRoot= "") {
    const token = tokenRoot ?? getCookie('token');
    axiosInstance.setDefault({
      'Content-Type': 'multipart/form-data',
      Authorization: token ? token.toString() : ""
    })
  },

  async login(formData) {
    return await axiosInstance.post(login, formData)
  },

  async getWeather() {
    return await axiosInstance.get(weather)
  },

  async loginGoogle(formData) {
    return await axiosInstance.post(loginGoogle, formData)
  },

  async detail(params = {}, auth = "") {
    return await axiosInstance.get(user, params, auth)
  },

  async update(id, params = {}) {
    return await axiosInstance.patch(`${user}/${id}`, params)
  },

  async register(params = {}) {
    return await axiosInstance.post(register, params)
  },

  async report() {
    return await axiosInstance.get(report)
  },

  async address() {
    return await axiosInstance.get(configs)
  },

  async file(formData) {
    return await axiosInstance.post(file, formData)
  },

  async verify(token) {
    return await axiosInstance.get(`verfify/${token}`)
  },
  
}

export default authModule