import { Link } from 'react-router-dom';

export const MyPlacesList = () => {
  return (
    <div>
      <div>
        Place 1
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste nihil atque labore nam eius
          dolor, voluptatum odit sint{' '}
        </p>
      </div>
      <div>
        Place 1
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste nihil atque labore nam eius
          dolor, voluptatum odit sint{' '}
        </p>
      </div>
      <div>
        Place 1
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste nihil atque labore nam eius
          dolor, voluptatum odit sint{' '}
        </p>
      </div>
      <div className="text-center">
        <Link to={'new'} className="inline-flex bg-primary text-white py-2 px-6 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
          </svg>
          Add new place
        </Link>
      </div>
    </div>
  );
};
