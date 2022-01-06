import { createSelector } from "@reduxjs/toolkit";

export const getUser = (state) => state.user.value;
export const getTicket = (state) => state.ticket.value;
export const getTicketCollection = (state) => state.ticketCollection.value;
export const getLoading = (state) => state.loading.value;
export const getErrors = (state) => state.errors.value;