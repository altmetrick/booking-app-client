import { perksOptions } from '../utils/perks-options';
import { PerkT } from '../types';

type PropsT = {
  placePerks: PerkT[];
};

export const DisplayPerks: React.FunctionComponent<PropsT> = ({ placePerks }) => {
  const renderedPlacePerks = perksOptions.map((perk) => {
    if (placePerks.includes(perk.name)) {
      return (
        <div key={perk.name} className="flex gap-2 mb-2">
          {perk.icon()}
          <span>{perk.label}</span>
        </div>
      );
    }
  });
  return <>{renderedPlacePerks}</>;
};
