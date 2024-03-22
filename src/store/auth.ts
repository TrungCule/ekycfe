import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  role: null,
  id: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.username = action.payload?.username;
      state.role = action.payload?.role?.name;
      state.id = action.payload?.id;
    },
  },
});

export const { setUserName } = authSlice.actions;

export default authSlice.reducer;
