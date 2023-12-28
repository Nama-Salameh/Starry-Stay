import { axiosInstance, handleError } from "../ApisConfig";
import { getToken } from "../../utils/storageUtils/tokenStorage/TokenStorage";
const GET_FEATURED_DEALS_HOTELS = "api/home/featured-deals";
const GET_TRENDING_DESTINATION_HOTELS = "api/home/destinations/trending";

export const getFeaturedDealsHotels = async () => {
  try {
    const response = await axiosInstance.get(GET_FEATURED_DEALS_HOTELS);
    return response.data;
  } catch (error: any) {
    let { message, type } = handleError(error);
    throw { message, type };
  }
};

export const getTrendingDestinations = async () => {
  try {
    const response = await axiosInstance.get(GET_TRENDING_DESTINATION_HOTELS);
    return response.data;
  } catch (error: any) {
    let { message, type } = handleError(error);
    throw { message, type };
  }
};

export const getRecentlyVisitedHotels = async (userId: number) => {
  try {
    const response = await axiosInstance.get(`api/home/users/${userId}/recent-hotels`);
    return response.data;
  } catch (error: any) {
    let { message, type } = handleError(error);
    throw { message, type };
  }
};
