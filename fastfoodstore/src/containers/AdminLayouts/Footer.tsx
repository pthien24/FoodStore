import * as React from "react";
import { useState, useEffect } from "react";
const Footer = () => {
  return (
    <footer className="tm-footer row tm-mt-small">
      <div className="col-12 font-weight-light">
        <p className="text-center text-white mb-0 px-4 small">
          Copyright © <b>2018</b> All rights reserved. Design:{" "}
          <a
            rel="nofollow noopener"
            href="https://templatemo.com"
            className="tm-footer-link"
          >
            Template Mo
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
