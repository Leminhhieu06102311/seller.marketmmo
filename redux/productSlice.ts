import { createSlice } from "@reduxjs/toolkit";
interface stateProduct {
    isAddProduct: boolean
}
const initialState : stateProduct = {
    isAddProduct: false
}
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        toggleStatusAddProduct: (state) => {
            state.isAddProduct = !state.isAddProduct
        }
    }
})
export const { toggleStatusAddProduct} = productSlice.actions
export default productSlice.reducer