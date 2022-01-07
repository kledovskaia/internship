import { createSlice } from "@reduxjs/toolkit"
import { messageTransformer } from "../../utils/utils"
import thunks from "../thunks/tickets"

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
        const errors = Array.isArray(payload) ? payload : [payload];
        const transformed =  messageTransformer('error', errors)
        state.value.push(...transformed);
      },
    };
  },{})
})
export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;