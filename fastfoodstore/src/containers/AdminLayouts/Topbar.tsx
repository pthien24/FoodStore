import * as React from "react";
import { useState, useEffect } from "react";
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
              <a className="nav-link" href="index.html">
                <i className="fas fa-tachometer-alt" /> Dashboard
                <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="far fa-file-alt" />
                <span>
                  {" "}
                  Reports <i className="fas fa-angle-down" />{" "}
                </span>
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  Daily Report
                </a>
                <a className="dropdown-item" href="#">
                  Weekly Report
                </a>
                <a className="dropdown-item" href="#">
                  Yearly Report
                </a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="products.html">
                <i className="fas fa-shopping-cart" /> Products
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="accounts.html">
                <i className="far fa-user" /> Accounts
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-cog" />
                <span>
                  {" "}
                  Settings <i className="fas fa-angle-down" />{" "}
                </span>
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  Profile
                </a>
                <a className="dropdown-item" href="#">
                  Billing
                </a>
                <a className="dropdown-item" href="#">
                  Customize
                </a>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link d-block" href="login.html">
                Admin, <b>Logout</b>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
