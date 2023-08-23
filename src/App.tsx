import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';
import { IndexPage } from './pages/IndexPage';
import { LoginPage } from './pages/LoginPage';
import { Layout } from './components/Layout';
import { RegisterPage } from './pages/RegisterPage';
import { PrivateRoutes } from './components/PrivateRoutes';
import { UserPage } from './pages/UserPage';
import { useAppDispatch } from './store/store';
import { checkIsLoggedIn } from './features/user/userSlice';

function App() {
  const dispatch = useAppDispatch();
  dispatch(checkIsLoggedIn());

  return (
    <>
      <Toaster position="top-right" toastOptions={{ style: { fontSize: '1.5rem' } }} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<PrivateRoutes />}>
            <Route path="/user" element={<UserPage />}>
              <Route index element={<div>Account</div>} />
              <Route path="account" element={<div>Account</div>} />
              <Route path="bookings" element={<div>Bookings</div>} />
              <Route path="accommodations" element={<div>Accommodations</div>} />
            </Route>
          </Route>

          <Route index element={<IndexPage />} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/register'} element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
