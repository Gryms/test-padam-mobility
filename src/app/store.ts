import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'
import rideReducer from '../features/ride/rideSlice';

const store = configureStore({
  reducer: {
    ride: rideReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store;
