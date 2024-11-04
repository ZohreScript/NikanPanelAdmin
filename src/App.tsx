import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { useUserMenu } from './hooks/useUserMenu';
import { useEffect } from 'react';
import { useAppContext } from './context/app/App-context';

const App: React.FC = () => {
  const { isAuthenticated, setAuthenticated } = useAppContext();
  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuthenticated(!!token); 
  }, []);
  
  const { data: fetchedMenuItems, isLoading, error } = useUserMenu(isAuthenticated);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading menu</div>;

  return <RouterProvider router={router(isAuthenticated, fetchedMenuItems || [])} />;
};

export default App;
