import { createAsyncThunk } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import {
  addTicketFirebase,
  deleteTicketFirebase,
  updateTicketFirebase,
} from '../../firebase/firebase';
import { addMessage } from '../slices/messages';

export const addTicket = createAsyncThunk(
  'ticket/add',
  async (ticket: Partial<TTicket>, { rejectWithValue, dispatch }) => {
    let result;
    try {
      result = await addTicketFirebase(ticket);
      dispatch(addMessage({
        id: nanoid(),
        type: 'success',
        content: 'Created successfully!',
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
      result = await updateTicketFirebase(ticket);
      dispatch(addMessage({
        id: nanoid(),
        type: 'success',
        content: 'Saved successfully!',
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
  async (ticket: Partial<TTicket>, { rejectWithValue, dispatch }) => {
    let result;
    try {
      await deleteTicketFirebase(ticket);
      const title = ticket.title.length > 25 ? `${ticket.title.slice(0, 25)}...` : ticket.title;
      dispatch(addMessage({
        id: nanoid(),
        type: 'success',
        content: `Ticket "${title}" has been removed!`,
      }));
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
    return result;
  },
);
