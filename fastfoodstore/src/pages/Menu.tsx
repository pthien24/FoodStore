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
  const [tag] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [productsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [sortKey, setSortKey] = useState("ProductName");
  const [sortOrder, setSortOrder] = useState("ASC");
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const showProduct = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    navigate(`../menu/${id}`);
  };
  const fetchData = async () => {
    try {
      const response = await productService.list(
        searchTerm,
        currentPage,
        productsPerPage,
        sortKey,
        sortOrder,
        category
      );
      setProducts(response.data.data);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchCategories = async () => {
    const response = await productService.categories();
    setCategories(response.data);
  };
  useEffect(() => {
    fetchData();
    fetchCategories();
  }, [searchTerm, currentPage, sortKey, sortOrder, category]);
  return (
    <>
      <Breadcrumb title={"Menu"} />
      <div className="product-section mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-filters">
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
                  title={data.productName}
                  image={data.productImage}
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
