import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { messageTransformer } from '../../utils/utils';
import * as ticketThunks from '../thunks/tickets';

const initialState = {
  value: [] as TMessageTransformed[],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (
      state,
      { payload }: PayloadAction<TMessageTransformed | TMessageTransformed[]>,
    ) => {
      if (Array.isArray(payload)) state.value.push(...payload);
      else state.value.push(payload);
    },
    deleteMessage: (state, { payload }: PayloadAction<TMessageTransformed['id']>) => {
      const targetIndex = state.value.findIndex((item) => item.id === payload);
      if (targetIndex === -1) return;
      state.value.splice(targetIndex, 1);
    },
  },
  extraReducers: (builder) => {
    Object.values(ticketThunks).forEach((thunk) => {
      builder.addCase(thunk.rejected, (
        state,
        { payload },
      ) => {
        const error = messageTransformer('error', payload as TMessage);
        state.value.push(error);
      });
    });
  },
});
export const { addMessage, deleteMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
