import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Alert,
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
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { TUserRegister } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { login } from './usersThunk';

const CssContainer = styled(Container)({
  margin: '150px auto',
  padding: '10px',
});

const initialState: TUserRegister = {
  username: '',
  password: '',
};

const Login = () => {
  const dispatch = useAppDispatch();
  const { registerLoading, registerError } = useAppSelector((state) => state.users);

  const navigate = useNavigate();

  const [state, setState] = useState<TUserRegister>(initialState);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(login(state)).unwrap();
      navigate('/');
    } catch {
      // nothing
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
          <LockOpenOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Login
        </Typography>

        {registerError && (
          <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
            {registerError.error}
          </Alert>
        )}

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
              />
            </Grid>
          </Grid>

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
            {registerLoading ? <CircularProgress size={25} /> : 'Sign In'}
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} fontSize="JetBrains Mono" to="/signup" variant="body2">
                Don&apos;t have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </CssContainer>
  );
};
export default Login;
