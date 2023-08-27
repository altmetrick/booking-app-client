import { ChangeEvent, FormEvent, HTMLInputTypeAttribute, useState } from 'react';
import { BtnGoBack } from './buttons/BtnGoBack';
import { axiosInstance } from '../features/api/axios-instance';

type FormRowPropsT = {
  textarea?: boolean;
  labelText: string;
  pText?: string;
  type: HTMLInputTypeAttribute;
  name: string;
  placeholder?: string;
  value: '' | string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};
const FormRowInput: React.FC<FormRowPropsT> = ({ textarea, labelText, pText, ...rest }) => {
  //default input: - <input />, provide 'textarea' to be <textarea />
  return (
    <div className="my-4">
      <label htmlFor={rest.name} className="text-xl">
        {labelText}
      </label>
      {pText && <p className="text-gray-500 text-sm">{pText}</p>}
      {textarea ? <textarea {...rest} /> : <input {...rest} />}
    </div>
  );
};

type PerksPropsT = {
  selectedPerks: string[];
  onChange: () => void;
};
const Perks: React.FC<PerksPropsT> = () => {
  const perksOptions = [
    {
      label: 'WiFi',
      name: 'wifi',
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
          />
        </svg>
      ),
    },
    {
      label: 'Parking spot',
      name: 'parking',
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      ),
    },
    {
      label: 'Private entrance',
      name: 'entrance',
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
      ),
    },
    {
      label: 'TV',
      name: 'tv',
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
          />
        </svg>
      ),
    },
    {
      label: 'Pets',
      name: 'pets',
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      ),
    },
    {
      label: 'Air conditioning',
      name: 'air',
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>
      ),
    },
  ];

  const renderedPerks = perksOptions.map((perk) => (
    <label
      key={perk.name}
      htmlFor={perk.name}
      className="cursor-pointer flex gap-2 items-center justify-center p-4  border border-gray-300 rounded-2xl"
    >
      <input id={perk.name} type="checkbox" />
      {perk.icon()}
      <span>{perk.label}</span>
    </label>
  ));

  return (
    <>
      <h2 className="text-xl">Perks</h2>
      <p className="text-gray-500 text-sm">Select all the perks for your place</p>
      <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {renderedPerks}
      </div>
    </>
  );
};

export const AddNewPlace = () => {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState<{ url: string; name: string }[] | []>([]);
  const [photoLink, setPhotoLink] = useState('');
  const [description, setDescription] = useState('');
  //const [perks, setPerks] = useState<string[]>([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState('');

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
    <div key={photo.name} className="w-48 h-30">
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
          <label htmlFor="photos" className="text-xl">
            Photos
          </label>
          {/* upload photo by link */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add by link...jpg"
              value={photoLink}
              onChange={(e) => setPhotoLink(e.target.value)}
            />
            <button className="bg-gray-300 px-4 py-2 rounded-2xl" onClick={handleAddPhotoByLink}>
              Add&nbsp;photo
            </button>
          </div>

          {/* upload photo by choosing form own storage */}
          <div className="mt-2 grid grid-cols-[auto,1fr] gap-2">
            <label
              htmlFor="photos"
              className="cursor-pointer w-40 h-48 flex gap-1 justify-around items-center bg-transparent text-xl text-gray-600 p-5 border border-gray-300 rounded-2xl"
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
          <Perks selectedPerks={[]} onChange={() => {}} />
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
              <label className="my-2">Check In</label>
              <input
                type="text"
                placeholder="14:OO"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div>
              <label className="my-2">Check Out</label>
              <input
                type="text"
                placeholder="10:OO"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div>
              <label className="my-2">Max Number of Guests</label>
              <input
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
