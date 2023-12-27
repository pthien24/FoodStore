import * as React from "react";
import Breadcrumb from "../components/Breadcrumb";
import { useEffect, useState } from "react";
import userService, { UserInfo } from "./../services/userService";
import OrderHistoryItem from "../services/OrderHistory";

const Page = () => {
  const [profile, setProfile] = useState<UserInfo>();
  // const [history, setHistory] = useState<OrderHistoryItem[]>([]);
  // useEffect(() => {
  //   userService.profile().then((res) => {
  //     if (res.data.errorCode === 0) {
  //       setProfile(res.data.data);
  //     }
  //   });
  //   userService.history().then((res) => {
  //     if (res.errorCode === 0) {
  //       setHistory(res.data);
  //       console.log(history);
  //     }
  //   });
  // }, []);
  return (
    <>
      <Breadcrumb title={"Profile"} />
      {/* 
      <div className="container emp-profile">
        <form method="post">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" />
                <div className="file btn btn-lg btn-primary">
                  Change Photo
                  <input type="file" name="file" />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>
                  {profile?.fisrtName} {profile?.lastName}{" "}
                </h5>
                <p className="proile-rating"></p>
                <div>
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#home"
                        type="button"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                      >
                        Profile
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#profile"
                        type="button"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        history
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <label>User Id</label>
                        </div>
                        <div className="col-md-6">
                          <p>{profile?.username}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>Name</label>
                        </div>
                        <div className="col-md-6">
                          <p>
                            {profile?.fisrtName} {profile?.lastName}{" "}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>Email</label>
                        </div>
                        <div className="col-md-6">
                          <p>{profile?.email}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>Phone</label>
                        </div>
                        <div className="col-md-6">
                          <p>{profile?.phone}</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >
                      <div
                        className="accordion accordion-flush"
                        id="accordionFlushExample"
                      >
                        {history.map((order) => (
                          <div className="accordion-item" key={order.id}>
                            <h2
                              className="accordion-header"
                              id={`flush-heading${order.id}`}
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#flush-collapse${order.id}`}
                                aria-expanded="false"
                                aria-controls={`flush-collapse${order.id}`}
                              >
                                Order #{order.id}
                              </button>
                            </h2>
                            <div
                              id={`flush-collapse${order.id}`}
                              className="accordion-collapse collapse"
                              aria-labelledby={`flush-heading${order.id}`}
                              data-bs-parent="#accordionFlushExample"
                            > */}
      {/* <div className="accordion-body">
                                <h2>Order Details</h2>
                                <p>Order ID: {order.id}</p>
                                <p>Total: ${order.total}</p>
                                <p>
                                  Status:{" "}
                                  {order.order_status === 1
                                    ? "Pending"
                                    : "Complete"}
                                </p>
                                <p>
                                  Delivery Address: {order.delivery_address}
                                </p>
                                <p>Phone Number: {order.phone_number}</p>

                                <h3>Items</h3> */}
      {/* {order.items.map((item) => (
                                  <div key={item.id}>
                                    <p>Product: {item.product.name}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price: ${item.price}</p>
                                  </div>
                                ))} */}
      {/* </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <input
                type="button"
                className="profile-edit-btn"
                name="btnAddMore"
                defaultValue="Edit Profile"
              />
            </div>
          </div>
        </form>
      </div> */}
    </>
  );
};

export default Page;
