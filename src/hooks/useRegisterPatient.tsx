import { useMutation } from "@tanstack/react-query";
import { patientService } from "../Services/HttpService";
import toast from "react-hot-toast";
import { RegisterPatientData, RegisterPatientResponse } from "../types/types";

export const useRegisterPatient = () => {
  return useMutation<RegisterPatientResponse, Error, RegisterPatientData>({
    mutationFn: async (data: RegisterPatientData) => {
      const response = await patientService.post("/patientinfo/insertpatientinformation", data);
      return response.data;
    },
    onSuccess: (response) => {
      if (response?.data) {
        console.log("register",response.data)
        console.log("register2",response.result)
        console.log("register3",response)
        toast.success("مشخصات بیمار با موفقیت ثبت شد.");
      } else {
        toast.error(response?.msg || "ثبت مشخصات بیمار ناموفق بود.");
      }
    },
    onError: (error) => {
      console.error("Error:", error);
      toast.error("خطایی رخ داد.");
    },
  });
};

