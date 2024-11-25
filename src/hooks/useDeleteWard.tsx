import { useMutation } from "@tanstack/react-query";
import { wardService } from "../Services/HttpService";

export interface DeleteSettingsData {
  id: number;
}

export interface DeleteSettingsResponse {
  success: boolean;
  message: string;
}

export const useDeleteSettings = () => {
  return useMutation<DeleteSettingsResponse, Error, DeleteSettingsData>({
    mutationFn: async (data: DeleteSettingsData) => {
      const response = await wardService.delete("/nurse/deleteward", {
        data,
      });
      return response.data;
    },
  });
};
