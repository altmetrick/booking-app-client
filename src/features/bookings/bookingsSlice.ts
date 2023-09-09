import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BookingDataT, BookingT, StatusT } from '../../types';
import { axiosInstance } from '../api/axios-instance';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

//ResTypes:
type GetAllBookingsResT = {
  bookings: BookingT[];
};
type CreateBookingResT = {
  booking: BookingT;
  message: string;
};

//Thunks:
export const getAllBookings = createAsyncThunk('bookings/getAllBookings', async (_, thunkApi) => {
  try {
    const { data } = await axiosInstance.get<GetAllBookingsResT>('/bookings');

    return data;
  } catch (err) {
    const error: AxiosError<any> = err as any;
    if (error.response) {
      return thunkApi.rejectWithValue(error.response.data);
    }
    throw err;
  }
});

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookingData: BookingDataT, thunkApi) => {
    try {
      const { data } = await axiosInstance.post<CreateBookingResT>('/bookings', { ...bookingData });

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

type InitialStateT = {
  statusAll: StatusT;
  statusSingle: StatusT;
  bookingEntities: BookingT[];
  error: null | Error | string;
};

const initialState = {
  statusAll: 'idle',
  statusSingle: 'idle',
  bookingEntities: [],
  error: null,
} as InitialStateT;

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setSingleBookingStatus: (
      state,
      { payload: { status } }: PayloadAction<{ status: StatusT }>
    ) => {
      state.statusSingle = status;
    },
  },
  extraReducers: (builder) => {
    builder
      //getAllBookings
      .addCase(getAllBookings.pending, (state) => {
        state.statusAll = 'loading';
      })
      .addCase(getAllBookings.fulfilled, (state, { payload: { bookings } }) => {
        state.bookingEntities = bookings;
        state.statusAll = 'success';
      })
      .addCase(
        getAllBookings.rejected,
        (state, { payload }: PayloadAction<{ message: string } | any>) => {
          state.statusAll = 'failed';
          toast.error(payload.message);
        }
      )
      //CreateBooking
      .addCase(createBooking.pending, (state) => {
        state.statusSingle = 'loading';
      })
      .addCase(createBooking.fulfilled, (state, { payload: { booking } }) => {
        state.bookingEntities.unshift(booking);
        state.statusSingle = 'success';
      })
      .addCase(
        createBooking.rejected,
        (state, { payload }: PayloadAction<{ message: string } | any>) => {
          state.statusSingle = 'failed';
          toast.error(payload.message);
        }
      );
  },
});

export const { setSingleBookingStatus } = bookingsSlice.actions;

export const bookingsReducer = bookingsSlice.reducer;
