// useUserMenu.ts
import { useQuery } from "@tanstack/react-query";
import { authService } from "../Services/HttpService";

// Define types for the menu items and the response
interface MenuItem {
  id: string; // Adjust based on your API response structure
  title: string; // Adjust based on your API response structure
  url?: string; // Optional if not every item has a URL
  subMenus?: MenuItem[]; // Optional submenus
}

interface UserMenuResponse {
  items: MenuItem[];
}

const fetchUserMenu = async (): Promise<MenuItem[]> => {
  const { data } = await authService.get<UserMenuResponse>("/menu/getusermenu");
  return data.items;
};

export const useUserMenu = () => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token; // Check if token exists

  return useQuery<MenuItem[], Error>({
    queryKey: ['userMenu'],
    queryFn: fetchUserMenu,
    enabled: isAuthenticated, // Only fetch if authenticated
  }); 
}; 
