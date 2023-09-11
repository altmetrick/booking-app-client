import { useParams } from 'react-router-dom';
import { BtnGoBack } from './buttons/BtnGoBack';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getAllBookings, selectBookingById } from '../features/bookings/bookingsSlice';
import { PhotosGallery } from './photos-gallery/PhotosGallery';
import { useEffect } from 'react';
import { differenceInCalendarDays, format } from 'date-fns';
import { DisplayPerks } from './DisplayPerks';

export const SingleBooking = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const booking = useAppSelector(selectBookingById(id || 'xxx'));
  const bookingsLength = useAppSelector((state) => state.bookings.bookingEntities.length);

  useEffect(() => {
    if (!bookingsLength) {
      dispatch(getAllBookings());
    }
  }, [bookingsLength, dispatch]);

  if (!booking) {
    return (
      <div>
        <h2 className="text-2xl text-center mt-4">Booking not found</h2>
      </div>
    );
  }

  return (
    <>
      <div className="-mt-8">
        <BtnGoBack />
      </div>

      <h1 className="text-3xl ">{booking.place?.title}</h1>
      <a
        className="text-sm text-gray-800 underline inline"
        rel="noopener noreferrer"
        target="_blank"
        href={`https://maps.google.com/?q=${booking.place?.address}`}
      >
        {booking?.place?.address}
      </a>
      <div className="mt-4 p-4 bg-gray-200 rounded-2xl">
        <h2 className="text-xl mb-4">Your booking information:</h2>
        <div className="flex gap-5 bg-primary text-gray-100 p-4 rounded-xl">
          <div>
            <p className="mb-2 uppercase">
              Check-In: <span className="">{format(new Date(booking.checkIn), 'dd/MM')}</span>{' '}
            </p>
            <p className="mb-2 uppercase">
              Checkout: <span className="">{format(new Date(booking.checkOut), 'dd/MM')}</span>
            </p>
            <p className="mb-2 uppercase">Tenant: {booking?.name}</p>
          </div>
          <div>
            <p className="mb-2 uppercase">
              Nights:{' '}
              {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))}
            </p>
            <p className="mb-2 uppercase">
              Total price: <span className="text-lg font-semibold">${booking.price}</span>{' '}
            </p>
          </div>
        </div>
      </div>

      {booking?.place && <PhotosGallery photos={booking.place.photos} />}

      <div className="mt-6 grid sm:grid-cols-1 md:grid-cols-[3fr,2fr] gap-5">
        <div>
          <h2 className="text-2xl mb-1 font-semibold">Description</h2>
          <p className="text-gray-700">{booking.place?.description}</p>
          <div className="my-4">
            <p className="">Check in time: {booking.place?.checkIn}</p>
            <p className="">Check out time: {booking.place?.checkOut}</p>
            <p className="">Max number of guests: {booking.place?.maxGuests}</p>
          </div>
        </div>

        <div>
          {/* Place's Perks */}
          <h2 className="text-2xl mb-1 font-semibold">What offers this place</h2>
          <div>{booking?.place && <DisplayPerks placePerks={booking.place.perks} />}</div>
        </div>
      </div>
      <div className="mb-20">
        <h2 className="font-semibold text-xl">Extra info</h2>
        <p className="text-gray-700">{booking?.place.extraInfo}</p>
      </div>
    </>
  );
};
