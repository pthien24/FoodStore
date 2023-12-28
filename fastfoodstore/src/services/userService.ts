import api from "./api";
import ResponseWrapper from "./responseWrapper";

export type LoginInfo = {
  id: string;
  userName: string;
  lastName: string;
  fistName: string;
  token: string;
};
export type UserInfo = {
  id: string;
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
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  const data = {
    username: username,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  };
  return api
    .post<ResponseWrapper<UserInfo>>(api.url.register, data)
    .then((res) => res);
};
const profile = (id: string) =>
  api.get<ResponseWrapper<UserInfo>>(`${api.url.member}/${id}`);

// const history = () =>
//   api
//     .get<ResponseWrapper<OrderHistoryItem[]>>(`${api.url.member}/historyorder`)
//     .then((res) => res.data);
const userService = {
  login,
  register,
  profile,
};
export default userService;
