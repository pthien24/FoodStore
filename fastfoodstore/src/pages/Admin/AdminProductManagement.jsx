import React, { useState, useEffect } from "react";
import productService, { Iproducts } from "../../newservices/productService";

const AdminProductManagement = () => {
  return (
    <div className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Tables</h1>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Product</h6>
        </div>
        <div className="card-body">
          <table className="table table-bordered" width="100%">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                {/* Add more headers as needed */}
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProductManagement;
