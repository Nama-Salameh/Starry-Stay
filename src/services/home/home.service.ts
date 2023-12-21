import { axiosInstance, handleError } from "../ApisConfig";

const GET_FEATURED_DEALS_HOTELS = "api/home/featured-deals";
const GET_TRENDING_DESTINATION_HOTELS = "/destinations/trending";
const GET_RECENTLY_VISITED_HOTELS = "users/{user{Id}/recent-hotels";

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

export const getRecentlyVisitedHotels = async (userId: number) => {
  const params = { userId };
  try {
    const response = await axiosInstance.get(
      `/users/${params.userId}/recent-hotels`,
      {
        params,
      }
    );
    return response.data;
  } catch (error: any) {
    throw { error };
  }
};
