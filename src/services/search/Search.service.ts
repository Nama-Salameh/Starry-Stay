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
    city: city,
    checkInDate: checkInDate,
    checkOutDate: checkOutDate,
    numberOfRooms: numberOfRooms,
    adults: adults,
    children: children,
    starRate: starRate,
    sort: sort,
  };
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
