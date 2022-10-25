import { createSlice } from "@reduxjs/toolkit";

const initialState = null;
export const ADMIN = "Admin";
export const TEACHER = "Teacher";

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
    logOutUser: (state) => null,
  },
});

// Action creators are generated for each case reducer function
export const { setUser, logOutUser } = userSlice.actions;

export default userSlice.reducer;
