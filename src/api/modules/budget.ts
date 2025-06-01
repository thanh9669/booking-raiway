import axiosInstance from '@/api/axios'

const list = "budget"
const budgetModule = {
  get(formData= {}) {
    return axiosInstance.get(list, formData)
  },
}

export default budgetModule