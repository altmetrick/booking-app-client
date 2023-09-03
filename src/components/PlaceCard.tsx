import { Link } from 'react-router-dom';
import { PlaceT } from '../types';
import { useState } from 'react';

type PropsT = {
  place: PlaceT;
};

export const PlaceCard: React.FunctionComponent<PropsT> = ({ place }) => {
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
    <Link
      to={`rooms/${place._id}`}
      key={place._id}
      className="bg-white rounded-lg overflow-hidden shadow-md text-left group"
    >
      <div className="relative transition">
        {/* <img
          className="aspect-square rounded-lg object-cover object-center transition"
          src={place.photos[currPhotoIdx].url}
        /> */}
        {/* Using backgroundImage: url() so we'll be able to animate photos changing */}
        <div
          className="aspect-square rounded-lg bg-cover bg-center duration-500"
          style={{ backgroundImage: `url(${place.photos[currPhotoIdx].url})` }}
        ></div>

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
        <div className="absolute bottom-3 w-full flex gap-[0.5rem] justify-center items-center">
          {place.photos.map((photo, i) => (
            <div
              className={`bg-white/80 rounded-full ${
                i === currPhotoIdx ? 'h-2 w-2' : 'h-1 w-1'
              } transition duration-300`}
            ></div>
          ))}
        </div>
      </div>
      {/* Place info */}
      <div className="py-2">
        <p className="text-sm text-gray-900 font-semibold truncate">
          {place.address.substring(0, 100)}
        </p>
        <p className="text-sm text-gray-500">
          night: <span className="text-gray-900 font-semibold">${place.price || 100}</span>
        </p>
        <h3 className="font-semibold truncate">{place.title}</h3>
      </div>
    </Link>
  );
};
