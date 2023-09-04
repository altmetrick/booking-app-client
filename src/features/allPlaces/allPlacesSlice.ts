import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PlaceT } from '../../types';
import { axiosInstance } from '../api/axios-instance';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { RootState } from '../../store/store';

type InitialStateT = {
  status: 'idle' | 'loading' | 'success' | 'failed';
  places: PlaceT[];
  error: null | Error | string;
};

//ResTypes:
type GetAllTasksResT = {
  places: PlaceT[];
};

//Thunks:
export const getAllPlaces = createAsyncThunk('allPlaces/getAllPlaces', async (_, thunkApi) => {
  try {
    const { data } = await axiosInstance.get<GetAllTasksResT>('/places/');
    return data;
  } catch (err) {
    const error: AxiosError<any> = err as any;
    if (error.response) {
      return thunkApi.rejectWithValue(error.response.data);
    }
    throw err;
  }
});

const initialState = {
  status: 'idle',
  places: [],
  error: null,
} as InitialStateT;

const allPlacesSlice = createSlice({
  name: 'allPlaces',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //getAllPlaces
      .addCase(getAllPlaces.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllPlaces.fulfilled, (state, { payload: { places } }) => {
        state.places = places;
        state.status = 'success';
      })
      .addCase(
        getAllPlaces.rejected,
        (state, { payload }: PayloadAction<{ message: string } | any>) => {
          state.status = 'failed';
          toast.error(payload.message);
        }
      );
  },
});

//Selectors:
export const selectPlaceById = (placeId: string) => {
  return (state: RootState) => state.allPlaces.places.find((place) => place._id === placeId);
};

export const allPlacesReducer = allPlacesSlice.reducer;
