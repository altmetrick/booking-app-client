import { useState } from 'react';
import { createPortal } from 'react-dom';

type FiltersProps = {
  onClose: () => void;
};

const Filters: React.FunctionComponent<FiltersProps> = (props) => {
  const { onClose } = props;

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const [numOfGuests, setNumOfGuests] = useState(1);

  return createPortal(
    <div className="fixed inset-0 bg-black/[0.6]">
      <div className="bg-white overflow-hidden relative w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] max-w-[40rem] mx-auto my-[5vh] border rounded-2xl shadow-md">
        {/* Header */}
        <div className="sticky w-full flex items-center justify-between p-5 z-10 border-b">
          <span>{'  '}</span>
          <h3 className="text-xl">Filters</h3>
          {/* Close Button */}
          <button
            className="text-sm flex items-center shadow-md p-1 border rounded-full  hover:shadow-lg"
            onClick={() => {
              onClose();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Main */}
        <div className="max-h-[50vh]  overflow-auto">
          <div className="p-5 border-b">
            <label htmlFor="address">Address</label>
            <input id="address" type="text" />
          </div>

          <div className="p-5 border-b">
            <h2>Price Range</h2>

            <div className="flex justify-between gap-3 flex-col md:flex-row">
              <div className="flex items-center">
                <label htmlFor="minPrice" className="min-w-[6rem]">
                  minPrice: $
                </label>
                <input
                  id="minPrice"
                  type="number"
                  min={0}
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="maxPrice" className="min-w-[6rem]">
                  maxPrice: $
                </label>
                <input
                  id="maxPrice"
                  type="number"
                  min={minPrice}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center p-5 border-b">
            <label htmlFor="numberOfGuests" className="min-w-[6rem]">
              Number of guests:
            </label>
            <input
              id="numberOfGuests"
              type="number"
              min={1}
              value={numOfGuests}
              onChange={(e) => setNumOfGuests(Number(e.target.value))}
            />
          </div>

          <div className="flex items-center p-5 border-b">
            <label htmlFor="numberOfGuests" className="min-w-[6rem]">
              Sort:
            </label>
            <input
              id="numberOfGuests"
              type="number"
              min={1}
              value={numOfGuests}
              onChange={(e) => setNumOfGuests(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Semi Footer */}
        <div className="py-4 px-5 flex justify-between bottom-0">
          <button className="p-2 border rounded-xl">Clear All</button>
          <button className="bg-black text-white p-2 rounded-xl">Search</button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export const SearchWidget = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1 shadow-md shadow-gray-300">
      <input type="text" placeholder="Enter destination" className="search" />
      {/* Filters button */}
      <button
        className="flex items-center gap-1 p-2 rounded-xl border"
        onClick={() => setShowFilters(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
          />
        </svg>
        <span className="text-sm grow-0">Filters</span>
      </button>
      {/* Search button */}
      <button className="bg-primary p-2 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
      {showFilters && <Filters onClose={() => setShowFilters(false)} />}
    </div>
  );
};
