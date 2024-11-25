import { useMutation } from "@tanstack/react-query";
import { wardService } from "../Services/HttpService";

export interface InsertCardData {
  readerRFIDcode: string;
  oPtimazeRFIDcode: string;
  userName: string;
  userIDinHIS: string;
  codeMelli: string;
  codePersoneli: string;
  wardIDs: number[];
  acssessLevel: string;
}

export interface InsertCardResponse {
  success: boolean;
  message: string;
}

export const useInsertCard = () => {
  return useMutation<InsertCardResponse, Error, InsertCardData>({
    mutationFn: async (data: InsertCardData) => {
      const response = await wardService.post("/rfid/insertcard", data);
      return response.data;
    },
  });
};
