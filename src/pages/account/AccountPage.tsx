import { NavLink, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/store';

export const AccountPage = () => {
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

  const navLinks = [
    {
      label: 'My Profile',
      path: '/account/profile',
      icon: () => (
        <>
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
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </>
      ),
    },
    {
      label: 'My Bookings',
      path: '/account/bookings',
      icon: () => (
        <>
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
              d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
            />
          </svg>
        </>
      ),
    },
    {
      label: 'My Places',
      path: '/account/places',
      icon: () => (
        <>
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
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </>
      ),
    },
  ];

  const renderedNavLinks = navLinks.map((link) => {
    const activeStyle = 'bg-primary text-white  transition duration-300 ease-out';
    const notActiveStyle = 'bg-gray-200';
    return (
      <NavLink
        key={link.label}
        to={link.path}
        className={({ isActive }) =>
          `inline-flex gap-1 py-2 px-6 rounded-full ${isActive ? activeStyle : notActiveStyle}`
        }
      >
        {link?.icon()}
        {link.label}
      </NavLink>
    );
  });

  return (
    <div>
      <nav className="w-full my-8 flex gap-2 justify-center ">{renderedNavLinks}</nav>
      {content}
    </div>
  );
};
