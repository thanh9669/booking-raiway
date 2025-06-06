import axiosInstance from '@/api/axios'

const list = "product/category"
const productCategoryModule = {
    get(params: {}) {
        return axiosInstance.get(list, params)
    },
    post(payLoad) {
        return axiosInstance.post(`${list}`, payLoad)
    },
    patch(id, payLoad) {
        return axiosInstance.patch(`${list}/${id}`, payLoad)
    },
    delete(id ) {
        return axiosInstance.delete(`${list}`,id)
    }
}

export default productCategoryModule