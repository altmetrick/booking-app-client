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
      <h3>
        Logged in as {user?.name} ({user?.email})
      </h3>

      <button className="primary max-w-sm mt-4 mx-auto" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
};
