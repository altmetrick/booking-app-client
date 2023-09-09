import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { userReducer } from '../features/user/userSlice';
import { placeFormReducer } from '../features/placeForm/placeFormSlice';
import { myPlacesReducer } from '../features/myPlaces/myPlacesSlice';
import { allPlacesReducer } from '../features/allPlaces/allPlacesSlice';
import { bookingsReducer } from '../features/bookings/bookingsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    placeForm: placeFormReducer,
    myPlaces: myPlacesReducer,
    allPlaces: allPlacesReducer,
    bookings: bookingsReducer,
  },
});

//@ts-ignore
window.store = store;

//types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
