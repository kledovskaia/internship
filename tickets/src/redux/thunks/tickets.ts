import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addTicketFirebase,
  deleteTicketFirebase,
  updateTicketFirebase,
  updateTicketsCountFirebase,
} from '../../firebase/firebase';
import { addMessage } from '../slices/messages';

export const addTicket = createAsyncThunk(
  'ticket/add',
  async (ticket: Partial<TTicket>, { rejectWithValue, dispatch }) => {
    let result;
    try {
      await addTicketFirebase(ticket);
      await updateTicketsCountFirebase(1);
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
  async (ticket: Partial<TTicket>, { rejectWithValue, dispatch }) => {
    let result;
    try {
      await updateTicketFirebase(ticket);
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
      await deleteTicketFirebase(ticket);
      await updateTicketsCountFirebase(-1);
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
