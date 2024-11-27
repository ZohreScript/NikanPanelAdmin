import { useMutation } from "@tanstack/react-query";
import { patientService } from "../Services/HttpService";

export interface RFIDSetting {
  settingId: number;
  title: string;
  value: boolean;
}

export interface InsertRFIDSettingsResponse {
  resualt: boolean;
  msg: string;
  data: string;
}

export const useInsertRFIDSettings = () => {
  return useMutation<InsertRFIDSettingsResponse, Error, RFIDSetting[]>({
    mutationFn: async (data: RFIDSetting[]) => {
      const response = await patientService.post("/rfidsettings/insertrfidsettings", {
        showFiledOnlyWhitsRFID: true,
        rFIDSettings: data,
      });
      return response.data;
    },
  });
};
