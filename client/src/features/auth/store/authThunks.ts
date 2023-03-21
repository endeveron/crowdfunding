import { Dispatch } from 'react';

import { persistor } from 'store';
import { resetAuthState } from './authSlice';
import { IUser, resetUserState, setUser } from 'features/user';
import { IAuthResData, setAuthData } from 'features/auth';

interface StoreAuthDataAction {
  payload: string | IUser;
  type: string;
}

export const storeAuthData =
  ({ token, user }: IAuthResData) =>
  (dispatch: Dispatch<StoreAuthDataAction>) => {
    dispatch(setAuthData(token));
    dispatch(setUser(user));
  };

export const clearStore =
  () =>
  async (
    dispatch: Dispatch<{
      payload: undefined;
      type: string;
    }>
  ) => {
    await persistor.purge();
    dispatch(resetAuthState());
    dispatch(resetUserState());
  };
