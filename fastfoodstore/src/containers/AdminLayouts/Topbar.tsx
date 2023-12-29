import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Topbar = () => {
  return (
    <nav className="navbar navbar-expand-xl">
      <div className="container h-100">
        <a className="navbar-brand" href="index.html">
          <h1 className="tm-site-title mb-0">Product Admin</h1>
        </a>
        <button
          className="navbar-toggler ml-auto mr-0"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars tm-nav-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto h-100">
            <li className="nav-item">
              <Link to="/admin/order" className="nav-link">
                <i className="fas fa-tachometer-alt" /> Dashboard
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/product" className="nav-link">
                <i className="fas fa-shopping-cart" /> Products
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="accounts.html">
                <i className="far fa-user" /> Accounts
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
