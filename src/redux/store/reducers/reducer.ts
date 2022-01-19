import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initialState } from '../../../store/state';

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserName(state, action: PayloadAction<string>) {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
