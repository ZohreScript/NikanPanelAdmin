import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '../Services/HttpService';

// Define types for the login data and response
interface LoginData {
  username: string; // Ensure this matches the object structure
  password: string;
}

interface LoginResponse {
  item: {
    token: string;
    // Include other properties from the response as needed
  };
}

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation<LoginResponse, Error, LoginData>({
    mutationFn: async (loginData) => {
      const response = await authService.post<LoginResponse>('/auth/loginbypassword', loginData);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Login failed');
      }
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.item.token);
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });
};
