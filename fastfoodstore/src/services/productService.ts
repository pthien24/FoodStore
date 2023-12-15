import api from "./api";
import ResponseWrapper from "./responseWrapper";

export interface IProduct {
  id: number;
  productName: string;
  description: string;
  price: number;
  category: string;
  productImage: string;
}
const list = (
  filterQuery: string,
  pageIndex: number,
  pageSize: number,
  sortColumn: string,
  sortOrder: string,
  category: string
) =>
  api
    .get<ResponseWrapper<IProduct[]>>(`${api.url.product}`, {
      params: {
        filterQuery,
        pageIndex,
        pageSize,
        sortColumn,
        sortOrder,
        category,
      },
    })
    .then((response) => response);

const listHome = (tag: string) =>
  api
    .get<ResponseWrapper<IProduct[]>>(`${api.url.product}`, {
      params: {
        tag,
      },
    })
    .then((res) => res.data);
const categories = () =>
  api
    .get<ResponseWrapper<any>>(`${api.url.product}/categories`, {})
    .then((response) => response.data);

const getproduct = (id: number) =>
  api
    .get<ResponseWrapper<IProduct>>(`${api.url.product}/${id}`)
    .then((res) => res);

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
  getproduct,
  categories,
  get,
  add,
  update,
  delete: remove,
};
export default productService;
