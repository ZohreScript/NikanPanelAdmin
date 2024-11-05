
import { ResponseData } from '../types/types';
import { wardService } from '../Services/HttpService';
import { useQuery } from '@tanstack/react-query';

const fetchWardEventsDetails = async (page: number, count: number, year: number, month: number,wardName:string): Promise<ResponseData> => {
  try {
    const response = await wardService.post(
      '/nurse/getevents',
      {
        page,
        count,
        year, 
        month,
        wardName,
        getWardDetail: true,
        getRoomDetail: true,
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

export const useWardEvents = (page: number, count: number = 10, year:
  number, month: number, wardName: string) => {
  return useQuery<ResponseData, Error>({
    queryKey: ['wardEvents', page, count, year, month, wardName],
    queryFn: () => fetchWardEventsDetails(page, count, year, month,wardName),
  });
};