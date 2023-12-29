import * as React from "react";
import Carousel from "react-bootstrap/Carousel";
import bg1 from "../assets/img/hero-1.webp";
import bg2 from "../assets/img/foodio-slideshow2.webp";
import bg3 from "../assets/img/hero-3.webp";
import product1 from "../assets/img/fastfood-2.webp";
import ProductItem from "../components/ProductIteam";
import { Link, useNavigate } from "react-router-dom";
import Item from "../components/Item";
import productService, { IProduct } from "../services/productService";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

const Home = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [category] = useState(1);
  const showProduct = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    navigate(`../menu/${id}`);
  };
  const fetchProducts = async () => {
    const res = await productService.listwithCategory(category);
    setProducts(res.data);
  };
  useEffect(() => {
    fetchProducts();
  }, [category]);
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={bg1} alt="t" />
          <Carousel.Caption>
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-lg-7 offset-lg-1 offset-xl-0">
                  <div className="hero-text">
                    <div className="hero-text-tablecell">
                      <p className="subtitle">Chúng tôi là nhà hàng Foodio</p>
                      <h1>Cùng Thưởng Thức những món ăn Tuyệt Vời</h1>
                      <div className="hero-btns">
                        <Link to="../menu" className="boxed-btn">
                          Xem Thực Đơn Của chúng tôi
                        </Link>
                        <Link to="../contact" className="bordered-btn">
                          Liên Hệ
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={bg2} alt="" />
          <Carousel.Caption>
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-lg-7 offset-lg-1 offset-xl-0">
                  <div className="hero-text">
                    <div className="hero-text-tablecell">
                      <p className="subtitle">Burger Pho Mát Nướng</p>
                      <h1>Ưu Đãi Có Giới Hạn</h1>
                      <div className="hero-btns">
                        <Link to="../menu" className="boxed-btn">
                          Xem Thực Đơn Của chúng tôi
                        </Link>
                        <Link to="../contact" className="bordered-btn">
                          Liên Hệ
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={bg3} alt="" />
          <Carousel.Caption>
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-lg-7 offset-lg-1 offset-xl-0">
                  <div className="hero-text">
                    <div className="hero-text-tablecell">
                      <p className="subtitle">Pizza Ngập Vị Pho Mát</p>
                      <h1>Đừng Bỏ Lỡ Cơ Hội</h1>
                      <div className="hero-btns">
                        <Link to="../menu" className="boxed-btn">
                          Xem Thực Đơn Của chúng tôi
                        </Link>
                        <Link to="../contact" className="bordered-btn">
                          Liên Hệ
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="list-section pt-80 pb-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <div className="list-box d-flex align-items-center">
                <div className="list-icon">
                  <i className="fas fa-shipping-fast" />
                </div>
                <div className="content">
                  <h3>Miễn Phí Vận Chuyển</h3>
                  <p>Khi Bạn Đặt Món Trên 500.000đ</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <div className="list-box d-flex align-items-center">
                <div className="list-icon">
                  <i className="fas fa-phone-volume" />
                </div>
                <div className="content">
                  <h3>Hỗ Trợ 24/7</h3>
                  <p>Chúng Tôi Sẵn Sàng Hỗ Bạn Mọi Lúc</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="list-box d-flex justify-content-start align-items-center">
                <div className="list-icon">
                  <i className="fas fa-sync" />
                </div>
                <div className="content">
                  <h3>Hoàn Trả</h3>
                  <p>Bạn Có Thể Hoàn Trả Trong 12 Tiếng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="product-section mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="section-title">
                <h3>
                  <span className="orange-text">Thực</span>Đơn
                </h3>
              </div>
            </div>
          </div>
          <div className="row">
            {products.map((data) => (
              <Item
                key={data.id}
                id={data.id}
                title={data.productName}
                image={data.productImage}
                price={data.price}
                showProduct={showProduct} // Pass the showProduct function as a prop
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
