export interface IUser {
  _id: string;
  username: string;
  password: string;
  role: string;
  token: string;
  displayName?: string;
  avatar?: File | null;
}

export interface IUserForUsing extends Omit<IUser, 'password' | 'token'> {
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

export interface IMessage {
  _id: string;
  user: IUserForUsing;
  text: string;
  datetime: Date;
}

export interface IMessageForm {
  text: string;
}

export interface IMessageRequest {
  user: string;
  text: string;
}

export interface IncomingMessage {
  type: string;
  payload: IMessage[];
}