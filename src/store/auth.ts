import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  role: null,
  id: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.username = action.payload?.user?.login;
      state.role = action.payload?.authorities;
      state.id = action.payload?.user?.id;
    },
  },
});

export const { setUserName } = authSlice.actions;

export default authSlice.reducer;
