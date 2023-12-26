import React, { FC, useEffect, useState } from "react";
import Input from "../components/Input";
// import "./Login.css";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/reducers/authSlice";

const Login: FC = () => {
  const dispatch = useDispatch();
  const naviagate = useNavigate();
  const [message, setMessage] = useState("");
  const usernameRef = React.useRef<any>();
  const paswordRef = React.useRef<any>();
  const formSubmitHendler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const password = paswordRef.current?.value;
    userService.login(username, password).then((res) => {
      if (res != null) {
        console.log(res.data);
        setMessage("");
        dispatch(login({ token: res.token, userInfo: res.data }));
        naviagate("/home");
      } else {
        console.log("something went wrong");
      }
    });
  };

  useEffect(() => {
    usernameRef.current?.focus();
  });
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card my-5">
            <form
              onSubmit={formSubmitHendler}
              className="card-body cardbody-color p-lg-5"
            >
              <div className="text-center">
                <img
                  src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                  className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                  width="200px"
                  alt="profile"
                />
              </div>
              <Input
                id="TxtUsername"
                inputRef={usernameRef}
                // lable="User Name"
                type="text"
                autoComplete="off"
                placeholder="Enter your username"
              />
              <Input
                id="TxtPassword"
                inputRef={paswordRef}
                // lable="Password"
                type="password"
                maxLength={100}
                placeholder="Enter password"
              />
              <div className="text-center">
                <button type="submit" className="btn btn-color px-5 mb-5 w-100">
                  Login
                </button>
              </div>
              <div
                id="emailHelp"
                className="form-text text-center mb-5 text-dark"
              >
                Not Registered?{" "}
                <a href="#" className="text-dark fw-bold">
                  {" "}
                  Create an Account
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
