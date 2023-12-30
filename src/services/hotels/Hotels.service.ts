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

export const getHotelRoomsByItsId = async (
  hotelId: number,
  checkInDate: string,
  checkOutDate: string
) => {
  const params = {
    hotelId: hotelId,
    checkInDate: checkInDate,
    checkOutDate: checkOutDate,
  };
  try {
    const response = await axiosInstance.get(`api/hotels/${hotelId}/rooms`, {
      params,
    });
    console.log("response is ", response);
    return response.data;
  } catch (error: any) {
    let { message, type } = handleError(error);
    throw { message, type };
  }
};

export const getHotelAvailableRoomsByItsId = async (
  hotelId: number,
  checkInDate: string,
  checkOutDate: string
) => {
  const params = {
    hotelId: hotelId,
    checkInDate: checkInDate,
    checkOutDate: checkOutDate,
  };
  try {
    const response = await axiosInstance.get(
      `api/hotels/${hotelId}/available-rooms`,
      { params }
    );
    console.log("response is ", response);
    return response.data;
  } catch (error: any) {
    let { message, type } = handleError(error);
    throw { message, type };
  }
};

export const getHotels = async () => {
  try {
    const response = await axiosInstance.get("/api/hotels");
    console.log("response is ", response);
    return response.data;
  } catch (error: any) {
    let { message, type } = handleError(error);
    throw { message, type };
  }
};


export const getFilteredHotels = async (filterOptions: { name?: string; searchQuery?: string }) => {
  try {
    const response = await axiosInstance.get('/api/hotels', { params: filterOptions });
    return response.data;
  } catch (error) {
    let { message, type } = handleError(error);
    throw { message, type };
  }
};