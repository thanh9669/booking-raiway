import LayoutDefault from '@/layouts/DefaultLayout'
import Head from 'next/head.js'
import useNews from '@/hooks/news/useNewsList';
import Link from 'next/link';
import TableLoading from '@/components/tables/table-loading';
import Pagination from '@/components/tables/pagination';
import { useEffect } from 'react'

const Index = () => {
  const {
    news,
    loading,
    pagination,
    onPageChange,
    removeItem
  } = useNews();

  const renderStatus = (status, process) => {
    console.log(status)
    if (process === "active") {
      return "badge bg-label-primary"
    }
    if (process === "not_active") {
      return "badge bg-label-danger"
    }
  }

  return (
   <>
   <Head>
      <title>Bài viết</title>
    </Head>
    { loading ? <TableLoading/> : (
      <div> 
        <div className="card">
          <div className="card-datatable table-responsive">
            <div className="table-responsive text-nowrap dt-container">
              <div className="dt-container dt-bootstrap5 dt-empty-footer">
                <div className="row border-bottom mx-0 px-3">
                  <div className="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto px-4 mt-0">
                    <h5 className="card-title mb-0 text-md-start text-center pt-6 pt-md-0">Bài viết</h5>
                  </div>
                  <div className="d-md-flex justify-content-between align-items-center dt-layout-end col-md-auto ms-auto px-4 mt-0 gap-2">
                  <div className="dt-length me-2 mb-6">
                      <label htmlFor="dt-length-0">Show</label>
                      <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" className="form-select" id="dt-length-0">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                    </div>
                    <div className="dt-buttons btn-group flex-wrap mb-0">
                      <Link href={'/news/create'} className="cursor btn create-new btn-primary">
                        <span>
                          <i className="bx bx-plus me-sm-1"></i> 
                          <span className="d-none d-sm-inline-block">Thêm mới</span>
                        </span>
                      </Link>
                    </div>
                  </div>
              </div>
              </div>

              <table className="table dataTable">
                <thead>
                  <tr>
                    <th>Tên bài biết</th>
                    <th>Danh mục</th>
                    <th>Lượt thích</th>
                    <th>Trạng thái</th>
                    <th className="th-action">Hành động</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                {news ? 
                    news.map((item) =>(
                    <tr className="table-default" key={item.id}>
                      <td><strong> { item?.title }</strong></td>
                      <td>{ item?.category.name }</td>
                      <td>{ item?.views }</td>
                      <td>
                        <span className={renderStatus(item?.status, item?.process)}> { item?.status } </span>
                      </td>
                      <td>
                        <Link href={'/news/'+item?.id} className="cursor">
                          <i className="bx bx-edit-alt me-1"></i>        
                        </Link>
                        <span onClick={() => removeItem(item?.id)} className="cursor cursor-pointer">
                          <i className="bx bx-trash-alt me-1"></i>
                        </span>
                      </td>
                    </tr>
                  )) : ''} 
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
          </div>
        </div>
      </div>
    )}
   </>
  )
}

Index.getLayout = function getLayout(page) {
  return (
    <LayoutDefault>
      {page}
    </LayoutDefault>
  )
}
export default Index;