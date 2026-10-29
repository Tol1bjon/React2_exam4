import { configureStore } from "@reduxjs/toolkit";
import { Redux } from "./RTK";

export const Store = configureStore({
    reducer: {
        auth: Redux.reducer
    }
})

export type AppDispatch = typeof Store.dispatch;