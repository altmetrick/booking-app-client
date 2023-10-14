import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { filterChange } from '../features/allPlaces/allPlacesSlice';
import { FiltersModal } from './FiltersModal';

export const SearchWidget = () => {
  const dispatch = useAppDispatch();

  const filters = useAppSelector((state) => state.allPlaces.filters);
  //use useSearchParams to be able to manipulate url search params:
  const [searchParams, setSearchParams] = useSearchParams();

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    //!!!!On load check if URL has filters as query strings, if so update the filters state
    const params = {};
    //reading and saving all query params
    for (const [key, value] of searchParams.entries()) {
      //@ts-ignore
      params[key] = value;
    }
    console.log(params);
  }, []);

  const handleChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(filterChange({ name, value }));
  };

  const handleGetAllPlaces = () => {
    //When fetching allPlaces wee need to push all query string params to the URL from 'filters' ojb

    //Iterate through the filters and set/delete each filter to searchParams object
    for (const filterName in filters) {
      //@ts-ignore
      const value = filters[filterName];
      // if filter in the url and its new value is '' - remove filter from the url;
      // if filter value is '' - don't add this filter to the url;
      // if filter value is not '' - add this filter to the url

      if (searchParams.get(filterName) && value === '') {
        searchParams.delete(filterName);
        continue;
      }
      //@ts-ignore
      if (filters[filterName] !== '') {
        searchParams.set(filterName, value);
      }
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1 shadow-md shadow-gray-300">
      <input
        type="text"
        placeholder="Enter destination"
        name="address"
        value={filters.address}
        onChange={handleChangeFilter}
        className="search"
      />
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
      <button className="bg-primary p-2 rounded-full" onClick={handleGetAllPlaces}>
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
      {showFilters && (
        <FiltersModal
          onClose={setShowFilters}
          filters={filters}
          onFilterChange={handleChangeFilter}
          handleSearch={handleGetAllPlaces}
        />
      )}
    </div>
  );
};
