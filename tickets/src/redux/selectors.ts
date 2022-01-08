import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export const getUser = (state: RootState) => state.user.value;
// export const getTicket = (state: RootState) => state.ticket.value;
export const getTicketCollection = (state: RootState) => state.ticketCollection.value;
export const getLoading = (state: RootState) => state.loading.value;
export const getMessages = (state: RootState) => state.messages.value;

export const getTicket = (id: TTicket['id']) => createSelector(
  getTicketCollection,
  (state) => state.find((ticket) => ticket.id === id),
);
