import * as React from "react";
import { useState, useEffect } from "react";
import categoryService, { ICategory } from "../../services/categoryService";
import { Button, Modal } from "react-bootstrap";
import Input from "../Input";
const ListCategoryAdmin = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory({
      ...newCategory,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  const handleSave = () => {
    categoryService.add(newCategory).then((res) => {
      if (res.data.statusCode === 1) {
        setNewCategory({ id: 0, name: "" });
        handleClosemodal();
      }
    });
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
  const showmodaldetails = (e: any) => {
    if (e) e.preventDefault();
    handleShowModal();
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
                  <td className="tm-product-name">{item.name}</td>
                  <td className="text-center">
                    <a
                      href="#"
                      className="tm-product-delete-link"
                      onClick={(e) => handleDelete(e, item.id)}
                    >
                      <i className="far fa-trash-alt tm-product-delete-icon" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* table container */}
        <button
          className="btn btn-primary btn-block text-uppercase mb-3"
          onClick={(e) => showmodaldetails(e)}
        >
          Add new category
        </button>
      </div>
      <Modal show={showModal} onHide={handleClosemodal}>
        <Modal.Header style={{ backgroundColor: "#435c70" }} closeButton>
          <Modal.Title style={{ color: "white" }}>
            Category <small className="text-muted"></small>
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
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListCategoryAdmin;
