import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../api/axios-instance';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

type UserT = { name: string; email: string };

type InitialAuthStateT = {
  isAuth: boolean;
  userData: UserT | null;
  isLoading: boolean;
  error: null | Error | string;
};

//
//Res Types:
type RegisterResT = { user: UserT; message: string };
type LoginResT = { user: UserT; message: string };
type LogoutResT = { message: string };
type CheckIsLoggedInT = { isLoggedIn: boolean };
type GetUserDataT = { user: UserT };

//Thunk Creators:

export const register = createAsyncThunk(
  'user/Register',
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
  'user/Login',
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
export const logout = createAsyncThunk('user/Logout', async (_, thunkApi) => {
  try {
    const { data } = await axiosInstance.get<LogoutResT>(`/auth/logout`);
    return data;
  } catch (err) {
    const error: AxiosError<any> = err as any;
    if (error.response) {
      return thunkApi.rejectWithValue(error.response.data);
    }
    throw err;
  }
});
export const getUserData = createAsyncThunk('user/GetData', async (_, thunkAPI) => {
  try {
    const { data } = await axiosInstance.get<GetUserDataT>('/user');
    return data;
  } catch (err) {
    const error: AxiosError<any> = err as any;
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    throw err;
  }
});
export const checkIsLoggedIn = createAsyncThunk('user/checkIsLoggedIn', async (_, thunkAPI) => {
  try {
    const { data } = await axiosInstance.get<CheckIsLoggedInT>('/auth/is-logged-in');

    if (data.isLoggedIn === true) {
      thunkAPI.dispatch(getUserData());
    }
    return data;
  } catch (err) {
    const error: AxiosError<any> = err as any;
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
});

const initialState = {
  isAuth: false,
  userData: null,
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
        state.userData = payload.user;
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
        state.userData = payload.user;
        state.isAuth = true;
        state.isLoading = false;
        toast.success(`Hello There ${payload.user.name}!`);
      })
      .addCase(login.rejected, (state, { payload }: PayloadAction<{ message: string } | any>) => {
        state.isLoading = false;
        toast.error(payload.message);
      })
      //Logout
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false;
        state.userData = null;
        //toast.success(payload.message);
      })
      //checkIsLoggedIn
      .addCase(checkIsLoggedIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        checkIsLoggedIn.fulfilled,
        (state, action: PayloadAction<{ isLoggedIn: boolean } | any>) => {
          state.isAuth = action.payload.isLoggedIn;
          state.isLoading = false;
        }
      )
      .addCase(checkIsLoggedIn.rejected, (state) => {
        state.isLoading = false;
      })
      //GetUserData
      .addCase(getUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isLoading = false;
      });
  },
});

export const userReducer = authSlice.reducer;
