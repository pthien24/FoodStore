import * as React from "react";
import { Route, Routes } from "react-router-dom";
import AdminProductManagement from "../pages/Admin/AdminProductManagement";
import "../assets/css/sb-admin-2.min.css";
const AdminLayout = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/users" element={<AdminUserManagement />}></Route> */}
        <Route path="" element={<AdminProductManagement />}></Route>
        <Route path="/products" element={<AdminProductManagement />}></Route>
        {/* <Route path="/orders" element={<AdminOrderManagement />}></Route> */}
        {/* Add more admin routes as needed */}
      </Routes>
    </>
  );
};

export default AdminLayout;
