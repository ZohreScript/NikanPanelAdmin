import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { wardService } from '../Services/HttpService';

export type ExportResponse = {
  result: boolean;
  exception: string | null;
  error: string | null;
  warning: string | null;
  fileBytes: string | null;
  filePath: string;
  fileString: string;
};

export const useExportFile = (): UseMutationResult<ExportResponse, Error, number> => {
  return useMutation<ExportResponse, Error, number>({
    mutationFn: async (exportType: number) => {
      const response = await wardService.post<ExportResponse>(
        '/nurse/export',
        {
          exportType,
          myVersion: "f1.0.1",
          rootPath: "/",
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Export failed');
      }
    },
    onSuccess: (data) => {
      if (data.filePath) {
        const downloadLink = document.createElement('a');
        downloadLink.href = data.filePath;
        downloadLink.download = `export.${data.fileString}`;
        downloadLink.click();
      } else {
        console.error("No file path available for download.");
      }
    },
    onError: (error) => {
      console.error("Error exporting data:", error);
      alert("خطا در دریافت فایل");
    },
  });
};
