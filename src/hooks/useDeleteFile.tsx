import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UpDownService } from "../Services/HttpService";

export interface DeleteFileRequest {
  fileName: string;
  versionName: string;
  appPackageName: string;
  filePath: string;
}

export interface DeleteFileResponse {
  resualt: boolean;
  msg: string | null;
  data:  null;
}

export const useDeleteFile = () => {
  return useMutation<DeleteFileResponse, Error, DeleteFileRequest>({
    mutationFn: async (requestData: DeleteFileRequest) => {
      const response = await UpDownService.post("/File/DeleteFile", requestData);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.resualt) {
        toast.success("فایل با موفقیت حذف شد!");
      } else {
        toast.error(data.msg || "خطا در حذف فایل.");
      }
    },
    onError: (error) => {
      toast.error("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.");
      console.error(error);
    },
  });
};

