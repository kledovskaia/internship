import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { addMessage } from '../slices/messages';
import { loginFirebase, logoutFirebase } from '../../firebase/firebase';

export const login = createAsyncThunk(
  'login',
  async (_, { dispatch }) => {
    await loginFirebase();
    dispatch(addMessage({
      type: 'success',
      id: nanoid(),
      content: 'Logged in',
    }));
  },
);
export const logout = createAsyncThunk(
  'logout',
  async (_, { dispatch }) => {
    logoutFirebase();
    dispatch(addMessage({
      type: 'success',
      id: nanoid(),
      content: 'Logged out',
    }));
  },
);
