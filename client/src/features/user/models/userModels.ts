// redux slice

export interface IUserAccount {
  email: string;
  username: string;
  name?: string;
  imageSrc?: string;
  avatarImg?: File;
}

export interface IUser {
  _id: string;
  account: IUserAccount;
}

export interface IUserSlice {
  _id: string;
  account: IUserAccount | null;
}

// api

export interface IUpdateUserAccountReq {
  accountFormData: FormData;
  userId: string;
}
