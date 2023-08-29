import { ChangeEvent, useState } from 'react';
import { PhotoT } from '../types';
import { axiosInstance } from '../features/api/axios-instance';
import { toast } from 'react-hot-toast';

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
    //grab chosen files and make an array
    const newImgFiles = Array.from(e.target.files || []);

    if (newImgFiles.length + addedPhotos.length > 5) {
      toast.error('Max - 5 photos!!!');
      return;
    }

    const filesData = new FormData();
    for (let i = 0; i < newImgFiles.length; i++) {
      //check size of each file
      if (newImgFiles[i].size > 1.5 * 1024 * 1024) {
        console.log(newImgFiles[i].size);
        toast.error(`Provide files less than 1.5MB, file ${newImgFiles[i].name} is too large!`);
        return;
      }

      filesData.append(`photos`, newImgFiles[i]);
    }
    // photosDocs = [{},{}...]
    // to send objects, arrays use JSON.stringify(photosDocs) to upend to FormData instance
    //filesData.append(`nameOfField`, JSON.stringify(photosDocs));
    // and use JSON.parse(req.body.nameOfField)
    //filesData.append(`photosDocs`, JSON.stringify(photosDocs));

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
        type="button"
        onClick={() => {
          handleDeletePhoto(photo.name);
        }}
      >
        remove
      </button>
    </div>
  ));

  const addPhotoDisabled = addedPhotos.length >= 5;

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
        <button
          type="button"
          disabled={addPhotoDisabled}
          className={`${
            addPhotoDisabled ? 'bg-gray-400 opacity-50' : 'bg-gray-300'
          } px-4 py-2 rounded-2xl transition duration-300 ease-out`}
          onClick={handleAddPhotoByLink}
        >
          Add&nbsp;photo
        </button>
      </div>

      {/* upload photo by choosing from own storage */}
      <div className="mt-2 grid grid-cols-[auto,1fr] gap-2">
        <label
          htmlFor="photos"
          className={`${
            addPhotoDisabled ? 'bg-gray-400 opacity-50' : 'bg-gray-300'
          }  cursor-pointer w-32 h-32 flex gap-1 justify-around items-center bg-transparent text-xl text-gray-600 p-5 border border-gray-300 rounded-2xl transition duration-300 ease-out`}
        >
          <input
            disabled={addPhotoDisabled}
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
          {addPhotoDisabled ? 'Max amount of photos' : 'Upload'}
        </label>

        {/* Container for rendered added photos */}
        <div className="col-auto flex overflow-x-auto w-full">
          <div className="flex gap-3">{renderedAddedPhotos}</div>
        </div>
      </div>
    </>
  );
};

//   // to choose image use <input type="file" accept="image/png, image/jpg, image/gif, image/jpeg" onChange(handleChange) />
//   // <input multiple .../> add multiple to give user ability to choose multiple files
//   // to get access to the image or file use e.target.files[0]
//   // to display chosen image in browser use URL.createObjectURL( imgFile ) - it generates relative URL string to the provided object (img...)
//   // <img src={URL.createObjectURL(imgFile)} />
