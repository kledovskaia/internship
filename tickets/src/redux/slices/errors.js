import { createSlice } from "@reduxjs/toolkit"
import * as thunks from "../thunks"

const initialState = {
  value: [],
}

const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setErrors: (state, action) => {
      state.value.push(...action.payload)
    }
  },
  extraReducers: Object.values(thunks).reduce((acc, thunk) => {
    return {
      ...acc,
      [thunk.rejected]: (state, action) => { state.value.push(action) },
    };
  },{})
})
export const { setErrors } = errorsSlice.actions;
export default errorsSlice.reducer;