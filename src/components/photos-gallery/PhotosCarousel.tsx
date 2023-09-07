import { useState } from 'react';
import { PhotoT } from '../../types';
import { createPortal } from 'react-dom';

type PhotosCarouselPropsT = {
  currIdx?: number;
  photos: PhotoT[];
  onClose: () => void;
};

export const PhotosCarousel: React.FunctionComponent<PhotosCarouselPropsT> = ({
  photos,
  onClose,
  currIdx,
}) => {
  const [currPhotoIdx, setCurrPhotoIdx] = useState(currIdx || 0);

  const handleSlideLeft = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setCurrPhotoIdx((i) => i - 1);
  };
  const handleSlideRight = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setCurrPhotoIdx((i) => i + 1);
  };

  const showLeft = currPhotoIdx !== 0;
  const showRight = currPhotoIdx !== photos.length - 1;

  return createPortal(
    <div className="absolute inset-0 bg-black">
      {/* Semi Header */}
      <div className="fixed top-2 left-0 h-12 w-full flex items-center justify-between p-5 z-10">
        <button
          className="text-white text-sm  flex gap-1 items-center shadow-md px-2 py-1 rounded-full hover:bg-white/40"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
          Close
        </button>

        <span className="text-white -ml-10 text-lg font-extralight">
          {currPhotoIdx + 1} / {photos.length}
        </span>
        <div className="">{'()'}</div>
      </div>

      {/*Photo container*/}
      <div className="relative max-w-5xl mx-auto h-full flex justify-center items-center">
        <img
          src={photos[currPhotoIdx].url}
          className="max-h-[80vh]  sm:max-w-[100%] md:max-w-[80%]"
        />

        {/* Buttons Right Left */}
        <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-0 w-full opacity-100">
          {showLeft && (
            <button
              className="text-white border border-white  m-3 p-2 rounded-full float-left hover:bg-white/30"
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
              className="text-white border border-white m-3 p-2 rounded-full float-right hover:bg-white/30"
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
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
};
