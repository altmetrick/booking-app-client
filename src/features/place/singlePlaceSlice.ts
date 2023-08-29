import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PerkT, PhotoT, PlacePropNameT } from '../../types';

type InitialStateT = {
  isLoading: boolean;
  title: string;
  description: string;
  address: string;
  photos: PhotoT[];
  perks: PerkT[];
  extraInfo: string;
  checkIn: string;
  checkOut: string;
  maxGuests: number;
};

const initialState = {
  isLoading: false,
  title: '',
  description: '',
  address: '',
  photos: [],
  perks: [],
  extraInfo: '',
  checkIn: '',
  checkOut: '',
  maxGuests: 3,
} as InitialStateT;

const singlePlaceSlice = createSlice({
  name: 'singlePlace',
  initialState,
  reducers: {
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
  },

  //extraReducers: (builder) => {},
});

export const { handlePlaceInputChange, togglePerks } = singlePlaceSlice.actions;

export const singlePlaceReducer = singlePlaceSlice.reducer;
