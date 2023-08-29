export type PhotoT = {
  _id?: string;
  url: string;
  name: string;
};

export type PerkT = 'wifi' | 'parking' | 'entrance' | 'tv' | 'pets' | 'air';

export type PlaceT = {
  _id: string;
  owner: string;
  title: string;
  description: string;
  address: string;
  photos: PhotoT[] | [];
  perks: PerkT[] | [];
  extraInfo: string;
  checkIn: string;
  checkOut: string;
  maxGuests: number;
};

export type PlacePropNameT = Exclude<keyof PlaceT, '_id' | 'owner'>;