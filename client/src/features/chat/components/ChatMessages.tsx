import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useAppSelector } from '../../../app/hook.ts';
import ChatMessage from './ChatMessage.tsx';
import ChatMessagesForm from './ChatMessagesForm.tsx';
import { IMessageForm } from '../../../types';

interface Props {
  sendMessage: (message: IMessageForm) => void;
}

const ChatMessages: React.FC<Props> = ({ sendMessage }) => {
  const { messages } = useAppSelector(state => state.chat);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const containerElement: HTMLDivElement = containerRef.current;
      containerElement.scrollTop = containerElement.scrollHeight;
    }
  }, [messages]);

  return (
    <Box
      id="chat-body"
      width={700}
      border={2}
      borderRadius={4}
      borderColor="gray"
      paddingX={1.25}
      paddingBottom={1.25}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box
        sx={{ height: 500, overflowY: 'auto', paddingBottom: 2 }}
        paddingRight={1}
        ref={containerRef}
      >
        {messages.map(message => <ChatMessage message={message} key={message._id}/>)}
      </Box>

      <ChatMessagesForm onSubmit={sendMessage}/>
    </Box>
  );
};

export default ChatMessages;