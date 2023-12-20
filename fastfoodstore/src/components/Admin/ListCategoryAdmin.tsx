import * as React from "react";
import { useState, useEffect } from "react";
import categoryService, { ICategory } from "../../services/categoryService";
import { Button, Card, Modal } from "react-bootstrap";
import Input from "../Input";
import Product from "./../../pages/Product";
import { IProduct } from "../../services/productService";
import Item from "./../Item";
const ListCategoryAdmin = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<IProduct[]>([]); // Rename this state
  const [newCategory, setNewCategory] = useState<ICategory>({
    id: 0, // Assuming the ID will be assigned by the server
    name: "",
  });

  const [showModal, setShowModal] = useState(false);
  const handleClosemodal = () => {
    setShowModal(false);
    fetchData();
  };
  const handleShowModal = () => setShowModal(true);

  const [showModaldetail, setShowModaldetail] = useState(false);
  const handleClosemodaldetail = () => {
    setShowModaldetail(false);
  };
  const handleShowModaldetail = () => {
    setShowModaldetail(true);
  };
  const showmodaldetail = (e: any, id: number) => {
    if (e) e.preventDefault();
    categoryService.get(id).then((res) => {
      setNewCategory({ id: res.data.id, name: res.data.name });
      if (res.data.id > 0) {
        categoryService.getProductsWithCategory(res.data.id).then((resp) => {
          console.log(resp);
          setCategoryProducts(resp.data);
        });
      }

      handleShowModaldetail();
    });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory({
      ...newCategory,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  const handleSave = () => {
    if (newCategory.id === 0) {
      categoryService.add(newCategory).then((res) => {
        if (res.data.statusCode === 1) {
          setNewCategory({ id: 0, name: "" });
          handleClosemodal();
        }
      });
    } else if (newCategory.id > 0) {
      categoryService.update(newCategory, newCategory.id).then((res) => {
        if (res.statusCode) {
          setNewCategory({ id: 0, name: "" });
          handleClosemodal();
        }
      });
    }
  };
  const handleDelete = (e: any, categoryId: number) => {
    if (e) e.preventDefault();
    categoryService.delete(categoryId).then((res) => {
      if (res.statusCode === 1) {
        console.log(res);
        fetchData();
      }
    });
  };
  const showmodal = (e: any, id: number) => {
    if (e) e.preventDefault();
    if (id === 0) {
      setNewCategory({ id: 0, name: "" });
      handleShowModal();
    } else if (id > 0) {
      categoryService.get(id).then((res) => {
        setNewCategory({ id: res.data.id, name: res.data.name });
        handleShowModal();
      });
    }
  };

  const fetchData = async () => {
    try {
      const response = await categoryService.list();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 tm-block-col">
      <div className="tm-bg-primary-dark tm-block tm-block-product-categories">
        <h2 className="tm-block-title">Product Categories</h2>
        <div className="tm-product-table-container">
          <table className="table tm-table-small tm-product-table">
            <tbody>
              {categories.map((item) => (
                <tr key={item.id}>
                  <td className="tm-product-name">
                    <a href="/" onClick={(e) => showmodaldetail(e, item.id)}>
                      {" "}
                      {item.name}
                    </a>
                  </td>
                  <td className="text-center">
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
                      <i className="far fa-pen-to-square  tm-product-delete-icon" />
                    </a>
                  </td>
                  <td className="text-center"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* table container */}
        <button
          className="btn btn-primary btn-block text-uppercase mb-3"
          onClick={(e) => showmodal(e, 0)}
        >
          Add new category
        </button>
      </div>
      <Modal show={showModal} onHide={handleClosemodal}>
        <Modal.Header style={{ backgroundColor: "#435c70" }} closeButton>
          <Modal.Title style={{ color: "white" }}>
            Category{" "}
            <small className="text-muted" style={{ color: "white" }}>
              {newCategory.id === 0 ? "new" : "edit"}
            </small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#435c70" }}>
          <form>
            <Input
              lable="Category Name"
              id="txtCategoryname"
              name="name"
              value={newCategory.name}
              onChange={handleInputChange}
              required={true}
              lastrow={false}
              lableSize={5}
            />
          </form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#435c70" }}>
          <Button variant="secondary" onClick={handleClosemodal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {newCategory.id === 0 ? "save" : "edit"} Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* modal detail */}
      <Modal show={showModaldetail} onHide={handleClosemodaldetail} centered>
        <Card>
          <Card.Header style={{ backgroundColor: "#435c70", color: "white" }}>
            Category Detail
          </Card.Header>
          <Card.Body style={{ backgroundColor: "#f8f9fa" }}>
            <Card.Title>
              <strong>{newCategory.name}</strong>
            </Card.Title>
            <Card.Text>
              <strong>ID:</strong> {newCategory.id}
            </Card.Text>
            <Card.Text>
              <strong>Products:</strong>
              <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                {categoryProducts.map((item, index) => (
                  <li key={index}>
                    <strong>{item.productName}</strong> - {item.price} -{" "}
                    {item.description}
                  </li>
                ))}
              </ul>
            </Card.Text>
            <Button variant="primary" onClick={handleClosemodaldetail}>
              Close
            </Button>
          </Card.Body>
        </Card>
      </Modal>
    </div>
  );
};

export default ListCategoryAdmin;
