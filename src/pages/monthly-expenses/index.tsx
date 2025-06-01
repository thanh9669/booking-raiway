import { useState } from 'react'
import DefaultLayout from '@/layouts/DefaultLayout'
import ExpenseFormModal from '@/components/ExpenseFormModal'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { EXPENSE as Expense, EXPENSE_MONTHLY } from '@/types/expense'
import TableLoading from '@/components/tables/table-loading'
import { useExpenses } from '@/hooks/useExpenses'
import withAuth from '@/middleware/auth.js';
import { formatPrice } from '@/helpers/common'
import Head from 'next/head.js'

const MonthlyExpenses = () => {
  const {
    expenses,
    dailyExpenses,
    loading,
    error,
    setLoading,
    fetchExpenses,
    totalAmount
  } = useExpenses()
  
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null)
  const [showFormModal, setShowFormModal] = useState(false)


  const openDetailModal = (expense: Expense) => {
    setSelectedExpense(expense)
    setShowFormModal(true)
  }

  return (
    <>
     <Head>
        <title>Quản lý chi tiêu</title>
      </Head>
      { loading ? <TableLoading/> : '' } 
      <div className="container-fluid px-4 py-4">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h3 text-gray-800 mb-1">Quản lý chi tiêu</h1>
          </div>
          <Button 
            onClick={() => setShowFormModal(true)}
            className="btn-primary"
          >
            <i className="fas fa-plus me-2"></i>Thêm chi tiêu
          </Button>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-6 mb-3 mb-md-0">
            <Card className="border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                    <i className="fas fa-coins text-primary fs-4"></i>
                  </div>
                  <div>
                    <h3 className="h6 text-muted mb-1">Tổng chi tiêu</h3>
                    <p className="h4 mb-0 text-dark">
                      {totalAmount 
                        ? `${formatPrice(totalAmount?.toString())} VND` 
                        : '0 VND'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-md-6">
            <Card className="border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3">
                    <i className="fas fa-exchange-alt text-success fs-4"></i>
                  </div>
                  <div>
                    <h3 className="h6 text-muted mb-1">Số giao dịch</h3>
                    <p className="h4 mb-0 text-dark">
                      {expenses ? expenses.length : '0'}
                      <span className="text-muted fs-6 ms-2">
                        {expenses ? 
                          `${Math.round(expenses.length / 30 * 10)/10} giao dịch/ngày` : 
                          '0 giao dịch/ngày'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="row">
          {/* Expenses Table */}
          <div className="col-lg-8 mb-4 mb-lg-0">
            <Card className="border-0 shadow-sm">
              <div className="card-header bg-white py-3 border-bottom">
                <h2 className="h5 mb-0">Chi tiết chi tiêu</h2>
              </div>
              <div className="card-body p-0">
                {dailyExpenses ? (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Ngày</th>
                          <th>Danh mục</th>
                          <th className="text-end">Số tiền</th>
                          <th>Mô tả</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {dailyExpenses.map(expense => (
                          <tr key={expense.id}>
                            <td>{expense.date}</td>
                            <td>
                              <span className="badge bg-primary bg-opacity-10 text-white">
                                {expense.category.name}
                              </span>
                            </td>
                            <td className="text-end fw-bold">{Number(expense.amount).toLocaleString()} VND</td>
                            <td className="text-muted">{expense.description}</td>
                            <td className="text-end">
                              <Button 
                                onClick={() => openDetailModal(expense)}
                                variant="text"
                                className="text-primary"
                              >
                                <i className="bx bx-show"></i>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <i className="fas fa-wallet text-muted fa-3x mb-3"></i>
                    <p className="text-muted mb-4">Không có dữ liệu chi tiêu cho tháng này</p>
                    <Button 
                      onClick={() => setShowFormModal(true)}
                      className="btn-primary"
                    >
                      Thêm chi tiêu đầu tiên
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Daily Expense Summary */}
          <div className="col-lg-4">
            <Card className="border-0 shadow-sm">
              <div className="card-header bg-white py-3 border-bottom">
                <h2 className="h5 mb-0">Tổng chi tiêu theo ngày</h2>
              </div>
              <div className="card-body">
                
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Ngày</th>
                        <th className="text-end">Tổng tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      { expenses.map((expense) => (
                        <tr key={expense.date}>
                          <td>{new Date(expense.date).toLocaleDateString()}</td>
                          <td className="text-end">
                            {Number(expense.amount).toLocaleString()} đ
                          </td>
                        </tr>
                      )) }
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Modals */}

        <ExpenseFormModal
          isOpen={showFormModal}
          onClose={() => setShowFormModal(false)}
          onChange={fetchExpenses}
          onLoading={(loading)=> setLoading(loading)}
          defaultData={selectedExpense}
        />
      </div>
    </>
  )
}
MonthlyExpenses.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
export default withAuth(MonthlyExpenses)
