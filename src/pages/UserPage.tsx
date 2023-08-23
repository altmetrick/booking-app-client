import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/store';

export const UserPage = () => {
  const isLoading = useAppSelector((state) => state.user.isLoading);

  let content;

  if (isLoading) {
    content = 'Loading...';
  } else {
    content = (
      <>
        <Outlet />
      </>
    );
  }

  const { pathname } = useLocation();

  // '/user' '/user/account;
  // '/user/bookings';
  // '/user/accommodation'

  const links = [
    { label: 'Account', path: '/user/account' },
    { label: 'My Bookings', path: '/user/bookings' },
    { label: 'My Accommodations', path: '/user/accommodations' },
  ];
  const renderedLinks = links.map((link) => {
    const isActiveStyle =
      link.path === pathname
        ? 'bg-primary text-white rounded-full transition duration-300 ease-out'
        : '';
    return (
      <Link key={link.label} to={link.path} className={`py-2 px-6 ${isActiveStyle}`}>
        {link.label}
      </Link>
    );
  });
  // bg-primary text-white rounded-full

  return (
    <div>
      <nav className="w-full mt-8 flex gap-2 justify-center">{renderedLinks}</nav>
      {content}
    </div>
  );
};
