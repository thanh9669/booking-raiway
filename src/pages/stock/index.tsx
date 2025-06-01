import LayoutDefault from '@/layouts/DefaultLayout'
import Head from 'next/head.js'
import { useState, useEffect } from 'react'
import ModulesApi from '@/api/moduleApi'
import Link from 'next/link'
import React from 'react'
import TableLoading from '@/components/tables/table-loading'
import {RESULT_LIST_STOCK} from '@/types/product'
import ComponentPaginate from '@/components/common/paginate'

const Inventory = () => {
    const [loading, setLoading] = useState(false)
    const [inventories, setInventories] = useState([])
    const [pagesSetting, setPagesSetting] = useState([])
    const { stockApi } = ModulesApi()
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async (os = 0) => {
        const resp = await stockApi.get({offset: os})
        setInventories(resp?.data?.data ?? [])
        setPagesSetting({...resp?.data, page_current: os+1})
        setLoading(true)
    }
    const changePage = (current) => {
        setLoading(false)
        console.log(current);
        fetchData(current)
    }
    return (
   <>
    <Head>
      <title>Quản lý kho</title>
    </Head>
    { !loading ? <TableLoading/> : (
    <div className="row"> 
      <div className="row">
        <div className="col-md-12">
            <div className='card'>
                <div className="card-header flex-column flex-md-row">
                    <div className="head-label text-center">
                        <h5 className="card-title mb-0">Danh sách nhập kho</h5>
                    </div>
                    <div className="dt-action-buttons text-end pt-3 pt-md-0">
                        <div className="dt-buttons btn-group flex-wrap"> 
                            <Link href={'/stock/create'} className="cursor btn btn-secondary create-new btn-primary">
                                <span>
                                <i className="bx bx-plus me-sm-1"></i> 
                                <span className="d-none d-sm-inline-block">Thêm mới</span>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='card-datatable table-responsive'>
                    <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">

                        <table className="datatables-products table dataTable no-footer dtr-column" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info">
                            <thead className="border-top">
                                <tr>
                                    <th aria-label="Actions">ID</th>
                                    <th aria-label="Actions">Thời gian nhập</th>
                                    <th aria-label="Actions">Người nhập hàng</th>
                                    <th aria-label="Actions">Tổng tiền</th>
                                    <th aria-label="Actions">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventories.map((item) => (
                                    <tr className="even">
                                        <td><span className="badge bg-label-danger" text-capitalized="">{item.id}</span></td>
                                        <td><span className="badge bg-label-danger" text-capitalized="">{item.created_at}</span></td>
                                        <td><span className="badge bg-label-danger" text-capitalized="">{item.user.name}</span></td>
                                        <td><span className="badge bg-label-danger" text-capitalized="">{item.total_amount_text}</span></td>
                                        <td>
                                            <div className="d-inline-block text-nowrap">
                                                <button className="btn btn-icon"><i className="bx bx-edit bx-md"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <ComponentPaginate paginates={pagesSetting} changePage={changePage}/>
                      
                    </div>
                
                </div>
            </div>
        </div>
      </div>
    </div>
    )}
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
