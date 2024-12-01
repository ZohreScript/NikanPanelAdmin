import { useQuery } from "@tanstack/react-query";
import { UpDownService } from "../Services/HttpService";

type VersionItem = {
  description: string | null;
  isSelected: boolean;
  fileName: string;
  sizeAsByte: number;
  sizeSuffix: string;
  createTime: string;
  persianTime: string;
  versionName: string;
  appPackageName: string | null;
  filePath: string | null;
};

const fetchVersionList = async (packageName: string): Promise<VersionItem[]> => {
  const { data } = await UpDownService.post(`/Download/VersionList?package=${packageName}`);
  return data.data; 
};

export const useVersionList = (packageName: string, isAuthenticated: boolean) => {
  return useQuery<VersionItem[], Error>({
    queryKey: ["versionList", packageName],
    queryFn: () => fetchVersionList(packageName),
    enabled: isAuthenticated && packageName !== "",
  });
};
