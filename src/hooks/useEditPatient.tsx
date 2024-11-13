import { useMutation } from '@tanstack/react-query';
import { RegisterPatientData, RegisterPatientResponse } from '../types/types';
import { patientService } from '../Services/HttpService';

const useUpdatePatientMutation = () => {
    return useMutation<RegisterPatientResponse, Error, RegisterPatientData>({
        mutationFn: async (data: RegisterPatientData) => {
          const response = await patientService.put("/patientinfo/updatepatientinformation", data);
          return response.data;
        },
      onSuccess: () => {
        console.error('Error updating patient information:');

      },
      onError: (error) => {
        console.error('Error updating patient information:', error);

      },
    });
};

export default useUpdatePatientMutation;
