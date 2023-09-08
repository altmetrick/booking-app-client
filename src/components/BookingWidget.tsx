import { useState } from 'react';
import { PlaceT } from '../types';
import {
  addDays,
  addMonths,
  differenceInCalendarDays,
  format,
  isBefore,
  isSameDay,
  isWithinInterval,
} from 'date-fns';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type PropsT = { place: PlaceT };

const bookedRanges = [
  { start: new Date('2023-09-10'), end: new Date('2023-09-11') },
  { start: new Date('2023-09-13'), end: new Date('2023-09-15') },
  { start: new Date('2023-09-20'), end: new Date('2023-09-25') },
];

type DateIntervalPikerPropsT = {
  startId: string;
  endId: string;
  startLabel: string;
  endLabel: string;
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  excludedDateIntervals?: { start: Date; end: Date }[];
};

const DateIntervalPiker: React.FunctionComponent<DateIntervalPikerPropsT> = ({
  startId,
  startLabel,
  startDate,
  setStartDate,
  endId,
  endLabel,
  endDate,
  setEndDate,
  excludedDateIntervals,
}) => {
  const getEndOfConsecutiveRange = (
    currStart: Date,
    excludedRanges: { start: Date; end: Date }[]
  ) => {
    for (let i = 0; i < excludedRanges.length; i++) {
      const excludedRangeStart = excludedRanges[i].start;

      if (isSameDay(startDate, excludedRangeStart)) {
        return addDays(excludedRangeStart, 1);
      }

      if (isBefore(currStart, excludedRangeStart)) return excludedRangeStart;
    }
    return null;
  };

  let currConsecutiveRangeEnd: null | Date = null;
  if (startDate && excludedDateIntervals) {
    currConsecutiveRangeEnd = getEndOfConsecutiveRange(startDate, excludedDateIntervals);
  }

  const isInBookedRange = (date: Date) => {
    if (currConsecutiveRangeEnd === null) return true;

    return isWithinInterval(date, {
      //@ts-ignore
      start: startDate,
      end: currConsecutiveRangeEnd,
    });
  };

  const handleSetStartDate = (date: Date) => {
    setStartDate(date);
    setEndDate(date);
  };

  return (
    <>
      <div className="cursor-pointer">
        <label htmlFor={startId} className="cursor-pointer uppercase text-sm text-gray-700">
          {startLabel}
        </label>
        <DatePicker
          id={startId}
          showIcon
          minDate={new Date()}
          maxDate={addMonths(new Date(), 3)}
          selected={startDate}
          onChange={(date) => handleSetStartDate(date || new Date())}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          excludeDateIntervals={bookedRanges}
        />
      </div>
      {/* Checkout */}
      <div className="cursor-pointer">
        <label htmlFor={endId} className="cursor-pointer uppercase text-sm text-gray-700">
          {endLabel}
        </label>
        <DatePicker
          showIcon={true}
          minDate={startDate}
          maxDate={addMonths(new Date(), 3)}
          startDate={startDate}
          endDate={endDate}
          selected={endDate}
          onChange={(date) => setEndDate(date || new Date())}
          selectsEnd
          excludeDateIntervals={excludedDateIntervals || []}
          filterDate={isInBookedRange}
        />
      </div>
    </>
  );
};

export const BookingWidget: React.FunctionComponent<PropsT> = ({ place }) => {
  const [numOfGuests, setNumOfGuests] = useState(1);
  const [checkIn, setCheckIn] = useState<Date | null>(new Date());
  const [checkOut, setCheckOut] = useState<Date | null>(new Date());

  // console.log('checkIN:', format(checkIn, 'yyyy-MM-dd'));
  // console.log('checkOut:', format(checkOut, 'yyyy-MM-dd'));

  return (
    <div className="p-4 border border-gray-300 rounded-2xl shadow-md sticky top-10 h-fit">
      <div>
        <span className="font-semibold text-lg">${place?.price}</span>{' '}
        <span className="text-md text-gray-700 font-light">night</span>
      </div>

      <div className="my-3 p-3 min-w-[13rem] border border-gray-300 rounded-xl">
        <DateIntervalPiker
          startDate={checkIn}
          setStartDate={setCheckIn}
          startId={'checkIn'}
          startLabel="Check-In"
          endDate={checkOut}
          setEndDate={setCheckOut}
          endId={'checkOut'}
          endLabel="Checkout"
          excludedDateIntervals={bookedRanges}
        />

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
