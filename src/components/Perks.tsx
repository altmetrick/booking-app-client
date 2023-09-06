import { ChangeEvent } from 'react';
import { PerkT } from '../types';
import { perksOptions } from '../utils/perks-options';

type PerksPropsT = {
  selectedPerks: PerkT[];
  selectPerk: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Perks: React.FC<PerksPropsT> = ({ selectedPerks, selectPerk }) => {
  const renderedPerks = perksOptions.map((perk) => (
    <label
      key={perk.name}
      htmlFor={perk.name}
      className="cursor-pointer flex gap-2 items-center justify-center p-4  border border-gray-300 rounded-2xl"
    >
      <input
        id={perk.name}
        name={perk.name}
        type="checkbox"
        checked={selectedPerks.includes(perk.name)}
        onChange={selectPerk}
      />
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
