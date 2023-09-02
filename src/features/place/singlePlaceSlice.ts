import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PerkT, PhotoT, PlaceT, PlacePropNameT } from '../../types';
import { axiosInstance } from '../api/axios-instance';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { addNewMyPlace, addUpdatedMyPlace } from '../myPlaces/myPlacesSlice';

type InitialStateT = {
  status: 'idle' | 'loading' | 'success' | 'failed';
  statusPhotos: 'idle' | 'loading' | 'success' | 'failed';
  _id: string | null;
  title: string;
  description: string;
  address: string;
  photos: PhotoT[];
  perks: PerkT[];
  extraInfo: string;
  checkIn: string;
  checkOut: string;
  maxGuests: number;
  error: null | Error | string;
  isEditing: boolean;
};

//ResTypes:
type AddPhotoByLinkResT = {
  photo: { name: string; url: string };
};
type DeletePhotoResT = {
  name: string;
  message: string;
};
type UploadMultiplePhotsResT = {
  photos: PhotoT[];
};
type createPlaceResT = {
  place: PlaceT;
  message: string;
};

//Thunks:

export const uploadPhotoByLink = createAsyncThunk(
  'singlePlace/addPhotoByLink',
  async (photoLink: string, thunkApi) => {
    try {
      const { data } = await axiosInstance.post<AddPhotoByLinkResT>('/places/photo-by-link', {
        photoUrl: photoLink.trim(),
      });
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
export const deletePhoto = createAsyncThunk(
  'singlePlace/deletePhoto',
  async (photoName: string, thunkApi) => {
    try {
      const { data } = await axiosInstance.delete<DeletePhotoResT>(`/places/photos/${photoName}`);

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
export const uploadMultiplePhotos = createAsyncThunk(
  'singlePlace/uploadMultiplePhotos',
  async (photosFiles: File[], thunkApi) => {
    const filesData = new FormData();
    for (let i = 0; i < photosFiles.length; i++) {
      filesData.append(`photos`, photosFiles[i]);
    }

    try {
      //by uploading images server should return array of photos with urls
      const { data } = await axiosInstance.post<UploadMultiplePhotsResT>(
        'places/photos',
        filesData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
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
export const createPlace = createAsyncThunk(
  'singlePlace/savePlace',
  async (placeData: PlaceT, thunkApi) => {
    try {
      const { data } = await axiosInstance.post<createPlaceResT>(
        '/places/me',
        { ...placeData },
        thunkApi
      );

      thunkApi.dispatch(clearAllValues());

      //also when new place is created add it to the myPlaces state
      // by dispatching addPlace(newPlace) AC imported from myPlacesSlice
      thunkApi.dispatch(addNewMyPlace({ place: data.place }));

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
export const updatePlace = createAsyncThunk(
  'singlePlace/updatePlace',
  async (placeData: PlaceT, thunkApi) => {
    try {
      const { data } = await axiosInstance.patch<createPlaceResT>(
        `/places/me/${placeData._id}`,
        { placeData },
        thunkApi
      );

      //when place is updated also update it at myPlacesSlice state
      thunkApi.dispatch(addUpdatedMyPlace({ place: data.place }));

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
  statusPhotos: 'idle',
  _id: null,
  title: '',
  description: '',
  address: '',
  photos: [],
  perks: [],
  extraInfo: '',
  checkIn: '',
  checkOut: '',
  maxGuests: 3,
  error: null,
  isEditing: false,
} as InitialStateT;

const singlePlaceSlice = createSlice({
  name: 'singlePlace',
  initialState,
  reducers: {
    clearAllValues: () => {
      return { ...initialState };
    },
    setEditPlace: (_state, { payload }) => {
      return { ...payload, isEditing: true, status: 'idle' };
    },
    handlePlaceInputChange: (
      state,
      { payload: { name, value } }: PayloadAction<{ name: PlacePropNameT; value: string | number }>
    ) => {
      //@ts-ignore
      state[name] = value;
    },
    togglePerks: (
      state,
      { payload: { name, checked } }: PayloadAction<{ name: PerkT; checked: boolean }>
    ) => {
      if (checked) {
        state.perks.push(name);
      } else {
        state.perks = state.perks.filter((perk) => perk !== name);
      }
    },
    changeFirstPhoto: (state, { payload }) => {
      const newOrderPhotos = state.photos;
      [newOrderPhotos[0], newOrderPhotos[payload]] = [newOrderPhotos[payload], newOrderPhotos[0]];
      state.photos = newOrderPhotos;
    },
  },

  extraReducers: (builder) => {
    builder
      //uploadPhotoByLink
      .addCase(uploadPhotoByLink.pending, (state) => {
        state.statusPhotos = 'loading';
      })
      .addCase(uploadPhotoByLink.fulfilled, (state, { payload }) => {
        state.photos.push(payload.photo);
        state.statusPhotos = 'success';
        toast.success(`Photo uploaded!`);
      })
      .addCase(
        uploadPhotoByLink.rejected,
        (state, { payload }: PayloadAction<{ message: string } | any>) => {
          state.statusPhotos = 'failed';
          toast.error(payload.message);
        }
      )
      //deletePhoto
      .addCase(deletePhoto.pending, (state) => {
        state.statusPhotos = 'loading';
      })
      .addCase(deletePhoto.fulfilled, (state, { payload: { name, message } }) => {
        state.photos = state.photos.filter((photo) => photo.name !== name);
        state.statusPhotos = 'success';
        toast.success(message);
      })
      .addCase(
        deletePhoto.rejected,
        (state, { payload: { message } }: PayloadAction<{ message: string } | any>) => {
          state.statusPhotos = 'failed';
          toast.error(message);
        }
      )
      //uploadMultiplePhotos
      .addCase(uploadMultiplePhotos.pending, (state) => {
        state.statusPhotos = 'loading';
      })
      .addCase(uploadMultiplePhotos.fulfilled, (state, { payload: { photos } }) => {
        state.statusPhotos = 'success';
        state.photos = state.photos.concat(photos);
      })
      .addCase(
        uploadMultiplePhotos.rejected,
        (state, { payload: { message } }: PayloadAction<{ message: string } | any>) => {
          state.statusPhotos = 'failed';
          toast.error(message);
        }
      )
      //createPlace
      .addCase(createPlace.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPlace.fulfilled, (state) => {
        state.status = 'success';
        toast.success('New place is created!');
      })
      .addCase(
        createPlace.rejected,
        (state, { payload: { message } }: PayloadAction<{ message: string } | any>) => {
          state.status = 'failed';
          toast.error(message);
        }
      )
      //updatePlace
      .addCase(updatePlace.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePlace.fulfilled, (state) => {
        toast.success('New place is updated!');
        state.status = 'success';
      })
      .addCase(
        updatePlace.rejected,
        (state, { payload: { message } }: PayloadAction<{ message: string } | any>) => {
          state.status = 'failed';
          toast.error(message);
        }
      );
  },
});

export const {
  handlePlaceInputChange,
  togglePerks,
  setEditPlace,
  clearAllValues,
  changeFirstPhoto,
} = singlePlaceSlice.actions;

export const singlePlaceReducer = singlePlaceSlice.reducer;
