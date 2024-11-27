import { useMutation } from "@tanstack/react-query";
import {  wardService } from "../Services/HttpService"; 
export interface InsertSettingsData {
  settingId: number;
  color: number;
  value: string;
  requestType: number;
  wardId: number;
}

export interface InsertSettingsResponse {
  success: boolean;
  message: string;
}

export const useWardlist = () => {
  return useMutation<InsertSettingsResponse, Error, InsertSettingsData>({
    mutationFn: async (data: InsertSettingsData) => {
      const response = await wardService.post("/nurse/insertward", data);
      return response.data;
    },
  });
};
