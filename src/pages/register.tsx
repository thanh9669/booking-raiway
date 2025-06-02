import CustomInput from '@/components/form/custom-input'
import CustomBtn from '@/components/form/custom-btn'
import CustomSelect from '@/components/form/custom-select'
import { useState, useEffect } from 'react'
import { checkErrorMessage } from '@/helpers/common'
import Head from 'next/head.js';
import withAuth from '../middleware/auth.js';
import { ENUMS } from '@/enums/index.js'
import toast from '@/helpers/toast'
import Router from 'next/router.js'
import employer from '@/configs/employer'
import React from 'react'
import ModulesApi from '@/api/moduleApi'
import useAddress from '@/composables/useAddress';
import TableLoading from '@/components/tables/table-loading'

const Register = () => {
  const { authApi } = ModulesApi()
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState({
    name: '',
    email: '',
    phone: '',
    cmnd: '',
    province_id: '',
    district_id: '',
    ward_id: '',
    address: '',
    password: '',
  });
  const { 
    addressRoot, 
    fetchAddress, 
    setDistrict, 
    setWard, 
    wards, 
    districts, 
    provinces 
  } = useAddress()
  const [isHydrated, setIsHydrated] = useState(false)
  const [isSubmit, setIsSubmit] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cmnd: '',
    province_id: '',
    district_id: '',
    ward_id: '',
    address: '',
    password: '',
  });
  
  useEffect(() => {
    setIsHydrated(true)
  }, [])
  useEffect(() => {
    async function fetchData() {
      fetchAddress()
    }
    if (isHydrated) {
      fetchData()
    }
  }, [isHydrated])
  useEffect(() => {
    if (provinces?.length >0 ) {
      setLoading(false)
    }
  }, [provinces])
  const handleError = (event, errors) => {
    console.log(event,errors)
    setErrorMessage({
      ...errorMessage,
      [event?.target?.name ?? event]: errors
    });
    setIsSubmit(checkErrorMessage(errorMessage, event?.target?.name ?? event, errors))
  }
  const handleChange = (event) => {
    let { name, value } = event.target
    if (name == "province_id") {
      setDistrict(value)
    }
    if (name == "district_id") {
      setWard(value)
    }
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };
  const handlerSignUp = async (event) => {
    setLoading(true)
    event.preventDefault();
    setIsSubmit(true)
    try {

      const resp = await authApi.register(formData) as any
      if (resp?.errors) {
        setErrorMessage(resp?.errors)
      }
      if (resp.status == ENUMS.SUCCESS) {
        toast.success(resp.message)
        Router.push(employer.PATH_LOGIN)
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
    setIsSubmit(false)
  }
  return (
    <>
      { loading ? <TableLoading/> : '' } 
      <Head>
        <title>Đăng ký</title>
      </Head>
      <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner">
            <div className="card">
              <div className="card-body">
                <div className="app-brand justify-content-center">
                  <a href="/" className="app-brand-link gap-2">
                    <span className="app-brand-logo demo">
                      <svg
                        width="25"
                        viewBox="0 0 25 42"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xlinkHref="http://www.w3.org/1999/xlink"
                      >
                        <defs>
                          <path
                            d="M13.7918663,0.358365126 L3.39788168,7.44174259 C0.566865006,9.69408886 -0.379795268,12.4788597 0.557900856,15.7960551 C0.68998853,16.2305145 1.09562888,17.7872135 3.12357076,19.2293357 C3.8146334,19.7207684 5.32369333,20.3834223 7.65075054,21.2172976 L7.59773219,21.2525164 L2.63468769,24.5493413 C0.445452254,26.3002124 0.0884951797,28.5083815 1.56381646,31.1738486 C2.83770406,32.8170431 5.20850219,33.2640127 7.09180128,32.5391577 C8.347334,32.0559211 11.4559176,30.0011079 16.4175519,26.3747182 C18.0338572,24.4997857 18.6973423,22.4544883 18.4080071,20.2388261 C17.963753,17.5346866 16.1776345,15.5799961 13.0496516,14.3747546 L10.9194936,13.4715819 L18.6192054,7.984237 L13.7918663,0.358365126 Z"
                            id="path-1"
                          ></path>
                          <path
                            d="M5.47320593,6.00457225 C4.05321814,8.216144 4.36334763,10.0722806 6.40359441,11.5729822 C8.61520715,12.571656 10.0999176,13.2171421 10.8577257,13.5094407 L15.5088241,14.433041 L18.6192054,7.984237 C15.5364148,3.11535317 13.9273018,0.573395879 13.7918663,0.358365126 C13.5790555,0.511491653 10.8061687,2.3935607 5.47320593,6.00457225 Z"
                            id="path-3"
                          ></path>
                          <path
                            d="M7.50063644,21.2294429 L12.3234468,23.3159332 C14.1688022,24.7579751 14.397098,26.4880487 13.008334,28.506154 C11.6195701,30.5242593 10.3099883,31.790241 9.07958868,32.3040991 C5.78142938,33.4346997 4.13234973,34 4.13234973,34 C4.13234973,34 2.75489982,33.0538207 2.37032616e-14,31.1614621 C-0.55822714,27.8186216 -0.55822714,26.0572515 -4.05231404e-15,25.8773518 C0.83734071,25.6075023 2.77988457,22.8248993 3.3049379,22.52991 C3.65497346,22.3332504 5.05353963,21.8997614 7.50063644,21.2294429 Z"
                            id="path-4"
                          ></path>
                          <path
                            d="M20.6,7.13333333 L25.6,13.8 C26.2627417,14.6836556 26.0836556,15.9372583 25.2,16.6 C24.8538077,16.8596443 24.4327404,17 24,17 L14,17 C12.8954305,17 12,16.1045695 12,15 C12,14.5672596 12.1403557,14.1461923 12.4,13.8 L17.4,7.13333333 C18.0627417,6.24967773 19.3163444,6.07059163 20.2,6.73333333 C20.3516113,6.84704183 20.4862915,6.981722 20.6,7.13333333 Z"
                            id="path-5"
                          ></path>
                        </defs>
                        <g id="g-app-brand" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                          <g id="Brand-Logo" transform="translate(-27.000000, -15.000000)">
                            <g id="Icon" transform="translate(27.000000, 15.000000)">
                              <g id="Mask" transform="translate(0.000000, 8.000000)">
                                <mask id="mask-2" fill="white">
                                  <use xlinkHref="#path-1"></use>
                                </mask>
                                <use fill="#696cff" xlinkHref="#path-1"></use>
                                <g id="Path-3" mask="url(#mask-2)">
                                  <use fill="#696cff" xlinkHref="#path-3"></use>
                                  <use fillOpacity="0.2" fill="#FFFFFF" xlinkHref="#path-3"></use>
                                </g>
                                <g id="Path-4" mask="url(#mask-2)">
                                  <use fill="#696cff" xlinkHref="#path-4"></use>
                                  <use fillOpacity="0.2" fill="#FFFFFF" xlinkHref="#path-4"></use>
                                </g>
                              </g>
                              <g
                                id="Triangle"
                                transform="translate(19.000000, 11.000000) rotate(-300.000000) translate(-19.000000, -11.000000) "
                              >
                                <use fill="#696cff" xlinkHref="#path-5"></use>
                                <use fillOpacity="0.2" fill="#FFFFFF" xlinkHref="#path-5"></use>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>
                    <span className="app-brand-text demo text-body fw-bolder">Reviewer</span>
                  </a>
                </div>
                <h4 className="mb-2">Chào bạn đến với Ninh Bình reviewer! 👋</h4>
                <form className="mb-3" onSubmit={handlerSignUp}>
                <div className="d-flex justify-content-between">
                      <label className="form-label" htmlFor="Email">Họ tên</label>
                    </div>
                  <div className='mb-3'>
                    <CustomInput 
                      type="name" 
                      name="name" 
                      title="Họ tên"
                      validate={['required']}
                      placeholder="Họ tên"
                      value={formData.name} 
                      handleInputChange={handleChange}
                      errorMessage={ errorMessage?.name }
                      handleError={handleError}
                    />
                  </div>
                  <div className='mb-3'>
                    <CustomInput 
                      type="password" 
                      name="password" 
                      title='Mật khẩu'
                      label="Mật khẩu"
                      validate={['required']}
                      placeholder="Mật khẩu"
                      value={formData.password} 
                      handleInputChange={handleChange}
                      errorMessage={ errorMessage?.password }
                      handleError={handleError}
                    />
                  </div>
                  <div className="mb-3 form-password-toggle">
                      <CustomInput 
                        name="email" 
                        type="text" 
                        title='Email'
                        label="Email"
                        validate={['required']}
                        placeholder="Email"
                        value={formData.email} 
                        handleInputChange={handleChange}
                        errorMessage={ errorMessage?.email }
                        handleError={handleError}
                      />
                  </div>
                  <div className="mb-3 form-password-toggle">
                      <CustomInput 
                        name="phone" 
                        type="text" 
                        title='Số điện thoại'
                        label="Số điện thoại"
                        validate={['required', 'phone']}
                        placeholder="Số điện thoại"
                        value={formData.phone} 
                        handleInputChange={handleChange}
                        errorMessage={ errorMessage?.phone }
                        handleError={handleError}
                      />
                  </div>
                  <div className="mb-3 form-password-toggle">
                      <CustomInput 
                        name="cmnd" 
                        type="text" 
                        title='Số cmnd'
                        label="Số cmnd"
                        validate={['required', 'cmnd']}
                        placeholder="Số cmnd"
                        value={formData.cmnd} 
                        handleInputChange={handleChange}
                        errorMessage={ errorMessage?.cmnd }
                        handleError={handleError}
                      />
                  </div>
                  <div className="mb-3 form-password-toggle">
                      <CustomSelect 
                        name="province_id" 
                        label="Thành phố"
                        title='Thành phố'
                        options={provinces}
                        validate={['required']}
                        value={formData.province_id} 
                        handleInputChange={handleChange}
                        errorMessage={ errorMessage?.province_id }
                        handleError={handleError}
                      />
                  </div>
                  <div className="mb-3 form-password-toggle">
                      <CustomSelect 
                        name="district_id" 
                        label="Quận/Huyện"
                        title='Quận/Huyện'
                        options={ districts }
                        validate={['required']}
                        value={formData.district_id} 
                        handleInputChange={handleChange}
                        errorMessage={ errorMessage?.district_id }
                        handleError={handleError}
                      />
                  </div>
                  <div className="mb-3 form-password-toggle">
                      <CustomSelect 
                        name="ward_id" 
                        label="Xã/Phường"
                        title='Xã/Phường'
                        options={wards}
                        validate={['required']}
                        value={formData.ward_id} 
                        handleInputChange={handleChange}
                        errorMessage={ errorMessage?.ward_id }
                        handleError={handleError}
                      />
                  </div>
                  <div className="mb-3 form-password-toggle">
                      <CustomInput 
                        name="address" 
                        title='Địa chỉ'
                        type="text" 
                        label="Địa chỉ"
                        validate={['required']}
                        placeholder="Địa chỉ"
                        value={formData.address} 
                        handleInputChange={handleChange}
                        errorMessage={ errorMessage?.address }
                        handleError={handleError}
                      />
                  </div>
                  <CustomBtn type="submit" label="Đăng ký" isLoad={isSubmit}/>
                </form>

                <p className="text-center">
                  <a href="/">
                    <span>Đăng nhập</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withAuth(Register);