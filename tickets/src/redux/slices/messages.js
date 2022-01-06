import { createSlice } from "@reduxjs/toolkit"
import * as thunks from "../thunks"

const initialState = {
  value: {
    notifications: [],
    errors: [],
  },
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      const entries = Object.entries(action.payload);
      entries.forEach(entry => {
        const [type, value] = entry;
        if (Array.isArray(value)) state.value[type].push(...value)
        else state.value[type].push(value)
      })
    }
  },
  extraReducers: Object.values(thunks).reduce((acc, thunk) => {
    return {
      ...acc,
      [thunk.rejected]: (state, action) => {
        console.log(action.type);
        state.value.errors.push(action.payload)
      },
      // [thunk.fulfilled]: (state, action) => { state.value.notifications.push(action.payload) }
    };
  },{})
})
export const { setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;