import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { register } from '../features/user/userSlice';
import toast from 'react-hot-toast';

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuth, isLoading } = useAppSelector((state) => state.user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = { name, email, password };

    if (!name || !email || !password) {
      toast.error('Please fill out all fields!');
      return;
    }

    await dispatch(register(userData)).unwrap();
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={handleRegister}>
          <input type="text" placeholder="John Doe" value={name} onChange={handleNameChange} />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button className="primary">{isLoading ? 'Loading' : 'Register'}</button>
        </form>
        <div className="text-center py-2 text-gray-500">
          Already registered?{' '}
          <Link className="underline text-black" to={'/login'}>
            Login now
          </Link>
        </div>
      </div>
    </div>
  );
};
