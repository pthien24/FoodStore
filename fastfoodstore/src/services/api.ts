import axios from "axios";
import store, { RootState } from "../store";
const url = {
  baseUrl: "http://127.0.0.1:8000/api",
  product: "/products",
  category: "/category",
  login: "/member/login",
  member: "/member",
  purchase: "/purchase",
  register: "/member/register",
};
const instance = axios.create({
  baseURL: url.baseUrl,
  headers: {
    "content-type": "application/json",
    Accept: "application/json",
  },
});
instance.interceptors.request.use((request) => {
  const state: RootState = store.getState();
  if (state.auth.token) {
    request.headers.Authorization = `Bearer ${state.auth.token}`;
  }
  return request;
});
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      window.location.href = "/home";
    } else {
      switch (error.response.status) {
        case 401:
          window.location.href = "/login";
          break;
        case 403:
          window.location.href = "/home";
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);

const api = {
  url,
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch,
};
export default api;
