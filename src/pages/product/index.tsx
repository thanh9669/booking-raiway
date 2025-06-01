import LayoutDefault from '@/layouts/DefaultLayout'
import Head from 'next/head.js'

import React from 'react'
const Product = () => {
  return (
   <>
   <Head>
      <title>Sản phẩm</title>
    </Head>
    <div className="row"> 
      <div className="row">
        <div className="col-md-12">
            <div className="card mb-6">
                <div className="card-widget-separator-wrapper">
                    <div className="card-body card-widget-separator">
                        <div className="row gy-4 gy-sm-1">
                            <div className="col-sm-6 col-lg-3">
                                <div className="d-flex justify-content-between align-items-start card-widget-1 border-end pb-4 pb-sm-0">
                                    <div>
                                        <p className="mb-1">In-store Sales</p>
                                        <h4 className="mb-1">$5,345.43</h4>
                                        <p className="mb-0">
                                            <span className="me-2">5k orders</span>
                                            <span className="badge bg-label-success">+5.7%</span>
                                        </p>
                                    </div>
                                    <span className="avatar me-sm-6">
                                        <span className="avatar-initial rounded w-px-44 h-px-44">
                                            <i className="bx bx-store-alt bx-lg text-heading"></i>
                                        </span>
                                    </span>
                                </div>
                                <hr className="d-none d-sm-block d-lg-none me-6"/>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="d-flex justify-content-between align-items-start card-widget-2 border-end pb-4 pb-sm-0">
                                    <div>
                                        <p className="mb-1">Website Sales</p>
                                        <h4 className="mb-1">$674,347.12</h4>
                                        <p className="mb-0">
                                            <span className="me-2">21k orders</span>
                                            <span className="badge bg-label-success">+12.4%</span>
                                        </p>
                                    </div>
                                    <span className="avatar p-2 me-lg-6">
                                        <span className="avatar-initial rounded w-px-44 h-px-44">
                                            <i className="bx bx-laptop bx-lg text-heading"></i>
                                        </span>
                                    </span>
                                </div>
                                <hr className="d-none d-sm-block d-lg-none"/>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="d-flex justify-content-between align-items-start border-end pb-4 pb-sm-0 card-widget-3">
                                    <div>
                                        <p className="mb-1">Discount</p>
                                        <h4 className="mb-1">$14,235.12</h4>
                                        <p className="mb-0">6k orders</p>
                                    </div>
                                    <span className="avatar p-2 me-sm-6">
                                        <span className="avatar-initial rounded w-px-44 h-px-44">
                                            <i className="bx bx-gift bx-lg text-heading"></i>
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <p className="mb-1">Affiliate</p>
                                        <h4 className="mb-1">$8,345.23</h4>
                                        <p className="mb-0"><span className="me-2">150 orders</span><span className="badge bg-label-danger">-3.5%</span></p>
                                    </div>
                                    <span className="avatar p-2">
                                        <span className="avatar-initial rounded w-px-44 h-px-44">
                                            <i className="bx bx-wallet bx-lg text-heading"></i>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='card'>
                <div className="card-header">
                    <h5 className="card-title">Filter</h5>
                    <div className="d-flex justify-content-between align-items-center row pt-4 gap-6 gap-md-0 g-md-6">
                    <div className="col-md-4 product_status">
                        <select id="ProductStatus" className="form-select text-capitalize">
                            <option value="">Status</option>
                            <option value="Scheduled">Scheduled</option>
                            <option value="Publish">Publish</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        </div>
                        <div className="col-md-4 product_category">
                            <select id="ProductCategory" className="form-select text-capitalize">
                                <option value="">Category</option>
                                <option value="Household">Household</option>
                                <option value="Office">Office</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Shoes">Shoes</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Game">Game</option>
                            </select>
                        </div>
                        <div className="col-md-4 product_stock">
                            <select id="ProductStock" className="form-select text-capitalize">
                                <option value=""> Stock </option>
                                <option value="Out_of_Stock">Out of Stock</option>
                                <option value="In_Stock">In Stock</option>
                            </select>
                        </div>
                    </div>
                </div>

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
                                            <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" className="form-select">
                                                <option value="7">7</option>
                                                <option value="10">10</option>
                                                <option value="20">20</option>
                                                <option value="50">50</option>
                                                <option value="70">70</option>
                                                <option value="100">100</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className="dt-buttons btn-group flex-wrap d-flex mb-6 mb-sm-0"> 
                                        <div className="btn-group">
                                            <button className="btn btn-secondary buttons-collection dropdown-toggle btn-label-secondary me-4" aria-controls="DataTables_Table_0" type="button" aria-haspopup="dialog" aria-expanded="false">
                                                <span><i className="bx bx-export me-2 bx-xs"></i>Export</span>
                                            </button>
                                        </div> 
                                        <button className="btn btn-secondary add-new btn-primary" aria-controls="DataTables_Table_0" type="button">
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
                                    <th 
                                        className="control sorting_disabled dtr-hidden" 
                                        rowSpan={1}
                                        colSpan={1} 
                                        aria-label=""></th>
                                    <th className="sorting_disabled dt-checkboxes-cell dt-checkboxes-select-all" rowSpan={1} colSpan={1} data-col="1" aria-label="">
                                        <input type="checkbox" className="form-check-input"/>
                                    </th>
                                    <th className="sorting sorting_asc" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1}  aria-label="product: activate to sort column descending" aria-sort="ascending">Tên sản phẩm</th>
                                    <th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} aria-label="category: activate to sort column ascending">Danh mục</th>
                                    <th className="sorting_disabled" rowSpan={1} colSpan={1}  aria-label="stock">Tồn kho</th>
                                    <th className="sorting" aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} aria-label="sku: activate to sort column ascending">sku</th>
                                    <th className="sorting" aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} aria-label="price: activate to sort column ascending">Giá bán</th>
                                    <th className="sorting" aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1}  aria-label="qty: activate to sort column ascending">Số lượng còn lại</th>
                                    <th className="sorting" aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1}  aria-label="status: activate to sort column ascending">Trạng thái</th>
                                    <th className="sorting_disabled" rowSpan={1} colSpan={1} aria-label="Actions">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr className="odd">
                                    <td className="  control" tabIndex={0}></td>
                                    <td className="  dt-checkboxes-cell">
                                        <input type="checkbox" className="dt-checkboxes form-check-input"/>
                                    </td>
                                    <td className="sorting_1">
                                        <div className="d-flex justify-content-start align-items-center product-name">
                                            <div className="avatar-wrapper">
                                                <div className="avatar avatar me-4 rounded-2 bg-label-secondary">
                                                    <img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/ecommerce-images/product-9.png" alt="Product-9" className="rounded"/>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <h6 className="text-nowrap mb-0">Air Jordan</h6>
                                                <small className="text-truncate d-none d-sm-block">Air Jordan is a line of basketball shoes produced by Nike</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span className="text-truncate d-flex align-items-center text-heading"><span className="w-px-30 h-px-30 rounded-circle d-flex justify-content-center align-items-center bg-label-success me-4"><i className="bx bx-walk bx-sm"></i></span>Shoes</span></td>
                                    <td>
                                        <span className="text-truncate">
                                            <label className="switch switch-primary switch-sm">
                                                <input type="checkbox" className="switch-input" id="switch"/>
                                                <span className="switch-toggle-slider">
                                                    <span className="switch-off"></span>
                                                </span>
                                            </label>
                                            <span className="d-none">Out_of_Stock</span>
                                        </span>
                                    </td>
                                    <td><span>31063</span></td>
                                    <td><span>$125</span></td>
                                    <td><span>942</span></td>
                                    <td><span className="badge bg-label-danger" text-capitalized="">Inactive</span></td>
                                    <td>
                                        <div className="d-inline-block text-nowrap">
                                            <button className="btn btn-icon"><i className="bx bx-edit bx-md"></i></button>
                                            <button className="btn btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i className="bx bx-dots-vertical-rounded bx-md"></i></button>
                                            <div className="dropdown-menu dropdown-menu-end m-0">
                                                <a href="javascript:0;" className="dropdown-item">View</a>
                                                <a href="javascript:0;" className="dropdown-item">Suspend</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr> */}
                                <tr className="even">
                                    <td className="control" tabIndex={0}></td>
                                    <td className="dt-checkboxes-cell">
                                        <input type="checkbox" className="dt-checkboxes form-check-input"/>
                                    </td>
                                    <td className="sorting_1">
                                        <div className="d-flex justify-content-start align-items-center product-name">
                                            <div className="avatar-wrapper">
                                                <div className="avatar avatar me-4 rounded-2 bg-label-secondary">
                                                    <img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/ecommerce-images/product-9.png" alt="Product-9" className="rounded"/>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <h6 className="text-nowrap mb-0">Air Jordan</h6>
                                                <small className="text-truncate d-none d-sm-block">Air Jordan is a line of basketball shoes produced by Nike</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="text-truncate d-flex align-items-center text-heading">
                                            <span className="w-px-30 h-px-30 rounded-circle d-flex justify-content-center align-items-center bg-label-danger me-4 p-3">
                                                <i className="bx bx-headphone bx-sm"></i>
                                            </span>Shoes
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-truncate">
                                            <label className="switch switch-primary switch-sm">
                                                <input type="checkbox" className="switch-input" id="switch"/>
                                                <span className="switch-toggle-slider">
                                                    <span className="switch-off"></span>
                                                </span>
                                            </label>
                                            <span className="d-none">Out_of_Stock</span>
                                        </span>
                                    </td>
                                    <td><span>31063</span></td>
                                    <td><span>$125</span></td>
                                    <td><span>942</span></td>
                                    <td><span className="badge bg-label-danger" text-capitalized="">Inactive</span></td>
                                    <td>
                                        <div className="d-inline-block text-nowrap">
                                            <button className="btn btn-icon"><i className='bx bxs-cart-add'></i></button>
                                            <button className="btn btn-icon"><i className="bx bx-edit bx-md"></i></button>
                                            <button className="btn btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i className="bx bx-dots-vertical-rounded bx-md"></i></button>
                                            <div className="dropdown-menu dropdown-menu-end m-0">
                                                <a href="javascript:0;" className="dropdown-item">View</a>
                                                <a href="javascript:0;" className="dropdown-item">Suspend</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <div className="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Displaying 1 to 7 of 100 entries</div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                                    <ul className="pagination">
                                        <li className="paginate_button page-item previous disabled" id="DataTables_Table_0_previous">
                                            <a aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="previous" tabIndex={-1} className="page-link">
                                                <i className="bx bx-chevron-left bx-18px"></i>
                                            </a>
                                        </li>
                                        <li className="paginate_button page-item active">
                                            <a href="#" aria-controls="DataTables_Table_0" role="link" aria-current="page" data-dt-idx="0" tabIndex={0} className="page-link">1</a>
                                        </li>
                                        <li className="paginate_button page-item ">
                                            <a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="1" tabIndex={0} className="page-link">2</a>
                                        </li>
                                        <li className="paginate_button page-item ">
                                            <a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="2" tabIndex={0} className="page-link">3</a>
                                        </li>
                                        <li className="paginate_button page-item ">
                                            <a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="3" tabIndex={0} className="page-link">4</a>
                                        </li>
                                        <li className="paginate_button page-item ">
                                            <a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="4" tabIndex={0} className="page-link">5</a>
                                        </li>
                                        <li className="paginate_button page-item disabled" id="DataTables_Table_0_ellipsis">
                                            <a aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="ellipsis" tabIndex={-1} className="page-link">…</a>
                                        </li>
                                        <li className="paginate_button page-item ">
                                            <a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="14" tabIndex={0} className="page-link">15</a>
                                        </li>
                                        <li className="paginate_button page-item next" id="DataTables_Table_0_next">
                                            <a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="next" tabIndex={0} className="page-link">
                                                <i className="bx bx-chevron-right bx-18px"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                
                </div>
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
