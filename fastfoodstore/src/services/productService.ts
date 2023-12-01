import api from "./api";
import ResponseWrapper from "./responseWrapper";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category_id: number;
  created_at: string;
  updated_at: string;
}
const list = (categoryId: number | null, searchTerm: string, page: number) =>
  api.get<ResponseWrapper<IProduct[]>>(`${api.url.product}`, {
    params: {
      category_id: categoryId,
      search_term: searchTerm,
      page: page,
    },
  });
const listHome = () =>
  api
    .get<ResponseWrapper<IProduct[]>>(`${api.url.product}`)
    .then((res) => res.data);
const get = (id: number) =>
  api
    .get<ResponseWrapper<IProduct>>(`${api.url.product}/${id}`)
    .then((res) => res.data);
const add = (data: IProduct) =>
  api
    .post<ResponseWrapper<IProduct>>(api.url.product, data)
    .then((res) => res.data);
const update = (data: IProduct, id: number) =>
  api
    .put<ResponseWrapper<IProduct>>(`${api.url.product}/${id}`, data)
    .then((res) => res.data);
const remove = (id: number) =>
  api
    .delete<ResponseWrapper<IProduct>>(`${api.url.product}/${id}`)
    .then((res) => res.data);
const productService = {
  listHome,
  list,
  get,
  add,
  update,
  delete: remove,
};
export default productService;
