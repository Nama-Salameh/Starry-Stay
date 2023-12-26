import { getToken } from "./storageUtils/tokenStorage/TokenStorage";
import { isExpired, decodeToken } from "react-jwt";

export const getDecodedToken = () => {
  let token = getToken();
  if (!token) {
    return null;
  }
  return decodeToken(token);
};

export const isSessionExpired = () => {
  let token = getToken();
  if (!token || isExpired(token)) {
    return true;
  }
  return false;
};

export const isLoggedIn = () => {
  if (getToken()) {
    return true;
  }
  return false;
};

export function handleIsLoggedIn(navigate: any) {
  if (isLoggedIn()) {
    navigate("/home");
    window.location.reload();
  }
}
