import React, { useEffect, useState } from "react";

import productService, { IProduct } from "../../services/productService";
import { Button, Modal } from "react-bootstrap";
import ListProduct from "../../components/Admin/ListProductAdmin";
import ListCategory from "../../components/Admin/ListCategoryAdmin";
const AdminProductManagement = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryid, setCategory] = useState(null);
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
        categoryid
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

  useEffect(() => {
    fetchData();
  }, [searchTerm, currentPage, sortKey, sortOrder, categoryid]);
  return (
    <div className="container mt-5">
      <div className="row tm-content-row">
        <ListProduct />
        <ListCategory />
      </div>
    </div>
  );
};

export default AdminProductManagement;
