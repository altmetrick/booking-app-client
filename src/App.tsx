import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';
import { IndexPage } from './pages/IndexPage';
import { LoginPage } from './pages/LoginPage';
import { Layout } from './components/Layout';
import { RegisterPage } from './pages/RegisterPage';
import { PrivateRoutes } from './components/PrivateRoutes';
import { AccountPage } from './pages/account/AccountPage';
import { useAppDispatch } from './store/store';
import { checkIsLoggedIn } from './features/user/userSlice';
import { ProfilePage } from './pages/account/ProfilePage';
import { BookingsPage } from './pages/account/BookingsPage';
import { PlacesPage } from './pages/account/PlacesPage';
import { NewPlaceForm } from './components/NewPlaceForm';
import { MyPlacesList } from './components/MyPlacesList';
import { SinglePlace } from './components/SinglePlace';

function App() {
  const dispatch = useAppDispatch();
  dispatch(checkIsLoggedIn());

  return (
    <>
      <Toaster position="top-right" toastOptions={{ style: { fontSize: '1.5rem' } }} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/all-places/:placeId" element={<SinglePlace />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/account" element={<AccountPage />}>
              <Route index element={<ProfilePage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="bookings" element={<BookingsPage />} />

              <Route path="places" element={<PlacesPage />}>
                <Route index element={<MyPlacesList />} />
                <Route path="new" element={<NewPlaceForm />} />
                {/* <Route path=":placeId" element={<SinglePlace />} /> */}
                <Route path="edit/:placeId" element={<NewPlaceForm />} />
              </Route>
            </Route>
          </Route>

          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/register'} element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
