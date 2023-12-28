import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Topbar from "./AdminLayouts/Topbar";
import Footer from "./AdminLayouts/Footer";
import AdminProductManagement from "../pages/Admin/AdminProductManagement";
import "./css/sb-admin-2.min.css";
import AdminLogin from "../pages/Admin/AdminLogin";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import AdminOrder from "../pages/Admin/AdminOrder";
const AdminLayout = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const role = useSelector((state: RootState) => state.auth.role)?.toString();
  return (
    <>
      <div className="back">
        <Topbar />
        <Routes>
          {isLoggedIn && role === "Admin" ? (
            <>
              <Route path="/" element={<AdminProductManagement />} />
              <Route path="/product" element={<AdminProductManagement />} />
              <Route path="/order" element={<AdminOrder />} />
              <Route path="/order/:id" element={<AdminOrder />} />
            </>
          ) : (
            <Route path="/" element={<AdminLogin />} />
          )}
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default AdminLayout;
