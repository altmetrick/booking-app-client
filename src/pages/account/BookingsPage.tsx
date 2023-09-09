import { useEffect } from 'react';
import { useAppDispatch } from '../../store/store';
import { setSingleBookingStatus } from '../../features/bookings/bookingsSlice';

export const BookingsPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSingleBookingStatus({ status: 'idle' }));
  }, [dispatch]);

  return <div>bookings list</div>;
};
