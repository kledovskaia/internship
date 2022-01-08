import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null as TUser | null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
