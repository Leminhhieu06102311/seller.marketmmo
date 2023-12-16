import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUser } from "@/services/user";
import Cookies from "js-cookie";

interface UserState {
  name: string;
  id: string;
  access_token: string;
  isLoggedIn: boolean;
  roleType: string;
}

export const initialState: UserState = {
  name: "",
  id: "",
  access_token: "",
  isLoggedIn: false,
  roleType: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setRoleType: (state, action: PayloadAction<string>) => {
      state.roleType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.id = action.payload._id;
      state.name = action.payload.name;
      state.isLoggedIn = true;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      console.log("reject");
    });
  },
});

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (access_token: string, thunkAPI) => {
    const response: any = await getUser(access_token);
    return response;
  }
);

export const { setLoggedIn, setRoleType } = userSlice.actions;
export default userSlice.reducer;