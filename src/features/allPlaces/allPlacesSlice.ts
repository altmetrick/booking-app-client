import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetAllPlacesFiltersT, PlaceT } from '../../types';
import { axiosInstance } from '../api/axios-instance';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { RootState } from '../../store/store';

type InitialStateT = {
  status: 'idle' | 'loading' | 'success' | 'failed';
  filters: GetAllPlacesFiltersT;
  places: PlaceT[];
  error: null | Error | string;
};

//ResTypes:
type GetAllTasksResT = {
  places: PlaceT[];
};
type GetOneTaskResT = {
  place: PlaceT;
};

//Thunks:
export const getAllPlaces = createAsyncThunk('allPlaces/getAllPlaces', async (_, thunkApi) => {
  // const state = thunkApi.getState();
  // const filters = state.allPlaces.filters;

  let query = '';

  // for (const filterName in filters) {
  //   const value = filters[filterName];

  //   //@ts-ignore
  //   if (filters[filterName] !== '') {
  //     query += `${filterName}=${value}&`;
  //   }
  // }

  try {
    const { data } = await axiosInstance.get<GetAllTasksResT>(`/places/?page=1&limit=20&${query}`);
    return data;
  } catch (err) {
    const error: AxiosError<any> = err as any;
    if (error.response) {
      return thunkApi.rejectWithValue(error.response.data);
    }
    throw err;
  }
});

export const getOnePlace = createAsyncThunk(
  'allPlaces/getOnePlace',
  async (placeId: string, thunkApi) => {
    try {
      const { data } = await axiosInstance.get<GetOneTaskResT>(`/places/${placeId}`);
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
  status: 'idle',
  filters: {
    address: '',
    'price[lt]': 0,
    'price[gt]': 9999,
    maxGuests: 1,
    sort: '',
  },
  places: [],
  error: null,
} as InitialStateT;

const allPlacesSlice = createSlice({
  name: 'allPlaces',
  initialState,
  reducers: {
    filterChange: (
      state,
      { payload: { name, value } }: PayloadAction<{ name: string; value: string | number }>
    ) => {
      //@ts-ignore
      state.filters[name] = value;
    },
  },
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

export const { filterChange } = allPlacesSlice.actions;
export const allPlacesReducer = allPlacesSlice.reducer;
