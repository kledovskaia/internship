import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import user from './slices/user';
import ticketCollection from './slices/ticketCollection';
import loading from './slices/loading';
import messages from './slices/messages';

const reducer = combineReducers({
  user,
  ticketCollection,
  loading,
  messages,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
