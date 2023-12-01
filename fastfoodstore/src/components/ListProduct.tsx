import React from "react";
import { IProduct } from "../services/productService";

interface ListProductProps {
  products: IProduct[];
  showProduct: (e: React.MouseEvent, id: number) => void;
}

const ListProduct: React.FC<ListProductProps> = ({ products, showProduct }) => {
  return (
    <>
      <div className="row product-lists">
        {products.map((data) => (
          <div key={data.id} className="col-lg-4 col-md-6 text-center">
            <div className="single-product-item">
              <div className="product-image">
                <a
                  href="single-product.html"
                  onClick={(e) => showProduct(e, data.id)}
                >
                  <img
                    src={`http://127.0.0.1:8000/storage/${data.image}`}
                    alt={data.name}
                  />
                </a>
              </div>
              <h3>{data.name}</h3>
              <p className="product-price">
                <span>Tính Theo Số Lượng</span> {data.price}{" "}
              </p>
              <button className="cart-btn">
                <i className="fas fa-shopping-cart" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Display the cart quantity in your UI */}
    </>
  );
};

export default ListProduct;
