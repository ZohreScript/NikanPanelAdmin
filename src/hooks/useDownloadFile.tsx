import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { UpDownService } from "../Services/HttpService";

export type DownloadFileRequest = {
  fileName: string;
  package: string;
};

export type DownloadFileResponse = Blob;

export const useDownloadFile = (): UseMutationResult<DownloadFileResponse, Error, DownloadFileRequest> => {
  return useMutation<DownloadFileResponse, Error, DownloadFileRequest>({
    mutationFn: async (requestData) => {
      const response = await UpDownService.get<DownloadFileResponse>("/Download/Download", {
        params: {
          fileName: requestData.fileName,
          package: requestData.package,
        },
        responseType: "blob", // Ensure response is of type Blob
      });

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('File download failed');
      }
    },
    onSuccess: (data, variables) => {
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", variables.fileName); // Set the file name dynamically
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    },
    onError: (error) => {
      console.error("Error downloading file:", error);
      alert("خطا در دریافت فایل");
    },
  });
};
