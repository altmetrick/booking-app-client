import { ChangeEvent, useState } from 'react';
import { PhotoT } from '../types';
import { axiosInstance } from '../features/api/axios-instance';

type PhotosUploaderPropsT = {
  addedPhotos: PhotoT[];
  setAddedPhotos: React.Dispatch<React.SetStateAction<PhotoT[]>>;
};

export const PhotosUploader: React.FunctionComponent<PhotosUploaderPropsT> = (props) => {
  const { addedPhotos, setAddedPhotos } = props;

  const [photoLink, setPhotoLink] = useState('');

  const handleAddPhotoByLink = async () => {
    try {
      const { data } = await axiosInstance.post<{ photo: { name: string; url: string } }>(
        '/places/photo-by-link',
        {
          photoUrl: photoLink.trim(),
        }
      );
      setAddedPhotos((prev) => [...prev, data.photo]);

      setPhotoLink('');
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeletePhoto = async (photoName: string) => {
    try {
      const { data } = await axiosInstance.delete<{ message: string }>(
        `/places/photos/${photoName}`
      );
      console.log(data);

      setAddedPhotos((prev) => [...prev.filter((photo) => photo.name !== photoName)]);
    } catch (err) {
      console.log(err);
    }
  };
  const handleAddMultiplePhotos = async (e: ChangeEvent<HTMLInputElement>) => {
    //single file:
    //const file = e.target.files[0];
    //const filesData = new FormData();

    //filesData.append('photo', file);

    //multiple files
    //grab chosen files and make an array
    const newImgFiles = Array.from(e.target.files || []);
    const filesData = new FormData();

    for (let i = 0; i < newImgFiles.length; i++) {
      filesData.append(`photos`, newImgFiles[i]);
    }

    try {
      //by uploading images server should return array of photos with urls
      const { data } = await axiosInstance.post<{ photos: { url: string; name: string }[] }>(
        'places/photos',
        filesData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setAddedPhotos((prev) => [...prev, ...data.photos]);

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderedAddedPhotos = addedPhotos.map((photo) => (
    <div key={photo.name} className="w-48 h-32">
      <img className="w-full h-full object-cover object-center rounded-2xl" src={photo.url} />
      <button
        onClick={() => {
          handleDeletePhoto(photo.name);
        }}
      >
        remove
      </button>
    </div>
  ));

  return (
    <>
      <h2 className="text-xl">Photos</h2>
      {/* upload photo by link */}
      <div className="flex gap-2">
        <label htmlFor="photoLink" className="hidden">
          Photo link
        </label>
        <input
          type="text"
          id="photoLink"
          name="photoLink"
          placeholder="Add by link...jpg"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
        />
        <button className="bg-gray-300 px-4 py-2 rounded-2xl" onClick={handleAddPhotoByLink}>
          Add&nbsp;photo
        </button>
      </div>

      {/* upload photo by choosing from own storage */}
      <div className="mt-2 grid grid-cols-[auto,1fr] gap-2">
        <label
          htmlFor="photos"
          className="cursor-pointer w-32 h-32 flex gap-1 justify-around items-center bg-transparent text-xl text-gray-600 p-5 border border-gray-300 rounded-2xl"
        >
          <input
            type="file"
            id="photos"
            name="photos"
            multiple
            accept="image/png, image/jpg, image/gif, image/jpeg"
            className="hidden"
            onChange={handleAddMultiplePhotos}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          Upload
        </label>

        {/* Container for rendered added photos */}
        <div className="col-auto flex overflow-x-auto w-full">
          <div className="flex gap-3">{renderedAddedPhotos}</div>
        </div>
      </div>
    </>
  );
};
