import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  role: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addNewUser: (state, action) => {
      //add values to user
      return {
        ...action.payload,
      };
    },
  },
});

export const { addNewUser } = userSlice.actions;

export default userSlice.reducer;
