import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productService, { IProduct } from "../services/productService";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/reducers/carSlice";
import { toast } from "react-toastify";
import reviewService, { IReview } from "../services/reviewService";
const Product = () => {
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  const [reviews, setReviews] = useState<IReview[]>([]);
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
      reviewService.listWithProduct(Number(id)).then((response) => {
        // Do something with the reviews associated with the product
        console.log(response);
        setReviews(response.data);
      });
    }
  }, [id, navigate]);
  const handleAddToCart = () => {
    if (product) {
      // dispatch(
      //   addToCart({
      //     id: product.id,
      //     title: product.name,
      //     price: product.price,
      //     description: product.description,
      //     image: product.image,
      //     category_id: product.category_id,
      //     created_at: product.created_at,
      //     updated_at: product.updated_at,
      //   })
      // );
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
                    src={`http://localhost:5068/resources/${product?.productImage}`}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-md-7">
                <div className="single-product-content">
                  <h3>{product?.productName}</h3>
                  <p className="single-product-pricing">${id}</p>
                  <p>{product?.description}</p>
                  <div className="single-product-form">
                    <form action="index.html">
                      <input type="number" value={1} />
                    </form>
                    <button onClick={handleAddToCart}>
                      <i className="fas fa-shopping-cart" /> Add to Cart
                    </button>
                    <p>
                      <strong>Categories: </strong>
                      {/* {product?.category} */}
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
        <div className="more-products mb-150">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <div className="section-title">
                  <h3>
                    <span className="orange-text">Related</span> Products
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aliquid, fuga quas itaque eveniet beatae optio.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6 text-center">
                <div className="single-product-item">
                  <div className="product-image">
                    <a href="single-product.html">
                      <img
                        src={`http://localhost:5068/resources/${product?.productImage}`}
                      />
                    </a>
                  </div>
                  <h3>Strawberry</h3>
                  <p className="product-price">
                    <span>Per Kg</span> 85${" "}
                  </p>
                  <a href="cart.html" className="cart-btn">
                    <i className="fas fa-shopping-cart" /> Add to Cart
                  </a>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 text-center">
                <div className="single-product-item">
                  <div className="product-image">
                    <a href="single-product.html">
                      <img
                        src={`http://localhost:5068/resources/${product?.productImage}`}
                      />
                    </a>
                  </div>
                  <h3>Berry</h3>
                  <p className="product-price">
                    <span>Per Kg</span> 70${" "}
                  </p>
                  <a href="cart.html" className="cart-btn">
                    <i className="fas fa-shopping-cart" /> Add to Cart
                  </a>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 offset-lg-0 offset-md-3 text-center">
                <div className="single-product-item">
                  <div className="product-image">
                    <a href="single-product.html">
                      <img
                        src={`http://localhost:5068/resources/${product?.productImage}`}
                      />
                    </a>
                  </div>
                  <h3>Lemon</h3>
                  <p className="product-price">
                    <span>Per Kg</span> 35${" "}
                  </p>
                  <a href="cart.html" className="cart-btn">
                    <i className="fas fa-shopping-cart" /> Add to Cart
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div>
            <div id="reviews" className="review-section">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h4 className="m-0">37 Reviews</h4>

                <span
                  className="select2 select2-container select2-container--default"
                  dir="ltr"
                  data-select2-id={2}
                  style={{ width: 188 }}
                >
                  <span className="selection">
                    <span
                      className="select2-selection select2-selection--single"
                      // role="combobox"
                      aria-haspopup="true"
                      aria-expanded="false"
                      tabIndex={0}
                      aria-labelledby="select2-qd66-container"
                    >
                      <span
                        className="select2-selection__rendered"
                        id="select2-qd66-container"
                        role="textbox"
                        aria-readonly="true"
                        title="Most Relevant"
                      >
                        Most Relevant
                      </span>
                      <span
                        className="select2-selection__arrow"
                        role="presentation"
                      >
                        <b role="presentation" />
                      </span>
                    </span>
                  </span>
                  <span className="dropdown-wrapper" aria-hidden="true" />
                </span>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <table className="stars-counters">
                    <tbody>
                      <tr>
                        <td>
                          <span>
                            <button className="fit-button fit-button-color-blue fit-button-fill-ghost fit-button-size-medium stars-filter">
                              5 Stars
                            </button>
                          </span>
                        </td>
                        <td className="progress-bar-container">
                          <div className="fit-progressbar fit-progressbar-bar star-progress-bar">
                            <div className="fit-progressbar-background">
                              <span
                                className="progress-fill"
                                style={{ width: "97.2973%" }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="star-num">(36)</td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            <button className="fit-button fit-button-color-blue fit-button-fill-ghost fit-button-size-medium stars-filter">
                              5 Stars
                            </button>
                          </span>
                        </td>
                        <td className="progress-bar-container">
                          <div className="fit-progressbar fit-progressbar-bar star-progress-bar">
                            <div className="fit-progressbar-background">
                              <span
                                className="progress-fill"
                                style={{ width: "2.2973%" }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="star-num">(2)</td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            <button className="fit-button fit-button-color-blue fit-button-fill-ghost fit-button-size-medium stars-filter">
                              5 Stars
                            </button>
                          </span>
                        </td>
                        <td className="progress-bar-container">
                          <div className="fit-progressbar fit-progressbar-bar star-progress-bar">
                            <div className="fit-progressbar-background">
                              <span
                                className="progress-fill"
                                style={{ width: 0 }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="star-num">(0)</td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            <button className="fit-button fit-button-color-blue fit-button-fill-ghost fit-button-size-medium stars-filter">
                              5 Stars
                            </button>
                          </span>
                        </td>
                        <td className="progress-bar-container">
                          <div className="fit-progressbar fit-progressbar-bar star-progress-bar">
                            <div className="fit-progressbar-background">
                              <span
                                className="progress-fill"
                                style={{ width: 0 }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="star-num">(0)</td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            <button className="fit-button fit-button-color-blue fit-button-fill-ghost fit-button-size-medium stars-filter">
                              5 Stars
                            </button>
                          </span>
                        </td>
                        <td className="progress-bar-container">
                          <div className="fit-progressbar fit-progressbar-bar star-progress-bar">
                            <div className="fit-progressbar-background">
                              <span
                                className="progress-fill"
                                style={{ width: 0 }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="star-num">(0)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-6">
                  <div className="ranking">
                    <h6 className="text-display-7">Rating Breakdown</h6>
                    <ul>
                      <li>
                        Seller communication level
                        <span>
                          5<span className="review-star rate-10 show-one" />
                        </span>
                      </li>
                      <li>
                        Recommend to a friend
                        <span>
                          5<span className="review-star rate-10 show-one" />
                        </span>
                      </li>
                      <li>
                        Service as described
                        <span>
                          4.9
                          <span className="review-star rate-10 show-one" />
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="review-list">
              <ul>
                {reviews?.map((review) => (
                  <li>
                    <div className="d-flex">
                      <div className="left">
                        <span>
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                            className="profile-pict-img img-fluid"
                          />
                        </span>
                      </div>

                      <div className="right">
                        <h4>
                          {review.user.userName}

                          <span className="gig-rating text-body-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 1792 1792"
                              width={15}
                              height={15}
                            >
                              <path
                                fill="currentColor"
                                d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                              />
                            </svg>
                            {review.rating}
                          </span>
                        </h4>
                        <div className="country d-flex align-items-center">
                          <span>
                            <img
                              className="country-flag img-fluid"
                              src="https://bootdey.com/img/Content/avatar/avatar6.png"
                            />
                          </span>
                        </div>
                        <div className="review-description">
                          <p>{review.text}</p>
                        </div>
                        <span className="publish py-3 d-inline-block w-100">
                          Published 4 weeks ago
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
