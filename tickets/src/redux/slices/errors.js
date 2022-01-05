import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: [],
}

const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setError: (state, action) => {
      if (Array.isArray(action.payload)) state.value.push(...action.payload)
      else state.value.push(action.payload)
    }
  }
})
export const { setError } = errorsSlice.actions;
export default errorsSlice.reducer;