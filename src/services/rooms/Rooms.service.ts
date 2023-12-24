import { axiosInstance, handleError } from "../ApisConfig";

export const getRoomInfoByItsId = async (roomId : number) => {
  try {
    const response = await axiosInstance.get(`api/rooms/${roomId}`);
    console.log(response);
    return(response.data);
  } catch (error: any) {
    let { message, type } = handleError(error);
    throw { message, type };
  }
};

export const getRoomPhotosByItsId = async (roomId : number) => {
    try {
      const response = await axiosInstance.get(`api/rooms/${roomId}/photos`);
      console.log(response);
      return(response.data);
    } catch (error: any) {
      let { message, type } = handleError(error);
      throw { message, type };
    }
  };
  
  export const getRoomAmenitiesByItsId = async (roomId : number) => {
    try {
      const response = await axiosInstance.get(`api/rooms/${roomId}/amenities`);
      console.log(response);
      return(response.data);
    } catch (error: any) {
      let { message, type } = handleError(error);
      throw { message, type };
    }
  };
  