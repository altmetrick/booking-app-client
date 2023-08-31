import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PlaceT } from '../../types';
import { axiosInstance } from '../api/axios-instance';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

type InitialStateT = {
  status: 'idle' | 'loading' | 'success' | 'failed';
  places: PlaceT[];
  error: null | Error | string;
};

//ResTypes:
type GetMyPlacesResT = {
  places: PlaceT[];
};

//Thunks:

export const getMyPlaces = createAsyncThunk('myPlaces/getMyPlaces', async (_, thunkApi) => {
  try {
    const { data } = await axiosInstance.get<GetMyPlacesResT>('/places/me');

    return data;
  } catch (err) {
    const error: AxiosError<any> = err as any;
    if (error.response) {
      return thunkApi.rejectWithValue(error.response.data);
    }
    throw err;
  }
});

//add multiple photos
//create place
//update place

const initialState = {
  status: 'idle',
  places: [],
  error: null,
} as InitialStateT;

const myPlacesSlice = createSlice({
  name: 'myPlaces',
  initialState,
  reducers: {
    addNewMyPlace: (state, { payload: { place } }: PayloadAction<{ place: PlaceT }>) => {
      state.places.push(place);
    },
    addUpdatedMyPlace: (state, { payload: { place } }: PayloadAction<{ place: PlaceT }>) => {
      const newPlaces = state.places.filter((myPlace) => myPlace._id !== place._id);
      state.places = [place, ...newPlaces];
    },
  },

  extraReducers: (builder) => {
    builder
      //getMyPlaces
      .addCase(getMyPlaces.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMyPlaces.fulfilled, (state, { payload: { places } }) => {
        state.places = places;
        state.status = 'success';
      })
      .addCase(
        getMyPlaces.rejected,
        (state, { payload }: PayloadAction<{ message: string } | any>) => {
          state.status = 'failed';
          toast.error(payload.message);
        }
      );
  },
});

export const { addNewMyPlace, addUpdatedMyPlace } = myPlacesSlice.actions;

export const myPlacesReducer = myPlacesSlice.reducer;
