import { createAsyncThunk } from "@reduxjs/toolkit"
import { addTicketFirebase, deleteTicketFirebase, getTicketFirebase, updateTicketFirebase } from "../firebase/firebase";
import { getUser } from "./selectors";

export const addTicket = createAsyncThunk(
  'ticket/add',
  async (data, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const user = state.user.value;
      checkAuthentication(user);
      return await addTicketFirebase(data, user)
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
)
export const updateTicket = createAsyncThunk(
  'ticket/update',
  async (data, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const user = state.user.value;
      checkAuthentication(user);
      await checkExistanceAndPermission(data.id, user);
      return await updateTicketFirebase(data)
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
)
export const deleteTicket = createAsyncThunk(
  'ticket/delete',
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const user = state.user.value;
      checkAuthentication(user);
      await checkExistanceAndPermission(id, user);
      return await deleteTicketFirebase(id);
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
)
const checkAuthentication = (user) => {
  if (!user) throw new Error('Please authenticate to perform this action');
}
const checkExistanceAndPermission = async (ticketId, user) => {
  const ticket = await getTicketFirebase(ticketId);
  if (user.id !== ticket.author.id) throw new Error('You don\'t have permission to modify this ticket');
}