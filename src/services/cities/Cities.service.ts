import { axiosInstance, handleError } from "../ApisConfig";
import getUrlForFile from "../../utils/fileUrlUtils/FileUrl.utils";

const GET_CITIES_URL = "api/cities";

const getCities = async () => {
  try {
    const response = await axiosInstance.get(GET_CITIES_URL);
    return response.data;
  } catch (error) {
    let type = handleError(error);
    throw type;
  }
};

const deleteCityByItsId = async (cityId: number) => {
  try {
    const response = await axiosInstance.delete(`/api/cities/${cityId}`);
    return response.data;
  } catch (error) {
    let type = handleError(error);
    throw type;
  }
};

const updateCity = async (
  cityId: number,
  name: string,
  description: string
) => {
  const params = { name: name, description: description };
  try {
    const response = await axiosInstance.put(`/api/cities/${cityId}`, params);
    return response.data;
  } catch (error) {
    let type = handleError(error);
    throw type;
  }
};

const getCityByItsId = async (cityId: number) => {
  try {
    const response = await axiosInstance.get(`/api/cities/${cityId}`);
    return response.data;
  } catch (error) {
    let type = handleError(error);
    throw type;
  }
};

const getFilteredCities = async (filterOptions: {
  name?: string;
  searchQuery?: string;
}) => {
  try {
    const response = await axiosInstance.get(GET_CITIES_URL, {
      params: filterOptions,
    });
    return response.data;
  } catch (error) {
    let type = handleError(error);
    throw type;
  }
};

const createCity = async (name: string, description: string) => {
  const params = { name: name, description: description };
  try {
    const response = await axiosInstance.post("/api/cities", params);
    return response.data;
  } catch (error) {
    let type = handleError(error);
    throw type;
  }
};

const addCityImage = async (cityId: number, file: File) => {
  try {
    const imageUrl = await getUrlForFile(file);
    const response = await axiosInstance.post(`/api/cities/${cityId}/photos`, {
      url: imageUrl,
    });
    return response.data;
  } catch (error) {
    let type = handleError(error);
    throw type;
  }
};

const getCityHotels = async (cityId: number) => {
  try {
    const response = await axiosInstance.get(`/api/cities/${cityId}/hotels`);
    return response.data;
  } catch (error) {
    let type = handleError(error);
    throw type;
  }
};
const getCityPhotos = async (cityId: number) => {
  try {
    const response = await axiosInstance.get(`/api/cities/${cityId}/photos`);
    return response.data;
  } catch (error) {
    let type = handleError(error);
    throw type;
  }
};
export {
  getCities,
  getFilteredCities,
  deleteCityByItsId,
  updateCity,
  getCityByItsId,
  createCity,
  addCityImage,
  getCityHotels,
  getCityPhotos,
};
