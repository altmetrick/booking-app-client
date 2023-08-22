import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';
import { IndexPage } from './pages/IndexPage';
import { LoginPage } from './pages/LoginPage';
import { Layout } from './components/Layout';
import { RegisterPage } from './pages/RegisterPage';

function App() {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ style: { fontSize: '1.5rem' } }} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/register'} element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
