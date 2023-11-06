import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
};

export const user = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    logout: () => {
    },
  },
});

export const { setUserName, logout } = user.actions;

export default user.reducer;
