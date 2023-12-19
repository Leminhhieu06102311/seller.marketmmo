import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface stateProduct {
    activeSearchCate: number
}
const initialState : stateProduct = {
    activeSearchCate: 0
}
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        toggleActiveSearchCate: (state, action : PayloadAction<number>) => {
            state.activeSearchCate = action.payload
        }
    }
})
export const { toggleActiveSearchCate} = productSlice.actions
export default productSlice.reducer