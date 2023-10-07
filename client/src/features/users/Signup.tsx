import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Link,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { TUserRegister } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { register } from './usersThunk';
import FileInput from '../../components/UI/FileInput';

const CssContainer = styled(Container)({
  margin: '150px auto',
  padding: '10px',
});

const initialState: TUserRegister = {
  username: '',
  displayName: '',
  avatar: null,
  password: '',
};

const SignUp = () => {
  const dispatch = useAppDispatch();
  const { registerLoading, registerError } = useAppSelector((state) => state.users);

  const navigate = useNavigate();

  const [state, setState] = useState<TUserRegister>(initialState);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const changeFileValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(register(state)).unwrap();
      navigate('/');
    } catch {
      // nothing
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return registerError?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <CssContainer maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <Box component="form" onSubmit={sendData} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                sx={{ width: '100%' }}
                required
                label="Username"
                name="username"
                value={state.username}
                onChange={changeValue}
                autoComplete="new-username"
                error={Boolean(getFieldError('username'))}
                helperText={getFieldError('username')}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                sx={{ width: '100%' }}
                label="Display name"
                name="displayName"
                value={state.displayName}
                onChange={changeValue}
                autoComplete="new-displayName"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                sx={{ width: '100%' }}
                required
                name="password"
                label="Password"
                type="password"
                value={state.password}
                onChange={changeValue}
                autoComplete="new-password"
                error={Boolean(getFieldError('password'))}
                helperText={getFieldError('password')}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} display="flex" alignItems="center" gap={3}>
            <FileInput name="image" onChange={changeFileValue} image={state.avatar} />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                ':disabled': {
                  pointerEvents: 'auto',
                  cursor: 'not-allowed',
                },
              }}
              disabled={registerLoading}
            >
              {registerLoading ? <CircularProgress size={25} /> : 'Sign Up'}
            </Button>
          </Grid>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} fontSize="JetBrains Mono" to="/login" variant="body2">
                Already have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </CssContainer>
  );
};
export default SignUp;
