import { configureStore } from "@reduxjs/toolkit";

//slices
import userSlice from "./slicer/user";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
