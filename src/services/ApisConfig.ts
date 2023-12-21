import { getToken } from '../utils/storageUtils/TokenStorage';
import axios, { HttpStatusCode } from 'axios';
import { ErrorTypes } from '../enums/ErrprTypes.enum';

const BASE_URL = "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/";

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
    if (axios.isAxiosError(error) && error.response) {
      const response = error.response;
      const message = response.data.error.message;
  
      switch (response.status) {
        case HttpStatusCode.NotFound:
          return { message: message, type: ErrorTypes.NotFound };
        case HttpStatusCode.BadRequest:
          return { message: message, type: ErrorTypes.BadRequest }
        case HttpStatusCode.Conflict:
          return { message: message, type: ErrorTypes.Conflict }
        case HttpStatusCode.Unauthorized:
          return { message: message, type: ErrorTypes.Unauthorized }
        default:
          return { message: message, type: ErrorTypes.Unknown }
      }
    } else if (axios.isAxiosError(error) && error.request) {
      if (error.code === "ERR_NETWORK") {
        return { message: error.message, type: ErrorTypes.Network };
      }
      return { message: error.message, type: ErrorTypes.NoResponse };
    } else {
      return { message: error.message, type: ErrorTypes.Unknown };
    }
  }
  
  export { axiosInstance, handleError };
  