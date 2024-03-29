import { axiosInstance, handleError } from "../ApisConfig";
const GET_FEATURED_DEALS_HOTELS = "api/home/featured-deals";
const GET_TRENDING_DESTINATION_HOTELS = "api/home/destinations/trending";

export const getFeaturedDeals = async () => {
  try {
    const response = await axiosInstance.get(GET_FEATURED_DEALS_HOTELS);
    return response.data;
  } catch (error: any) {
    let type = handleError(error);
    throw type;
  }
};

export const getTrendingDestinations = async () => {
  try {
    const response = await axiosInstance.get(GET_TRENDING_DESTINATION_HOTELS);
    return response.data;
  } catch (error: any) {
    let type = handleError(error);
    throw type;
  }
};

export const getRecentlyVisitedHotels = async (userId: number) => {
  try {
    const response = await axiosInstance.get(
      `api/home/users/${userId}/recent-hotels`
    );
    return response.data;
  } catch (error: any) {
    let type = handleError(error);
    throw type;
  }
};
