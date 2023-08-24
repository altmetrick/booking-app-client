import { ChangeEvent, HTMLInputTypeAttribute, useState } from 'react';
import { BtnGoBack } from './buttons/BtnGoBack';

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
        {/* <label
          htmlFor="wifi"
          className="cursor-pointer flex gap-2 items-center justify-center p-4  border border-gray-300 rounded-2xl"
        >
          <input id="wifi" type="checkbox" />
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
          <span>WiFi</span>
        </label>

        <label
          htmlFor="parking"
          className="cursor-pointer flex gap-2 items-center justify-center p-4  border border-gray-300 rounded-2xl"
        >
          <input id="parking" type="checkbox" />
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
          <span>Parking spot</span>
        </label>

        <label
          htmlFor="entrance"
          className="cursor-pointer flex gap-2 items-center justify-center p-4  border border-gray-300 rounded-2xl"
        >
          <input id="entrance" type="checkbox" />
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

          <span>Private entrance</span>
        </label>

        <label
          htmlFor="tv"
          className="cursor-pointer flex gap-2 items-center justify-center p-4  border border-gray-300 rounded-2xl"
        >
          <input id="tv" type="checkbox" />
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
          <span>TV</span>
        </label>

        <label
          htmlFor="pets"
          className="cursor-pointer flex gap-2 items-center justify-center p-4  border border-gray-300 rounded-2xl"
        >
          <input id="pets" type="checkbox" />
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
          <span>Pets allowed</span>
        </label>

        <label
          htmlFor="air_condition"
          className="cursor-pointer flex gap-2 items-center justify-center p-4  border border-gray-300 rounded-2xl"
        >
          <input id="air_condition" type="checkbox" />
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
          <span>Air Conditioning</span>
        </label> */}
      </div>
    </>
  );
};

export const AddNewPlace = () => {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState('');
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState('');

  return (
    <div>
      <div className="flex mb-6">
        <BtnGoBack />
        <h2 className="text-2xl text-center flex-grow">Add new place</h2>
      </div>

      <form>
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
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add by pasting link...jpg"
              value={photoLink}
              onChange={(e) => setPhotoLink(e.target.value)}
            />
            <button className="bg-gray-300 px-4 py-2 rounded-2xl">Add&nbsp;photo</button>
          </div>

          <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <button className="flex gap-1 justify-around bg-transparent text-xl text-gray-600 p-5 border border-gray-300 rounded-2xl">
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
            </button>
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
          <Perks
            selectedPerks={perks}
            onChange={() => {
              console.log('first');
            }}
          />
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
