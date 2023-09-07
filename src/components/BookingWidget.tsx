import { useState } from 'react';
import { PlaceT } from '../types';
import { differenceInCalendarDays } from 'date-fns';

type PropsT = { place: PlaceT };

export const BookingWidget: React.FunctionComponent<PropsT> = ({ place }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numOfGuests, setNumOfGuests] = useState(1);

  return (
    <div className="p-4 border border-gray-300 rounded-2xl shadow-md sticky top-10 h-fit">
      <div>
        <span className="font-semibold text-lg">${place?.price}</span>{' '}
        <span className="text-md text-gray-700 font-light">night</span>
      </div>
      {/* Check-In */}
      <div className="my-3 p-3 min-w-[13rem] border border-gray-300 rounded-xl grid grid-cols-2 gap-4">
        <div className="cursor-pointer">
          <label htmlFor="checkIn" className="cursor-pointer uppercase text-sm text-gray-700">
            Check-In
          </label>
          <input
            id="checkIn"
            type="date"
            className="cursor-pointer w-full text-sm"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        {/* Checkout */}
        <div className="cursor-pointer">
          <label htmlFor="checkOut" className="cursor-pointer uppercase text-sm text-gray-700">
            Check Out
          </label>
          <input
            id="checkOut"
            type="date"
            className="cursor-pointer w-full text-sm"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
        {/* Num Of Guests */}
        <div className="col-span-2">
          <label htmlFor="numOfGuests" className="uppercase text-sm text-gray-700">
            Number of guests:{' '}
          </label>
          <input
            id="numOfGuest"
            type="number"
            className="text-center"
            min={1}
            max={place?.maxGuests}
            value={numOfGuests}
            onChange={(e) => setNumOfGuests(Number(e.target.value))}
          />
        </div>
      </div>

      <button className="primary">Reserve</button>

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
