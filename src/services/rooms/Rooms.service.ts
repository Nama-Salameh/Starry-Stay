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
    await axiosInstance.put(`api/rooms/${roomId}`, { params });
  } catch (error: any) {
    let type = handleError(error);
    throw type;
  }
};
