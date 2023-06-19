import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  id: "",
};

export const receiverSlice = createSlice({
  name: "receiver",
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
