import { IUserForUsing, IValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { login, register } from './usersThunk';

interface State {
  user: IUserForUsing | null;
  registerLoading: boolean;
  registerError: IValidationError | null;
}

const initialState: State = {
  user: null,
  registerLoading: false,
  registerError: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUser: (state: State) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.registerLoading = false;
      state.user = payload;
    });
    builder.addCase(register.rejected, (state, { payload: error }) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });

    builder.addCase(login.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.registerLoading = false;
      state.user = payload;
    });
    builder.addCase(login.rejected, (state, { payload: error }) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });
  },
});

export const usersReducer = usersSlice.reducer;
export const { clearUser } = usersSlice.actions;
