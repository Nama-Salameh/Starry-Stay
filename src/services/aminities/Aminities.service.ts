import { axiosInstance, handleError } from "../ApisConfig";

const GET_AMINITIES_URL = "/search-results/amenities";

const getAminities = async () => {
  try {
    const response = await axiosInstance.get(GET_AMINITIES_URL);
    return response.data;
  } catch (error) {
    let { message, type } = handleError(error);
    throw { message, type };
  }
};

const getAmenitiesNames = async (): Promise<string[] | void> => {
  try {
    const amenitiesArray: { name: string; description: string }[] =
      await getAminities();
    const amenityNames = amenitiesArray.map((amenity) => amenity.name);
    return amenityNames;
  } catch (error) {
    console.error(error);
  }
};

const getAmenitiesNamesAndDescriptions = async (): Promise<string[] | void> => {
    try {
      const amenitiesArray: { name: string; description: string }[] =
        await getAminities();
      const amenityDescriptions = amenitiesArray.map((amenity) => amenity.description);
      return amenityDescriptions;
    } catch (error) {
      console.error(error);
    }
  };

export { getAminities, getAmenitiesNames, getAmenitiesNamesAndDescriptions };