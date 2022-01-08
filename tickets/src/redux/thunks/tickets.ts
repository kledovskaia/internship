import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addTicketFirebase,
  deleteTicketFirebase,
  updateTicketFirebase,
} from '../../firebase/firebase';
import { addMessage } from '../slices/messages';

export const addTicket = createAsyncThunk(
  'ticket/add',
  async (ticket: TTicket, { rejectWithValue, dispatch }) => {
    let result;
    try {
      result = await addTicketFirebase(ticket);
      dispatch(addMessage({
        type: 'success',
        content: 'Added!',
      }));
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
    return result;
  },
);
export const updateTicket = createAsyncThunk(
  'ticket/update',
  async (ticket: TTicket, { rejectWithValue, dispatch }) => {
    let result;
    try {
      result = await updateTicketFirebase(ticket);
      dispatch(addMessage({
        type: 'success',
        content: 'Updated!',
      }));
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
    return result;
  },
);
export const deleteTicket = createAsyncThunk(
  'ticket/delete',
  async (ticket: TTicket, { rejectWithValue, dispatch }) => {
    let result;
    try {
      result = await deleteTicketFirebase(ticket);
      dispatch(addMessage({
        type: 'success',
        content: 'Deleted!',
      }));
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
    return result;
  },
);
