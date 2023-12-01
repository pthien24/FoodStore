import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productService, { IProduct } from "../services/productService";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/reducers/carSlice";
import { toast } from "react-toastify";
const Product = () => {
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!/\d+/.test(id as string)) {
      navigate("/not-found");
    } else if (Number(id) > 0) {
      productService.get(Number(id)).then((res) => {
        setProduct(res.data);
      });
    }
  }, [id, navigate]);
  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          id: product.id,
          title: product.name,
          price: product.price,
          description: product.description,
          image: product.image,
          category_id: product.category_id,
          created_at: product.created_at,
          updated_at: product.updated_at,
        })
      );
      toast.success("Added to Cart Successfully");
    }
  };
  return (
    <>
      <div>
        <div className="breadcrumb-section breadcrumb-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <div className="breadcrumb-text">
                  <p>See more Details</p>
                  <h1>Single Product</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="single-product mt-150 mb-150">
          <div className="container">
            <div className="row">
              <div className="col-md-5">
                <div className="single-product-img">
                  <img
                    src={`http://127.0.0.1:8000/storage/${product?.image}`}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-md-7">
                <div className="single-product-content">
                  <h3>{product?.name}</h3>
                  <p className="single-product-pricing">${id}</p>
                  <p>{product?.description}</p>
                  <div className="single-product-form">
                    {/* <form action="index.html">
                      <input type="number" value={1} />
                    </form> */}
                    <button onClick={handleAddToCart}>
                      <i className="fas fa-shopping-cart" /> Add to Cart
                    </button>
                    <p>
                      <strong>Categories: </strong>
                      {product?.category_id}
                    </p>
                  </div>
                  <h4>Share:</h4>
                  <ul className="product-share">
                    <li>
                      <a href="#">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-google-plus-g" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-linkedin" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end single product */}
      </div>
    </>
  );
};

export default Product;
