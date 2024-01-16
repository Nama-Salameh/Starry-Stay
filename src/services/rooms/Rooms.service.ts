import getUrlForFile from "../../utils/fileUrlUtils/FileUrl.utils";
import { axiosInstance, handleError } from "../ApisConfig";

export const getRoomInfoByItsId = async (roomId: number) => {
  try {
    const response = await axiosInstance.get(`api/rooms/${roomId}`);
    console.log(response);
    return response.data;
  } catch (error: any) {
    let type = handleError(error);
    throw type;
  }
};

export const getRoomPhotosByItsId = async (roomId: number) => {
  try {
    const response = await axiosInstance.get(`api/rooms/${roomId}/photos`);
    console.log(response);
    return response.data;
  } catch (error: any) {
    let type = handleError(error);
    throw type;
  }
};

export const getRoomAmenitiesByItsId = async (roomId: number) => {
  try {
    const response = await axiosInstance.get(`api/rooms/${roomId}/amenities`);
    console.log(response);
    return response.data;
  } catch (error: any) {
    let type = handleError(error);
    throw type;
  }
};

export const deleteRoom = async (hotelId: number, roomId: number) => {
  try {
    await axiosInstance.delete(`api/hotels/${hotelId}/rooms/${roomId}`);
  } catch (error: any) {
    let type = handleError(error);
    throw type;
  }
};

export const updateRoom = async (
  roomId: number,
  roomNumber: number,
  cost: number
) => {
  const params = {
    roomNumber: roomNumber,
    cost: cost,
  };
  try {
    await axiosInstance.put(`api/rooms/${roomId}`, params);
  } catch (error: any) {
    let type = handleError(error);
    throw type;
  }
};

export const addAmenityToRoom = async (
  roomId: number,
  name: string,
  description: string
) => {
  const params = {
    name: name,
    description: description,
  };
  try {
    await axiosInstance.post(`api/rooms/${roomId}/amenities`, params);
  } catch (error: any) {
    let type = handleError(error);
    throw type;
  }
};
export const removeAmenityfromRoom = async (
  roomId: number,
  amenityId: number
) => {
  try {
    await axiosInstance.delete(`api/rooms/${roomId}/amenities/${amenityId}`);
  } catch (error: any) {
    let type = handleError(error);
    throw type;
  }
};
export const createRoom = async (
  hotelId: number,
  roomNumber: number,
  cost: number
) => {
  const params = { roomNumber: roomNumber, cost: cost };
  try {
    const response = await axiosInstance.post(
      `api/hotels/${hotelId}/rooms`,
      params
    );
    return response.data;
  } catch (error: any) {
    let type = handleError(error);
    throw type;
  }
};

export const addRoomImage = async (roomId: number, file: File) => {
  try {
    const imageUrl = await getUrlForFile(file);
    const response = await axiosInstance.post(`/api/rooms/${roomId}/photos`, {
      url: imageUrl,
    });
    return response.data;
  } catch (error) {
    let type = handleError(error);
    throw type;
  }
};
