import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import { IMessageForm, IMessageRequest, IncomingMessage } from '../../types';
import { wsUrl } from '../../constants.ts';
import { useAppDispatch, useAppSelector } from '../../app/hook.ts';
import { setMessages } from './messagesSlice.ts';
import Message from './components/Message.tsx';
import MessageForm from './components/MessageForm.tsx';

const Messages = () => {
  const dispatch = useAppDispatch();
  const { messages } = useAppSelector(state => state.messages);
  const { user } = useAppSelector(state => state.users);

  const ws = useRef<WebSocket | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(wsUrl + 'messages');

    if (!ws.current) return;

    ws.current.onclose = () => console.log('ws closed!');

    ws.current.onopen = () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN && !messages.length) {
        ws.current.send(JSON.stringify({
          type: 'GET_MESSAGES',
          payload: '',
        }));
      }
    };

    ws.current.onmessage = (event) => {
      const { type, payload } = JSON.parse(event.data) as IncomingMessage;

      if (type === 'GET_MESSAGES' || type === 'NEW_MESSAGE') {
        dispatch(setMessages(payload));
      }
    };

    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, [ws.current]);

  useEffect(() => {
    if (containerRef.current) {
      const containerElement: HTMLDivElement = containerRef.current;
      containerElement.scrollTop = containerElement.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (message: IMessageForm) => {
    if (!ws.current || !user) return;

    const payload: IMessageRequest = {
      user: user._id,
      text: message.text,
    };

    ws.current.send(JSON.stringify({
      type: 'SET_MESSAGE',
      payload,
    }));
  };

  return (
    <Box
      id="chat-body"
      width={700}
      border={2}
      borderRadius={4}
      paddingX={1.25}
      paddingBottom={1.25}
      display="flex"
      flexDirection="column"
    >
      <Box
        sx={{ height: 500, overflowY: 'auto' }}
        paddingRight={1}
        ref={containerRef}
      >
        {messages.map(message => <Message message={message} key={message._id}/>)}
      </Box>

      <MessageForm onSubmit={sendMessage}/>
    </Box>
  );
};

export default Messages;