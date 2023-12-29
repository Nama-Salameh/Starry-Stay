import { axiosInstance, handleError } from "../ApisConfig";

const GET_CITIES_URL = "api/cities";

const getCities = async () => {
  try {
    const response = await axiosInstance.get(GET_CITIES_URL);
    return response.data;
  } catch (error) {
    let { message, type } = handleError(error);
    throw { message, type };
  }
};

const deleteCityByItsId = async (cityId: number) => {
  try {
    const response = await axiosInstance.delete(`/api/cities/${cityId}`);
    return response.data;
  } catch (error) {
    let { message, type } = handleError(error);
    throw { message, type };
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
    let { message, type } = handleError(error);
    throw { message, type };
  }
};

const getCityByItsId = async (cityId: number) => {
  try {
    const response = await axiosInstance.get(`/api/cities/${cityId}`);
    return response.data;
  } catch (error) {
    let { message, type } = handleError(error);
    throw { message, type };
  }
};
export { getCities, deleteCityByItsId, updateCity, getCityByItsId };
