import api from "./api";
import { IProduct } from "./productService";
import ResponseWrapper from "./responseWrapper";

export interface ICategory {
  id: number;
  name: string;
}
const list = () =>
  api
    .get<ResponseWrapper<ICategory[]>>(api.url.category)
    .then((res) => res.data);

const add = (data: ICategory) =>
  api.post<ResponseWrapper<ICategory>>(api.url.category, data);
const get = (id: number) =>
  api
    .get<ResponseWrapper<ICategory>>(`${api.url.category}/${id}`)
    .then((res) => res.data);
const update = (data: ICategory, id: number) =>
  api
    .put<ResponseWrapper<ICategory>>(`${api.url.category}/${id}`, data)
    .then((res) => res.data);

const getProductsWithCategory = (id: number) =>
  api
    .get<ResponseWrapper<IProduct[]>>(`${api.url.category}/Product/${id}`)
    .then((res) => res.data);

const remove = (id: number) =>
  api
    .delete<ResponseWrapper<ICategory>>(`${api.url.category}/${id}`)
    .then((res) => res.data);
const categoryService = {
  list,
  get,
  add,
  update,
  getProductsWithCategory,
  delete: remove,
};
export default categoryService;
