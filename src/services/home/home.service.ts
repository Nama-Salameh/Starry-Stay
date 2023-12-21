import { axiosInstance, handleError } from "../ApisConfig";

const GET_FEATURED_DEALS_HOTELS = "/home/featured-deals";

export const getFeaturedDealsHotels = async () => {
  try {
    const response = await axiosInstance.get(GET_FEATURED_DEALS_HOTELS);
    console.log(response.data);
  } catch (error: any) {
    let { message, type } = handleError(error);
    throw { message, type };
  }
};
