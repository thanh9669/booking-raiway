import axiosInstance from '@/api/axios'

const list = "bunkers"
const inventoryModule = {
  get() {
    return axiosInstance.get(list)
  },
}

export default inventoryModule