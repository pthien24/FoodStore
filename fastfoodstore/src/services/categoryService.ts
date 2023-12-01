import api from "./api";
import ResponseWrapper from "./responseWrapper";

export interface ICategory {
  id: number;
  name: string;
  description: string;
}
const list = () =>
  api
    .get<ResponseWrapper<ICategory[]>>(api.url.category)
    .then((res) => res.data);
const get = (id: number) =>
  api
    .get<ResponseWrapper<ICategory>>(`${api.url.product}/${id}`)
    .then((res) => res.data);
const add = (data: ICategory) =>
  api
    .post<ResponseWrapper<ICategory>>(api.url.product, data)
    .then((res) => res.data);
const update = (data: ICategory, id: number) =>
  api
    .put<ResponseWrapper<ICategory>>(`${api.url.product}/${id}`, data)
    .then((res) => res.data);
const remove = (id: number) =>
  api
    .delete<ResponseWrapper<ICategory>>(`${api.url.product}/${id}`)
    .then((res) => res.data);
const categoryService = {
  list,
  get,
  add,
  update,
  delete: remove,
};
export default categoryService;
