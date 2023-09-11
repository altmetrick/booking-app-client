import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getAllPlaces, selectPlaceById } from '../features/allPlaces/allPlacesSlice';

import { PhotosGallery } from './photos-gallery/PhotosGallery';
import { BookingWidget } from './BookingWidget';
import { DisplayPerks } from './DisplayPerks';

export const SinglePlace = () => {
  const { placeId } = useParams();
  const dispatch = useAppDispatch();

  const place = useAppSelector(selectPlaceById(placeId || 'xxx'));
  const placesLength = useAppSelector((state) => state.allPlaces.places.length);

  //If user reloads page fetch all places, then get the one by the id
  useEffect(() => {
    if (!placesLength) {
      dispatch(getAllPlaces());
    }
  }, [placesLength, dispatch]);

  return (
    <div className="mt-8">
      <h1 className="text-3xl ">{place?.title}</h1>
      <a
        className="text-sm text-gray-800 underline inline"
        rel="noopener noreferrer"
        target="_blank"
        href={`https://maps.google.com/?q=${place?.address}`}
      >
        {place?.address}
      </a>

      {place && <PhotosGallery photos={place.photos} />}

      {/*Info grid*/}
      <div className="my-6 grid sm:grid-cols-1 sm:gap-8   md:grid-cols-[2fr,1fr] md:gap-10">
        <div>
          <h2 className="text-2xl mb-1 font-semibold">Description</h2>
          <p className="text-gray-700">{place?.description}</p>
          <div className="my-4">
            <p className="">Check in time: {place?.checkIn}</p>
            <p className="">Check out time: {place?.checkOut}</p>
            <p className="">Max number of guests: {place?.maxGuests}</p>
          </div>
          {/* Place's Perks */}
          <div>
            <h2 className="text-xl mb-1 ">What offers this place</h2>
            <div>{place && <DisplayPerks placePerks={place.perks} />}</div>
          </div>
        </div>

        {place && <BookingWidget place={place} />}
      </div>
      <div className="mb-20">
        <h2 className="font-semibold text-xl">Extra info</h2>
        <p className="text-gray-700">{place?.extraInfo}</p>
      </div>
    </div>
  );
};
