import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { deleteMyPlace, getMyPlaces } from '../features/myPlaces/myPlacesSlice';
import { PlaceT } from '../types';
import { clearAllValues, setEditPlace } from '../features/place/singlePlaceSlice';
import { Modal } from './modal/Modal';

export const MyPlacesList = () => {
  const dispatch = useAppDispatch();

  const isEditing = useAppSelector((state) => state.singlePlace.isEditing);
  const status = useAppSelector((state) => state.myPlaces.status);
  const myPlaces = useAppSelector((state) => state.myPlaces.places);

  const [placeIdToDelete, setPlaceIdToDelete] = useState<null | string>(null);

  useEffect(() => {
    if (!myPlaces.length && status === 'idle') {
      dispatch(getMyPlaces());
    }
  }, [myPlaces]);

  const handleAditPlace = (place: PlaceT) => {
    //if user currently edits a place and come backs to myTasksList
    // and decides to create a new Place we need to clear data from singlePlaceSlice state
    dispatch(setEditPlace(place));
  };

  const handleDeletePlace = (id: string) => {
    dispatch(deleteMyPlace(id));
    setPlaceIdToDelete(null);
  };

  const handleAddNewPlace = () => {
    if (isEditing) {
      dispatch(clearAllValues());
    }
  };

  const modal = (
    <Modal onClose={() => setPlaceIdToDelete(null)}>
      <>
        <h2 className="text-gray-600 text-xl text-center">
          Are you sure you want to delete your place?
        </h2>
        <div className="flex gap-4 mt-5">
          <button
            className="primary w-20"
            onClick={() => {
              setPlaceIdToDelete(null);
            }}
          >
            Cancel
          </button>
          <button
            className="secondary w-20"
            onClick={() => {
              //@ts-ignore
              handleDeletePlace(placeIdToDelete);
            }}
          >
            Delete
          </button>
        </div>
      </>
    </Modal>
  );

  const renderedMyPlaces = myPlaces.map((place) => (
    <div
      key={place._id}
      className="grid sm:grid-cols-1  md:grid-cols-[auto,1fr]  gap-3 my-3 p-4 bg-blue-100 rounded-2xl"
    >
      <div className="min-width-48 h-32">
        <img
          className="w-full h-full object-cover object-center rounded-2xl"
          src={place.photos[0].url}
        />
      </div>
      <div className="flex justify-between gap-3">
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

          <button
            onClick={() => {
              //@ts-ignore
              setPlaceIdToDelete(place._id);
            }}
            className="secondary"
          >
            Delete
          </button>
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
      {placeIdToDelete && modal}
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
