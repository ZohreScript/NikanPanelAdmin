// useWardEvents.ts
import { WardEventDetail } from '../types/types';
import { wardService } from '../Services/HttpService';
import { useQuery } from '@tanstack/react-query';

const fetchWardEventsDetails = async (page: number, count: number): Promise<{ wardEventsDetailes: WardEventDetail[], total: number }> => {
  try {
    const response = await wardService.post(
      '/nurse/getevents',
      {
        page,
        count,
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

    return {
      wardEventsDetailes: response.data.wardEventsDetailes,
      total: response.data.total
    };
  } catch (error) {
    console.error('Error fetching ward events:', error);
    throw error;
  }
};

export const useWardEvents = (page: number, count: number = 10) => {
  return useQuery<{ wardEventsDetailes: WardEventDetail[], total: number }, Error>({
    queryKey: ['wardEvents', page, count],
    queryFn: () => fetchWardEventsDetails(page, count),
  });
};
