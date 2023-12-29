import api from "./api";
import { ICategory } from "./categoryService";
import ResponseWrapper from "./responseWrapper";

export interface IProduct {
  id: number;
  productName: string;
  description: string;
  price: number;
  productImage: string;
}
export interface IProductreponse {
  id: number;
  productName: string;
  description: string;
  price: number;
  productImage: string;
  categoryId: string;
  categoryName: string;
}
const list = (
  page: number,
  size: number,
  sort: string,
  order: string,
  category: number | null,
  filter: string
) =>
  api
    .get<ResponseWrapper<IProductreponse[]>>(`${api.url.product}`, {
      params: {
        page,
        size,
        sort,
        order,
        category,
        filter,
      },
    })
    .then((response) => response);

const listwithCategory = (category: number) =>
  api
    .get<ResponseWrapper<IProductreponse[]>>(`${api.url.product}`, {
      params: {
        category,
      },
    })
    .then((res) => res.data);
const categories = () =>
  api
    .get<ResponseWrapper<any>>(`${api.url.product}/categories`, {})
    .then((response) => response.data);

const getproduct = (id: number) =>
  api
    .get<ResponseWrapper<IProductreponse>>(`${api.url.product}/${id}`)
    .then((res) => res.data);

const get = (id: number) =>
  api
    .get<ResponseWrapper<IProduct>>(`${api.url.product}/${id}`)
    .then((res) => res.data);

const getcategory = (id: number) =>
  api
    .get<ResponseWrapper<ICategory>>(`${api.url.product}/Category/${id}`)
    .then((res) => res.data);
const add = (data: IProduct, categoryId: number) =>
  api
    .post<ResponseWrapper<IProduct>>(
      `${api.url.product}?catId=${categoryId}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((res) => res.data);
const update = (data: IProduct, categoryId: number, productid: number) =>
  api
    .put<ResponseWrapper<IProduct>>(
      `${api.url.product}/${productid}?catId=${categoryId}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((res) => res.data);
const remove = (id: number) =>
  api
    .delete<ResponseWrapper<IProduct>>(`${api.url.product}/${id}`)
    .then((res) => res.data);
const productService = {
  listwithCategory,
  list,
  getproduct,
  categories,
  getcategory,
  get,
  add,
  update,
  delete: remove,
};
export default productService;
