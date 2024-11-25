import { useQuery } from '@tanstack/react-query';
import { patientService } from '../Services/HttpService';

interface SettingResponse {
    settingId: number;
    id:number
  value: string;
  color: number; 
  requestType: number;
  wardId: number;
}

const fetchSettings = async (requestType: number, wardId: number): Promise<SettingResponse[]> => {
  try {
    const response = await patientService.post(
      'hissettinges/querysettings',
      {
        requestType,
        wardId,
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
    console.error('Error fetching settings:', error);
    throw error;
  }
};

export const useDataSettings = (requestType: number, wardId: number) => {
  return useQuery<SettingResponse[], Error>({
    queryKey: ['Settings', requestType, wardId],
    queryFn: () => fetchSettings(requestType, wardId),
  });
};
