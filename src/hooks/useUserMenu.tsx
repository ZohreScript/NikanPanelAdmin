import { useQuery } from "@tanstack/react-query";

import { authService } from "../Services/HttpService";
import { MenuItem } from '../types/types'; 



const fetchUserMenu = async (): Promise<MenuItem[]> => {
  const { data } = await authService.get("/menu/getusermenu");
  return data.items;
};

export const useUserMenu = (isAuthenticated: boolean) => {
  return useQuery<MenuItem[], Error>({
    queryKey: ['userMenu'],
    queryFn: fetchUserMenu,
    enabled: isAuthenticated, 
  }); }