import axiosInstance from '@/api/axios'
const users = "users"
const userMessage = "user/messages/"
const userModule = {
  setDefault() {
    axiosInstance.setDefault()
  },

  async get(params = {}) {
    return await axiosInstance.get(users, params)
  },

  async getMessage(userReceive, params ={}) {
    return await axiosInstance.get(userMessage+userReceive, params)
  },
}

export default userModule