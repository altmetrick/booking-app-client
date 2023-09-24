import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getAllPlaces } from '../features/allPlaces/allPlacesSlice';
import { PlaceCard } from '../components/PlaceCard';
import { useSearchParams } from 'react-router-dom';

export const IndexPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams);

  const places = useAppSelector((state) => state.allPlaces.places);

  useEffect(() => {
    if (!places.length) {
      dispatch(getAllPlaces());
    }
  }, [places, dispatch]);

  const renderedPlaces = places.map((place) => <PlaceCard key={place._id} place={place} />);

  return (
    <div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {renderedPlaces}
      </div>
    </div>
  );
};

// const filters = {
//   page: 1,
//   limit: 10,
//   'price[gt]': 0,
//   'price[lt]': 9000,
//   maxGuests: null,
//   address: null,
//   sort: ['-price', 'maxGuests'],
// };

// let query = '';

// for (const key in filters) {
//   if (Array.isArray(filters[key])) {
//     if (filters[key].length === 0) continue;

//     if (filters[key].length > 0) {
//       query += `${key}=${filters[key].join(',')}&`;
//       continue;
//     }
//   }

//   if (filters[key] !== null) {
//     query += `${key}=${filters[key]}&`;
//   }
// }

// console.log(query);
