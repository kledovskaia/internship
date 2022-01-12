import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [] as TTicket[],
};

const dashboardTicketsSlice = createSlice({
  name: 'dashboardTickets',
  initialState,
  reducers: {
    setDashboardTickets: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setDashboardTickets } = dashboardTicketsSlice.actions;
export default dashboardTicketsSlice.reducer;
