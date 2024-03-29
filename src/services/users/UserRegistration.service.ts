import { storeToken } from "../../utils/storageUtils/tokenStorage/TokenStorage";
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
    console.log("in login service : ");
    let type = handleError(error);
    throw type ;
  }
};
