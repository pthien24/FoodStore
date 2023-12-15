import React, { useEffect, useState } from "react";

import productService, { IProduct } from "../../services/productService";
import { Button, Modal } from "react-bootstrap";
const AdminProductManagement = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [sortKey, setSortKey] = useState("ProductName");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [showModal, setShowModal] = useState(false);

  const [Product, setProduct] = useState({
    id: 0,
    productName: "",
    description: "",
    price: 0,
    category: "",
    productImage: "",
    ImageFile: null as File | null,
  });
  const handleClosemodal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
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
  const handleSort = (key: string) => {
    // Toggle sort order if the same key is clicked
    setSortOrder((prevOrder) =>
      key === sortKey ? (prevOrder === "ASC" ? "DESC" : "ASC") : "ASC"
    );
    setSortKey(key);
  };
  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(0); // Reset to the first page when performing a new search
  };
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const showmodaldetails = (e: any, id: number) => {
    if (e) e.preventDefault();
    productService.getproduct(id).then((res) => {
      if (res.status === 200) {
        setProduct({
          id: res.data.data.id,
          productName: res.data.data.productName,
          description: res.data.data.description,
          price: res.data.data.price,
          category: res.data.data.category,
          productImage: res.data.data.productImage,
          ImageFile: null,
        });
      }
    });
    handleShowModal();
  };
  const handleCategory = (category: string) => {
    setCategory(category);
    setCurrentPage(0); // Reset to the first page when performing a new search
  };
  const fetchCategories = async () => {
    const response = await productService.categories();
    setCategories(response.data);
  };
  const renderCategoryButtons = () => {
    return categories.map((categoryItem) => (
      <Button
        key={categoryItem}
        variant={category === categoryItem ? "primary" : "secondary"}
        onClick={() => handleCategory(categoryItem)}
      >
        {categoryItem}
      </Button>
    ));
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, [searchTerm, currentPage, sortKey, sortOrder, category]);
  return (
    <div className="container-fluid">
      <div className="dataTables_length" id="dataTable_length"></div>

      <h1 className="h3 mb-2 text-gray-800">Tables</h1>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Product</h6>
        </div>
        <div className="card-header py-3">
          <label>Show entries</label>
        </div>
        <div className="card-header py-3">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">category</h6>
          {renderCategoryButtons()}
        </div>
        <div className="card-body">
          <table className="table table-bordered" width="100%">
            <thead>
              <tr>
                <th onClick={() => handleSort("productName")}>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Category</th>
                <th>Category</th>
                <th>action</th>
                {/* Add more head ers as needed */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tiger Nixon</td>
                <td>System Architect</td>
                <td>Edinburgh</td>
                <td>61</td>
                <td>2011/04/25</td>
                <td>$320,800</td>
                <td>
                  <a href="/" className="btn btn-info btn-circle ">
                    <i className="fas fa-info-circle" />
                  </a>
                </td>
              </tr>
              {products.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.productName}</td>
                  <td>
                    <img
                      src={`http://localhost:5068/resources/${item.productImage}`}
                      alt=""
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  </td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>
                    <a
                      href="/"
                      onClick={(e) => showmodaldetails(e, item.id)}
                      className="btn btn-info btn-circle "
                    >
                      <i className="fas fa-info-circle" />
                    </a>
                    <a href="/" className="btn btn-warning  btn-circle ">
                      <i className="fa-solid fa-pen-to-square" />
                    </a>
                    <a href="/" className="btn btn-danger btn-circle">
                      <i className="fas fa-trash" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="row">
            <div className="col-sm-12 col-md-5">
              <div
                className="dataTables_info"
                id="dataTable_info"
                role="status"
                aria-live="polite"
              >
                Showing 1 to 10 of 57 entries
              </div>
            </div>
            <div className="col-sm-12 col-md-7">
              <div
                className="dataTables_paginate paging_simple_numbers"
                id="dataTable_paginate"
              >
                <ul className="pagination">
                  {totalPages > 1 && (
                    <li className="paginate_button page-item ">
                      {Array.from({ length: totalPages }, (_, i) => i).map(
                        (page) => (
                          <Button
                            key={page}
                            variant={
                              currentPage === page ? "primary" : "secondary"
                            }
                            onClick={() => handlePageChange(page)}
                          >
                            {page + 1}
                          </Button>
                        )
                      )}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleClosemodal}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>datails</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminProductManagement;
