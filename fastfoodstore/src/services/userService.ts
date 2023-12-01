import OrderHistoryItem from "./OrderHistory";
import api from "./api";
import ResponseWrapper from "./responseWrapper";

export type LoginInfo = {
  id: number;
  username: string;
  fullName: string;
  token: string;
};
export type UserInfo = {
  id: number;
  lastName: string;
  fisrtName: string;
  phone: string;
  email: string;
  username: string;
  created_at: string;
  updated_at: string;
};

const login = (username: string, password: string) => {
  const data = {
    username: username,
    password: password,
  };
  return api
    .post<ResponseWrapper<LoginInfo>>(api.url.login, data)
    .then((res) => res.data);
};
const register = (
  lastName: string,
  fisrtName: string,
  username: string,
  phone: string,
  email: string,
  password: string
) => {
  const data = {
    lastName: lastName,
    fisrtName: fisrtName,
    username: username,
    phone: phone,
    email: email,
    password: password,
  };
  return api
    .post<ResponseWrapper<UserInfo>>(api.url.register, data)
    .then((res) => res.data);
};
const profile = () =>
  api.get<ResponseWrapper<UserInfo>>(`${api.url.member}/profile`);

const history = () =>
  api
    .get<ResponseWrapper<OrderHistoryItem[]>>(`${api.url.member}/historyorder`)
    .then((res) => res.data);
const userService = {
  login,
  register,
  profile,
  history,
};
export default userService;
