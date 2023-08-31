import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getMyPlaces } from '../features/myPlaces/myPlacesSlice';
import { PlaceT } from '../types';
import { clearAllValues, setEditPlace } from '../features/place/singlePlaceSlice';

export const MyPlacesList = () => {
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector((state) => state.singlePlace.isEditing);
  const status = useAppSelector((state) => state.myPlaces.status);
  const myPlaces = useAppSelector((state) => state.myPlaces.places);

  useEffect(() => {
    console.log('use effect places');

    if (!myPlaces.length && status === 'idle') {
      dispatch(getMyPlaces());
    }
  }, [myPlaces]);

  const handleAditPlace = (place: PlaceT) => {
    //if user currently edits a place and come backs to myTasksList
    // and decides to create a new Place we need to clear data from singlePlaceSlice state
    dispatch(setEditPlace(place));
  };

  const handleAddNewPlace = () => {
    if (isEditing) {
      dispatch(clearAllValues());
    }
  };

  const renderedMyPlaces = myPlaces.map((place) => (
    <div
      key={place._id}
      className="grid sm:grid-cols-1  md:grid-cols-[auto,1fr]  gap-3 my-3 p-4 bg-gray-200 rounded-2xl"
    >
      <div className="min-width-48 h-32">
        <img
          className="w-full h-full object-cover object-center rounded-2xl"
          src={place.photos[0].url}
        />
      </div>
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl mb-2">{place.title}</h3>
          <p className="text-gray-600">{place.description}</p>
        </div>

        <div className="w-[min-content]">
          <Link
            className="block primary mb-2"
            to={`edit/${place._id}`}
            onClick={() => {
              handleAditPlace(place);
            }}
          >
            Edit
          </Link>

          <button className="secondary">Delete</button>
        </div>
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
        <Link
          to={'new'}
          onClick={handleAddNewPlace}
          className="inline-flex bg-primary text-white py-2 px-6 rounded-full"
        >
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
