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
    <div key={place._id}>
      <h2>{place.title}</h2>
    </div>
  ));

  return (
    <div>
      IndexPage
      <div>{renderedPlaces}</div>
    </div>
  );
};
