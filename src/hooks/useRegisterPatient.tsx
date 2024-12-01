import { useMutation } from "@tanstack/react-query";
import { patientService } from "../Services/HttpService";
import { PatientInfo, RegisterPatientResponse } from "../types/types";

 export const useRegisterPatient = () => {
  return useMutation<RegisterPatientResponse, Error, PatientInfo>({
    mutationFn: async (data: PatientInfo) => {
      const response = await patientService.post("/patientinfo/insertpatientinformation", data);
      return response.data;
    },
  });
};


