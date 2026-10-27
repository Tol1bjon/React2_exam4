import { axiosRequest, getToken, removeToken, saveToken } from '@/lib/Tokens'
import type { LoginForm, RegisterForm } from '@/Schema/Scema'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const LoginUser = createAsyncThunk("Data/LoginUser", async(info: LoginForm, { rejectWithValue }) => {
    try {
        const {data} = await axiosRequest.post("/Account/login", info)
        const token = data.data
        saveToken(token)
        console.log(token)
        return token
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.errors?.[0] || "Login failed")
    }
})



export const RegisterUser = createAsyncThunk("Data/RegisterUser", async(info: RegisterForm, { rejectWithValue }) => {
    try {
        const payload = {
            userName: info.userName,
            email: info.email,
            password: info.password,
            confirmPassword: info.password
        }
        const { data } = await axiosRequest.post("/Account/register", payload)
        const token = data.data
        saveToken(token)
        return token
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.errors?.[0] || "Reister failed")
    }
})




export const GoogleAuthUser = createAsyncThunk("Data/GoogleAuthUser", async(credential: any, { rejectWithValue }) => {
    try {
        const { data } = await axiosRequest.post("/Account/google", {credential})
        const token = data.data
        saveToken(token)
        return token
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.errors?.[0] || "Login failed")
    }
})



interface Auth {
    token: string | null,
    loading: boolean,
    error: string | null
}

const initialState: Auth = {
    token: getToken(),
    loading: false,
    error: null
}



export const Redux = createSlice({
    name: "Data",
    initialState,
    reducers:{
        logout: (state) => {
            state.token = null
            state.error = null
            removeToken()
        }
    },
    extraReducers:(builder) => {
        builder.addCase(LoginUser.pending, (state) => {
            state.loading = true
            state.error = null
        }).addCase(LoginUser.fulfilled, (state, action) => {
            state.loading = false
            state.token = action.payload
        }).addCase(LoginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })


        builder.addCase(RegisterUser.pending, (state) => {
            state.loading = true
            state.error = null
        }).addCase(RegisterUser.fulfilled, (state, action) => {
            state.loading = false
            state.token = action.payload
        }).addCase(RegisterUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })


        builder.addCase(GoogleAuthUser.pending, (state) => {
            state.loading = true
            state.error = null
        }).addCase(GoogleAuthUser.fulfilled, (state, action) => {
            state.loading = false
            state.token = action.payload
        }).addCase(GoogleAuthUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })
    }
})

export const { logout } = Redux.actions
export default Redux.reducer