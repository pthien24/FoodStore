import api from "./api";
import ResponseWrapper from "./responseWrapper";
export interface IReview {
  id: number;
  title: string;
  text: string;
  rating: number;
  userId: string;
  productId: number;
  user: {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  product: {
    id: number;
    productName: string;
    description: string;
    price: number;
    productImage: string;
  };
}
const list = () =>
  api.get<ResponseWrapper<IReview[]>>(api.url.Review).then((res) => res.data);

const listWithProduct = (id: number) =>
  api
    .get<ResponseWrapper<IReview[]>>(`${api.url.Review}/Product/${id}`)
    .then((res) => res.data);
const categoryService = {
  list,
  listWithProduct,
};
export default categoryService;
