import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../containers/AdminLayouts/Sidebar";
import Topbar from "../containers/AdminLayouts/Topbar";
import Footer from "../containers/AdminLayouts/Footer";
import AdminProductManagement from "../pages/Admin/AdminProductManagement";
import "../assets/css/sb-admin-2.min.css";
const AdminLayout = () => {
  return (
    <>
      <div id="wrapper">
        {/* Sidebar */}
        <Sidebar />
        {/* End of Sidebar */}
        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
            <Topbar />

            <Routes>
              {/* <Route path="/users" element={<AdminUserManagement />}></Route> */}
              <Route path="" element={<AdminProductManagement />}></Route>
              <Route
                path="/products"
                element={<AdminProductManagement />}
              ></Route>
              {/* <Route path="/orders" element={<AdminOrderManagement />}></Route> */}
              {/* Add more admin routes as needed */}
            </Routes>

            {/* /.container-fluid */}
          </div>

          <Footer />
        </div>
      </div>

      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up" />
      </a>
      {/* Logout Modal*/}
    </>
  );
};

export default AdminLayout;
