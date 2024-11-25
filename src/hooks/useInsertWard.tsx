import { useMutation } from "@tanstack/react-query";
import { wardService } from "../Services/HttpService";

export interface InsertWardData {
  wardName: string;
  wardId: number;
  description: string;
}

export interface InsertWardResponse {
  success: boolean;
  message: string;
}

export const useInsertWard = () => {
  return useMutation<InsertWardResponse, Error, InsertWardData>({
    mutationFn: async (data: InsertWardData) => {
      const response = await wardService.post("/nurse/insertward", data);
      return response.data;
    },
  });
};
