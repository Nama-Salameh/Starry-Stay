import { IToken } from "../../interfaces/Token.interface";

const TOKEN_KEY = "authToken";

export function storeToken(data: IToken) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}
