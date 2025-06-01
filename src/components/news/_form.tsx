import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import CustomInput from '@/components/form/custom-input'
import CustomTextArea from '@/components/form/custom-textarea'
import CustomSelect from '@/components/form/custom-select'
import CustomFile from '@/components/form/custom-file'
import { ENUMS } from '@/enums/index'
import moment from 'moment'
import toast from '@/helpers/toast'
import employer from '@/configs/employer'
import { NewsDefault, NewsType } from '@/types/news'
import Editor  from '@/components/form/custom-editor'
import FormLoading from '@/components/tables/form-loadding'
import configApi from '@/configs/api'
import useAddress from '@/composables/useAddress';
import { useCommon } from '@/composables/useCommon'
import React from 'react'
import ModulesApi from '@/api/moduleApi'

export default function FormNews() {
    const { newsApi } = ModulesApi()
    const router = useRouter()
    // const [isSubmit, setIsSubmit] = useState(false)
    const [category, setCategory] = useState()
    const [errorMessage, setErrorMessage] = useState<NewsType>(NewsDefault)
    const [news, setNew] = useState<NewsType>(NewsDefault)
    const [loading, setLoading] = useState(false)
    const { sendSubmit }= useCommon()
    const { 
      addressRoot, 
      fetchAddress, 
      setDistrict, 
      setWard, 
      wards, 
      districts, 
      provinces 
    } = useAddress()
    const fetchData = async () => {
        const resp = await newsApi.getCategory()
        if (resp?.status == ENUMS.SUCCESS) {
          setCategory(resp?.data?.data?.data ?? [])
          news.category_id = resp?.data?.data?.data?.length ? resp?.data?.data?.data[0].id : 0
        }
    }
  
    const getDetail = async (id) => {
      if(id) {
        await newsApi.detail(id).then((resp) => {
          const respNew = resp?.data.data
          respNew.content = respNew.content.replaceAll('src="public/', 'src="'+configApi.rootImage+'public/')
          setNew(respNew)
        }).catch((err) => {
          router.push('/404')
        })
      }
    }

    useEffect(() => {
      // Đảm bảo rằng id có sẵn
      if (router.isReady) {
        init()
      }
    }, [router.isReady, router.query])

    const init = async () => {
      fetchAddress()
      fetchData()
      console.log(router?.query.id);
      if (router?.query?.id) {
       await getDetail(router?.query?.id)
      }
      setLoading(true)
    }

    useEffect(() => {
        if (addressRoot?.provinces) {
          setDistrict(news.province_id)
          setWard(news.district_id)
        }
    }, [addressRoot, news.province_id])

    const handleChange = (event) => {
      let nameInput = event?.target?.name
      if (nameInput === "images") {
        let { name, value } = event.target
        setNew((prevState) => ({ ...prevState, [name]: value}))
        return 
      }
      let { name, value } = event.target
      setNew((prevState) => ({ ...prevState, [name]: value }))
      if (name == "province_id") {
        setDistrict(value)
      }
      if (name == "district_id") {
        setWard(value)
      }
    }
    // handler get error
    const handleError = (name, errors) => {
      setErrorMessage({
      ...errorMessage,
      [name]: errors
      })
      // setIsSubmit(checkErrorMessage(errorMessage, name, errors))
    }
    // action submit form
    const handlerCreate = async (event) => {
      event.preventDefault()
      sendSubmit()
      handlerSubmit()
    }

    const handlerSubmit = async () => {
      const content = news.content.replaceAll(`src="${configApi.rootImage}public`, 'src="public')
      const payLoad = {
          ...news,
          content: content,
          time_come:  news.time_come ? convertDateTimeLocalToDateTime(news.time_come) : news.time_come
      }
      let resp: any = {
        status: ENUMS.ERROR,
        message: "",
        errors: NewsDefault,
        data: {
          message: ''
        }
      }
      if (news.id) {
        resp = await newsApi.update(news.id, payLoad)
      } else {
        resp = await newsApi.create(payLoad)
      }
      if (resp?.status == ENUMS.SUCCESS) {
          toast.success(resp.message)
          router.push(employer.NEWS_LIST)
      } else {
          setErrorMessage(resp?.errors)
      }
    }

    // convert datetime local to format
    const convertDateTimeLocalToDateTime = (dateTimeLocalString) => {
        const [datePart, timePart] = dateTimeLocalString.split('T')
        let year = 0
        let month = 0
        let day = 0
        let hour = 0
        let minute = 0
        if (timePart && datePart) {
          const date = datePart.split('-').map(Number)
          const time = timePart.split(':').map(Number)
          year = date[0]
          month = date[1]
          day = date[2]
          hour = time[0]
          minute = time[1]
        } else {
          const dateP = dateTimeLocalString.split(' ')
          if (dateP.length) {
            const date = dateP[0].split('-').map(Number)
            const time = dateP[1].split(':').map(Number)
            year = date[0]
            month = date[1]
            day = date[2]
            hour = time[0]
            minute = time[1]
          }
        }
        const dates = new Date(year, month - 1, day, hour, minute)
        return moment(dates).format("YYYY-MM-DD H:mm:ss")
    }

    const handleInputChange = (data) => {
        // Ensure 'data.name' is defined and non-empty before updating state
        if (data.name) {
            setNew(prevState => ({
                ...prevState,
                [data.name]: data.value  // Update the state based on input change
            }))
        }
    }

    return (
        <>
          {!loading ? <FormLoading/> : (
          <form className="mb-3" onSubmit={handlerCreate}>
            <div className="card mb-4">
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="defaultFormControlInput" className="form-label">Tên bài viết</label>
                  <CustomInput 
                    name="title" 
                    type="text" 
                    title="Tiêu đề"
                    validate={['required']}
                    placeholder="Tiêu đề"
                    value={news.title} 
                    handleInputChange={handleChange}
                    errorMessage={ errorMessage?.title }
                    handleError={handleError}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="defaultFormControlInput" className="form-label">Danh mục</label>
                  <CustomSelect
                    // label="Danh mục"
                    name="category_id"
                    options={category ?? []}
                    // title='Danh mục'
                    value={news.category_id}
                    handleInputChange={handleChange}
                    handleError={handleError}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="defaultFormControlInput" className="form-label">Cách thức di chuyển</label>
                  <CustomInput 
                    name="way_to_moving" 
                    type="text" 
                    title="Cách thức di chuyển"
                    validate={['required']}
                    value={news.way_to_moving} 
                    handleInputChange={handleChange}
                    errorMessage={ errorMessage?.way_to_moving }
                    handleError={handleError}
                    />
                </div>
                <div className="mb-3">
                  <label htmlFor="defaultFormControlInput" className="form-label">Thông tin cơ bản</label>
                  <CustomTextArea 
                    name="basic_information" 
                    type="text" 
                    title="Thông tin cơ bản"
                    validate={['required']}
                    value={news.basic_information} 
                    handleInputChange={handleChange}
                    errorMessage={ errorMessage?.basic_information }
                    handleError={handleError}
                    />
                </div>
                <div className="mb-3">
                  <label htmlFor="defaultFormControlInput" className="form-label">Nội dung</label>
                  <Editor 
                    name="content" 
                    // type="text" 
                    title="Nội dung"
                    validate={['required']}
                    value={news.content} 
                    handleInputChange={(data) => handleInputChange(data)}
                    errorMessage={ errorMessage?.content }
                    loading={loading}
                    />
                </div>
                <div className="mb-3">
                  <label htmlFor="defaultFormControlInput" className="form-label">Góp ý</label>
                  <CustomTextArea 
                    name="things_improve" 
                    type="text" 
                    title="Góp ý"
                    validate={['required']}
                    value={news.things_improve} 
                    handleInputChange={handleChange}
                    errorMessage={ errorMessage?.things_improve }
                    handleError={handleError}
                    />
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">Tỉnh/Thành phố</label>
                    <CustomSelect
                        name="province_id"
                        options={provinces}
                        validate={['required']}
                        title='Tỉnh/Thành phố'
                        value={ news.province_id }
                        handleInputChange={handleChange}
                        errorMessage={ errorMessage?.province_id }
                        handleError={handleError}
                    />
                </div>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">Quận/Huyện</label>
                  <CustomSelect
                      name="district_id"
                      options={districts}
                      validate={['required']}
                      title='Quận/Huyện'
                      value={ news.district_id }
                      errorMessage={ errorMessage?.district_id }
                      handleInputChange={handleChange}
                      handleError={handleError}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">Xã/Phường</label>
                  <CustomSelect
                      name="ward_id"
                      options={wards}
                      validate={['required']}
                      title='Xã/Phường'
                      value={news.ward_id}
                      handleInputChange={handleChange}
                      errorMessage={ errorMessage?.ward_id }
                      handleError={handleError}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="defaultFormControlInput" className="form-label">Địa điểm</label>
                  <CustomInput 
                    name="address" 
                    type="text"
                    title='Địa điểm'
                    validate={['required']}
                    placeholder="Địa chỉ"
                    value={news.address} 
                    handleInputChange={handleChange}
                    errorMessage={ errorMessage?.address }
                    handleError={handleError}
                  />
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">Hình ảnh</label>
                  <CustomFile 
                    name="images" 
                    type="file" 
                    title="Hình ảnh"
                    placeholder="Hình ảnh"
                    value={{name: news.images}} 
                    handleInputChange={handleChange}
                    errorMessage={ errorMessage?.images }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">Banner</label>
                  <CustomFile 
                    name="banner" 
                    type="file" 
                    title="Banner"
                    placeholder="Banner"
                    value={{name: news.banner}} 
                    handleInputChange={handleChange}
                    errorMessage={ errorMessage?.banner }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">Thời gian đã đến</label>
                  <CustomInput 
                    name="time_come" 
                    type="datetime-local" 
                    title='Thời gian'
                    validate={['required']}
                    placeholder="Thời gian"
                    value={news.time_come} 
                    handleInputChange={handleChange}
                    errorMessage={ errorMessage?.time_come }
                    handleError={handleError}
                  />              
                </div>
                <button type="submit" className="btn btn-primary">{router?.query?.id ? "Chỉnh sửa" : 'Thêm mới' }</button>
              </div>
            </div>
          </form> )}
        </>
    )
}
