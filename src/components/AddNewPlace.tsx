import { FormEvent, useState } from 'react';
import { BtnGoBack } from './buttons/BtnGoBack';

import { FormRowInput } from './FormRowInput';
import { Perks } from './Perks';
import { PhotosUploader } from './PhotosUploader';
import { PerkT, PhotoT } from '../types';

export const AddNewPlace = () => {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState<PhotoT[] | []>([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState<PerkT[]>([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState('');

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // const handleAddPhotoByLink = async () => {
  //   try {
  //     const { data } = await axiosInstance.post<{ photo: { name: string; url: string } }>(
  //       '/places/photo-by-link',
  //       {
  //         photoUrl: photoLink.trim(),
  //       }
  //     );
  //     setAddedPhotos((prev) => [...prev, data.photo]);
  //     setPhotoLink('');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const handleDeletePhoto = async (photoName: string) => {
  //   try {
  //     const { data } = await axiosInstance.delete<{ message: string }>(
  //       `/places/photos/${photoName}`
  //     );
  //     console.log(data);

  //     setAddedPhotos((prev) => [...prev.filter((photo) => photo.name !== photoName)]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const handleAddMultiplePhotos = async (e: ChangeEvent<HTMLInputElement>) => {
  //   //single file:
  //   //const file = e.target.files[0];
  //   //const filesData = new FormData();

  //   //filesData.append('photo', file);

  //   //multiple files
  //   //grab chosen files and make an array
  //   const newImgFiles = Array.from(e.target.files || []);
  //   const filesData = new FormData();

  //   for (let i = 0; i < newImgFiles.length; i++) {
  //     filesData.append(`photos`, newImgFiles[i]);
  //   }

  //   try {
  //     //by uploading images server should return array of photos with urls
  //     const { data } = await axiosInstance.post<{ photos: { url: string; name: string }[] }>(
  //       'places/photos',
  //       filesData,
  //       { headers: { 'Content-Type': 'multipart/form-data' } }
  //     );

  //     setAddedPhotos((prev) => [...prev, ...data.photos]);

  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const renderedAddedPhotos = addedPhotos.map((photo) => (
  //   <div key={photo.name} className="w-48 h-32">
  //     <img className="w-full h-full object-cover object-center rounded-2xl" src={photo.url} />
  //     <button
  //       onClick={() => {
  //         handleDeletePhoto(photo.name);
  //       }}
  //     >
  //       remove
  //     </button>
  //   </div>
  // ));

  return (
    <div>
      <div className="flex mb-6">
        <BtnGoBack />
        <h2 className="text-2xl text-center flex-grow">Add new place</h2>
      </div>

      <form onSubmit={onFormSubmit}>
        {/* Tittle */}
        <FormRowInput
          labelText={'Title'}
          type={'text'}
          name={'title'}
          placeholder={'Title of your new place'}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        {/* Address */}
        <FormRowInput
          labelText={'Address'}
          type={'text'}
          name={'address'}
          placeholder={'Country, City, Region, Str...'}
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />

        {/* Upload Photos */}
        <div className="my-4">
          <PhotosUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />
        </div>

        {/* Description */}
        <FormRowInput
          textarea
          labelText={'Description'}
          type={'text'}
          name={'description'}
          placeholder={'Describe your place'}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        {/* Perks */}
        <div className="my-4">
          <Perks selectedPerks={perks} selectPerk={setPerks} />
        </div>

        {/* Extra Info */}
        <FormRowInput
          textarea
          labelText={'Extra Info'}
          pText={'House rules, etc...'}
          type={'text'}
          name={'extraInfo'}
          value={extraInfo}
          onChange={(e) => {
            setExtraInfo(e.target.value);
          }}
        />

        {/* Check In&Out times */}
        <div className="my-4">
          <h2 className="text-xl">Check In&Out times</h2>
          <p className="text-gray-500 text-sm">Add check in check out times</p>

          <div className="grid gap-2 sm:grid-cols-3">
            <div>
              <label htmlFor="checkIn" className="my-2">
                Check In
              </label>
              <input
                id="checkIn"
                name="checkIn"
                type="text"
                placeholder="14:OO"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="checkOut" className="my-2">
                Check Out
              </label>
              <input
                id="checkOut"
                name="checkOut"
                type="text"
                placeholder="10:OO"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="numOfGuests" className="my-2">
                Max Number of Guests
              </label>
              <input
                id="numOfGuests"
                name="numOfGuests"
                type="number"
                placeholder="3"
                value={maxGuests || ''}
                onChange={(e) => setMaxGuests(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="text-center mb-4">
          <button
            type="submit"
            className="inline-flex bg-primary text-white py-2 px-6 rounded-full"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

// function AddNewPhotos() {
//   // to choose image use <input type="file" accept="image/png, image/jpg, image/gif, image/jpeg" onChange(handleChange) />
//   // <input multiple .../> add multiple to give user ability to choose multiple files
//   // to get access to the image or file use e.target.files[0]
//   // to display chosen image in browser use URL.createObjectURL( imgFile ) - it generates relative URL string to the provided object (img...)
//   // <img src={URL.createObjectURL(imgFile)} />
//   const [photoLink, setPhotoLink] = useState('');
//   const [imgFiles, setImgFiles] = useState<File[]>([]);

//   function handleChange(e: ChangeEvent<HTMLInputElement>) {
//     console.log(e.target.files);
//     //const imageObjectUrl = URL.createObjectURL(newIngFile);
//     const newImgFiles = Array.from(e.target.files || []);
//     console.log(e.target.files);

//     setImgFiles((prev) => [...newImgFiles, ...prev]);
//   }

//   const renderedPreviewImgs = imgFiles.map((file) => (
//     <div key={`${file.name}_${file.lastModified}`} className="w-48 h-48">
//       <img className="w-full h-full object-cover" src={URL.createObjectURL(file)} />
//     </div>
//   ));

//   // const imgData = [
//   //   { imageUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg' },
//   //   {
//   //     imageUrl:
//   //       'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
//   //   },
//   //   {
//   //     imageUrl:
//   //       'https://media.istockphoto.com/id/628364522/photo/milky-way-and-silhouette-of-happy-people-on-the-mountain.jpg?s=612x612&w=0&k=20&c=GRItCbH9yrqptZsYEk39u1hG5EWQUE8nJ4DZ-TiQX08=',
//   //   },

//   //   {
//   //     imageUrl:
//   //       'https://media.istockphoto.com/id/1162182240/photo/a-lonely-withered-tree-with-house-under-the-starry-sky.jpg?s=612x612&w=0&k=20&c=T5etvAKL3eyzR6FYV1ffhW2sHUT21CP21qmOZwITT6E=',
//   //   },
//   // ];

//   return (
//     <div>
//       <h2>Add image</h2>
//       <div className="flex gap-2">
//         <div className="">
//           <label className="cursor-pointer  flex gap-1 justify-around bg-transparent text-xl text-gray-600 p-5 border border-gray-300 rounded-2xl">
//             <input
//               type="file"
//               className="hidden"
//               multiple
//               accept="image/png, image/jpg, image/gif, image/jpeg"
//               onChange={handleChange}
//             />
//             <span>Choose</span>
//           </label>
//           <button className="">Save</button>
//         </div>

//         <div className="flex overflow-x-auto w-full">
//           <div className="flex gap-3">{renderedPreviewImgs}</div>
//         </div>
//       </div>
//       {/* ImmagePicker */}
//       <div className="my-4">
//         <label htmlFor="photos" className="text-xl">
//           Photos
//         </label>
//         <div className="flex gap-2">
//           <input
//             type="text"
//             placeholder="Add by pasting link...jpg"
//             value={photoLink}
//             onChange={(e) => setPhotoLink(e.target.value)}
//           />
//           <button className="bg-gray-300 px-4 py-2 rounded-2xl">Add&nbsp;photo</button>
//         </div>

//         <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
//           <button className="flex gap-1 justify-around bg-transparent text-xl text-gray-600 p-5 border border-gray-300 rounded-2xl">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-8 h-8"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
//               />
//             </svg>
//             Upload
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
