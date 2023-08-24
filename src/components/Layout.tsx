import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen px-6 py-4 max-w-5xl mx-auto">
      <Header />
      <Outlet />
    </div>
  );
};
