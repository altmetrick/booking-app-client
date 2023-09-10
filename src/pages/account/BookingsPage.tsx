import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getAllBookings, setSingleBookingStatus } from '../../features/bookings/bookingsSlice';
import { differenceInCalendarDays, format } from 'date-fns';

export const BookingsPage = () => {
  const dispatch = useAppDispatch();

  const bookings = useAppSelector((state) => state.bookings.bookingEntities);

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSingleBookingStatus({ status: 'idle' }));
  }, [dispatch]);

  const renderedBookings = bookings.map((booking) => (
    <div
      key={booking._id}
      className="grid sm:grid-cols-1  md:grid-cols-[3fr,7fr]  gap-3 my-3 p-4 bg-blue-100 rounded-2xl"
    >
      <div className="h-40">
        <img
          className="w-full h-full object-cover object-center rounded-2xl"
          src={booking.place.photos[0].url}
        />
      </div>
      <div className="">
        <div>
          <h3 className="text-xl mb-2">{booking.place.title}</h3>
          <div className="flex gap-2">
            <p>
              Check-In:{' '}
              <span className="text-gray-700">{format(new Date(booking.checkIn), 'dd/MM')}</span>{' '}
            </p>
            <p>
              Checkout:{' '}
              <span className="text-gray-700">{format(new Date(booking.checkOut), 'dd/MM')}</span>
            </p>
          </div>

          <p>Tenant: {booking.name}</p>
          <p>
            Nights:{' '}
            {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))}
          </p>
          <p>Total price: ${booking.price}</p>
        </div>
      </div>
    </div>
  ));

  return <div>{renderedBookings}</div>;
};
