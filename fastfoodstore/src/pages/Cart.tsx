import React from "react";
import {
  decrementQuantity,
  incrementQuantity,
  removeAll,
  removeItem,
} from "../store/reducers/carSlice";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../store/reducers/carSlice";
import { RootState } from "../store";
import Breadcrumb from "../components/Breadcrumb";
import Total from "../components/Total";
import { toast } from "react-toastify";
import cartService, { PurchaseResponse } from "./../services/cartService";
function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const handleCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    const localStorageDatauser = localStorage.getItem("persist:auth");
    const localStorageDatacart = localStorage.getItem("persist:cart");
    if (localStorageDatauser !== null && localStorageDatacart !== null) {
      const passdatauser = JSON.parse(localStorageDatauser);
      const passdatacart = JSON.parse(localStorageDatacart);
      const userInfo = JSON.parse(passdatauser.userInfo);
      const cart = JSON.parse(passdatacart.cart);
      console.log(cart);
      console.log(userInfo);
      cartService.purchase(userInfo, cart).then((response) => {
        toast.success(response.message);
        dispatch(removeAll());
      });
    } else {
      console.log("null userInfo or cart data nu");
    }
  };
  return (
    <>
      <Breadcrumb title={"Mua Hang"} />
      <div className="cart-section mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="cart-table-wrap">
                <table className="cart-table">
                  <thead className="cart-table-head">
                    <tr className="table-head-row">
                      <th className="product-remove" />
                      <th className="product-image">Product Image</th>
                      <th className="product-name">Name</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-total">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart?.map((item: CartItem) => (
                      <tr className="table-body-row">
                        <td className="product-remove">
                          <button
                            onClick={() => {
                              dispatch(removeItem(item.id));
                              toast.warning("deleted successfully");
                            }}
                          >
                            <i className="far fa-window-close" />
                          </button>
                        </td>
                        <td className="product-image">
                          <img
                            src={`http://127.0.0.1:8000/storage/${item.image}`}
                            alt="item"
                          />
                        </td>
                        <td className="product-name">{item.title}</td>
                        <td className="product-price">${item.price}</td>
                        <td className="product-quantity">
                          <button
                            onClick={() => dispatch(decrementQuantity(item.id))}
                          >
                            -
                          </button>
                          <p>{item.quantity}</p>
                          <button
                            onClick={() => dispatch(incrementQuantity(item.id))}
                          >
                            +
                          </button>
                        </td>
                        <td className="product-total">1</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="total-section">
                <Total />
                <div className="cart-buttons">
                  <a
                    href="/"
                    onClick={handleCheckout}
                    className="boxed-btn black"
                  >
                    Check Out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
