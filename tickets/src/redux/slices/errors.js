import { createSlice } from "@reduxjs/toolkit"

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
  }
})
export const { setErrors } = errorsSlice.actions;
export default errorsSlice.reducer;