import * as React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { logout } from "../../store/reducers/authSlice";

const Header = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const userName = useSelector(
    (state: RootState) => state.auth.userInfo?.username
  );
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatch the "logout" action to clear the authentication state
    dispatch(logout());
  };
  return (
    <div className="top-header-area" id="sticker">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-sm-12 text-center">
            <div className="main-menu-wrap">
              {/* logo */}
              <div className="site-logo">
                <Link to="home">
                  <img src={logo} alt="logo" />
                </Link>
              </div>
              <nav className="main-menu">
                <ul>
                  <li className="current-list-item">
                    <Link to="home">Trang Chủ</Link>
                  </li>
                  <li>
                    <Link to="about">Giới Thiệu</Link>
                  </li>
                  <li>
                    <Link to="about">Khuyến Mãi-Combo</Link>
                  </li>
                  <li>
                    <Link to="news">Tin Tức</Link>
                  </li>
                  <li>
                    <Link to="contact">Liên Hệ</Link>
                  </li>
                  <li>
                    <Link to="/menu">Thực Đơn</Link>
                  </li>
                  <li>
                    {isLoggedIn ? (
                      <div className="header-icons">
                        <Link to="/profile">{userName}</Link>

                        <button onClick={handleLogout}>Logout</button>
                      </div>
                    ) : (
                      <div className="header-icons">
                        <Link to="/login">login</Link>
                        <span>||</span>
                        <Link to="/register">register</Link>
                      </div>
                    )}
                  </li>
                </ul>
              </nav>
              <a className="mobile-show search-bar-icon" href=" ">
                <i className="fas fa-search" />
              </a>
              <div className="mobile-menu" />
              {/* menu end */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
