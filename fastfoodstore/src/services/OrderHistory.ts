import { IProduct } from "./productService";

interface IItem {
  id: number;
  quantity: number;
  price: number;
  order_id: number;
  product_id: number;
  created_at: string;
  updated_at: string;
  product: IProduct;
}

interface OrderHistoryItem {
  id: number;
  total: number;
  user_id: number;
  order_status: number;
  delivery_address: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
  items: IItem[];
}

export default OrderHistoryItem;
