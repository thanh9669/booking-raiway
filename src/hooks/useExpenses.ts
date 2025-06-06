import { useState, useEffect } from 'react'
import { store } from '@/stores'
import { setCategories } from '@/stores/expense'
import ModulesApi from '@/api/moduleApi'
import { EXPENSE, EXPENSE_MONTHLY } from '@/types/expense'
import { decryptAES } from '@/helpers/aes'

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<EXPENSE_MONTHLY[]>([])
  const [dailyExpenses, setDailyExpenses] = useState<EXPENSE[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [totalAmount, setTotalAmount] = useState(0)
  
  const { expenseApi } = ModulesApi()

  const fetchExpenses = async () => {
    try {
      setLoading(true)
      const [monthlyResponse, categoriesResponse] = await Promise.all([
        expenseApi.get(),
        expenseApi.getCategory()
      ])
      
      store.dispatch(setCategories(categoriesResponse?.data?.data?.data || []))
      
      setDailyExpenses(monthlyResponse?.data?.daily ? JSON.parse(decryptAES(monthlyResponse?.data?.daily)) : [])
      setTotalAmount(monthlyResponse?.data?.totalAmount || 0)
      const grouped = monthlyResponse?.data?.data?.data.reduce((acc: Record<string, number>, item: EXPENSE) => {
        const dateOnly = item.date.split(' ')[0]
        acc[dateOnly] = (acc[dateOnly] || 0) + item.amount
        return acc
      }, {})
      
      const result = Object.entries(grouped).map(([date, amount]) => ({ 
        date, 
        amount: Number(amount) 
      })) as EXPENSE_MONTHLY[]
      
      setExpenses(result)
    } catch (err) {
      setError('Failed to fetch expenses')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  return {
    expenses,
    dailyExpenses,
    loading,
    error,
    setLoading,
    totalAmount,
    fetchExpenses
  }
}
