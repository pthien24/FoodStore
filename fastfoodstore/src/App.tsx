import React from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./containers/DefaultLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLayout from "./containers/AdminLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<DefaultLayout />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/admin/*" element={<AdminLayout />}></Route>
      </Routes>
      {/* <Header />
      <Home />
      <Footer /> */}
    </>
  );
}

export default App;
