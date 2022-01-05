import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: null,
}

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    setTicket: (state, action) => {
      state.value = action.payload;
    }
  }
})
export const { setTicket } = ticketSlice.actions;
export default ticketSlice.reducer;