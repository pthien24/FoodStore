import * as React from "react";
import Breadcrumb from "../components/Breadcrumb";
import { useEffect, useState } from "react";
import userService, { UserInfo } from "./../services/userService";
import { OrderHistoryItem } from "../services/OrderHistory";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import OrderHistoryService from "../services/OrderHistory";

const Page = () => {
  const [profile, setProfile] = useState<UserInfo>();
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);

  const userid = useSelector((state: RootState) => state.auth.userInfo?.id);
  // const [history, setHistory] = useState<OrderHistoryItem[]>([]);
  useEffect(() => {
    if (userid !== undefined) {
      userService.profile(userid).then((res) => {
        setProfile(res.data.data);
      });
      OrderHistoryService.getorderbyuserid(userid).then((res) => {
        setOrders(res.data);
      });
    }
    console.log(profile);
    console.log(userid);
  }, []);
  return (
    <>
      <Breadcrumb title={"Profile"} />
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
                        {orders.map((order) => (
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
                            >
                              <div className="accordion-body">
                                <h2>Order Details</h2>
                                <p>Order ID: {order.id}</p>
                                <p>Total: ${order.totalAmount}</p>
                                <p>
                                  Status:{" "}
                                  {order.status === 1 ? "Pending" : "Complete"}
                                </p>
                                <p>
                                  Delivery Address: {order?.specificAddress},{" "}
                                  {order?.wardOrCommune}, {order?.district},{" "}
                                  {order?.provinceOrCity},{" "}
                                  {order?.specificAddress}
                                </p>
                                <p>Phone Number: {order.phone}</p>

                                <h3>Items</h3>
                                {order.orderItems.map((item) => (
                                  <div key={item.id}>
                                    <p>Product: {item.product.productName}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price: ${item.product.price}</p>
                                  </div>
                                ))}
                              </div>
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
      </div>
    </>
  );
};

export default Page;
