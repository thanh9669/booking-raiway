import axiosInstance from '@/api/axios'

const list = "product"
const productModule = {
  get() {
    return axiosInstance.get(list)
  },
}

export default productModule