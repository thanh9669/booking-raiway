import axiosInstance from '@/api/axios'

const list = "stock"
const stockModule = {
  setDefault() {
    axiosInstance.setDefault(
      {
        'Content-type': 'application/json',
        Authorization: ''
      }
    )
  },
  get(os) {
    return axiosInstance.get(list, os)
  },
  post(payLoad) {
    return axiosInstance.post(`${list}`, payLoad)
  },
}

export default stockModule