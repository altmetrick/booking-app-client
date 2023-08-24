import { useAppDispatch, useAppSelector } from '../../store/store';
import { logout } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.userData);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  return (
    <div className="text-center max-w-lg mx-auto">
      Logged in as {user?.name} ({user?.email})
      <button className="primary max-w-sm mt-4" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
};
