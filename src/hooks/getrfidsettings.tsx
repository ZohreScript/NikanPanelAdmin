import { useQuery } from "@tanstack/react-query";
import { patientService } from "../Services/HttpService";

export interface RFIDSettings {
  showFiledOnlyWhitsRFID: boolean;
  wardId: number;
  rFIDSettings: {
    settingId: number;
    title: string;
    value: boolean;
  }[];
}

export const useGetRFIDSettings = () => {
  return useQuery<RFIDSettings, Error>({
    queryKey: ["rfidsettings"],
    queryFn: async () => {
      const response = await patientService.post("/rfidsettings/getrfidsettings");
      return response.data; 
    },
  });
};
