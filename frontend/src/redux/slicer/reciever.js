import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  role: "",
};

export const receiverSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addNewReceiver: (state, action) => {
      //add values to user
      return {
        ...action.payload,
      };
    },
  },
});

export const { addNewReceiver } = receiverSlice.actions;

export default receiverSlice.reducer;
