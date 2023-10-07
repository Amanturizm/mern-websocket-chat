import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { IRegisterResponse, IUserForUsing, IValidationError, TUserRegister } from '../../types';
import { isAxiosError } from 'axios';

export const register = createAsyncThunk<
  IUserForUsing,
  TUserRegister,
  { rejectValue: IValidationError }
>('users/register', async (userRegister, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(userRegister) as (keyof TUserRegister)[];

    keys.forEach((key) => {
      const value = userRegister[key];

      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    const { data } = await axiosApi.post<IUserForUsing>('/users', formData);

    return data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const login = createAsyncThunk<
  IUserForUsing,
  TUserRegister,
  { rejectValue: IValidationError }
>('users/login', async (user, { rejectWithValue }) => {
  try {
    const { data } = await axiosApi.post<IRegisterResponse>('/users/sessions', user);
    return data.user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const logout = createAsyncThunk('users/logout', async () => {
  await axiosApi.delete('/users/sessions');
});
