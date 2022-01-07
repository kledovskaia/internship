import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addTicketFirebase,
  deleteTicketFirebase,
  updateTicketFirebase,
} from '../../firebase/firebase';
import { addMessage } from '../slices/messages';

const temp = {
  'add': addTicketFirebase,
  'update': updateTicketFirebase,
  'delete': deleteTicketFirebase,
}

export default Object.entries(temp).reduce((thunks, [action, fn]) => {
  return {
    ...thunks,
    [`${action}Ticket`]: createAsyncThunk(
      `ticket/${action}`,
      async (data, { rejectWithValue, dispatch }) => {
        try {
          const result = await fn(data);
          dispatch(addMessage({
            type: 'success',
            content: `${action[0].toUpperCase() + action.slice(1)}ed!`
          }))
          return result;
        } catch (error) {
          console.log(error);
          rejectWithValue(error);
        }
      }
    )
  }
},{})


// export const addTicket = createAsyncThunk(
//   'ticket/add',
//   async (data, { rejectWithValue, dispatch }) => {
//     try {
//       const result = await addTicketFirebase(data);
//       dispatch(addMessage({
//         type: 'success',
//         content: 'Added!'
//       }))
//       return result;
//     } catch (error) {
//       console.log(error);
//       rejectWithValue(error);
//     }
//   }
// );
// export const updateTicket = createAsyncThunk(
//   'ticket/update',
//   async (data, { rejectWithValue, dispatch }) => {
//     try {
//       const result = await updateTicketFirebase(data);
//       dispatch(addMessage({
//         type: 'success',
//         content: 'Updated!'
//       }))
//       return result;
//     } catch (error) {
//       console.log(error);
//       rejectWithValue(error);
//     }
//   }
// );
// export const deleteTicket = createAsyncThunk(
//   'ticket/delete',
//   async (id, { rejectWithValue, dispatch }) => {
//     try {
//       const result = await deleteTicketFirebase(id);
//       dispatch(addMessage({
//         type: 'success',
//         content: 'Deleted!'
//       }))
//       return result;
//     } catch (error) {
//       console.log(error);
//       rejectWithValue(error);
//     }
//   }
// );
