import { useParams } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import { selectPlaceById } from '../features/allPlaces/allPlacesSlice';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { PlaceT } from '../types';

type PropsT = {
  place: PlaceT;
};

const PhotosCarousel: React.FunctionComponent<PropsT> = ({ place }) => {
  const [currPhotoIdx, setCurrPhotoIdx] = useState(0);

  const handleSlideLeft = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setCurrPhotoIdx((i) => i - 1);
  };
  const handleSlideRight = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setCurrPhotoIdx((i) => i + 1);
  };

  const showLeft = currPhotoIdx !== 0;
  const showRight = currPhotoIdx !== place.photos.length - 1;

  return (
    <div key={place._id} className="bg-white rounded-lg overflow-hidden shadow-md text-left group">
      <div className="relative transition">
        <img src={place?.photos[currPhotoIdx].url} className="block max-w-[100%] h-[30rem]" />

        {/* Buttons Left/Right arrows*/}
        <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-0 w-full opacity-0 group-hover:opacity-90 transition-opacity duration-300">
          {showLeft && (
            <button
              className="bg-white  text-gray-800 m-3 p-2 rounded-full float-left"
              onClick={handleSlideLeft}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}

          {showRight && (
            <button
              className="bg-white  text-gray-800 m-3 p-2 rounded-full float-right"
              onClick={handleSlideRight}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
        {/* Little dots */}
        <div className="absolute bottom-3 w-full flex gap-[0.5rem] justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {place.photos.map((_, i) => (
            <div
              key={i}
              className={`bg-white/80 rounded-full ${
                i === currPhotoIdx ? 'h-2 w-2' : 'h-1 w-1'
              } transition duration-300`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SinglePlace = () => {
  const { placeId } = useParams();

  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showPhotosCarousel, setShowPhotosCarousel] = useState(false);

  const place = useAppSelector(selectPlaceById(placeId || 'xxx'));

  const AllPhotos = createPortal(
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
        <div className="grid grid-cols-2 gap-4">
          {place?.photos.map((photo) => (
            <div
              onClick={() => {
                setShowPhotosCarousel(true);
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
    return createPortal(
      <div className="absolute inset-0 bg-black">
        <div className="fixed top-0 left-0 h-12 w-full flex items-center p-5">
          <button
            className="text-white text-sm  flex gap-1 items-center shadow-md px-2 py-1 rounded-full hover:bg-white/40"
            onClick={() => {
              setShowPhotosCarousel(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
            Close
          </button>
        </div>
        <div className="max-w-5xl mx-auto h-full flex justify-center items-center">
          {/* <img src={place?.photos[0].url} className="block max-w-[100%] max-h-[80%]" /> */}

          {place && <PhotosCarousel place={place} />}
        </div>
      </div>,
      document.getElementById('modal-root') as HTMLElement
    );
  }

  if (showAllPhotos) {
    return AllPhotos;
  }

  return (
    <div className="mt-8">
      <h1 className="text-2xl">{place?.title}</h1>
      <a
        className="text-sm text-gray-800 underline inline"
        rel="noopener noreferrer"
        target="_blank"
        href={`https://maps.google.com/?q=${place?.address}`}
      >
        {place?.address}
      </a>

      <div className="relative">
        {/* Photos Grid */}
        <div className="mt-4 grid grid-cols-[7fr,3fr]  gap-2 rounded-xl overflow-hidden">
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
          </div>
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
    </div>
  );
};
