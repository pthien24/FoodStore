import axios from "axios";
import store, { RootState } from "../store";
const url = {
  baseUrl: "http://localhost:5068/api",
  product: "/Product",
  category: "/Category",
  login: "/Authentication/login",
  member: "/member",
  purchase: "/Order/PlaceOrder",
  register: "/Authentication/registeration",
  test: "/UserList/getid",
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
    console.log(state.auth.token);
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
          window.location.href = "/login";
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
