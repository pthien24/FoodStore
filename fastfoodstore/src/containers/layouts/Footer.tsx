import * as React from "react";
import { useState, useEffect } from "react";
const Footer = () => {
  return (
    <div>
      <div className="footer-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="footer-box about-widget">
                <h2 className="widget-title">Thời Gian</h2>
                <p>
                  Thứ Ba - Thứ Bảy: 12:00 trưa - 23:00 chiều Đóng cửa vào Chủ
                  Nhật
                </p>
                <p>Được xếp hạng 5 sao trên TripAdvisor</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-box get-in-touch">
                <h2 className="widget-title">Địa chỉ</h2>
                <ul>
                  <li>Công Viên Phần Mềm Quang Trung, Quận 12,TP.HCM</li>
                  <li>support@foodio.com</li>
                  <li>+00 111 222 3333</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-box pages">
                <h2 className="widget-title">Pages</h2>
                <ul>
                  <li>
                    <a href="index2.html">Trang Chủ</a>
                  </li>
                  <li>
                    <a href="about.html">Giới Thiệu</a>
                  </li>
                  <li>
                    <a href="shop.html">Thực Đơn</a>
                  </li>
                  <li>
                    <a href="news.html">Tin Tức</a>
                  </li>
                  <li>
                    <a href="contact.html">Liên Hệ</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-box subscribe">
                <h2 className="widget-title">Đăng Kí</h2>
                <p>Đăng Kí Để Theo Dõi Những Thông Tin Mới Nhất Từ Chúng Tôi</p>
                <form action="index.html">
                  <input type="email" placeholder="Email" />
                  <button type="submit">
                    <i className="fas fa-paper-plane" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <p>
                Copyrights © 2019 - <a href="#">uu</a>, All Rights Reserved.
                <br />
                Distributed By - <a href="#">Nhóm 15</a>
              </p>
            </div>
            <div className="col-lg-6 text-right col-md-12">
              <div className="social-icons">
                <ul>
                  <li>
                    <a href="#" target="_blank">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i className="fab fa-instagram" />
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i className="fab fa-linkedin" />
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i className="fab fa-dribbble" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
