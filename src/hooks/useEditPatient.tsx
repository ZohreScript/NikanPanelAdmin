import { useMutation } from '@tanstack/react-query';
import { RegisterPatientData, RegisterPatientResponse } from '../types/types';
import { patientService } from '../Services/HttpService';

const useUpdatePatientMutation = (patientData: RegisterPatientData) => {
  return useMutation<RegisterPatientResponse, Error, RegisterPatientData>({
    
    mutationFn: async (data: RegisterPatientData) => {
      console.log("Sending data to API:", patientData);
      const response = await patientService.put("/patientinfo/updatepatientinformation", data);
      console.log("Response from API:", response.data);
      return response.data;
    },
  });
};


export default useUpdatePatientMutation;
