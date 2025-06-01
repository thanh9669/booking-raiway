import Head from 'next/head.js'
import { useState, useEffect, useRef } from 'react'
import LayoutDefault from '@/layouts/DefaultLayout'
import ComponentModal from '@/components/common/modal'
import {PRODUCT_INVENTORY} from '@/types/product'
import InventoryForm from '@/components/inventory/_form'
import CustomSelect from '@/components/form/custom-select'
import CustomInput from '@/components/form/custom-input'
import {formatPrice} from '@/helpers/common'
import toast from '@/helpers/toast'

const InventoryCreate = () => {
    const [products, setProducts] =  useState<Array<PRODUCT_INVENTORY>>([])
    const [isSubmit, setIsSubmit] =  useState(false)
    const [showModal, setShowModal] = useState(false)
    const productList = [
        {
            id: 1,
            name: 'Nước loc 1' 
        },
        {
            id: 2,
            name: 'Nước loc 2' 
        },
        {
            id: 3,
            name: 'Nước loc 3' 
        },
        {
            id: 4,
            name: 'Nước loc 4' 
        }
    ]

    const units = [
        {
            id: 1,
            name: 'Lọ' 
        },
        {
            id: 2,
            name: 'Chai' 
        },
        {
            id: 3,
            name: 'Túi' 
        },
        {
            id: 4,
            name: 'Thùng' 
        }
    ]
    const [product, setProduct] =  useState<PRODUCT_INVENTORY>()
    const [submit, setSubmit] =  useState(false)
    const [errorMessage, setErrorMessage] = useState<Array<PRODUCT_INVENTORY>>([])
    const handlerAddProduct = (data) =>  {
        setProducts([...products, data])
        setShowModal(false)
        setIsSubmit(false)
    }
    const handleChange = (event, i) => {
        setSubmit(false)
        let { name, value } = event?.target ?? event
        setProducts((prevUsers) => {
            const updatedUsers = [...prevUsers];
            let totalPrice = '0'
            console.log(errorMessage, 'handleChange')
            if (
                errorMessage[i]?.price?.toString() == null &&
                errorMessage[i]?.quantity?.toString() == null &&
                updatedUsers[i]?.price &&
                updatedUsers[i]?.quantity
            ) {
                totalPrice = formatPrice(updatedUsers[i]?.price * updatedUsers[i]?.quantity)
            }
            updatedUsers[i] = {
              ...updatedUsers[i],
              [name]: value,
              total_amount: totalPrice
            };
            return updatedUsers;
        });
    }
    const handleError = (event, errors, i) => {
        const name = event.target?.name
        setErrorMessage((prevUsers) => {
            const updatedUsers = [...prevUsers];
            updatedUsers[i] = {
                ...updatedUsers[i],
                [name]: errors,
            };
            return updatedUsers;
        });
    }
    const saveInventory = () => {
        setSubmit(true)
        const result = errorMessage.every(obj => Object.values(obj).every(value => value === null));
        if (!result) {
            toast.error("loi")
        }
    }
    const removeProduct = (i) => {
        setProducts((prevUsers) => {
            const updatedUsers = [...prevUsers];  // Tạo bản sao mảng để tránh thay đổi trực tiếp
            updatedUsers.splice(i, 1);  // Xóa phần tử tại index
            return updatedUsers;  // Trả về mảng đã cập nhật
        });
        setErrorMessage((prevUsers) => {
            const updatedUsers = [...prevUsers];  // Tạo bản sao mảng để tránh thay đổi trực tiếp
            updatedUsers.splice(i, 1);  // Xóa phần tử tại index
            return updatedUsers;  // Trả về mảng đã cập nhật
        });
    }
    return (
        <>
        <Head>
            <title>Quản lý kho</title>
        </Head>
        <div className=" row"> 
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header flex-column flex-md-row">
                            
                            <div className="head-label text-center">
                                <h5 className="card-title mb-0">Sản phẩm</h5>
                            </div>
                            <div className="dt-action-buttons text-end pt-3 pt-md-0">
                                <div className="dt-buttons btn-group flex-wrap"> 
                                    <button onClick={saveInventory}className="btn btn-primary">Nhập kho </button>
                                </div>
                            </div>
                        </div>
                        <div className='card'>
                            <div className='card-datatable table-responsive'>
                                <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">

                                    <table className="datatables-products table dataTable no-footer dtr-column" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info">
                                        <thead className="border-top">
                                            <tr>
                                                <th aria-label="Actions">Sản phẩm</th>
                                                <th aria-label="Actions">Số lượng </th>
                                                <th aria-label="Actions">Giá tiền</th>
                                                <th aria-label="Actions">Đơn vị</th>
                                                <th aria-label="Actions">Tổng tiền</th>
                                                <th aria-label="Actions">Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((item, i) => (
                                                <tr className={`${(i/2) ? "even": "old"}`}>
                                                    <td>
                                                        <CustomSelect 
                                                            name="product_id" 
                                                            title="Sản phẩm"
                                                            validate={['required']}
                                                            placeholder="Sản phẩm"
                                                            options={productList}
                                                            value={item?.product_id?.toString()} 
                                                            handleError={(name, errors) => handleError(name, errors, i)}
                                                            errorMessage={ errorMessage[i]?.product_id?.toString() }
                                                            handleInputChange={(e) => handleChange(e, i)}
                                                            submit={submit}
                                                        />
                                                    </td>
                                                    <td>
                                                        <CustomInput 
                                                            name="quantity" 
                                                            type="text" 
                                                            title="Số lượng"
                                                            validate={['required', 'number']}
                                                            placeholder="Số lượng"
                                                            value={item?.quantity?.toString()}
                                                            errorMessage={ errorMessage[i]?.quantity?.toString() }
                                                            handleInputChange={(e) => handleChange(e, i)}
                                                            handleError={(name, errors) => handleError(name, errors, i)}
                                                            submit={submit}
                                                        />
                                                    </td>
                                                    <td>
                                                        <CustomInput 
                                                            name="price" 
                                                            type="number" 
                                                            title="Giá tiền"
                                                            validate={['required', 'number']}
                                                            placeholder="Giá tiền"
                                                            errorMessage={ errorMessage[i]?.price?.toString() }
                                                            value={item?.price?.toString()} 
                                                            handleInputChange={(e) => handleChange(e, i)}
                                                            handleError={(name, errors) => handleError(name, errors, i)}
                                                            submit={submit}
                                                        />
                                                    </td>
                                                    <td>
                                                        <CustomSelect 
                                                            name="unit" 
                                                            title="Đơn vị"
                                                            validate={['required']}
                                                            placeholder="Đơn vị"
                                                            options={units}
                                                            value={item?.unit?.toString()} 
                                                            errorMessage={ errorMessage[i]?.unit?.toString() }
                                                            handleError={(name, errors) => handleError(name, errors, i)}
                                                            handleInputChange={(e) => handleChange(e, i)}
                                                            submit={submit}
                                                        />
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-label-danger" text-capitalized="">{item?.total_amount} VND</span>
                                                    </td>
                                                    <td>
                                                        <div className="d-inline-block text-nowrap">
                                                            <button onClick={() => removeProduct(i)} className="btn btn-icon"><i className="bx bx-trash bx-md"></i></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                
                                </div>
                                <div className="flex-column flex-md-row">
                                    <div className="dt-action-buttons text-end pt-3 pt-md-0 px-3 ">
                                        <div className="dt-buttons btn-group flex-wrap"> 
                                            <button onClick={() => setProducts([...products, product])} className="btn btn-primary">Thêm sản phẩm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {showModal ?
            <ComponentModal 
            show={showModal} 
            setShowModal={(item) => setShowModal(item)}
            footer={<>
                <button onClick={() => {setShowModal(false)}} type="button" className="btn btn-label-secondary" data-bs-dismiss="modal">Huỷ</button>
                <button onClick={() => setIsSubmit(true)} type="button" className="btn btn-primary">Xác nhận</button>
            </>}
            >
            <InventoryForm submit={isSubmit} getData={handlerAddProduct}/>
            </ComponentModal> 
        : ''}
        </>
    )
}
InventoryCreate.getLayout = function getLayout(page) {
    return (
      <LayoutDefault>
        {page}
      </LayoutDefault>
    )
  }
export default InventoryCreate;