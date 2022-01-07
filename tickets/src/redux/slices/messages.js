import { createSlice } from "@reduxjs/toolkit"
import * as thunks from "../thunks"

const initialState = {
  value: [],
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      if (Array.isArray(payload)) state.value.push(...payload)
      else state.value.push(payload)
    }
  },
  extraReducers: 
  Object.values(thunks).reduce((acc, thunk) => {
    return {
      ...acc,
      [thunk.rejected]: (state, { payload }) => {
        const transform = error => ({ type: 'error', content: error.message });
        const errors = Array.isArray(payload) ? payload : [payload];
        const formatted =  errors.map(transform);
        state.value.push(...formatted);
      },
    };
  },{})
})
export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;