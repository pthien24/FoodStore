import * as React from "react";
import { useState, useEffect } from "react";
interface ProductProps {
  imageUrl: string;
  productName: string;
  price: string;
}
const ProductItem: React.FC<ProductProps> = ({
  imageUrl,
  productName,
  price,
}) => {
  return (
    <div className="col-lg-4 col-md-6 text-center">
      <div className="single-product-item">
        <div className="product-image">
          <a href="single-product.html">
            <img src={imageUrl} />
          </a>
        </div>
        <h3>{productName}</h3>
        <p className="product-price">
          <span>Tính Theo Số Lượng</span> {price}{" "}
        </p>
        <a href="cart.html" className="cart-btn">
          <i className="fas fa-shopping-cart" /> Add to Cart
        </a>
      </div>
    </div>
  );
};

export default ProductItem;
