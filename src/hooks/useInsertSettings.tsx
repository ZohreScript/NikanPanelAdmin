import { useMutation } from "@tanstack/react-query";
import { patientService } from "../Services/HttpService"; 
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

export const useInsertSettings = () => {
  return useMutation<InsertSettingsResponse, Error, InsertSettingsData>({
    mutationFn: async (data: InsertSettingsData) => {
      const response = await patientService.post("/hissettinges/insertsettings", data);
      return response.data;
    },
  });
};
