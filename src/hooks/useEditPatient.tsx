import { useMutation } from '@tanstack/react-query';
import { PatientInfo, RegisterPatientResponse } from '../types/types';
import { patientService } from '../Services/HttpService';

const useUpdatePatientMutation = (patientData: PatientInfo) => {
  return useMutation<RegisterPatientResponse, Error, PatientInfo>({
    
    mutationFn: async (data: PatientInfo) => {
      console.log("Sending data to API:", patientData);
      const response = await patientService.put("/patientinfo/updatepatientinformation", data);
      console.log("Response from API:", response.data);
      return response.data;
    },
  });
};


export default useUpdatePatientMutation;
