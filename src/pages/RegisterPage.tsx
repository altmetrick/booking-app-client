import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto">
          <input type="text" placeholder="John Doe" />
          <input type="email" placeholder="your@email.com" />
          <input type="password" placeholder="password" />
          <button className="primary">Login</button>
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
