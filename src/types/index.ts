export type PhotoT = {
  _id?: string;
  url: string;
  name: string;
};

export type PerkT = 'wifi' | 'parking' | 'entrance' | 'tv' | 'pets' | 'air';

export interface PerkOptionT {
  label: string;
  name: PerkT;
  icon: () => JSX.Element | null;
}

export type PlaceT = {
  _id?: string;
  owner?: string;
  title: string;
  description: string;
  address: string;
  photos: PhotoT[];
  perks: PerkT[];
  extraInfo: string;
  checkIn: string;
  checkOut: string;
  maxGuests: number;
  price: number;
  bookingRanges?: { start: string; end: string }[];
};
//export type PlaceDataT = Pick<PlaceT, Exclude<keyof PlaceT,  | 'owner'>>;
export type PlaceDataT = PlaceT;
export type PlacePropNameT = Exclude<keyof PlaceT, '_id' | 'owner' | 'photos' | 'perks'>;

export type BookingT = {
  _id?: string;
  place: PlaceT;
  bookedBy: string;
  checkIn: string;
  checkOut: string;
  name: string;
  phone: number;
  price: number;
};

export type BookingDataT = {
  place: string;
  checkIn: string;
  checkOut: string;
  name: string;
  phone: number;
  price: number;
};

export type StatusT = 'idle' | 'loading' | 'success' | 'failed';
