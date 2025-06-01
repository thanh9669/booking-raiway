import { useState, useEffect } from 'react'
import LayoutDefault from '@/layouts/DefaultLayout'
import useAddress from '@/composables/useAddress'
import Head from 'next/head.js'
import TableLoading from '@/components/tables/table-loading'
import { USER } from '@/types/user'
import CustomInput from '@/components/form/custom-input'
import CustomSelect from '@/components/form/custom-select'
import { ENUMS } from '@/enums'
import toast from '@/helpers/toast'
import { PROVINCE, DISTRICT, WARD } from '@/types/index'
import React from 'react'
import ModulesApi from '@/api/moduleApi'

function Index() {
    const { authApi } = ModulesApi()
    const [users, setUsers] = useState<Array<USER>>([])
    const [user, setUser] = useState<USER>()
    const [isHydrated, setIsHydrated] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [isShow, setIsShow] = useState(false)
    const [errorMessage, setErrorMessage] = useState<USER>();
    const [provinces, setProvinces ] = useState<Array<PROVINCE>>([]);
    const [districts, setDistricts ] = useState<Array<DISTRICT>>([]);
    const [wards, setWards ] = useState<Array<WARD>>([]);
    const { address, fetchAddress, getProvinceName, getDistrictName, getWardName, setWard, setDistrict } = useAddress();
    useEffect(() => {
        setIsHydrated(true)
      }, [])
    const fetchData = async () => {
        const resp = await authApi.detail()
        setUsers(resp?.data.data)
        setLoading(false)
    }
    useEffect(() => {
        if (user?.phone && address?.provinces && !loading) {
            setProvinces(address.provinces)
            if (user.province_id) {
                setDistricts(setDistrict(user.province_id))
            }
            if (user.district_id) {
                setWards(setWard(user.district_id))
            }
        }
    }, [user as any]);
    useEffect(() => {
        setIsSubmit(false)
        const errors = Object.values(errorMessage)
        if (errors.length) {
            errors.forEach(item => {
                if (item) {
                    setIsSubmit(true)
                }
            })
        }
    }, [user]);
    const handerDetail = (id) => {
        const result = users.find(item => {
            return item.id == id
        })
        setUser(result)
        setIsShow(true)
    }
    const handleChange = (event) => {
        const name = event.target?.name ?? event.name
        const value = event.target?.value ?? event.value
        if (name && name == "province_id") {
            const result = setDistrict(value)
            setDistricts(result)
            if (value && result && result.length) {
                const resultWard = setWard(result[0].id)
                setWards(resultWard)
                setUser({...user, district_id: result[0].id, ward_id: resultWard[0].id})
            } else {
                setUser({...user, district_id: '', ward_id: ''})
                setWards(setWard(''))
            }
            
        }
        if (name && name == "district_id") {
            setUser({...user, ward_id: ''})
            setWards(setWard(value))
        }
        setUser(prevState => ({ ...prevState, [name]: value }));
    }
    const handerClose = () => {
        setIsShow(false)
    }
    const handleError = (event, errors) => {
        setErrorMessage({
        ...errorMessage,
        [event.target.name]: errors
        });
    }
    const handlerSubmit = async (id) => {
        setLoading(true)
        setIsSubmit(true)
        const resp = await authApi.update(id, {...user})
        if (resp.status == ENUMS.SUCCESS) {
            toast.success(resp.data.message)
            handerClose()
        } else {
            toast.error(resp.data.message)
            setErrorMessage(resp.data.errors)
        }
        setIsSubmit(true)
        setLoading(false)
    }
    useEffect( () => {
        if (isHydrated) {
            fetchAddress()
            fetchData()
        } 
      }, [isHydrated])
    return (
        <>
        <Head>
            <title>Quản lý tài khoản</title>
        </Head>
        { loading ? <TableLoading/> : '' } 
        <div> 
            <div className="card">
            <div className="card-header flex-column flex-md-row">
                <div className="head-label text-center">
                    <h5 className="card-title mb-0">Quản lý tài khoản</h5>
                </div>
            </div>
            <div className="table-responsive text-nowrap">
                <table className="table">
                <thead>
                    <tr>
                    <th>Tên tài khoản</th>
                    <th>Email</th>
                    <th>Tỉnh/Thành phố</th>
                    <th>Quận/Huyện</th>
                    <th>Xã/Phường</th>
                    <th>Địa chỉ</th>
                    <th>Trạng thái</th>
                    <th>Quyền hạn</th>
                    </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                {users ? 
                    users.map((item) =>(
                    <tr className="table-default" key={item.id}>
                        <td className="cursor cursor-pointer" onClick={()=> handerDetail(item.id)}><strong > { item.name }</strong></td>
                        <td>{ item.email }</td>
                        <td>{ getProvinceName(item.province_id)?.name }</td>
                        <td>{ getDistrictName(item.district_id)?.name }</td>
                        <td>{ getWardName(item.ward_id)?.name }</td>
                        <td>{ item.address }</td>
                        <td>{ item.status_name }</td>
                        <td>{ item.role_name }</td>
                    </tr>
                    )) : ''} 
                </tbody>
                </table>
            </div>
            </div>
        </div>
        
        <div className={isShow? "modal-backdrop fade show" : ""}></div>
        <div className={isShow ? "modal fade show d-block" :"modal fade" } aria-hidden="true">
            <div className="modal-dialog modal-lg modal-simple modal-edit-user">
                <div className="modal-content p-3 p-md-5">
                    <div className="modal-body">
                        <button onClick={() => handerClose() } type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div className="text-center mb-4">
                            <h3>Thông tin tài khoản</h3>
                        </div>
                    </div>
                    <div className="row g-3 fv-plugins-bootstrap5 fv-plugins-framework">
                        <div className="col-12 col-md-6 fv-plugins-icon-container">
                            <label className="form-label" htmlFor="modalEditUserFirstName">Tên tài khoản</label>
                            <CustomInput 
                                type="text" 
                                name="name" 
                                validate={['required', 'max:255']}
                                title="Tên"
                                placeholder="Name"
                                value={user?.name}
                                handleInputChange={handleChange}
                                handleError={handleError}
                                errorMessage={ errorMessage?.name }
                                // submit={onSubmit}
                            />
                        </div>
                        <div className="col-12 col-md-6 fv-plugins-icon-container">
                            <label className="form-label" htmlFor="modalEditUserFirstName">Số điện thoại</label>
                            <CustomInput 
                                type="text" 
                                name="phone" 
                                validate={['required', 'phone']}
                                title="Số điện thoại"
                                placeholder="Số điện thoại"
                                value={user?.phone}
                                handleInputChange={handleChange}
                                handleError={handleError}
                                errorMessage={ errorMessage?.phone }
                                // submit={onSubmit}
                            />
                        </div>
                        <div className="col-12 col-md-6 fv-plugins-icon-container">
                            <label htmlFor="firstName" className="form-label">Tỉnh/Thành phố</label>
                            <CustomSelect
                                name="province_id"
                                options={provinces}
                                validate={['required']}
                                title='Tỉnh/Thành phố'
                                value={user?.province_id}
                                handleInputChange={handleChange}
                                errorMessage={ errorMessage?.province_id }
                                handleError={handleError}
                            />
                        </div>
                        <div className="col-12 col-md-6 fv-plugins-icon-container">
                            <label htmlFor="firstName" className="form-label">Quận/Huyện</label>
                            <CustomSelect
                                name="district_id"
                                options={districts}
                                validate={['required']}
                                title='Quận/Huyện'
                                value={user?.district_id}
                                errorMessage={ errorMessage?.district_id }
                                handleInputChange={handleChange}
                                handleError={handleError}
                            />
                        </div>
                        <div className="col-12 col-md-6 fv-plugins-icon-container">
                            <label htmlFor="firstName" className="form-label">Xã/Phường</label>
                            <CustomSelect
                                name="ward_id"
                                options={wards}
                                validate={['required']}
                                title='Xã/Phường'
                                value={user?.ward_id}
                                handleInputChange={handleChange}
                                errorMessage={ errorMessage?.ward_id }
                                handleError={handleError}
                            />
                        </div>
                        <div className="col-12 col-md-6 fv-plugins-icon-container">
                            <label className="form-label" htmlFor="modalEditUserFirstName">Địa chỉ</label>
                            <CustomInput 
                                type="text" 
                                name="address" 
                                validate={['required']}
                                title="Địa chỉ"
                                placeholder="Địa chỉ"
                                value={user?.address}
                                handleInputChange={handleChange}
                                handleError={handleError}
                                errorMessage={ errorMessage?.address }
                                // submit={onSubmit}
                            />
                        </div>
                        <div className="col-12 text-center">
                            <button onClick={() => handerClose() } disabled={isSubmit} className="btn btn-label-secondary me-sm-3 me-1">Hủy</button>
                            <button type="submit" className="btn btn-primary" disabled={isSubmit} onClick={()=>handlerSubmit(user?.id?.toString())}>Xác nhận</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
   </>
    )
}
Index.getLayout = function getLayout(page) {
    return <>
        <LayoutDefault>
            {page}
        </LayoutDefault>
    </>
}
export default Index
