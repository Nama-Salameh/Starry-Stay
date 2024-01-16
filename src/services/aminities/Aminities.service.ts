import { axiosInstance, handleError } from "../ApisConfig";

const GET_AMINITIES_URL = "api/search-results/amenities";

const getAminities = async () => {
  try {
    const response = await axiosInstance.get(GET_AMINITIES_URL);
    return response.data;
  } catch (error) {
    let type = handleError(error);
    throw type;
  }
};

const getAmenitiesNames = async (): Promise<string[] | void> => {
  try {
    const amenitiesArray: { name: string; description: string }[] =
      await getAminities();
    const amenityNames = amenitiesArray.map((amenity) => amenity.name);
    return amenityNames;
  } catch (error) {
    let type = handleError(error);
    throw type;
  }
};

const getAmenitiesNamesAndDescriptions = async (): Promise<string[] | void> => {
  try {
    const amenitiesArray: { name: string; description: string }[] =
      await getAminities();
    const amenityDescriptions = amenitiesArray.map(
      (amenity) => amenity.description
    );
    return amenityDescriptions;
  } catch (error) {
    let type = handleError(error);
    throw type;
  }
};

export { getAminities, getAmenitiesNames, getAmenitiesNamesAndDescriptions };
