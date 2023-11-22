
import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userSlice";
import modalSlice from "./modalSlice";
import productSlice from "./productSlice";

export const store = configureStore({
    reducer: {
       user: userSlice,
       modal: modalSlice,
       product: productSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;