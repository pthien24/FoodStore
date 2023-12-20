import ListProduct from "../../components/Admin/ListProductAdmin";
import ListCategory from "../../components/Admin/ListCategoryAdmin";
const AdminProductManagement = () => {
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
