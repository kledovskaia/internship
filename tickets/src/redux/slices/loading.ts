import { createSlice } from '@reduxjs/toolkit';
import * as ticketThunks from '../thunks/tickets';
import * as authThunks from '../thunks/auth';

const initialState = {
  value: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    Object.values({ ...ticketThunks, ...authThunks }).forEach((thunk) => {
      builder.addCase(thunk.pending, (state) => {
        state.value = true;
      });
      builder.addCase(thunk.rejected, (state) => {
        state.value = false;
      });
      builder.addCase(thunk.fulfilled, (state) => {
        state.value = false;
      });
    });
  },
});
export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
