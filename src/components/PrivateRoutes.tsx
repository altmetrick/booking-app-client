import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import { useEffect } from 'react';

export const PrivateRoutes = () => {
  const navigate = useNavigate();

  const { isAuth, isLoading } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!isAuth && !isLoading) {
      navigate('/login');
    }
  }, [isAuth, isLoading, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
};
