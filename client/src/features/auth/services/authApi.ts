import { api } from 'store/api';
import { IAuthReqData, IAuthResData } from '../models/authModels';
import { Response } from 'common/types/http';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<IAuthResData, IAuthReqData>({
      query: (data) => ({
        url: `auth/login`,
        method: 'POST',
        body: data,
      }),
      transformResponse: (res: Response<IAuthResData>) => res.data,
    }),
    signup: build.mutation<IAuthResData, IAuthReqData>({
      query: (data) => ({
        url: `auth/signup`,
        method: 'POST',
        body: data,
      }),
      transformResponse: (res: Response<IAuthResData>) => res.data,
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
