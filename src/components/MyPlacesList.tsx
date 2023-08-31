import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getMyPlaces } from '../features/myPlaces/myPlacesSlice';

export const MyPlacesList = () => {
  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.myPlaces.status);
  const myPlaces = useAppSelector((state) => state.myPlaces.places);

  useEffect(() => {
    console.log('use effect places');

    if (!myPlaces.length && status === 'idle') {
      dispatch(getMyPlaces());
    }
  }, [myPlaces]);

  const renderedMyPlaces = myPlaces.map((place) => (
    <div key={place._id}>
      <div>image</div>
      <div>
        <h3>{place.title}</h3>
        <p>{place.description}</p>
      </div>
    </div>
  ));

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else {
    content = <div>{renderedMyPlaces}</div>;
  }

  return (
    <div>
      {content}
      <div className="text-center">
        <Link to={'new'} className="inline-flex bg-primary text-white py-2 px-6 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
          </svg>
          Add new place
        </Link>
      </div>
    </div>
  );
};
