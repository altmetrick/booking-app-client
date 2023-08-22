import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../api/axios-instance';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

type UserT = { name: string; email: string };

type InitialAuthStateT = {
  isAuth: boolean;
  userInfo: UserT;
  isLoading: boolean;
  error: null | Error | string;
};

//
//Res Types:
type RegisterResT = { user: UserT; message: string };
type LoginResT = { user: UserT; message: string };

//Thunk Creators:

export const register = createAsyncThunk(
  'auth/Register',
  async (userData: { name: string; email: string; password: string }, thunkApi) => {
    try {
      const { data } = await axiosInstance.post<RegisterResT>(`/auth/register`, userData);
      return data;
    } catch (err) {
      const error: AxiosError<any> = err as any;
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data);
      }
      throw err;
    }
  }
);
export const login = createAsyncThunk(
  'auth/Login',
  async (userData: { email: string; password: string }, thunkApi) => {
    try {
      const { data } = await axiosInstance.post<LoginResT>(`/auth/login`, userData);
      return data;
    } catch (err) {
      const error: AxiosError<any> = err as any;
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data);
      }
      throw err;
    }
  }
);

const initialState = {
  isAuth: false,
  isLoading: false,
  error: null,
} as InitialAuthStateT;

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.userInfo = payload.user;
        state.isAuth = true;
        state.isLoading = false;
        toast.success(`Hello There ${payload.user.name}!`);
      })
      .addCase(
        register.rejected,
        (state, { payload }: PayloadAction<{ message: string } | any>) => {
          state.isLoading = false;
          toast.error(payload.message);
        }
      )
      //Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.userInfo = payload.user;
        state.isAuth = true;
        state.isLoading = false;
        toast.success(`Hello There ${payload.user.name}!`);
      })
      .addCase(login.rejected, (state, { payload }: PayloadAction<{ message: string } | any>) => {
        state.isLoading = false;
        toast.error(payload.message);
      });
  },
});

export const userReducer = authSlice.reducer;
