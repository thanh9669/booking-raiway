import LayoutDefault from '@/layouts/DefaultLayout'
import { useState, useEffect} from 'react'
import Title from '@/layouts/default/title'
import { useDispatch, useSelector  } from 'react-redux'
import CustomInput from '@/components/form/custom-input'
import { employerUpdate } from '@/stores/employer'
import { ENUMS } from '@/enums/index'
import { useRouter } from 'next/router'
import CustomSelect from '@/components/form/custom-select'
import useAddress from '@/composables/useAddress'
import React from 'react'
import ModulesApi from '@/api/moduleApi'

const EmployerPage = () => {
    const { authApi } = ModulesApi()
    const router = useRouter()
    const info = useSelector((state: any) => state.employer.info)
    const errors = useSelector((state: any) => state.employer.errors)
    const [employer, setEmployer  ]= useState({...info})
    const { 
        addressRoot, 
        fetchAddress, 
        setDistrict, 
        setWard, 
        wards, 
        districts, 
        provinces 
      } = useAddress();
    const dispatch = useDispatch()
    const [onSubmit, setOnSubmit ]= useState(false)
    const [isHydrated, setIsHydrated] = useState(false)
    const [errorMessage, setErrorMessage] = useState({
        name: '',
        password: '',
        province_id: '',
        district_id:'',
        ward_id: '',
        address: '',
        phone: ''
    });
    const fetchUser = async () => {
        const resp = await authApi.detail()
        if (resp?.status == ENUMS.SUCCESS) {
            const user = resp?.data.data[0]
            setEmployer(user)
        }
    }
    useEffect(() => {
        setIsHydrated(true)
    }, []);

    useEffect(() => {
        if (addressRoot?.provinces) {
            setDistrict(employer.province_id)
            setWard(employer.district_id)
        }
    }, [addressRoot, employer.province_id]);

    useEffect(() => {
        if (router.isReady && !isHydrated) {
            const data = async () => {
                await fetchAddress()
                await fetchUser()
            }
            data()
        }
    }, [router.isReady]);

    useEffect(() => {
        setErrorMessage({...errors})
    }, [errors]);

    const handleChange = (event) => {
        const name = event.target?.name ?? event.name
        const value = event.target?.value ?? event.value

        if (name == "province_id") {
            setDistrict(value)
          }
          if (name == "district_id") {
            setWard(value)
          }
        setEmployer({
          ...employer,
          [name]: value
        });
    }

    const handleError = (event, errors) => {
        setErrorMessage({
          ...errorMessage,
          [event.target?.name ?? event.name]: errors
        });
    }
    
    const handlerSubmit = async (event) => {
        setOnSubmit(true)
        event.preventDefault()
        dispatch(employerUpdate(employer) as any)
    }
    return <>
        <Title title="Tài khoản" root="Thông tin"/>
        <div className="card mb-4">
            <h5 className="card-header">Thông tin tài khoản</h5>
            <div className="card-body">
            <hr className="my-0"/>
            <div className="card-body">
                <form onSubmit={handlerSubmit}>
                    <div className="row">
                    <div className="mb-3 col-md-6">
                        <label htmlFor="firstName" className="form-label">User name</label>
                        <CustomInput 
                            type="text" 
                            name="name" 
                            validate={['required', 'max:255']}
                            title="Tên"
                            className="mb-3"
                            placeholder="Name"
                            value={employer?.name}
                            handleInputChange={handleChange}
                            handleError={handleError}
                            errorMessage={ errorMessage?.name }
                            submit={onSubmit}
                        />
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="lastName" className="form-label">Số điện thoại</label>
                        <CustomInput 
                            type="text" 
                            name="phone" 
                            validate={['required', 'phone']}
                            title="Số điện thoại"
                            // className="mb-3"
                            placeholder="Số điện thoại"
                            value={employer?.phone}
                            handleInputChange={handleChange}
                            errorMessage={ errorMessage?.phone }
                            handleError={handleError}
                            submit={onSubmit}
                        />
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="firstName" className="form-label">Tỉnh/Thành phố</label>
                        <CustomSelect
                            name="province_id"
                            options={provinces}
                            validate={['required']}
                            title='Tỉnh/Thành phố'
                            value={employer.province_id}
                            handleInputChange={handleChange}
                            errorMessage={ errorMessage?.province_id }
                            handleError={handleError}
                        />
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="firstName" className="form-label">Quận/Huyện</label>
                        <CustomSelect
                            name="district_id"
                            options={districts}
                            validate={['required']}
                            title='Quận/Huyện'
                            value={employer.district_id}
                            errorMessage={ errorMessage?.district_id }
                            handleInputChange={handleChange}
                            handleError={handleError}
                        />
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="firstName" className="form-label">Xã/Phường</label>
                        <CustomSelect
                            name="ward_id"
                            options={wards}
                            validate={['required']}
                            title='Xã/Phường'
                            value={employer.ward_id}
                            handleInputChange={handleChange}
                            errorMessage={ errorMessage?.ward_id }
                            handleError={handleError}
                        />
                    </div>
                    
                    <div className="mb-3 col-md-6">
                        <label htmlFor="email" className="form-label">Địa chỉ</label>
                        <CustomInput 
                            type="text" 
                            name="address" 
                            validate={['required']}
                            title="Địa chỉ"
                            // className="mb-3"
                            placeholder="Đia chỉ"
                            value={employer?.address}
                            handleInputChange={handleChange}
                            handleError={handleError}
                            errorMessage={ errorMessage?.address }
                            submit={onSubmit}
                        />
                    </div>
                    </div>
                    <div className="mt-2">
                    <button type="submit" className="btn btn-primary me-2">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </>
}
EmployerPage.getLayout = function getLayout(page) {
    return <>
        <LayoutDefault>
            {page}
        </LayoutDefault>
    </>
}
export default EmployerPage
