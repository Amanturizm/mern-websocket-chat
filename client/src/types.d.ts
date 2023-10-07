export interface IUser {
  _id: string;
  username: string;
  password: string;
  role: string;
  token: string;
  displayName?: string;
  avatar?: File | null;
}

export interface IUserForUsing extends IUser {
  avatar: string | null;
}

export type TUserRegister = Omit<IUser, '_id' | 'token' | 'role'>;

export interface IRegisterResponse {
  user: IUserForUsing;
  message: string;
}

export interface IValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  error: string;
  message: string;
  name: string;
  _message: string;
}