import { useQuery } from "@tanstack/react-query";
import { wardService } from "../Services/HttpService";

export interface CardItem {
  id: number;
  readerRFIDcode: string;
  oPtimazeRFIDcode: string;
  userName: string;
  userIDinHIS: string;
  codeMelli: string;
  codePersoneli: string;
  wardIDs: number[];
  acssessLevel: string;
}

const fetchCardList = async (): Promise<CardItem[]> => {
  const { data } = await wardService.post("/rfid/getcards", {});
  return data;
};

export const useCardList = (isAuthenticated: boolean) => {
  return useQuery<CardItem[], Error>({
    queryKey: ["cardList"],
    queryFn: fetchCardList,
    enabled: isAuthenticated,
  });
};
