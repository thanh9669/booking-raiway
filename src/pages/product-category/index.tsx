import ModulesApi from '@/api/moduleApi';
import ComponentModal from '@/components/common/modal';
import CustomInput from '@/components/form/custom-input';
import Pagination from '@/components/tables/pagination';
import TableLoading from '@/components/tables/table-loading';
import { ENUMS, OPTIONS_LIMIT } from '@/enums';
import usePagination from '@/hooks/usePagination';
import LayoutDefault from '@/layouts/DefaultLayout'
import Head from 'next/head.js'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';

const Product = () => {
    const [optionsLimit, setOptionsLimit] = useState(OPTIONS_LIMIT);
    const { productCategoryApi } = ModulesApi();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const hasFetchedRef = useRef(false);
    const [submitModal, setSubmitModal]=useState(false);
    const [isShow, setIsShow]= useState(false);
    const [detail, setDetail] = useState({
        id: 0,
        name:"",
        category_id: ""
    });
    const [errorMessage, setErrorMessage] = useState({
        name:"",
        category_id: ""
    });
    const handleChange = (event) => {
    let { name, value } = event.target
        setDetail((prevState) => ({ ...prevState, [name]: value }))
        console.log(name, value)
    }
    const handleError = (name, errors) => {
        setErrorMessage({
        ...errorMessage,
        [name]: errors
        })
    }
    const { pagination, onPageChange, updatePagination, onLimitChange } = usePagination();

    const fetchData = async () => {
        setLoading(true)
        const resp = await productCategoryApi.get({limit:optionsLimit[0]})
        if (resp?.status == ENUMS.SUCCESS) {
            setData(resp?.data?.data?.data ?? [])
            updatePagination({
                currentPage: resp?.data?.data?.offset,
                itemsPerPage: resp?.data?.data?.limit,
                totalItems: resp?.data?.data?.total
            });
        } else {
            toast.error(resp?.data?.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (!hasFetchedRef.current) {
            fetchData();
            hasFetchedRef.current = true;
        }
    }, []);
    const handleSubmit = async () => {
        let resp = !detail.id ? await productCategoryApi.post(detail) : await productCategoryApi.patch(detail.id, detail)
        if (resp?.status == ENUMS.SUCCESS) {
            toast.success(resp.data?.message)
            fetchData();
            setIsShow(false);
        } else {
            toast.error(resp.data?.message)
        }
        if (resp?.status == ENUMS.VALIDATION) {
            setErrorMessage(resp?.data?.errors)
        }
    }
    useEffect(() => {
        if (submitModal) {
            handleSubmit()
            setSubmitModal(false);
        }
    }, [submitModal]);
    useEffect(() => {
       fetchData();
    }, [pagination.currentPage, pagination.itemsPerPage]);
    const removeItem = async (id: number) => {
        try {
            const resp = await productCategoryApi.delete(id.toString()) as any;
            if (resp?.status == ENUMS.SUCCESS) {
                toast.success(resp?.data?.message);
                if (pagination.currentPage > 1) {
                    fetchData(); // Refresh data after deletion
                } else {
                    updatePagination({
                        ...pagination,
                        currentPage: pagination.currentPage - 1
                    })
                }
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete item');
        }
    };
    return (
    <>
    <Head>
        <title>Sản phẩm</title>
        </Head>
        { loading ? <TableLoading/> : ""}
        <div className="row">
            <div className="col-md-12">

                <div className='card'>

                    <div className='card-datatable table-responsive'>
                        <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">

                            <div className="card-header d-flex border-top rounded-0 flex-wrap py-0 flex-column flex-md-row align-items-start">
                                <div className="me-5 ms-n4 pe-5 mb-n6 mb-md-0">
                                    <div id="DataTables_Table_0_filter" className="dataTables_filter">
                                        <label><input type="search" className="form-control" placeholder="Search Product"/></label>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-start justify-content-md-end align-items-baseline">
                                    <div className="dt-action-buttons d-flex flex-column align-items-start align-items-sm-center justify-content-sm-center pt-0 gap-sm-4 gap-sm-0 flex-sm-row">
                                        <div className="dataTables_length mx-n2" id="DataTables_Table_0_length">
                                            <label>
                                                <select onChange={(e)=>{onLimitChange(parseInt(e?.target?.value.toString()))}} name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" className="form-select">
                                                    {optionsLimit.map((option) => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </label>
                                        </div>
                                        <div className="dt-buttons btn-group flex-wrap d-flex mb-6 mb-sm-0"> 
                                            <div className="btn-group">
                                                <button className="btn btn-secondary buttons-collection dropdown-toggle btn-label-secondary me-4" aria-controls="DataTables_Table_0" type="button" aria-haspopup="dialog" aria-expanded="false">
                                                    <span><i className="bx bx-export me-2 bx-xs"></i>Export</span>
                                                </button>
                                            </div> 
                                            <button onClick={() => {
                                                setDetail({
                                                    id: 0,
                                                    name:"",
                                                    category_id: ""
                                                })
                                                setIsShow(true)
                                                }} className="btn btn-secondary add-new btn-primary" aria-controls="DataTables_Table_0" type="button">
                                                <span>
                                                    <i className="bx bx-plus me-0 me-sm-1 bx-xs"></i>
                                                    <span className="d-none d-sm-inline-block">Add Product</span>
                                                </span>
                                            </button> 
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <table className="datatables-products table dataTable no-footer dtr-column" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info">
                                <thead className="border-top">
                                    <tr>
                                        <th>Name</th>
                                        <th>Product</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, i) => (
                                        <tr className={`odd ${(i + 1) % 2 === 0 ? '' : ' even'}`} role="row">
                                            <td>{item.name}</td>
                                            <td>{item.created_at}</td>
                                            <td>
                                                <a onClick={() => {
                                                    setDetail({...detail, ...item})
                                                    setIsShow(true)
                                                }} className="cursor">
                                                    <i className="bx bx-edit-alt me-1"></i>        
                                                </a>
                                                <span onClick={() => removeItem(item.id)} className="cursor cursor-pointer">
                                                    <i className="bx bx-trash-alt me-1"></i>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        
                            <Pagination
                                currentPage={pagination.currentPage}
                                totalPages={pagination.totalPages}
                                totalItems={pagination.totalItems}
                                itemsPerPage={pagination.itemsPerPage}
                                onPageChange={onPageChange}
                            />
                        </div>
                        {isShow ?
                            <ComponentModal show={isShow} setShowModal={()=>setIsShow(false)}
                                footer={<>
                                <button onClick={() => setIsShow(false)} type="button" className="btn btn-label-secondary" data-bs-dismiss="modal">Huỷ</button>
                                <button onClick={() => setSubmitModal(true)} type="button" className="btn btn-primary">Xác nhận</button>
                            </>}
                            >
                                <CustomInput 
                                    name="name" 
                                    type="name" 
                                    title="Name"
                                    label="Name"
                                    validate={['required']}
                                    placeholder="Name"
                                    value={detail?.name?.toString()}
                                    errorMessage={ errorMessage?.name?.toString() }
                                    handleInputChange={handleChange}
                                    handleError={handleError}
                                />
                            </ComponentModal>
                            : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

Product.getLayout = function getLayout(page) {
  return (
    <LayoutDefault>
      {page}
    </LayoutDefault>
  )
}
export default Product;
