import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Topbar from "../containers/AdminLayouts/Topbar";
import Footer from "../containers/AdminLayouts/Footer";
import AdminProductManagement from "../pages/Admin/AdminProductManagement";
import "./css/sb-admin-2.min.css";
const AdminLayout = () => {
  return (
    <>
      <div className="back">
        <Topbar />
        <Routes>
          <Route path="/" element={<AdminProductManagement />}></Route>
          <Route path="/product" element={<AdminProductManagement />}></Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default AdminLayout;
