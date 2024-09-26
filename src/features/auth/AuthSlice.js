import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./AuthService";

const initialState = {
    user: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}

export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        try {
            return await authService.register(user)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
        console.log(user)
    }
)

export const Login = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        try {

        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
        console.log(user)
    }
)

export const verifyUser = createAsyncThunk(
    'auth/verifyUser',
    async (user, thunkAPI) => {
        try {

        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
        console.log(user)
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled,
                (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.user = action.payload
                }
            )
            .addCase(register.rejected,
                (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.user = null
                    state.message = action.payload
                }
            )
    }
})

export default authSlice.reducer