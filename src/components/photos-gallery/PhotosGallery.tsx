import { useState } from 'react';
import { PhotoT } from '../../types';
import { createPortal } from 'react-dom';
import { PhotosCarousel } from './PhotosCarousel';

type AllPhotosGalleryGridT = {
  photos: PhotoT[];
  onClose: () => void;
  onPhotoClick: (i: number) => void;
};

const AllPhotosGalleryGrid: React.FunctionComponent<AllPhotosGalleryGridT> = ({
  photos,
  onClose,
  onPhotoClick,
}) => {
  return createPortal(
    <div className="absolute inset-0 bg-white">
      <div className="px-6 py-4 max-w-5xl mx-auto bg-gray-50">
        <div className="fixed top-0 left-0 h-12 w-full bg-white flex items-center p-5">
          {/* Close Button */}
          <button className="shadow-md p-1 rounded-full hover:shadow-lg" onClick={onClose}>
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
          {photos.map((photo, i) => (
            <div
              key={photo._id}
              className="cursor-pointer"
              onClick={() => {
                onPhotoClick(i);
              }}
            >
              <img className="w-full h-full object-cover object-center" src={photo.url} />
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.getElementById('root') as HTMLElement
  );
};

type PhotosGalleryPropsT = {
  photos: PhotoT[];
};

export const PhotosGallery: React.FunctionComponent<PhotosGalleryPropsT> = ({ photos }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showPhotosCarousel, setShowPhotosCarousel] = useState(false);
  const [currIdx, setCurrIdx] = useState<undefined | number>(undefined);

  const handleShowCarousel = (i: number) => {
    setShowPhotosCarousel(true);
    setCurrIdx(i);
  };

  if (showPhotosCarousel) {
    return (
      <PhotosCarousel
        currIdx={currIdx}
        photos={photos}
        onClose={() => {
          setShowPhotosCarousel(false);
        }}
      />
    );
  }

  if (showAllPhotos) {
    return (
      <AllPhotosGalleryGrid
        photos={photos}
        onClose={() => {
          setShowAllPhotos(false);
        }}
        onPhotoClick={handleShowCarousel}
      />
    );
  }

  return (
    <div className="relative mt-4 grid grid-cols-[7fr,3fr]  gap-2 rounded-xl overflow-hidden">
      <div className="">
        <img
          src={photos[0].url}
          className="aspect-[1.5/1] w-full h-full object-cover object-center"
        />
      </div>

      <div className="grid grid-rows-2 gap-2 max-h-[30rem]">
        <img
          src={photos[1].url}
          className="aspect-square w-full h-full object-cover object-center"
        />
        <img
          src={photos[2].url}
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
  );
};
