import axios from "axios";
import * as React from "react";
import { useState, useEffect } from "react";
import ListCategory from "../components/ListCategory";
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category_id: number;
  created_at: string;
  updated_at: string;
}
const Demo = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    // Gọi API để lấy danh sách sản phẩm theo categoryId, searchTerm, page, và perPage
    axios
      .get(`http://127.0.0.1:8000/api/products`, {
        params: {
          category_id: categoryId,
          search_term: searchTerm,
          page: page,
          per_page: perPage,
        },
      })
      .then((response) => {
        setProducts(response.data.data);
        setTotalPages(response.data.last_page);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [categoryId, searchTerm, page, perPage]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategoryId(Number(event.target.value));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value));
  };

  return (
    <div>
      <div>
        <select onChange={handleCategoryChange}>
          <option value="">Tất cả danh mục</option>
          {/* Render danh sách danh mục */}
          {/* <ListCategory /> */}
        </select>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <ul>
        {products.map((data, index) => (
          <div key={data.id} className="col-lg-4 col-md-6 text-center">
            <div className="single-product-item">
              <div className="product-image">
                <a href="single-product.html">
                  <img
                    src={`http://127.0.0.1:8000/storage/${data.image}`}
                    alt={data.name}
                  />
                </a>
              </div>
              <h3>{data.name}</h3>
              <p className="product-price">
                <span>Tính Theo Số Lượng</span> {data.price}{" "}
              </p>
              <a href="cart.html" className="cart-btn">
                <i className="fas fa-shopping-cart" /> Add to Cart
              </a>
            </div>
          </div>
        ))}
      </ul>
      <div className="row">
        <div className="col-lg-12 text-center">
          <div className="pagination-wrap">
            <ul className="pagination">
              <li>
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  next
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index}
                  className={`page-item ${page === index ? "active" : ""}`}
                  onClick={() => setPage(index)}
                >
                  <a className="page-link">{index + 1}</a>
                </li>
              ))}

              <li>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  Trang sau
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Demo;
