// useAuth.ts
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();

  const checkToken = (): void => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  };

  return { checkToken };
};
