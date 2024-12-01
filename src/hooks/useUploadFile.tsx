import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpDownService } from "../Services/HttpService";
import { UploadFileParams, UploadFileResponse } from "../types/types";

const uploadFile = async ({ file, packageName }: UploadFileParams): Promise<UploadFileResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await UpDownService.post(`/File/UploadFile?Package=${packageName}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

const useUploadFile = () => {
  const queryClient = useQueryClient();

  return useMutation<UploadFileResponse, Error, UploadFileParams>({
    mutationFn: uploadFile,
    onSuccess: (data, variables) => {
      if (data.resualt === true) {
        queryClient.invalidateQueries({
          queryKey: ["versionList", variables.packageName], 
        });
      }
    },
    onError: (error) => {
      console.error("Error uploading file:", error.message);
    },
  });
};

export default useUploadFile;
