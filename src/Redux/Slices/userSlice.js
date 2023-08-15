import { createSlice } from '@reduxjs/toolkit'
import axios from '../../axiosConfig/axios'

const initialState = {
    user: null,
    isAuthenticate: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload,
                state.isAuthenticate = true
        },
        logout: (state, action) => {
            state.user = null,
                state.isAuthenticate = false
        },
        loadUser: (state, action) => {
            // // // console.log(action.payload)
            state.user = action.payload
            state.isAuthenticate = true
        },

    }
})

export const { login, logout, loadUser } = userSlice.actions;


export const registerAsync = (formData) => async (dispatch) => {
    try {
        let response = await axios.post("/register", formData)
        dispatch(login(response.data))
        // console.log(response);
    }
    catch (err) {
        // console.log(err.response)
    }
}

export const loginAsync = (formData) => async (dispatch) => {
    try {
        // console.log(formData)
        const response = await axios.post("/login", formData)
        dispatch(login(response.data))
        // console.log(response);
    }
    catch (err) {
        // console.log(err.response)
    }
}

export const loadUserAsync = () => async (dispatch) => {
    try {
        let loggedInUser = await axios.get("/getuser");
        // console.log(loggedInUser.data.value)
        if (loggedInUser.data.value) {
            dispatch(loadUser(loggedInUser.data))
        }

    }
    catch (err) {
        // console.log(err.response)
    }
}

export const logOutAsync = () => async (dispatch) => {
    try {
        let logOutUser = await axios.get("/logout")
        dispatch(logout())
    }
    catch (err) {
        // console.log(err.response)
    }
}

export default userSlice.reducer;

