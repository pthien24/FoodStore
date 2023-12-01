import React from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./containers/DefaultLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<DefaultLayout />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
      {/* <Header />
      <Home />
      <Footer /> */}
    </>
  );
}

export default App;
