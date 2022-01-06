import { createSlice } from "@reduxjs/toolkit"
import * as thunks from "../thunks";

const initialState = {
  value: false,
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.value = action.payload;
    }
  },
  extraReducers: Object.values(thunks).reduce((acc, thunk) => {
    return {
      ...acc, 
      [thunk.pending]: (state) => { state.value = true },
      [thunk.fulfilled]: (state) => { state.value = false },
      [thunk.rejected]: (state) => { state.value = false },
    };
  },{})
})
export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;