import { ChangeEvent, FormEvent } from 'react';
import { BtnGoBack } from './buttons/BtnGoBack';

import { FormRowInput } from './FormRowInput';
import { Perks } from './Perks';
import { PhotosUploader } from './PhotosUploader';
import { PerkT, PlacePropNameT } from '../types';

import { toast } from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '../store/store';
import {
  createPlace,
  handlePlaceInputChange,
  togglePerks,
} from '../features/place/singlePlaceSlice';
import { useNavigate } from 'react-router-dom';

export const AddNewPlace = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.singlePlace.status);
  const { title, address, photos, description, perks, extraInfo, checkIn, checkOut, maxGuests } =
    useAppSelector((state) => state.singlePlace);

  const handleChangePlaceInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as PlacePropNameT;
    const value = e.target.value;
    dispatch(handlePlaceInputChange({ name, value }));
  };
  const handleTogglePerk = (e: ChangeEvent<HTMLInputElement>) => {
    //   // alert(`${e.target.name}  ${e.target.value} ${e.target.checked}`);
    const { name, checked } = e.target as { name: PerkT; checked: boolean };
    dispatch(togglePerks({ name, checked }));
  };

  const handleCreateNewPlace = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const placeData = {
      title,
      description,
      address,
      photos,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };

    const canSave =
      !!title &&
      !!description &&
      !!address &&
      !!photos.length &&
      !!extraInfo &&
      !!checkIn &&
      !!checkOut &&
      !!maxGuests;

    if (!canSave) {
      toast.error('Fill out all fields!');
      return;
    }

    await dispatch(createPlace(placeData));

    if (status === 'success') {
      navigate('/account/places');
    }
  };

  return (
    <div>
      <div className="flex mb-6">
        <BtnGoBack />
        <h2 className="text-2xl text-center flex-grow">Add new place</h2>
      </div>

      <form onSubmit={handleCreateNewPlace}>
        <FormRowInput
          labelText={'Title'}
          type={'text'}
          name={'title'}
          placeholder={'Title of your new place'}
          value={title}
          onChange={handleChangePlaceInput}
        />

        <FormRowInput
          labelText={'Address'}
          type={'text'}
          name={'address'}
          placeholder={'Country, City, Region, Str...'}
          value={address}
          onChange={handleChangePlaceInput}
        />

        <div className="my-4">
          <PhotosUploader photos={photos} />
        </div>

        <FormRowInput
          labelText={'Description'}
          textarea
          type={'text'}
          name={'description'}
          placeholder={'Describe your place'}
          value={description}
          onChange={handleChangePlaceInput}
        />

        <div className="my-4">
          <Perks selectedPerks={perks} selectPerk={handleTogglePerk} />
        </div>

        <FormRowInput
          labelText={'Extra Info'}
          textarea
          pText={'House rules, etc...'}
          type={'text'}
          name={'extraInfo'}
          value={extraInfo}
          onChange={handleChangePlaceInput}
        />

        {/* Check In&Out times */}
        <div className="my-4">
          <h2 className="text-xl">Check In&Out times</h2>
          <p className="text-gray-500 text-sm">Add check in check out times</p>

          <div className="grid gap-2 sm:grid-cols-3">
            <FormRowInput
              labelText={'Check In'}
              placeholder={'12:00'}
              type={'text'}
              name={'checkIn'}
              value={checkIn}
              onChange={handleChangePlaceInput}
            />
            <FormRowInput
              labelText={'Check Out'}
              placeholder={'15:00'}
              type={'text'}
              name={'checkOut'}
              value={checkOut}
              onChange={handleChangePlaceInput}
            />
            <FormRowInput
              labelText={'Max Number of Guests'}
              type={'number'}
              name={'maxGuests'}
              value={maxGuests}
              onChange={handleChangePlaceInput}
            />
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};
