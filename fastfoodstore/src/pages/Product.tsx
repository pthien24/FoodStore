import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productService, {
  IProduct,
  IProductreponse,
} from "../services/productService";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/reducers/carSlice";
import { toast } from "react-toastify";
import reviewService, { INewReview, IReview } from "../services/reviewService";
import Input from "../components/Input";
import { RootState } from "../store";
const Product = () => {
  const [products, setProducts] = useState<IProductreponse[]>([]);

  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [newreviews, setNewReviews] = useState<INewReview>({
    title: "",
    text: "",
    rating: 1,
  });
  const [category, setCategory] = useState(0);

  const fetchProducts = async () => {
    const res = await productService.listwithCategory(category);
    setProducts(res.data);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewReviews((prevReviews) => ({
      ...prevReviews,
      [name]: value,
    }));
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value, 10);
    setNewReviews((prevReviews) => ({
      ...prevReviews,
      rating: value,
    }));
  };
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userid = useSelector((state: RootState) => state.auth.userInfo?.id);
  const handlecreatereview = async () => {
    console.log("create review");
    if (!/\d+/.test(id as string)) {
      navigate("/not-found");
    } else if (Number(id) > 0) {
      reviewService
        .CreateReview(newreviews, String(userid), Number(id))
        .then((res) => {
          console.log(res);
        });
    }
  };

  useEffect(() => {
    if (!/\d+/.test(id as string)) {
      navigate("/not-found");
    } else if (Number(id) > 0) {
      productService.get(Number(id)).then((res) => {
        setProduct(res.data);
        productService.getcategory(Number(id)).then((res) => {
          setCategory(res.data.id);
        });
      });
      reviewService.listWithProduct(Number(id)).then((response) => {
        console.log(response);
        setReviews(response.data);
      });
    }
  }, [id, navigate]);
  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          id: product.id,
          title: product.productName,
          price: product.price,
          description: product.description,
          image: product.productImage,
          category_id: 0,
          created_at: "",
          updated_at: "",
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
                {products.map((item) => (
                  <div className="single-product-item">
                    <div className="product-image">
                      <a href="single-product.html">
                        <img
                          src={`http://localhost:5068/resources/${item?.productImage}`}
                        />
                      </a>
                    </div>
                    <h3>{item.productName}</h3>
                    <p className="product-price">
                      <span></span> {item.price}${" "}
                    </p>
                    <a href="cart.html" className="cart-btn">
                      <i className="fas fa-shopping-cart" /> Add to Cart
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div>
            <div id="reviews" className="review-section">
              <div className="d-flex align-items-center justify-content-between mb-4"></div>
              <div className="row">
                <div className="panel">
                  <div className="panel-body">
                    <form>
                      <Input
                        lable="Title"
                        id="txtPrice"
                        name="Title"
                        type="number"
                        labelColor="black"
                        textColor="black"
                        required={true}
                        lastrow={false}
                        lableSize={5}
                        row={2}
                        backgroundColor="white"
                        onChange={handleInputChange}
                      />
                      <Input
                        lable="Text"
                        labelColor="black"
                        id="txtPrice"
                        name="Text"
                        type="number"
                        backgroundColor="white"
                        textColor="black"
                        required={true}
                        lastrow={false}
                        lableSize={5}
                        row={8}
                        onChange={handleInputChange}
                      />
                      <select
                        className="form-select"
                        name="rating"
                        aria-label="Default select example"
                        onChange={handleSelectChange}
                      >
                        <option selected>Open this select start</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        <option value="4">Four</option>
                        <option value="5">five</option>
                      </select>
                      <div className="mar-top clearfix">
                        <button
                          className="btn btn-sm btn-primary pull-right"
                          type="submit"
                          onClick={handlecreatereview}
                        >
                          <i className="fa fa-pencil fa-fw" /> Share
                        </button>
                      </div>
                    </form>
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
                          <span>{review.title}</span>
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
