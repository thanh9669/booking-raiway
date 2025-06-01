import axiosInstance from '@/api/axios'

const list = "expense"
const expenseCategory = "expense-category"
const expenseModule = {
  setDefault() {
      axiosInstance.setDefault(
        {
          'Content-type': 'application/json',
          Authorization: ''
        }
      )
  },
  get(params = {}) {
    return axiosInstance.get(list, params)
  },
  getCategory(params = {}) {
    return axiosInstance.get(expenseCategory, params)
  },
  getDay() {
    return axiosInstance.get(`${list}/day`)
  },
  postCategory(data = {}) {
    expenseModule.setDefault()
    return axiosInstance.post(expenseCategory, data)
  },
  post(data = {}) {
    expenseModule.setDefault()
    return axiosInstance.post(list, data)
  },
  patch(id, data = {}) {
    expenseModule.setDefault()
    return axiosInstance.patch(list + "/" + id, data)
  },
}

export default expenseModule
