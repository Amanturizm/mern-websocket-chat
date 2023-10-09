import { WebSocket } from 'ws';
import { Types } from 'mongoose';

export interface ActiveConnections {
  [id: string]: WebSocket;
}

export interface IncomingMessage {
  type: string;
  payload: string;
}

export interface IUser {
  username: string;
  password: string;
  token: string;
  role: string;
  displayName?: string | null;
  avatar?: string | null;
}

export type TUserSecure = Omit<IUser, 'password' | 'token'>;

export interface IMessage {
  user: Types.ObjectId;
  text: string;
  datetime: Date,
}