import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

const totalSlice = createSlice({
  name: 'total',
  initialState,
  reducers: {
    setTotal: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setTotal } = totalSlice.actions;
export default totalSlice.reducer;
