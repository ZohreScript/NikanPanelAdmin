


import { PatientInfoResponse } from '../types/types';
import { patientService } from '../Services/HttpService';
import { useQuery } from '@tanstack/react-query';

const fetchPatientInformations= async (page: number, count: number): Promise<PatientInfoResponse> => {
  try {
    const response = await patientService.post(
      '/patientinfo/getpatientinformations',
      {
        page,
        count,
        myVersion: "f1.0.1"
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Response Data:', response.data);

    return response.data; 
  } catch (error) {
    console.error('Error fetching ward events:', error);
    throw error;
  }
};

export const usePatientInformations = (page: number, count: number = 10) => {
  return useQuery<PatientInfoResponse, Error>({
    queryKey: ['PatientInfos', page, count],
    queryFn: () => fetchPatientInformations(page, count),
  });
};