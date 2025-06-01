import axiosInstance from '@/api/axios'


const list = "news"
const listCategory = 'news/category'
const newsModule = {
  get(params?: any) {
    return axiosInstance.get(list, params)
  },

  create(payLoad) {
    return axiosInstance.post(`${list}`, payLoad)
  },

  update(id, payLoad) {
    return axiosInstance.patch(`${list}/${id}`, payLoad)
  },

  getCategory() {
    return axiosInstance.get(listCategory)
  },

  detail(id: string) {
    return axiosInstance.get(`${list}/${id}`)
  },

  delete(id: string) {
    return axiosInstance.delete(list, id)
  }
}

export default newsModule