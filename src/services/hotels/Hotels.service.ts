import { axiosInstance, handleError } from "../ApisConfig";
import getUrlForFile from "../../utils/fileUrlUtils/FileUrl.utils";

export const getHotelInfoByItsId = async (hotelId: number) => {
  try {
    const response = await axiosInstance.get(`api/hotels/${hotelId}`);
    return response.data;
  } catch (error: any) {
    let type = handleError(error);
    throw type;
  }
};

export const getHotelGalleryByItsId = async (hotelId: number) => {
  try {
    const response = await axiosInstance.get(`api/hotels/${hotelId}/gallery`);
    return response.data;
  } catch (error: any) {
    let type = handleError(error);
    throw type;
  }
};

export const getHotelAmenitiesByItsId = async (hotelId: number) => {
  try {
    const response = await axiosInstance.get(`api/hotels/${hotelId}/amenities`);
    return response.data;
  } catch (error: any) {
    let type = handleError(error);
    throw type;
  }
};
export const removeAmenityFromHotel = async (
  hotelId: number,
  amenityId: number
) => {
  try {
    await axiosInstance.delete(`api/hotels/${hotelId}/amenities/${amenityId}`);
  } catch (error: any) {
    let type = handleError(error);
    throw type;
  }
};

export const addAmenityToHotel = async (
  hotelId: number,
  name: string,
  description: string
) => {
  const params = { name: name, description: description };
  try {
    const response = await axiosInstance.post(
      `api/hotels/${hotelId}/amenities`,
      params
    );
    return response.data;
  } catch (error: any) {
    let type = handleError(error);
    throw type;
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
    return response.data;
  } catch (error: any) {
    let type = handleError(error);
    throw type;
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
    return response.data;
  } catch (error: any) {
    let type = handleError(error);
    throw type;
  }
};

export const getHotels = async () => {
  try {
    const response = await axiosInstance.get("/api/hotels");
    return response.data;
  } catch (error: any) {
    let type = handleError(error);
    throw type;
  }
};

export const getFilteredHotels = async (filterOptions: {
  name?: string;
  searchQuery?: string;
}) => {
  try {
    const response = await axiosInstance.get("/api/hotels", {
      params: filterOptions,
    });
    return response.data;
  } catch (error) {
    let type = handleError(error);
    throw type;
  }
};
export const updateHotel = async (
  hotelId: number,
  name: string,
  description: string,
  starRating: number,
  latitude: number,
  longitude: number
) => {
  const params = {
    name: name,
    description: description,
    hotelType: 1,
    starRating: starRating,
    latitude: latitude,
    longitude: longitude,
  };
  try {
    const response = await axiosInstance.put(`/api/hotels/${hotelId}`, params);
    return response.data;
  } catch (error) {
    let type = handleError(error);
    throw type;
  }
};

export const createHotel = async (
  cityId: number,
  name: string,
  description: string,
  hotelType: number,
  starRating: number,
  latitude: number,
  longitude: number
) => {
  const params = {
    name: name,
    description: description,
    hotelType: hotelType,
    starRating: starRating,
    latitude: latitude,
    longitude: longitude,
  };
  try {
    const response = await axiosInstance.post(
      `/api/cities/${cityId}/hotels`,
      params
    );
    return response.data;
  } catch (error) {
    let type = handleError(error);
    throw type;
  }
};

export const addHotelImage = async (hotelId: number, file: File) => {
  try {
    const imageUrl = await getUrlForFile(file);
    const response = await axiosInstance.post(`/api/hotels/${hotelId}/photos`, {
      url: imageUrl,
    });
    return response.data;
  } catch (error) {
    let type = handleError(error);
    throw type;
  }
};

export const deleteHotel = async (hotelId: number, cityId: number) => {
  try {
    const response = await axiosInstance.delete(
      `/api/cities/${cityId}/hotels/${hotelId}`
    );
    return response.data;
  } catch (error) {
    let type = handleError(error);
    throw type;
  }
};

export const getHotelReviewsByItsId = async (hotelId: number) => {
  try {
    const response = await axiosInstance.get(`api/hotels/${hotelId}/reviews`);
    return response.data;
  } catch (error: any) {
    let type = handleError(error);
    throw type;
  }
};
