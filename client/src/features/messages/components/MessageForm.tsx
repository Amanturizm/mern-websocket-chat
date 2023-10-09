import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { IMessageForm } from '../../../types';

interface Props {
  onSubmit: (message: IMessageForm) => void;
}

const initialState: IMessageForm = {
  text: '',
};

const MessageForm: React.FC<Props> = ({ onSubmit }) => {
  const [state, setState] = useState<IMessageForm>(initialState);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const sendData = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(state);
    setState(initialState);
  };

  return (
    <Box component="form"
         onSubmit={sendData}
         display="flex"
         gap={1}
         paddingRight={2}
    >
      <TextField
        required
        placeholder="Message"
        inputProps={{ style: { color: 'white' } }}
        sx={{ '& fieldset': { borderRadius: 2 }, width: '100%' }}
        name="text"
        value={state.text}
        onChange={changeValue}
      />

      <Button type="submit"
              variant="contained"
              sx={{
                ':disabled': {
                  pointerEvents: 'auto',
                  cursor: 'not-allowed',
                },
                height: 55
              }}
      >
        <SendIcon />
      </Button>
    </Box>
  );
};

export default MessageForm;