import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getAllPlaces } from '../features/allPlaces/allPlacesSlice';

export const IndexPage = () => {
  const dispatch = useAppDispatch();
  //const status = useAppSelector((state) => state.allPlaces.status);
  const places = useAppSelector((state) => state.allPlaces.places);

  useEffect(() => {
    if (!places.length) {
      dispatch(getAllPlaces());
    }
  }, [places, dispatch]);

  const renderedPlaces = places.map((place) => (
    <div key={place._id} className="bg-white rounded-lg overflow-hidden shadow-md">
      <img
        className="aspect-square rounded-lg object-cover object-center"
        src={place.photos[0].url}
      />

      <div className="py-2">
        <p className="text-sm text-gray-900 font-semibold truncate">
          {place.address.substring(0, 100)}
        </p>
        <p className="text-sm text-gray-500">
          night: <span className="text-gray-900 font-semibold">${place.price || 100}</span>
        </p>
        <h3 className="font-semibold truncate">{place.title}</h3>
      </div>
    </div>
  ));

  return (
    <div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {renderedPlaces}
      </div>
    </div>
  );
};
