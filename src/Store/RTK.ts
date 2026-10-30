import { axiosRequest, getToken, GetUser, removeToken, saveToken } from '@/lib/Tokens'
import type { AccountForm, LoginForm, RegisterForm } from '@/Schema/Scema'
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'


export const LoginUser = createAsyncThunk("Data/LoginUser", async(info: LoginForm) => {
    try {
        const {data} = await axiosRequest.post("/Account/login", info)
        const token = data.data
        saveToken(token)
        console.log(token)
        return token
    } catch (error: any) {
        console.log(error)
    }
})



export const RegisterUser = createAsyncThunk("Data/RegisterUser", async(info: RegisterForm) => {
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
        console.log(error)
    }
})




export const GoogleAuthUser = createAsyncThunk("Data/GoogleAuthUser", async(info: any) => {
    try {
        const { data } = await axiosRequest.post("/Account/google", {credential: info})
        const token = data.data
        saveToken(token)
        return token
    } catch (error: any) {
        console.log(error)
    }
})




export const EditProfil = createAsyncThunk("Data/EditProfile", async(update: AccountForm) => {
    try {
        const payload: any = { ...update }
        if (!payload.currentPassword) delete payload.currentPassword
        if (!payload.newPassword) delete payload.newPassword
        delete payload.confirmNewPassword
        
        const {data} = await axiosRequest.put("/UserProfile/update-user-profile", payload)
        return data.data
    } catch (error: any) {
        console.log(error)
    }
})



export const GetCategories = createAsyncThunk("Data/GetCategories", async() => {
    try{
        const {data} = await axiosRequest.get("/Category/get-categories")
        return data.data
    }catch (error: any){
        console.log(error)
    }
})



export const GetProducts = createAsyncThunk("Data/GetProducts", async() => {
    try{
        const {data} = await axiosRequest.get("/Product/get-products")
        return data.data?.products
    }catch (error: any){
        console.log(error)
    }
})



interface CartUser {
    productId: number,
    quantity: number
}



interface Auth {
    token: string | null,
    user: any,
    loading: boolean,
    error: string | null,
    categories: any[],
    products: any[],
    like: number[],
    cart: CartUser[]
}

const initialState: Auth = {
    token: getToken(),
    user: GetUser(),
    loading: false,
    error: null,
    categories: [],
    products: [],
    like: [],
    cart: []
}



export const Redux = createSlice({
    name: "Data",
    initialState,
    reducers:{
        logout: (state) => {
            state.token = null
            state.error = null
            state.user = null
            state.like = []
            removeToken()
        },

        toggleLike: (state, action) => {
            const id = action.payload

            if(state.like.includes(id)){
                state.like = state.like.filter((item) => item !== id)
            } else {
                state.like.push(id)
            }
        },

        setLike: (state, action) => {
            state.like =  action.payload
        },

        addToCart: (state, action: PayloadAction<number | CartUser>) => {
            const { productId, quantity } = typeof action.payload === 'number' ? { productId: action.payload, quantity: 1 } : action.payload;
        
            const product = state.cart.find((item) => item.productId === productId);
        
            if (product) {
                product.quantity += quantity;
            } else {
                state.cart.push({ productId, quantity });
            }
        },

        removeCart: (state, action) => {
            state.cart = state.cart.filter((user) => user.productId != action.payload)
        },

        clearCart: (state) => {
            state.cart = []
        },

        quanitityCart: (state, action) => {
            const { productId, quanitity } = action.payload
            if(quanitity <= 0){
                state.cart = state.cart.filter((user) => user.productId != productId)
                return
            }
            const product = state.cart.find((user) => user.productId == productId)
            if(product){
                product.quantity = quanitity
            }
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

export const { logout, toggleLike, setLike, addToCart, removeCart, clearCart, quanitityCart } = Redux.actions
export default Redux.reducer