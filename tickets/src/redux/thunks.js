import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addTicketFirebase,
  deleteTicketFirebase,
  updateTicketFirebase,
} from '../firebase/firebase';

export const addTicket = createAsyncThunk(
  'ticket/add',
  async (data, { rejectWithValue }) => {
    try {
      return await addTicketFirebase(data);
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);
export const updateTicket = createAsyncThunk(
  'ticket/update',
  async (data, { rejectWithValue }) => {
    try {
      return await updateTicketFirebase(data);
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);
export const deleteTicket = createAsyncThunk(
  'ticket/delete',
  async (id, { rejectWithValue }) => {
    try {
      return await deleteTicketFirebase(id);
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);
