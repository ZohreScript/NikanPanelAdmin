import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

const AUTH_BASE_URL = "http://93.118.144.59:8003/api/v1";
const WARD_BASE_URL = "http://93.118.144.59:8002/api/v1";
const PATIENT_BASE_URL = "http://93.118.144.59:8001/api/v1";
const UPDOWN_BASE_URL="http://93.118.144.59:8000/api/v1";

export const authService = axios.create({
  baseURL: AUTH_BASE_URL,
});

export const wardService = axios.create({
  baseURL: WARD_BASE_URL,
});

// eslint-disable-next-line react-refresh/only-export-components
export const patientService = axios.create({
  baseURL: PATIENT_BASE_URL,
});

export const UpDownService = axios.create({
  baseURL: UPDOWN_BASE_URL,
});




// Request interceptor to add token to headers
authService.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor to handle unauthorized access
authService.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized - clearing token");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
