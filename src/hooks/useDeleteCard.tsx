import { useMutation } from "@tanstack/react-query";
import { wardService } from "../Services/HttpService";

export interface DeleteCardData {
  id: number;
}

export interface DeleteCardResponse {
  success: boolean;
  message: string;
}

export const useDeleteCard = () => {
  return useMutation<DeleteCardResponse, Error, DeleteCardData>({
    mutationFn: async (data: DeleteCardData) => {
      const response = await wardService.delete("/rfid/deletecard", {
        data,
      });
      return response.data;
    },
  });
};
