import { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import { PlacePropNameT } from '../types';

type FormRowPropsT = {
  textarea?: boolean;
  labelText: string;
  pText?: string;
  type: HTMLInputTypeAttribute;
  name: PlacePropNameT;
  placeholder?: string;
  value: '' | string | number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};
export const FormRowInput: React.FC<FormRowPropsT> = ({ textarea, labelText, pText, ...rest }) => {
  //default input: - <input />, provide 'textarea' to be <textarea />
  return (
    <div className="my-4">
      <label htmlFor={rest.name} className="text-xl">
        {labelText}
      </label>
      {pText && <p className="text-gray-500 text-sm">{pText}</p>}
      {textarea ? <textarea id={rest.name} {...rest} /> : <input id={rest.name} {...rest} />}
    </div>
  );
};
