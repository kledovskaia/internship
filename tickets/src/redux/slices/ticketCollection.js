import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: null,
}

const ticketCollectionSlice = createSlice({
  name: 'ticketCollection',
  initialState,
  reducers: {
    setTicketCollection: (state, action) => {
      state.value = action.payload;
    }
  }
})
export const { setTicketCollection } = ticketCollectionSlice.actions;
export default ticketCollectionSlice.reducer;