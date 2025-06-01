import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import employerStore from './employer'
import messageStore from './message'

export const store = configureStore({
  reducer: {
    employer: employerStore,
    message: messageStore
  },
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types
export default store