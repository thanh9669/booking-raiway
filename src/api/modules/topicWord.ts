import axiosInstance from '@/api/axios'

const list = "topic-word"
const topicWordModule = {
  get(params= {}) {
    return axiosInstance.get(list, params)
  },
}

export default topicWordModule