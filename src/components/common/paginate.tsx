

import React from 'react'
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react'
import { PAGINATIONS } from '@/types/common'
import {paginate} from '@/helpers/common'

const ComponentPaginate = (props) => {
    const [pageSeting, setPageSeting] = useState<PAGINATIONS>(props?.paginates)
    const [pages, setPages] = useState([])
    const [maxPage, setMaxPage] = useState(0)
    const [pageCurrent, setPageCurrent] = useState(0)
    useEffect(()=> {
        setPageCurrent(pageSeting.offset)
        const maxPage = pageSeting.limit < pageSeting.total ? ((pageSeting.total%pageSeting.limit) ? (Math.floor(pageSeting.total/pageSeting.limit)+1) : (pageSeting.total/pageSeting.limit)):1 
        setMaxPage(maxPage)
        setPages(paginate(maxPage, pageSeting.page_current, pageSeting.limit))
    }, [])
    const chagePage = (page) => {
        setPageCurrent(page-1)
        props.changePage(page-1)
    }
    return (
        <>
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <div className="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Hiển thị {(pageSeting.limit * pageSeting.offset) > 1 ? (pageSeting.limit * pageSeting.offset) + 1 : 1} đến {pageSeting.limit * (pageSeting.offset + 1)} tổng {pageSeting.total} </div>
                </div>
                <div className="col-sm-12 col-md-6">
                    {(pageSeting.limit >= pageSeting.total) ? "" :
                        <div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                            <ul className="pagination">
                                <li className={`paginate_button page-item previous ${pageSeting.page_current <= 1 ? 'disabled':''} `} id="DataTables_Table_0_previous">
                                    <button onClick={() => chagePage(pageSeting.page_current-1)} aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="previous" tabIndex={-1} className="page-link">
                                        <i className="bx bx-chevron-left bx-18px"></i>
                                    </button>
                                </li>
                                {pages.map(item => (
                                    <>
                                        <li className={`paginate_button page-item ${item == '...' ? 'disabled' : ''} ${item == pageSeting.page_current ? 'active' : ''}`}>
                                            <button onClick={() => chagePage(item)} aria-controls="DataTables_Table_0" className="page-link">{item}</button>
                                        </li>
                                    </>
                                ))}

                                <li className={`paginate_button page-item next ${pageSeting.page_current} ${maxPage} ${pageSeting.page_current >= maxPage ? 'disabled':''}`} id="DataTables_Table_0_next">
                                    <button onClick={() => chagePage(pageSeting.page_current+1)} aria-controls="DataTables_Table_0" role="link" data-dt-idx="next" tabIndex={0} className="page-link">
                                        <i className="bx bx-chevron-right bx-18px"></i>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
ComponentPaginate.propTypes = {
    paginates: PropTypes.object.isRequired,
    changePage: PropTypes.func.isRequired,
    // pageCurrent: PropTypes.number.isRequired,
};

export default ComponentPaginate;