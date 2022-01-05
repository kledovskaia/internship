import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import user from './slices/user';
import ticket from './slices/ticket';
import ticketCollection from './slices/ticketCollection';
import loading from './slices/loading';
import errors from './slices/errors';

const reducer = combineReducers({
  user,
  ticket,
  ticketCollection,
  loading,
  errors
})

export const store = configureStore({
  reducer,
})
