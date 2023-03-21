import { IUser } from 'features/user';

// auth form

export interface ILoginFormData {
  email: string;
  password: string;
}

export interface ISignupFormData extends ILoginFormData {
  name?: string;
}

// api

export interface IAuthReqData {
  name?: string;
  email: string;
  password: string;
}

export interface IAuthResData {
  token: string;
  user: IUser;
}

// redux

export interface IAuthSlice {
  token: string;
}
