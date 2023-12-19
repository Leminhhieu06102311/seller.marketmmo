import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface modalState {
  name: string[]
}
const initialState: modalState = {
  name: [],
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<string>) => {
      state.name = [...state.name, action.payload]
    },
    hideModal: (state, action : PayloadAction<string>) => {
        state.name = state.name.filter((item) => item !== action.payload)
    }
  },
});
export const { showModal,hideModal } = modalSlice.actions;
export default modalSlice.reducer;
