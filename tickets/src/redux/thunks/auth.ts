import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginFirebase, logoutFirebase } from '../../firebase/firebase';

export const login = createAsyncThunk(
  'login',
  async () => { await loginFirebase(); },
);
export const logout = createAsyncThunk(
  'logout',
  async () => { logoutFirebase(); },
);
