import React from 'react';
import { Avatar, Box, Card, Stack, Typography } from '@mui/material';
import { IMessage } from '../../../types';
import { apiUrl } from '../../../constants.ts';
import dayjs from 'dayjs';

interface Props {
  message: IMessage;
}

const colors = ['#FF0000', '#0000FF', '#00FF00', '#FFFF00', '#FFC0CB', '#800080', '#FFA500'];

const Message: React.FC<Props> = ({ message }) => {
  const date = dayjs(message.datetime).format('DD/MM/YYYY HH:mm:ss');
  const timeDifference = -dayjs(message.datetime).diff();

  const daysPassed: number = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursPassed: number = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutesPassed: number = Math.floor(timeDifference / (1000 * 60));
  const secondsPassed: number = Math.floor(timeDifference / 1000);

  const timeResult: string =
    daysPassed > 1 ? date :
      daysPassed === 1 ? 'Вчера' :
        hoursPassed > 0 && hoursPassed < 24 ? `${hoursPassed} часов назад` :
          minutesPassed > 0 && minutesPassed < 60 ? `${minutesPassed} минут назад` :
            secondsPassed < 4 ? 'только что' : `${secondsPassed} секунд назад`;

  const randomColor = (colors: string[]): string => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Card sx={{ overflow: 'visible', mt: 2 }}>
      <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
        {
          message.user.avatar ?
            <Avatar src={apiUrl + message.user.avatar}/>
            : <Avatar/>
        }
        <Stack>
          <Typography
            sx={{ color: randomColor(colors) }}
            fontSize={22}
            fontWeight={700}
          >
            {message.user.displayName}
          </Typography>
          <Typography variant="body2">
            { timeResult }
          </Typography>
        </Stack>
      </Box>
      <hr style={{ margin: 0 }} />
      <Typography sx={{ m: 2 }}>
        {message.text}
      </Typography>
    </Card>
  );
};
export default Message;