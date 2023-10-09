import { IMessage, IUserForUsing } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  messages: IMessage[];
  onlineUsers: IUserForUsing[];
}

const initialState: State = {
  messages: [],
  onlineUsers: [],
};

const chatSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, { payload }: PayloadAction<IMessage[]>) => {
      state.messages.push(...payload);
    },
    setUsers: (state, { payload }: PayloadAction<IUserForUsing[]>) => {
      state.onlineUsers.push(...payload);
    },
  },
});

export const chatReducer = chatSlice.reducer;
export const { setMessages, setUsers } = chatSlice.actions;