import * as React from "react";
import { useState, useEffect } from "react";
import productService, { IProduct } from "../../services/productService";
const ListProductAdmin = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryid, setCategoryid] = useState(null);
  const [sortKey, setSortKey] = useState("ProductName");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      const response = await productService.list(
        searchTerm,
        currentPage,
        productsPerPage,
        sortKey,
        sortOrder,
        categoryid
      );
      setProducts(response.data.data);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [searchTerm, currentPage, sortKey, sortOrder, categoryid]);
  return (
    <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8 tm-block-col">
      <div className="tm-bg-primary-dark tm-block tm-block-products">
        <h2 className="tm-block-title">Product </h2>
        <div className="tm-product-table-container">
          <table className="table table-hover tm-table-small tm-product-table">
            <thead>
              <tr>
                <th scope="col">PRODUCT NAME</th>
                <th scope="col">UNIT SOLD</th>
                <th scope="col">IN STOCK</th>
                <th scope="col">EXPIRE DATE</th>
                <th scope="col">EXPIRE DATE</th>
                <th scope="col">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td className="tm-product-name">{item.productName}</td>
                  <td>{item.price}</td>
                  <td>{item.price}</td>
                  <td>{item.price}</td>
                  <td>
                    <a href="#" className="tm-product-delete-link">
                      <i className="far fa-trash-alt tm-product-delete-icon" />
                    </a>
                  </td>
                </tr>
              ))}

              <tr>
                <th scope="row">
                  <input type="checkbox" />
                </th>
                <td className="tm-product-name">Lorem Ipsum Product 11</td>
                <td>2,000</td>
                <td>400</td>
                <td>21 Jan 2019</td>
                <td>
                  <a href="#" className="tm-product-delete-link">
                    <i className="far fa-trash-alt tm-product-delete-icon" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* table container */}
        <a
          href="add-product.html"
          className="btn btn-primary btn-block text-uppercase mb-3"
        >
          Add new product
        </a>
      </div>
    </div>
  );
};

export default ListProductAdmin;
