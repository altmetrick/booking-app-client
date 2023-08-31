import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { userReducer } from '../features/user/userSlice';
import { singlePlaceReducer } from '../features/place/singlePlaceSlice';
import { myPlacesReducer } from '../features/myPlaces/myPlacesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    singlePlace: singlePlaceReducer,
    myPlaces: myPlacesReducer,
  },
});

//@ts-ignore
window.store = store;

//types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
