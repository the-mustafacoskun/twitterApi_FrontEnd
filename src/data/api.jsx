import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9000/twitter",
});

export function setAuth(username, password) {
  api.defaults.auth = { username, password };
}

export function clearAuth() {
  delete api.defaults.auth;
}

export default api;