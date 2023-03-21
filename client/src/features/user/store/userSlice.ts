import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { IUser, IUserAccount, IUserSlice } from '../models/userModels';

const initialState: IUserSlice = {
  account: null,
  _id: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.account = action.payload.account;
      state._id = action.payload._id;
    },
    setUserAccount: (state, action: PayloadAction<IUserAccount>) => {
      state.account = action.payload;
    },

    resetUserState: (_) => initialState,
  },
});

const userReducer = userSlice.reducer;

export const { setUser, setUserAccount, resetUserState } = userSlice.actions;

export const selectUserId = (state: RootState): string => state.user._id;
export const selectUserAccount = (state: RootState): IUserAccount | null =>
  state.user.account;

export { userReducer };
