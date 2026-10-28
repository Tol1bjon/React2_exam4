import { axiosRequest, getToken, GetUser, removeToken, saveToken } from '@/lib/Tokens'
import type { AccountForm, LoginForm, RegisterForm } from '@/Schema/Scema'
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




export const GoogleAuthUser = createAsyncThunk("Data/GoogleAuthUser", async(info: any, { rejectWithValue }) => {
    try {
        const { data } = await axiosRequest.post("/Account/google", {credential: info})
        const token = data.data
        saveToken(token)
        return token
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.errors?.[0] || "Login failed")
    }
})




export const EditProfil = createAsyncThunk("Data/EditProfile", async(update: AccountForm, { rejectWithValue }) => {
    try {
        const payload: any = { ...update }
        if (!payload.currentPassword) delete payload.currentPassword
        if (!payload.newPassword) delete payload.newPassword
        delete payload.confirmNewPassword
        
        const {data} = await axiosRequest.put("/UserProfile/update-user-profile", payload)
        return data.data
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.errors?.[0] || "failed to update profile")
    }
})



export const GetCategories = createAsyncThunk("Data/GetCategories", async(_, {rejectWithValue}) => {
    try{
        const {data} = await axiosRequest.get("/Category/get-categories")
        return data.data
    }catch (error: any){
        return rejectWithValue(error.response?.data?.errors?.[0] || "failed to get categories")
    }
})



export const GetProducts = createAsyncThunk("Data/GetProducts", async(_, {rejectWithValue}) => {
    try{
        const {data} = await axiosRequest.get("/Product/get-products")
        return data.data?.products
    }catch (error: any){
        return rejectWithValue(error.response?.data?.errors?.[0] || "failed to get products")
    }
})



interface Auth {
    token: string | null,
    user: any,
    loading: boolean,
    error: string | null,
    categories: any[],
    products: any[]
}

const initialState: Auth = {
    token: getToken(),
    user: GetUser(),
    loading: false,
    error: null,
    categories: [],
    products: []
}



export const Redux = createSlice({
    name: "Data",
    initialState,
    reducers:{
        logout: (state) => {
            state.token = null
            state.error = null
            state.user = null
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
            state.user = GetUser()
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
            state.user = GetUser()
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
            state.user = GetUser()
        }).addCase(GoogleAuthUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })


        builder.addCase(EditProfil.pending, (state) => {
            state.loading = true
            state.error = null
        }).addCase(EditProfil.fulfilled, (state, action) => {
            state.loading = false
            state.user = { ...state.user, ...action.payload }
        }).addCase(EditProfil.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })



        builder.addCase(GetCategories.pending, (state) => {
            state.loading = true
            state.error = null
        }).addCase(GetCategories.fulfilled, (state, action) => {
            state.loading = false
            state.categories = action.payload
        }).addCase(GetCategories.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })



        builder.addCase(GetProducts.pending, (state) => {
            state.loading = true
            state.error = null
        }).addCase(GetProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
        }).addCase(GetProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })
    }
})

export const { logout } = Redux.actions
export default Redux.reducer