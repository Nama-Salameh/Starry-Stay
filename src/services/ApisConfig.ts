import { getToken } from "../utils/storageUtils/tokenStorage/TokenStorage";
import axios, { HttpStatusCode } from "axios";
import { ErrorTypes } from "../enums/ErrorTypes.enum";

const BASE_URL =
  "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (!token) {
      return config;
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function handleError(error: any) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const response = error.response;
      switch (response.status) {
        case HttpStatusCode.NotFound:
          return ErrorTypes.NotFound;
        case HttpStatusCode.BadRequest:
          return ErrorTypes.BadRequest;
        case HttpStatusCode.Conflict:
          return ErrorTypes.Conflict;
        case HttpStatusCode.Unauthorized:
          return ErrorTypes.Unauthorized;
        default:
          return ErrorTypes.Unknown;
      }
    } else if (error.request) {
      if (error.code === "ERR_NETWORK") {
        return ErrorTypes.Network;
      }
      else if (error.code === 'ECONNABORTED') {
        return ErrorTypes.Timeout;
      }
      return ErrorTypes.NoResponse;
    }
  }
  return ErrorTypes.Unknown;
}
export { axiosInstance, handleError };
