import LayoutDefault from '@/layouts/DefaultLayout';
import Head from 'next/head.js';
import { useState, useEffect } from 'react'
import React from 'react'
import ModulesApi from '@/api/moduleApi'
import {formatPrice } from '@/helpers/common'
import ComponentModal from '@/components/common/modal'
import ExpenseForm from '@/components/expense/_form'
import ExpenseCategoryForm from '@/components/expense_category/_form'
import TableLoading from '@/components/tables/table-loading'
import {BUDGET} from '@/types/budget'

const Home = () => {
  const [loading, setLoading] = useState(true)
  const { expenseApi, budgetApi } = ModulesApi()
  const [isHydrated, setIsHydrated] = useState(false);
  const [expense, setExpense] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [budget, setBudget] = useState<BUDGET>();
  const [isShow, setIsShow] = useState(false);
  const [isShowCategory, setIsShowCategory] = useState(false);
  const [submit, setSubmit] = useState(false);
  const fetchData = async () => {
    try {
      const [expenseRes, budgetRes, categoriesRes] = await Promise.all([
        expenseApi.getDay(),
        budgetApi.get({limit: 1}),
        expenseApi.getCategory({limit: 1000}),
      ]);
      setExpense(expenseRes?.data?.data ?? [])
      setExpenseCategories(categoriesRes?.data?.data ?? [])
      setBudget(budgetRes?.data?.data ? budgetRes?.data?.data[0] : {})
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      fetchData();
    }
  }, [isHydrated]);

  const getCategory = async (result) => {
    if (result) {
      const categoriesRes = await expenseApi.getCategory({limit: 1000})
      setExpenseCategories(categoriesRes?.data?.data ?? [])
      setIsShowCategory(false)
    }
    setSubmit(false)
    setLoading(false)
  }
  const getExpense = async (result) => {
    if (result) {
      const expenseRes = await expenseApi.getDay()
      setExpense(expenseRes?.data?.data ?? [])
      setIsShow(false)
    }
    setSubmit(false)
    setLoading(false)
  }
  const setSubmitModal = async (result) => {
    setLoading(true)
    setSubmit(true)
  }
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      { loading ? <TableLoading/> : '' } 
      <div className='row'>
        <div className="col-12 col-xxl-8 mb-6">
          <div className="card mb-6">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="card-title m-0 me-2">Thanh toán ngày hôm nay</h5>
              <div className="dropdown">
               <button onClick={() => setIsShow(true)} className="btn btn-sm btn-primary mb-1">Thanh toán</button>
              </div>
            </div>
            <div className="card-body">
              <table className="table table-sm text-nowrap table-border-top-0">
                <thead>
                  <tr>
                    <th>Ghi chú</th>
                    <th>Danh mục</th>
                    <th>Thời gian thanh toán</th>
                    <th>Số tiền</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  {expense.map((item) => (
                    <tr>
                        <td>{item.note}</td>
                        <td>
                          {item.category.name}
                        </td>
                        <td>
                          <div className="text-body"><span className="text-primary fw-medium">{item.date}</span></div>
                        </td>
                        <td><span className="badge bg-label-primary">{item.amount_text}</span></td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="card-title m-0 me-2">Danh mục phải thanh toán</h5>
              <div className="dropdown">
               <button onClick={() => setIsShowCategory(true)} className="btn btn-sm btn-primary mb-1">Tạo danh mục</button>
              </div>
            </div>
            <div className="card-body">
              <table className="table table-sm text-nowrap table-border-top-0">
                <thead>
                  <tr>
                    <th>Danh mục</th>
                    <th>Icon</th>
                    <th>Ngày tạo</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  {expenseCategories.map((item) => (
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.icon}</td>
                        <td><div className="text-body"><span className="text-primary fw-medium">{item.created_at}</span></div></td>
                        <td><span className="badge bg-label-primary">{item.is_default}</span></td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-12 col-xxl-4 mb-6">
          <div className='card'>
            <div className="card-body">
              <div className="card-title d-flex align-items-start justify-content-between mb-4">
                <div className="avatar flex-shrink-0">
                  <img src="/img/icons/unicons/paypal.png" alt="paypal" className="rounded"/>
                </div>
              </div>
              <p className="mb-1">Payments</p>
              <h4 className="card-title mb-3">{budget?.amount_text}</h4>
              <small className="text-danger fw-medium"><i className="icon-base bx bx-down-arrow-alt"></i> -14.82%</small>
            </div>
          </div>
        </div>
      </div>
      {isShow ?
        <ComponentModal show={isShow} setShowModal={()=>setIsShow(false)}
            footer={<>
              <button onClick={() => setIsShow(false)} type="button" className="btn btn-label-secondary" data-bs-dismiss="modal">Huỷ</button>
              <button disabled={expenseCategories.length<=0} onClick={() => setSubmitModal(true)} type="button" className="btn btn-primary">Xác nhận</button>
          </>}
        >
          <ExpenseForm categories={expenseCategories} submit={submit} actionSubmit={(result) => getExpense(result)}/>
        </ComponentModal>
        : ""
      }
      {isShowCategory ?
        <ComponentModal show={isShowCategory} setShowModal={()=>setIsShowCategory(false)}
            footer={<>
              <button onClick={() => setIsShowCategory(false)} type="button" className="btn btn-label-secondary" data-bs-dismiss="modal">Huỷ</button>
              <button onClick={() => setSubmitModal(true)} type="button" className="btn btn-primary">Xác nhận</button>
          </>}
        >
          <ExpenseCategoryForm categories={expenseCategories} submit={submit} actionSubmit={(result) => getCategory(result)}/>
        </ComponentModal>
        : ""
      }
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default Home;
