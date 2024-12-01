import { useMutation } from "@tanstack/react-query";
import { UpDownService } from "../Services/HttpService"; // Assuming the service is imported from here
import { toast } from "react-toastify";

// Define types for the request and response
type SelectVersionRequest = {
  fileName: string;
  versionName: string;
  appPackageName: string;
  filePath: string;
};

type SelectVersionResponse = {
  result: boolean;
  msg: string;
  data: string;
};

// The function that calls the API
const selectVersion = async (requestBody: SelectVersionRequest): Promise<SelectVersionResponse> => {
  try {
    const response = await UpDownService.post("/File/VersionSelector", requestBody, {
      headers: {
        'Content-Type': 'application/json',  // Ensure correct header for JSON body
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error selecting version:", error);
    throw new Error("Error selecting version");
  }
};

// Custom hook to handle the version selection
const useSelectVersion = () => {
  return useMutation<SelectVersionResponse, Error, SelectVersionRequest>({
    mutationFn: selectVersion,
    onSuccess: (data) => {
      if (data.result) {
        console.log(data.result);
        toast.success("ورژن و فایل با موفقیت انتخاب شد.");
      } else {
        console.log("error",data.result);
        toast.error("انتخاب ورژن ناموفق بود.");
      }
    },
    onError: (error) => {
      toast.error("خطا در انتخاب ورژن.");
      console.error("Error selecting version:", error.message);
    },
  });
};

export default useSelectVersion;
