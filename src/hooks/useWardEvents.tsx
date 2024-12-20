/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseData } from '../types/types';
import { wardService } from '../Services/HttpService';
import { useQuery } from '@tanstack/react-query';

const fetchWardEventsDetails = async (
  page: number,
  count: number,
  year: number | null,
  month: number | null,
  wardName: string,
  isInitialLoad: boolean,
  status?: number
): Promise<ResponseData> => {
  try {
    const filter: any = {};

    if (!isInitialLoad) {
      if (year) filter.year = year ?? 0;
      if (month) filter.month = month ?? 0;
      if (wardName) filter.wardId = Number(wardName) || 0;
      if (status !== undefined) filter.status = status; 
    }

    const filterToSend = Object.keys(filter).length > 0 ? filter : undefined;

    const response = await wardService.post(
      '/nurse/getevents',
      {
        page,
        count,
        filter: filterToSend,
        getWardDetail: true,
        getRoomDetail: true,
        myVersion: 'f1.0.1',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching ward events:', error);
    throw error;
  }
};

export const useWardEvents = (
  page: number,
  count: number = 10,
  year: number | null,
  month: number | null,
  wardName: string,
  isInitialLoad: boolean,
  status?: number 
) => {
  return useQuery<ResponseData, Error>({
    queryKey: ['wardEvents', page, count, year, month, wardName, status],
    queryFn: () =>
      fetchWardEventsDetails(page, count, year, month, wardName, isInitialLoad, status),
  });
};

