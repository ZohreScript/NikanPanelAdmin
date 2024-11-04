// useWardList.ts
import { useQuery } from "@tanstack/react-query";
import { WardItem } from "../types/types";
import { wardService } from "../Services/HttpService";

const fetchWardList = async (): Promise<WardItem[]> => {
  const { data } = await wardService.post("/nurse/getward", {});
  return data;
};

export const useWardList = (isAuthenticated: boolean) => {
  return useQuery<WardItem[], Error>({
    queryKey: ["wardList"],
    queryFn: fetchWardList,
    enabled: isAuthenticated,
  });
};
