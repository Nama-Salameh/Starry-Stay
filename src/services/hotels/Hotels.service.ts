import { axiosInstance, handleError } from "../ApisConfig";

export const getHotelInfoByItsId = async (hotelId: number) => {
  try {
    const response = await axiosInstance.get(`api/hotels/${hotelId}`);
    console.log("response is ", response);
    return response.data;
  } catch (error: any) {
    let { message, type } = handleError(error);
    throw { message, type };
  }
};

export const getHotelGalleryByItsId = async (hotelId: number) => {
  try {
    const response = await axiosInstance.get(`api/hotels/${hotelId}/gallery`);
    console.log("response is ", response);
    return response.data;
  } catch (error: any) {
    let { message, type } = handleError(error);
    throw { message, type };
  }
};

export const getHotelAmenitiesByItsId = async (hotelId: number) => {
  try {
    const response = await axiosInstance.get(`api/hotels/${hotelId}/amenities`);
    console.log("response is ", response);
    return response.data;
  } catch (error: any) {
    let { message, type } = handleError(error);
    throw { message, type };
  }
};
