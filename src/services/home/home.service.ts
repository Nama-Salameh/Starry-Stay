import { axiosInstance, handleError } from "../ApisConfig";

const GET_FEATURED_DEALS_HOTELS = "api/home/featured-deals";
const GET_TRENDING_DESTINATION_HOTELS = "/destinations/trending";

export const getFeaturedDealsHotels = async () => {
  try {
    const response = await axiosInstance.get(GET_FEATURED_DEALS_HOTELS);
    return response.data;
  } catch (error: any) {
    let { message, type } = handleError(error);
    throw { message, type };
  }
};

export const getTrendingDestinationHotels = async () => {
  try {
    const response = await axiosInstance.get(GET_TRENDING_DESTINATION_HOTELS);
    return response.data;
  } catch (error: any) {
    let { message, type } = handleError(error);
    throw { message, type };
  }
};
