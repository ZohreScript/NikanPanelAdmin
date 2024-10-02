// src/App.tsx
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { useUserMenu } from './hooks/useUserMenu';
import { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { data: fetchedMenuItems, isLoading, error } = useUserMenu(isAuthenticated);
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  // Loading and error handling for fetching menu items
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading menu</div>;

  return <RouterProvider router={router(isAuthenticated, fetchedMenuItems || [])} />;
};

export default App;
