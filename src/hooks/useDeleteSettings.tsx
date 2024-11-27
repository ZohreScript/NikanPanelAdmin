import { useMutation } from "@tanstack/react-query";
import {  patientService } from "../Services/HttpService";

export interface DeleteSettingsData {
  id: number; 
}

export interface DeleteSettingsResponse {
  success: boolean;
  message: string;
}

export const useDeleteSettings = () => {
  return useMutation<DeleteSettingsResponse, Error, DeleteSettingsData>({
    mutationFn: async (data: DeleteSettingsData) => {
      const response = await patientService.delete("/hissettinges/deletesettings", {
        data, 
      });

      return response.data; 
    },
  });
};
