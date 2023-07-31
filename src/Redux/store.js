import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Slices/userSlice'
import  expenseSlice  from './Slices/expenseSlice'


export const store = configureStore({
  reducer: {
    user:userSlice,
    expense:expenseSlice
  }
})