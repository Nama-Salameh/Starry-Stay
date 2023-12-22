import { axiosInstance, handleError } from "../ApisConfig";

const GET_SEARCH_REGULAR_USER_URL = "api/home/search";

const getSearchResultRegularUser = async (
  checkInDate: string,
  checkOutDate: string,
  city: string,
  numberOfRooms: number,
  adults: number,
  children: number,
  starRate?: number,
  sort?: string
) => {
  const params = {
    checkInDate: checkInDate,
    checkOutDate: checkOutDate,
    city: city,
    starRate: starRate,
    sort: sort,
    numberOfRooms: numberOfRooms,
    adults: adults,
    children: children,
  };
  const apiUrl = axiosInstance.getUri({ url: GET_SEARCH_REGULAR_USER_URL, params });
  console.log("API URL:", apiUrl);
  try {
    const response = await axiosInstance.get(GET_SEARCH_REGULAR_USER_URL, {
      params: params,
    });
    return response.data;
  } catch (error) {
    let { message, type } = handleError(error);
    throw { message, type };
  }
};

export { getSearchResultRegularUser };
