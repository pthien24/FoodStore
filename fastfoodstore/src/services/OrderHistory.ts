import api from "./api";
import { IProduct } from "./productService";
import ResponseWrapper from "./responseWrapper";

interface IItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: string;
  order: null;
  product: IProduct;
}
enum status {
  Pending,
  Shipped,
  Cancelled,
}
export interface OrderHistoryItem {
  id: number;
  userId: string;
  createDate: string;
  orderItems: IItem[];
  customerName: number;
  phone: string;
  email: string;
  provinceOrCity: string;
  district: string;
  wardOrCommune: string;
  specificAddress: string;
  note: string;
  status: status;
  totalAmount: number;
}
const getorder = () =>
  api
    .get<ResponseWrapper<OrderHistoryItem[]>>(`${api.url.order}`)
    .then((res) => res.data);

const OrderHistoryService = {
  getorder,
};
export default OrderHistoryService;
