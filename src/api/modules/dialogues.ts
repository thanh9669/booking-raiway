import axiosInstance from '@/api/axios'

const list = "dialogues"
const dialoguesModule = {
  get(params = {}) {
    return axiosInstance.get(list, params)
  },
}

export default dialoguesModule
