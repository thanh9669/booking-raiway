import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EXPENSE_CATEGORY } from '@/types/expense'

interface ExpenseState {
  categories: EXPENSE_CATEGORY[]
}

const initialState: ExpenseState = {
  categories: []
}

export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<EXPENSE_CATEGORY[]>) => {
      state.categories = action.payload
    }
  }
})

export const { setCategories } = expenseSlice.actions
export default expenseSlice.reducer
