import { PlaceT } from '../types';

type PropsT = { place: PlaceT };

export const BookingWidget: React.FunctionComponent<PropsT> = ({ place }) => {
  return (
    <div className="p-4 border border-gray-300 rounded-2xl shadow-md sticky top-10 max-h-[18rem]">
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
          <input id="checkIn" type="date" className="cursor-pointer w-full text-sm" />
        </div>
        {/* Checkout */}
        <div className="cursor-pointer">
          <label htmlFor="checkOut" className="cursor-pointer uppercase text-sm text-gray-700">
            Check Out
          </label>
          <input id="checkOut" type="date" className="cursor-pointer w-full text-sm" />
        </div>
        {/* Num Of Guests */}
        <div className="col-span-2">
          <label htmlFor="numOfGuests" className="uppercase text-sm text-gray-700">
            Number of guests:{' '}
          </label>
          <input
            id="numOfGuest"
            type="number"
            min={1}
            max={place?.maxGuests}
            className="text-center"
          />
        </div>
      </div>

      <button className="primary">Reserve</button>
    </div>
  );
};
