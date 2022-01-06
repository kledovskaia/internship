import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import user from './slices/user';
import ticket from './slices/ticket';
import ticketCollection from './slices/ticketCollection';
import loading from './slices/loading';
import messages from './slices/messages';

const reducer = combineReducers({
  user,
  ticket,
  ticketCollection,
  loading,
  messages
})

export const store = configureStore({
  reducer,
})
