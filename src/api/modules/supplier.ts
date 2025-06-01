import axiosInstance from '@/api/axios'

const list = "supplier"
const supplierModule = {
  get() {
    return axiosInstance.get(list)
  },
}

export default supplierModule