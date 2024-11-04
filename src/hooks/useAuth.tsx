import { useEffect } from 'react';
import { useAppContext } from '../context/app/App-context';

export const useAuth = (navigate: (path: string) => void) => {
  const { setAuthenticated } = useAppContext();

  const checkToken = (): void => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
      navigate('/dashboard'); // Redirect to dashboard if token exists
    } else {
      setAuthenticated(false);
      navigate('/login'); // Redirect to login if no token found
    }
  };

  const logout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    setAuthenticated(false); // Update the auth state
    navigate('/login'); // Redirect to login
  };

  useEffect(() => {
    checkToken(); // Call checkToken on mount
  }, []); // Run only once on mount

  return { checkToken, logout };
};
