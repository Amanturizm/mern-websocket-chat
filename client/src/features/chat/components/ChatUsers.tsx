import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../../app/hook.ts';
import ChatUser from './ChatUser.tsx';

const ChatUsers: React.FC = () => {
  const { onlineUsers } = useAppSelector(state => state.chat);

  return (
    <Box width={600}>
      <Typography variant="h4">
        Online users
      </Typography>
      <Divider />
      <Box paddingY={1}>
        {onlineUsers.map(user => <ChatUser user={user} key={user._id} />)}
      </Box>
    </Box>
  );
};

export default ChatUsers;