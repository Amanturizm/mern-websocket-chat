import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import { IncomingMessage } from '../../types';
import { wsUrl } from '../../constants.ts';
import { useAppDispatch, useAppSelector } from '../../app/hook.ts';
import { setMessages } from './messagesSlice.ts';
import Message from './components/Message.tsx';

const Messages = () => {
  const dispatch = useAppDispatch();
  const { messages } = useAppSelector(state => state.messages);

  const ws = useRef<WebSocket | null>(null);

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

  return (
    <Box>
      {
        messages.map(message => <Message message={message} key={message._id} />)
      }
    </Box>
  );
};

export default Messages;