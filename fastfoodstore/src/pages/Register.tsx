import React, { FC, useEffect, useState } from "react";
import Input from "../components/Input";
// import "./Login.css";
import userService from "../services/userService";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/reducers/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const naviagate = useNavigate();
  const [message, setMessage] = useState("");
  const usernameRef = React.useRef<any>();
  const paswordRef = React.useRef<any>();
  const firstnameRef = React.useRef<any>();
  const lastnameRef = React.useRef<any>();
  const emailRef = React.useRef<any>();
  const phoneRef = React.useRef<any>();
  const formSubmitHendler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const password = paswordRef.current?.value;
    const firstname = firstnameRef.current?.value;
    const lastname = lastnameRef.current?.value;
    const email = emailRef.current?.value;
    const phone = phoneRef.current?.value;
    userService
      .register(lastname, firstname, username, phone, email, password)
      .then((res) => {
        if (res.errorCode === 0) {
          userService.login(username, password).then((res) => {
            if (res.errorCode === 0) {
              setMessage("");
              dispatch(login({ token: res.data.token, userInfo: res.data }));
              naviagate("/home");
            } else {
              setMessage(res.message);
            }
          });
        } else {
          setMessage(res.message);
          toast.error(message);
        }
      });
  };
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
                id="Txtfname"
                inputRef={firstnameRef}
                // lable="User Name"
                type="text"
                autoComplete="off"
                placeholder="Enter your first name"
              />
              <Input
                id="Txtlname"
                inputRef={lastnameRef}
                // lable="User Name"
                type="text"
                autoComplete="off"
                placeholder="Enter your last name"
              />
              <Input
                id="Txtemail"
                inputRef={emailRef}
                type="email"
                autoComplete="off"
                placeholder="Enter your email address"
              />
              <Input
                id="Txtphone"
                inputRef={phoneRef}
                // lable="User Name"
                type="text"
                autoComplete="off"
                placeholder="Enter your phone number"
              />
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
                  register
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

export default Register;
