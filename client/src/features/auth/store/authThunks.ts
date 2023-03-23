import { Dispatch } from 'react';

import { IAuthResData, setAuthData } from 'features/auth';
import { IUser, resetUserState, setUser } from 'features/user';
import { resetWeb3State } from 'features/web3';
import { persistor } from 'store';
import { resetAuthState } from './authSlice';

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
    dispatch(resetWeb3State());
  };
