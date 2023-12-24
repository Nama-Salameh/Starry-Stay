import { storeToken } from "../../utils/storageUtils/TokenStorage";
import { axiosInstance, handleError } from "../ApisConfig";

const LOGIN_URL = "api/auth/authenticate";

export const login = async (username: string, password: string) => {
  const props = {
    username: username,
    password: password,
  };
  try {
    const response = await axiosInstance.post(LOGIN_URL, props);
    storeToken(response.data.authentication);
  } catch (error: any) {
    let { message, type } = handleError(error);
    throw { message, type };
  }
};
