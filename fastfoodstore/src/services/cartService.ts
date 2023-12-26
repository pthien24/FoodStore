import api from "./api";
import ResponseWrapper from "./responseWrapper";

export interface OrderDTO {
  customerName: string;
  email: string;
  phone: string;
  country: string;
  provinceOrCity: string;
  district: string;
  wardOrCommune: string;
  specificAddress: string;
  note: string;
  items: CartItem[];
}

export interface CartItem {
  productId: number;
  quantity: number;
  unitPrice: number;
}
export interface PurchaseResponse {
  message: string;
}

export interface ErrorResponse {
  error: string;
}
const test = () => api.get<string>(api.url.test).then((res) => res);
const purchase = (order: OrderDTO) => {
  return api
    .post<ResponseWrapper<PurchaseResponse>>(api.url.purchase, order)
    .then((res) => res.data);
};

const cartService = {
  purchase,
  test,
};

export default cartService;
