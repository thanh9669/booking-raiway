import LayoutDefault from '@/layouts/DefaultLayout'
import Head from 'next/head.js'
import { useState, useEffect, useRef } from 'react'
import ComponentModal from '@/components/common/modal'

import React from 'react'
const CreateProduct = () => {
    const tabList = ['inventory'];
    const [tab, setTab] = useState(tabList[0])
    const [showModal, setShowModal] = useState(false)
    
    return (
        <>
        <Head>
            <title>Thêm sản phẩm</title>
            </Head>
            <div className="row"> 
            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-6 row-gap-4">

                        <div className="d-flex flex-column justify-content-center">
                            <h4 className="mb-1">Thêm sản phẩm</h4>
                            <p className="mb-0">Orders placed across your store</p>
                        </div>
                        <div className="d-flex align-content-center flex-wrap gap-4">
                            <div className="d-flex gap-4">
                                <button className="btn btn-label-secondary">Discard</button>
                                <button className="btn btn-label-primary">Lưu</button>
                            </div>
                            <button type="submit" className="btn btn-primary">Thêm mới</button>
                        </div>

                    </div>
                    
                    <div className="row">
                        <div className="col-12 col-lg-8">
                            <div className="card mb-6">
                                    <div className="card-header">
                                        <h5 className="card-tile mb-0">Thông tin sản phẩm</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-6">
                                            <label className="form-label" htmlFor="ecommerce-product-name">Tên sản phẩm</label>
                                            <input type="text" className="form-control" placeholder="Tên sản phẩm" />
                                        </div>
                                        <div className="mb-6">
                                            <label className="form-label" htmlFor="ecommerce-product-name">Sản phẩm gốc</label>
                                            <select className="select2 form-select select2-hidden-accessible" >
                                                <option value="1" data-select2-id="12">Option1</option>
                                                <option value="2" data-select2-id="13">Option2</option>
                                                <option value="3" data-select2-id="47">Option3</option>
                                                <option value="4" data-select2-id="48">Option4</option>
                                            </select>
                                        </div>
                                        <div className="mb-6">
                                            <label className="form-label" htmlFor="ecommerce-product-name">Danh mục sản phẩm</label>
                                            <select className="select2 form-select select2-hidden-accessible" >
                                                <option value="1" data-select2-id="12">Option1</option>
                                                <option value="2" data-select2-id="13">Option2</option>
                                                <option value="3" data-select2-id="47">Option3</option>
                                                <option value="4" data-select2-id="48">Option4</option>
                                            </select>
                                        </div>
                                            <div className="mb-6">
                                                <label className="form-label" htmlFor="ecommerce-product-sku">Hình ảnh</label>
                                                <input type="file" className="form-control"/>
                                            </div>
                                            <div className="mb-6">
                                                <label className="form-label" htmlFor="ecommerce-product-sku">Nội dung</label>
                                                <textarea className="form-control"></textarea>
                                            </div>
                                        <div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        <div className="col-12 col-lg-4">
                            <div className="card mb-6">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Giá</h5>
                                </div>
                                <div className="card-body">
                                <div className="mb-6">
                                    <label className="form-label" htmlFor="ecommerce-product-price">Giá bán</label>
                                    <input type="number" className="form-control"  placeholder="Price" />
                                </div>
                                <div className="d-flex justify-content-between align-items-center border-top pt-2">
                                    <span className="mb-0">Trạng thái</span>
                                        <div className="w-25 d-flex justify-content-end">
                                            <div className="form-check form-switch me-n3">
                                                <input type="checkbox" className="form-check-input" />
                                            </div>  
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" col-12 mb-6">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0 card-title">Product Image</h5>
                                    <a href="javascript:void(0);" className="fw-medium">Add media from URL</a>
                                </div>
                                <div className="card-body">
                                    <form action="/upload" className="dropzone needsclick p-0 dz-clickable" id="dropzone-basic">
                                        <div className="dz-message needsclick">
                                            <img  className="dropzone-img" src="/img/backgrounds/18.jpg"/>
                                            <input type="file" className="form-control dropzone-input"/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Quản lý kho</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">

                                        <div className="col-12 col-md-2 col-xl-5 col-xxl-4 mx-auto card-separator">
                                            <div className="d-flex justify-content-between flex-column mb-4 mb-md-0 pe-md-4">
                                                <div className="nav-align-left">
                                                    <ul className="nav nav-pills flex-column w-100" role="tablist">
                                                        <li className="nav-item" role="presentation">
                                                            <button onClick={() => setTab(tabList[0])} 
                                                            className={`nav-link ${tab == tabList[0] ? "active" : ""}`}
                                                            data-bs-toggle="tab" 
                                                            data-bs-target="#restock" aria-selected="false"
                                                            >
                                                                <i className="bx bx-cube bx-sm me-1_5"></i>
                                                                <span className="align-middle">Hàng trong kho</span>
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-12 col-md-10 col-xl-7 col-xxl-8 pt-6 pt-md-0">
                                            <div className="tab-content p-0 ps-md-4">

                                                <div className={`tab-pane fade ${tab == tabList[0] ? "active show" : ""}`} >
                                                    <table className="datatables-products table dataTable no-footer dtr-column" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info">
                                                        <thead className="border-top">
                                                            <tr>
                                                                <th className="sorting ">Ngày nhập</th>
                                                                <th className="sorting ">Số lượng</th>
                                                                <th className="sorting ">Người nhập</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className="even">
                                                                <td>12/12/2025</td>
                                                                <td>10000</td>
                                                                <td>Hoàng</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <div>
                                                        <button onClick={()=> setShowModal(true)} className="btn btn-primary" data-repeater-create="">
                                                            <i className="icon-base bx bx-plus icon-sm me-2"></i>
                                                            Nhập hàng
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
           <ComponentModal 
            show={showModal} 
            setShowModal={(item) => setShowModal(item)}
            footer={<><button onClick={() => setShowModal(false)} type="button" className="btn btn-label-secondary" data-bs-dismiss="modal">Huỷ</button>
                      <button type="button" className="btn btn-primary">Xác nhận</button></>}
            >
                <div className="row">
                    <div className="col mb-6">
                        <label className="form-label">Số lượng</label>
                        <input type="text" id="nameLarge" className="form-control" placeholder="Enter Name"/>
                    </div>
                    </div>
                    <div className="row g-6">
                    <div className="col mb-0">
                        <label className="form-label">Ngày SX</label>
                        <input type="date" className="form-control"/>
                    </div>
                    <div className="col mb-0">
                        <label className="form-label">Ngày hết hạn</label>
                        <input type="date" className="form-control"/>
                    </div>
                </div>
           </ComponentModal>
        </>
    )
}

CreateProduct.getLayout = function getLayout(page) {
  return (
    <LayoutDefault>
      {page}
    </LayoutDefault>
  )
}
export default CreateProduct;
