import { createSlice } from "@reduxjs/toolkit";
import axios from '../../axiosConfig/axios'

const initialState = {
    expense: null,
    allExpense: [],
    userExpense: [],
}

export const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {
        createExpense: (state, action) => {
            // // // console.log(action.payload)
            state.expense = action.payload
            state.allExpense = [action.payload.data, ...state.allExpense]
            state.error = null

        },
        allUserExpense: (state, action) => {
            state.allExpense = action.payload.expense
            state.error = null
        },
        userExpense: (state, action) => {
            state.userExpense = action.payload
            state.error = null
        },
        editExpense: (state, action) => {

        },
        deleteExpense: (state, action) => {

        }

    }
})

export const { createExpense, allUserExpense, userExpense, editExpense, deleteExpense } = expenseSlice.actions;

export const createExpenseAsync = (ExpenseData) => async (dispatch) => {
    try {
        let response = await axios.post("/createExpense", ExpenseData)
        dispatch(createExpense(response.data))
        // console.log(response);
    }
    catch (err) {
        // console.log(err.response)
    }
}

export const allUserExpenseAsync = () => async (dispatch) => {
    try {
        let response = await axios.get("/allexpense")
        dispatch(allUserExpense(response.data))
        // console.log(response);
    } catch (err) {
        // console.log(err.response)
    }
}

export const userExpenseAsync = () => async (dispatch) => {
    try {
        let response = await axios.get("/userExpense")
        dispatch(userExpense(response.data))
        // console.log(response);
    } catch (err) {
        // console.log(err.response)
    }
}

export const editExpenseAsync = (ExpenseData, id) => async (dispatch) => {
    try {
        let response = await axios.post(`/editExpense/${id}`, ExpenseData)
        dispatch(editExpense(response.data))
        // console.log(response);
        dispatch(allUserExpenseAsync())
    }
    catch (err) {
        // console.log(err.response)
    }
}

export const deleteExpenseAsync = (id) => async (dispatch) => {
    try {
        let response = await axios.get(`/deleteExpense/${id}`)
        dispatch(deleteExpense(response.data))
        // console.log(response);
        dispatch(allUserExpenseAsync())
    }
    catch (err) {
        // console.log(err.response)
    }
}



export default expenseSlice.reducer;