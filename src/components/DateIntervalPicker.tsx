import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { addDays, addMonths, format, isBefore, isSameDay, isWithinInterval } from 'date-fns';

// const bookedRanges = [
//   { start: new Date('2023-09-24'), end: new Date('2023-09-27') },
//   { start: new Date('2023-09-10'), end: new Date('2023-09-15') },
//   { start: new Date('2023-09-20'), end: new Date('2023-09-22') },
// ];

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

export const DateIntervalPiker: React.FunctionComponent<DateIntervalPikerPropsT> = ({
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
  //
  function getEndOfConsecutiveRange(currStart: Date, excludedRanges: { start: Date; end: Date }[]) {
    //sort provided ranges of dates by start date in Ascending order (low to high)
    const sortedIntervals = [...excludedRanges].sort((a, b) => Number(a.start) - Number(b.start));

    for (let i = 0; i < sortedIntervals.length; i++) {
      const excludedRangeStart = sortedIntervals[i].start;

      //@ts-ignore
      if (isSameDay(startDate, excludedRangeStart)) {
        return addDays(excludedRangeStart, 1);
      }
      if (isBefore(currStart, excludedRangeStart)) return excludedRangeStart;
    }
    return null;
  }

  let currConsecutiveRangeEnd: null | Date = null;
  if (startDate && excludedDateIntervals) {
    currConsecutiveRangeEnd = getEndOfConsecutiveRange(startDate, excludedDateIntervals);
  }

  //for each picked new start(checkIn) we need to show only allowed days which are in sequence with the new start
  //   1   2  3 4 5 6 7  8   9  10  11 12 13
  //  exD exD _ _ _ _ _ exD exD exD _   _   _
  // exD - a day of an excluded interval
  // _ - available day
  // if user picks 4th day for a new start, we should allow user to choose only from 4th, 5th, 6th, 7th days
  // for a new end (checkOut)
  // so user couldn't pick for example checkIn - 6th and checkOut 12th

  //Filter date function
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
      <div className="cursor-pointer flex flex-col">
        <label htmlFor={startId} className="cursor-pointer  uppercase text-sm text-gray-700">
          {startLabel}
        </label>
        <DatePicker
          autoComplete="off"
          id={startId}
          showIcon
          placeholderText={format(new Date(), 'yy/MM/dd')}
          minDate={new Date()}
          maxDate={addMonths(new Date(), 3)}
          selected={startDate}
          onChange={(date) => handleSetStartDate(date || new Date())}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          excludeDateIntervals={excludedDateIntervals}
        />
      </div>
      {/* Checkout */}
      <div className="cursor-pointer flex flex-col">
        <label htmlFor={endId} className="cursor-pointer uppercase text-sm text-gray-700">
          {endLabel}
        </label>
        <DatePicker
          placeholderText={format(new Date(), 'yy/MM/dd')}
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
