import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getAllPlaces } from '../features/allPlaces/allPlacesSlice';
import { PlaceCard } from '../components/PlaceCard';

export const IndexPage = () => {
  const dispatch = useAppDispatch();

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
