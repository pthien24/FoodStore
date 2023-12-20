import * as React from "react";
import { useState, useEffect } from "react";
import productService, { IProduct } from "../../services/productService";
import { Button, Modal } from "react-bootstrap";
import Input from "./../Input";
import categoryService, { ICategory } from "../../services/categoryService";
import Item from "../Item";
const ListProductAdmin = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [catid, setCatid] = useState(0);
  const [categoryID, setCategoryID] = useState(0);

  const [page, setPage] = useState(0);
  const [size] = useState(20);

  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState("");

  const [category, setCategory] = useState(null);

  const [sort, setSort] = useState("ProductName");
  const [order, setOrder] = useState("ASC");

  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: 0,
    productName: "",
    description: "",
    price: 0,
    productImage: "",
    ImageFile: null as File | null,
  });

  const handleSort = (column: string) => {
    if (column === sort) {
      // If the same column is clicked, toggle the order
      setOrder(order === "ASC" ? "DESC" : "ASC");
    } else {
      // If a different column is clicked, set the new column and default to ASC order
      setSort(column);
      setOrder("ASC");
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0]);
      setNewProduct({
        ...newProduct,
        ImageFile: e.target.files[0],
      });
    }
  };
  const fetchData = async () => {
    try {
      const response = await productService.list(
        page,
        size,
        sort,
        order,
        category,
        filter
      );
      setProducts(response.data.data);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleClosemodal = () => setShowModal(false);
  const handleShowModal = () => {
    fetchDatacategory();
    setShowModal(true);
  };

  const showmodal = async (e: any, id: number) => {
    if (e) e.preventDefault();
    if (id === 0) {
      handleShowModal();
      setNewProduct({
        id: 0,
        productName: "",
        description: "",
        price: 0,
        productImage: "",
        ImageFile: null,
      });
    } else if (id > 0) {
      const categoryResponse = await productService.getcategory(id);
      console.log(categoryResponse);
      setCategoryID(categoryResponse.data.id);
      const productResponse = await productService.get(id);
      const productData = productResponse.data;

      setNewProduct({
        id: productData.id,
        productName: productData.productName,
        description: productData.description,
        price: productData.price,
        productImage: productData.productImage,
        ImageFile: null,
      });
      handleShowModal();
    }
  };
  const fetchDatacategory = async () => {
    try {
      const response = await categoryService.list();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleAddProduct = async () => {
    try {
      if (newProduct.id === 0) {
        productService.add(newProduct, catid).then((res) => {
          if (res.statusCode === 1) {
            setNewProduct({
              id: 0,
              productName: "",
              description: "",
              price: 0,
              productImage: "",
              ImageFile: null,
            });

            handleClosemodal();
            fetchData();
          }
        });

        // Clear the form after successful submission
      } else if (newProduct.id > 0) {
        const categoryIdToUpdate = catid !== 0 ? catid : categoryID;
        productService
          .update(newProduct, categoryIdToUpdate, newProduct.id)
          .then((response) => {
            if (response.statusCode) {
              setNewProduct({
                id: 0,
                productName: "",
                description: "",
                price: 0,
                productImage: "",
                ImageFile: null,
              });
              fetchData();
              handleClosemodal();
            }
          });

        console.log("categoryID: " + categoryID);
        console.log("catid: " + catid);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  const handleDelete = (e: any, productid: number) => {
    if (e) e.preventDefault();
    productService.delete(productid).then((res) => {
      if (res.statusCode === 1) {
        console.log(res);
        fetchData();
      }
    });
  };
  useEffect(() => {
    fetchData();
  }, [page, size, sort, order, category, filter]);
  return (
    <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8 tm-block-col">
      <div className="tm-bg-primary-dark tm-block tm-block-products">
        <h2 className="tm-block-title">Product </h2>
        <Input
          lable="Search"
          id="txtSearch"
          name="search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          required={false}
          lastrow={false}
          lableSize={5}
        />

        <div className="tm-product-table-container">
          <table className="table table-hover tm-table-small tm-product-table">
            <thead>
              <tr>
                <th scope="col">Stt</th>
                <th scope="col" onClick={() => handleSort("ProductName")}>
                  Name {sort === "ProductName" && (order === "ASC" ? "↑" : "↓")}
                </th>
                <th scope="col" onClick={() => handleSort("Price")}>
                  Price {sort === "Price" && (order === "ASC" ? "↑" : "↓")}
                </th>
                <th scope="col">EXPIRE DATE</th>
                <th scope="col">EXPIRE DATE</th>
                <th scope="col">categoey</th>
                <th scope="col">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className="tm-product-name ">{item.productName}</td>
                  <td>{item.price}</td>
                  <td className="product-image">
                    <img
                      src={`http://localhost:5068/resources/${item.productImage}`}
                      alt="item"
                    />
                  </td>
                  <td>{item.price}</td>
                  <td>
                    <a
                      href="/"
                      className="tm-product-delete-link"
                      onClick={(e) => handleDelete(e, item.id)}
                    >
                      <i className="far fa-trash-alt tm-product-delete-icon" />
                    </a>
                    <a
                      href="/"
                      className="tm-product-delete-link"
                      onClick={(e) => showmodal(e, item.id)}
                    >
                      <i className="far fa-pen-to-square tm-product-delete-icon" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* table container */}
        <a
          href="add-product.html"
          className="btn btn-primary btn-block text-uppercase mb-3"
          onClick={(e) => showmodal(e, 0)}
        >
          Add new product
        </a>
      </div>
      <Modal show={showModal} onHide={handleClosemodal}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#435c70", color: "white" }}
        >
          <Modal.Title>
            product{" "}
            <small className="text-muted">
              {newProduct.id === 0 ? "new" : "edit"}
            </small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#435c70", color: "white" }}>
          <form>
            <Input
              lable="Major Name"
              id="txtMajorname"
              name="productName"
              value={newProduct.productName}
              onChange={handleInputChange}
              required={true}
              lastrow={false}
              lableSize={5}
            />
            <Input
              lable="Description"
              id="txtDescription"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              required={true}
              lastrow={false}
              lableSize={5}
            />
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                console.log(e.target.value);
                setCatid(parseInt(e.target.value));
              }}
            >
              <option selected>Open this select category</option>

              {categories.map((category) => (
                <option
                  selected={categoryID === category.id}
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
            <Input
              lable="Price"
              id="txtPrice"
              name="price"
              type="number"
              value={newProduct.price.toString()}
              onChange={handleInputChange}
              required={true}
              lastrow={false}
              lableSize={5}
            />
            <div className="form-group">
              <label htmlFor="fileInput">Product Image</label>
              <input
                type="file"
                className="form-control-file"
                id="fileInput"
                name="ImageFile"
                onChange={handleImageChange}
              />
            </div>
            {newProduct.id > 0 ? (
              <img
                src={`http://localhost:5068/resources/${newProduct.productImage}`}
                alt=""
              />
            ) : null}
          </form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#435c70", color: "white" }}>
          <Button variant="secondary" onClick={handleClosemodal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleAddProduct()}>
            {newProduct.id === 0 ? "Save" : "Edit"} Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListProductAdmin;
