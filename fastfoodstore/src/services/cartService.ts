import api from "./api";
import ResponseWrapper from "./responseWrapper";

export interface UserInfo {
  id: number;
}

export interface CartItem {
  id: number;
  quantity: number;
  price: number;
}

export interface PurchaseResponse {
  message: string;
}

export interface ErrorResponse {
  error: string;
}

const purchase = (userInfo: UserInfo, cart: CartItem[]) => {
  const requestData = { userInfo, cart };
  return api
    .post<ResponseWrapper<PurchaseResponse>>(api.url.purchase, requestData)
    .then((res) => res.data);
};

const cartService = {
  purchase,
};

export default cartService;
