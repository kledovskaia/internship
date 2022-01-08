import { createSlice } from '@reduxjs/toolkit';
import { messageTransformer } from '../../utils/utils';
import * as ticketThunks from '../thunks/tickets';

const initialState = {
  value: [] as TMessageTransformed[],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      if (Array.isArray(payload)) state.value.push(...payload);
      else state.value.push(payload);
    },
  },
  extraReducers: (builder) => {
    Object.values(ticketThunks).forEach((thunk) => {
      builder.addCase(thunk.rejected, (state, { payload }) => {
        const errors = Array.isArray(payload) ? payload : [payload];
        const transformed = messageTransformer('error', errors);
        state.value.push(...transformed);
      });
    });
  },
});
export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
