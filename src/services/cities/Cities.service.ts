import { axiosInstance, handleError } from "../ApisConfig";

const GET_CITIES_URL = "/cities";

const getCities = async () => {
  try {
    const response = await axiosInstance.get(GET_CITIES_URL);
    return response.data;
  } catch (error) {
    let { message, type } = handleError(error);
    throw ({ message, type });
  }
};

export default getCities;
