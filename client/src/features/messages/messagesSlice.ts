import { IMessage } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  messages: IMessage[];
  onlineUsers: [];
}

const initialState: State = {
  messages: [],
  onlineUsers: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, { payload }: PayloadAction<IMessage[]>) => {
      state.messages.push(...payload);
    },
  },
});

export const messagesReducer = messagesSlice.reducer;
export const { setMessages } = messagesSlice.actions;