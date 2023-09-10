import { useEffect, useState } from 'react';
import { PlaceT } from '../types';
import { differenceInCalendarDays, format } from 'date-fns';
import { DateIntervalPiker } from './DateIntervalPicker';
import { useAppDispatch, useAppSelector } from '../store/store';
import toast from 'react-hot-toast';
import { createBooking } from '../features/bookings/bookingsSlice';
import { useNavigate } from 'react-router-dom';

type PropsT = { place: PlaceT };

export const BookingWidget: React.FunctionComponent<PropsT> = ({ place }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const bookingStatusCreation = useAppSelector((state) => state.bookings.statusSingle);

  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [numOfGuests, setNumOfGuests] = useState<number>(2);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState<number>(111999999);

  const handleBookPlace = async () => {
    if (!checkIn || !checkOut || !numOfGuests || !fullName || !phone || !place._id) {
      toast.error('Please, fill out all fields');
      return;
    }

    const newBookingData = {
      place: place._id,
      checkIn: format(checkIn, 'yyyy/MM/dd'),
      checkOut: format(checkOut, 'yyyy/MM/dd'),
      numOfGuests,
      name: fullName,
      phone,
      price: differenceInCalendarDays(new Date(checkOut), new Date(checkIn)) * place.price,
    };

    const data = await dispatch(createBooking(newBookingData)).unwrap();
    console.log(data);
  };

  useEffect(() => {
    if (bookingStatusCreation === 'success') {
      navigate('/account/bookings');
    }
  }, [bookingStatusCreation, navigate, dispatch]);

  let excludedIntervals: undefined | { start: Date; end: Date }[];

  if (place.bookingRanges?.length) {
    excludedIntervals = [...place.bookingRanges].map((range) => ({
      start: new Date(range.start),
      end: new Date(range.end),
    }));
  }

  return (
    <div className="p-4 border border-gray-300 rounded-2xl shadow-md sticky top-10 h-fit">
      <div>
        <span className="font-semibold text-lg">${place?.price}</span>{' '}
        <span className="text-md text-gray-700 font-light">night</span>
      </div>

      <div className="my-3 p-3  min-w-[13rem] border border-gray-300 rounded-xl">
        <DateIntervalPiker
          startDate={checkIn}
          setStartDate={setCheckIn}
          startId={'checkIn'}
          startLabel="Check-In"
          endDate={checkOut}
          setEndDate={setCheckOut}
          endId={'checkOut'}
          endLabel="Checkout"
          excludedDateIntervals={excludedIntervals}
        />

        {/* Num Of Guests */}
        <div className="">
          <label htmlFor="numOfGuests" className="uppercase text-sm text-gray-700">
            Number of guests:{' '}
          </label>
          <input
            id="numOfGuests"
            type="number"
            placeholder="2"
            min={1}
            max={place?.maxGuests}
            value={numOfGuests}
            onChange={(e) => setNumOfGuests(Number(e.target.value))}
          />
        </div>

        {checkIn && numOfGuests && (
          <>
            {/* Full Name */}
            <div className="">
              <label htmlFor="fullName" className="uppercase text-sm text-gray-700">
                Full Name{' '}
              </label>
              <input
                autoComplete="off"
                placeholder="John Doe"
                id="name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            {/* Phone */}
            <div className="">
              <label htmlFor="phone" className="uppercase text-sm text-gray-700">
                Phone number{' '}
              </label>
              <input
                id="phone"
                type="phone"
                placeholder="+123123456789"
                value={phone}
                onChange={(e) => setPhone(Number(e.target.value))}
              />
            </div>
          </>
        )}
      </div>

      <button className="primary" onClick={handleBookPlace}>
        Reserve
      </button>

      {checkIn && checkOut && (
        <div className="mt-4 flex justify-between text-md font-semibold">
          <span>Total price</span>
          <span>
            ${differenceInCalendarDays(new Date(checkOut), new Date(checkIn)) * place.price}
          </span>
        </div>
      )}
    </div>
  );
};
