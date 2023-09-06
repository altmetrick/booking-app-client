import { useParams } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import { selectPlaceById } from '../features/allPlaces/allPlacesSlice';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { PhotosCarousel } from './PhotosCarousel';
import { perksOptions } from '../utils/perks-options';
import { BookingWidget } from './BookingWidget';

export const SinglePlace = () => {
  const { placeId } = useParams();

  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showPhotosCarousel, setShowPhotosCarousel] = useState(false);
  const [currIdx, setCurrIdx] = useState<undefined | number>(undefined);

  const place = useAppSelector(selectPlaceById(placeId || 'xxx'));

  const handleShowCarousel = (i: number) => {
    setShowPhotosCarousel(true);
    setCurrIdx(i);
  };

  const AllPhotosGrid = createPortal(
    <div className="absolute inset-0 bg-white">
      <div className="px-6 py-4 max-w-5xl mx-auto bg-gray-50">
        <div className="fixed top-0 left-0 h-12 w-full bg-white flex items-center p-5">
          <button
            className="shadow-md p-1 rounded-full hover:shadow-lg"
            onClick={() => {
              setShowAllPhotos(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {/* All Photos Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          {place?.photos.map((photo, i) => (
            <div
              className="cursor-pointer"
              onClick={() => {
                handleShowCarousel(i);
              }}
            >
              <img className="w-full h-full object-cover object-center" src={photo.url} />
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );

  if (showPhotosCarousel) {
    if (place) {
      return (
        <PhotosCarousel
          currIdx={currIdx}
          place={place}
          onClose={() => {
            setShowPhotosCarousel(false);
          }}
        />
      );
    }
  }

  if (showAllPhotos) {
    return AllPhotosGrid;
  }

  const renderedPlacePerks = perksOptions.map((perk) => {
    if (place?.perks.includes(perk.name)) {
      return (
        <div className="flex gap-2 mb-2">
          {perk.icon()}
          <span>{perk.label}</span>
        </div>
      );
    }
  });

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

      {/* Photos Grid */}
      <div className="relative mt-4 grid grid-cols-[7fr,3fr]  gap-2 rounded-xl overflow-hidden">
        <div className="">
          <img
            src={place?.photos[0].url}
            className="aspect-[1.5/1] w-full h-full object-cover object-center"
          />
        </div>

        <div className="grid grid-rows-2 gap-2 max-h-[30rem]">
          <img
            src={place?.photos[1].url}
            className="aspect-square w-full h-full object-cover object-center"
          />
          <img
            src={place?.photos[2].url}
            className="aspect-square w-full h-full object-cover object-center"
          />
          <button
            className="absolute bottom-5 right-5 text-sm border border-black rounded-md bg-white px-3 py-1 shadow-sm flex items-center gap-1"
            onClick={() => setShowAllPhotos(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z"
                clipRule="evenodd"
              />
            </svg>
            Show all photos
          </button>
        </div>
      </div>

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
            <div>{renderedPlacePerks}</div>
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
