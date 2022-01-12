import { createSlice } from '@reduxjs/toolkit';
import { getFromLocalStorage } from '../../utils/utils';

const user = getFromLocalStorage('tickets-user');

const initialState = {
  value: user as TUser | null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
