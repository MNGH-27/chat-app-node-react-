import { configureStore } from "@reduxjs/toolkit";

//slices
import userSlice from "./slicer/user";
import receiverSlice from "./slicer/reciever";
export const store = configureStore({
  reducer: {
    user: userSlice,
    receiver: receiverSlice,
  },
});
