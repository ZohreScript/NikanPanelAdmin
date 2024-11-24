import { useMutation } from "@tanstack/react-query";
import { patientService } from "../Services/HttpService";
import { RegisterPatientData, RegisterPatientResponse } from "../types/types";

 export const useRegisterPatient = () => {
  return useMutation<RegisterPatientResponse, Error, RegisterPatientData>({
    mutationFn: async (data: RegisterPatientData) => {
      const response = await patientService.post("/patientinfo/insertpatientinformation", data);
      return response.data;
    },
  });
};


