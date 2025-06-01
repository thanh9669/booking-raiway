import LayoutDefault from '@/layouts/DefaultLayout'
import Head from 'next/head.js'
import { useState, useEffect } from 'react'
import ModulesApi from '@/api/moduleApi'

import React from 'react'
const Inventory = () => {
    const [loading, setLoading] = useState(false)
    const [inventories, setInventories] = useState([])
    const { inventoryApi } = ModulesApi()
    useEffect(() => {
        fetchData()
      }, [])
    const fetchData = async () => {
        const resp = await inventoryApi.get()
        setInventories(resp?.data.data)
        console.log(inventories);
        setLoading(true)
    }
    return (
   <>
    <Head>
      <title>Quản lý kho</title>
    </Head>
    <div className="row"> 
      <div className="row">
        <div className="col-md-12">
            <div className='card'>
                <div className="card-header">
                    <h5 className="card-title">Filter</h5>
                </div>

                <div className='card-datatable table-responsive'>
                    <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">

                        <table className="datatables-products table dataTable no-footer dtr-column" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info">
                            <thead className="border-top">
                                <tr>
                                    <th aria-label="Actions">Thời gian nhập</th>
                                    <th aria-label="Actions">Người nhập hàng</th>
                                    <th aria-label="Actions">Tổng tiền</th>
                                    <th aria-label="Actions">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventories.map((item) => (
                                    <tr className="even">
                                        <td><span className="badge bg-label-danger" text-capitalized="">{item.created_at}</span></td>
                                        <td><span className="badge bg-label-danger" text-capitalized="">{item.created_at}</span></td>
                                        <td><span className="badge bg-label-danger" text-capitalized="">{item.description}</span></td>
                                        <td>
                                            <div className="d-inline-block text-nowrap">
                                                <button className="btn btn-icon"><i className="bx bx-edit bx-md"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
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

Inventory.getLayout = function getLayout(page) {
  return (
    <LayoutDefault>
      {page}
    </LayoutDefault>
  )
}
export default Inventory;
