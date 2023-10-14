import { ChangeEvent } from 'react';
import { createPortal } from 'react-dom';
import { GetAllPlacesFiltersT } from '../types';

type FiltersProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  filters: GetAllPlacesFiltersT;
  onFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
};

export const FiltersModal: React.FunctionComponent<FiltersProps> = (props) => {
  const { onClose, filters, onFilterChange, handleSearch } = props;

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
              onClose(false);
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
            <input
              id="address"
              name="address"
              type="text"
              value={filters.address}
              onChange={onFilterChange}
            />
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
                  name="price[lt]"
                  type="number"
                  min={0}
                  value={filters['price[lt]']}
                  //onChange={(e) => setMinPrice(Number(e.target.value))}
                  onChange={onFilterChange}
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="maxPrice" className="min-w-[6rem]">
                  maxPrice: $
                </label>
                <input
                  id="maxPrice"
                  name="price[gt]"
                  type="number"
                  min={filters['price[lt]']}
                  value={filters['price[gt]']}
                  // onChange={(e) => setMaxPrice(Number(e.target.value))}
                  onChange={onFilterChange}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center p-5 border-b">
            <label htmlFor="maxGuests" className="min-w-[6rem]">
              Number of guests:
            </label>
            <input
              id="maxGuests"
              name="maxGuests"
              type="number"
              min={1}
              value={filters.maxGuests}
              //onChange={(e) => setNumOfGuests(Number(e.target.value))}
              onChange={onFilterChange}
            />
          </div>
        </div>

        {/* Semi Footer */}
        <div className="py-4 px-5 flex justify-between bottom-0">
          <button className="p-2 border rounded-xl">Clear All</button>
          <button
            className="bg-black text-white p-2 rounded-xl"
            onClick={() => {
              handleSearch();
              onClose(false);
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
};
