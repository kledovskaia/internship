import { createAsyncThunk } from "@reduxjs/toolkit"
import { addTicketFirebase, deleteTicketFirebase, getTicketFirebase, updateTicketFirebase } from "../firebase/firebase";
import { getUser } from "./selectors";

export const addTicket = createAsyncThunk(
  'ticket/add',
  async ({ data }, { rejectWithValue, getState }) => {
    try {
      checkAuthentication();
      return await addTicketFirebase(data)
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
)
export const updateTicket = createAsyncThunk(
  'ticket/update',
  async ({ data }, { rejectWithValue, getState }) => {
    try {
      checkAuthentication();
      await checkPermission(data.id, getState);
      return await updateTicketFirebase(data)
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
)
export const deleteTicket = createAsyncThunk(
  'ticket/delete',
  async ({ id }, { rejectWithValue, getState }) => {
    try {
      checkAuthentication();
      await checkPermission(id, getState);
      return await deleteTicketFirebase(id);
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
)
const checkAuthentication = (getState) => {
  const user = getState(getUser());
  if (!user) throw new Error('Please authenticate to perform this action');
}
const checkPermission = async (ticketId, getState) => {
  const user = getState(getUser());
  const ticket = await getTicketFirebase(ticketId);
  if (!ticket) throw new Error('Ticket doesn\'t exist');
  if (user.id !== ticket.author.id) throw new Error('You don\'t have permission to modify this ticket');
}