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
type DeleteMyPlaceT = {
  id: string;
  message: string;
};

//Thunks:
export const getMyPlaces = createAsyncThunk('myPlaces/getPlaces', async (_, thunkApi) => {
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

export const deleteMyPlace = createAsyncThunk(
  'myPlaces/DeletePlace',
  async (id: string, thunkApi) => {
    try {
      const { data } = await axiosInstance.delete<DeleteMyPlaceT>(`/places/me/${id}`);
      console.log(data);
      return id;
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
  status: 'idle',
  places: [],
  error: null,
} as InitialStateT;

const myPlacesSlice = createSlice({
  name: 'myPlaces',
  initialState,
  reducers: {
    clearMyPlaces: () => {
      return { ...initialState };
    },
    addMyPlace: (state, { payload: { place } }: PayloadAction<{ place: PlaceT }>) => {
      state.places.unshift(place);
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
      )
      //deletePlace
      .addCase(deleteMyPlace.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteMyPlace.fulfilled, (state, { payload: id }) => {
        state.places = state.places.filter((myPlace) => myPlace._id !== id);
        state.status = 'success';
        toast.success('Place is deleted!');
      })
      .addCase(
        deleteMyPlace.rejected,
        (state, { payload }: PayloadAction<{ message: string } | any>) => {
          state.status = 'failed';
          toast.error(payload.message);
        }
      );
  },
});

export const { addMyPlace, addUpdatedMyPlace, clearMyPlaces } = myPlacesSlice.actions;

export const myPlacesReducer = myPlacesSlice.reducer;
