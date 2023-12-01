import * as React from "react";
import { useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";
const About = () => {
  return (
    <>
      <Breadcrumb title={"About"} />
      <div>
        {/* advertisement section */}
        <div className="abt-section mb-150 mt-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <div className="abt-bg">
                  <a
                    href="https://youtu.be/ZVhgcKr3lMU"
                    className="video-play-btn popup-youtube"
                  >
                    <i className="fas fa-play" />
                  </a>
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="abt-text">
                  <p className="top-sub">Thành Lập Năm 2023</p>
                  <h2>
                    Chúng Tôi Là
                    <span className="orange-text">FastFoodie Delights</span>
                  </h2>
                  <p>
                    Tôi xin giới thiệu đến bạn một thương hiệu độc đáo và đầy
                    sáng tạo - FastFoodie Delights. Chúng tôi tự hào là một nhà
                    hàng fast food với phong cách hoàn toàn mới, đánh bại mọi dự
                    kiến và mang đến cho bạn một trải nghiệm ẩm thực tuyệt vời.
                  </p>
                  <p>
                    FastFoodie Delights không giống bất kỳ thương hiệu fast food
                    nào bạn từng thấy trước đây. Với tôn chỉ tạo ra sự vui vẻ và
                    thú vị trong mỗi bữa ăn, chúng tôi đã biến thực đơn fast
                    food trở thành một bức tranh truyện tranh sống động. Mỗi món
                    ăn tại đây không chỉ là thực phẩm mà còn là những nhân vật
                    đáng yêu trong câu chuyện ẩm thực của chúng tôi.
                  </p>
                  <p>
                    Bạn có thể tìm kiếm foodio dễ dàng bằng các công cụ tìm kiếm
                    thông minh bằng cách gõ: tên địa điểm, hoặc địa chỉ, hoặc
                    tên đường, hoặc tên món ăn, hoặc mục đích, hoặc tên khu vực.
                    Hệ thống tìm kiếm sử dụng gợi ý &amp; xem nhanh thông tin,
                    giúp bạn tìm địa điểm nhanh nhất
                  </p>
                  <p>
                    Chúng tôi mang đến cho bạn không chỉ những bữa ăn nhanh
                    chóng và ngon miệng mà còn một trải nghiệm giải trí. Các
                    nhân vật thú vị, màu sắc tươi sáng và hương vị đặc trưng sẽ
                    làm bạn thích thú từ lần đầu tiên đặt chân vào FastFoodie
                    Delights. Chúng tôi cam kết mang đến cho bạn niềm vui và
                    hạnh phúc thông qua từng miếng thức ăn.
                  </p>
                  <p>
                    Với chúng tôi, không chỉ là việc ăn, mà còn là cả một cuộc
                    phiêu lưu ngon miệng. FastFoodie Delights sẽ đánh thức trí
                    tưởng tượng của bạn, làm bạn mỉm cười và thỏa mãn cơn đói
                    với phong cách độc đáo và tươi mới. Hãy đặt chân đến với
                    chúng tôi và cùng chia sẻ niềm đam mê với ẩm thực fast food,
                    đúng cách của FastFoodie Delights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end advertisement section */}
        {/* featured section */}
        <div className="feature-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <div className="featured-text">
                  <h2 className="pb-3">
                    Vì Sao Nên Chọn
                    <span className="orange-text">FastFoodie Delights</span>
                  </h2>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 mb-4 mb-md-5">
                      <div className="list-box d-flex">
                        <div className="list-icon">
                          <i className="fas fa-shipping-fast" />
                        </div>
                        <div className="content">
                          <h3>Giao Hàng Tận Nơi</h3>
                          <p>
                            Hoạt động 24/7, đặt hàng đơn giản, giao hàng nhanh
                            chóng
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 mb-5 mb-md-5">
                      <div className="list-box d-flex">
                        <div className="list-icon">
                          <i className="fas fa-money-bill-alt" />
                        </div>
                        <div className="content">
                          <h3>Giá Cả Phải Chăng</h3>
                          <p>Giá rẻ bất ngờ, phù hợp với mọi người</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 mb-5 mb-md-5">
                      <div className="list-box d-flex">
                        <div className="list-icon">
                          <i className="fas fa-briefcase" />
                        </div>
                        <div className="content">
                          <h3>Đóng Gói An Toàn</h3>
                          <p>
                            Đảm bảo an toàn vệ sinh và chất lượng của sản phẩm
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="list-box d-flex">
                        <div className="list-icon">
                          <i className="fas fa-sync-alt" />
                        </div>
                        <div className="content">
                          <h3>Hoàn Trả Sản Phẩm</h3>
                          <p>Hoàn Trả 100% khi Đơn Hàng Gặp Sự Cố</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="shop-banner">
        <div className="container">
          <h3>
            Khuyến Mãi Tháng 9<br />
            Tưng Bừng<span className="orange-text">Mua Sắm</span>
          </h3>
          <div className="sale-percent">
            <span>
              Giảm! <br /> Đến
            </span>
            50% <span>Khi Mua</span>
          </div>
          <a href=" " className="cart-btn btn-lg">
            Đến Cửa Hàng
          </a>
        </div>
      </section>
    </>
  );
};

export default About;
