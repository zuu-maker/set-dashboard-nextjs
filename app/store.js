import { configureStore } from "@reduxjs/toolkit";

//reducers
import userSlice from "../features/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
