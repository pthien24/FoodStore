import React, { useState, useEffect, ChangeEvent } from "react";
import productService, { IProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ListCategory from "../components/ListCategory";
import Breadcrumb from "../components/Breadcrumb";
import { RootState } from "../store"; // Import RootState from your Redux store
import Item from "../components/Item";

const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(Number(event.target.value));
  };

  useEffect(() => {
    productService.list(categoryId, searchTerm, page).then((res) => {
      setProducts(res.data.data);
      setTotalPages(res.data.last_page);
    });
  }, [categoryId, searchTerm, page]);

  const showProduct = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    navigate(`../menu/${id}`);
  };

  return (
    <>
      <Breadcrumb title={"Menu"} />
      <div className="product-section mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-filters">
                <select onChange={handleCategoryChange}>
                  <option value="">Tất cả danh mục</option>
                  <ListCategory />
                </select>
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="row product-lists">
              {products.map((data) => (
                <Item
                  key={data.id}
                  id={data.id}
                  title={data.name}
                  image={data.image}
                  price={data.price}
                  showProduct={showProduct} // Pass the showProduct function as a prop
                />
              ))}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="pagination-wrap">
                <ul>
                  <li>
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                    >
                      previous
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        page === index + 1 ? "active" : ""
                      }`}
                      onClick={() => setPage(index + 1)}
                    >
                      <a className="page-link">{index + 1}</a>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === totalPages}
                    >
                      next
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
