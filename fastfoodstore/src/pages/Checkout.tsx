import React, { useState } from "react";
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
import cartService, { OrderDTO } from "./../services/cartService";
import Input from "./../components/Input";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [OrderDTO, setOrderDTO] = useState<OrderDTO>({
    customerName: "",
    email: "",
    phone: "",
    country: "",
    provinceOrCity: "",
    district: "",
    wardOrCommune: "",
    specificAddress: "",
    note: "",
    items: [],
  });
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderDTO((prevOrderDTO) => ({
      ...prevOrderDTO,
      [name]: value,
    }));
    console.log(name, value);
  };
  const localStorageDatacart = localStorage.getItem("persist:cart");
  if (localStorageDatacart !== null) {
    const passdatacart = JSON.parse(localStorageDatacart);
    const cart = JSON.parse(passdatacart.cart);
  }
  const handleContinueCheckout = (e: React.MouseEvent) => {
    e.preventDefault();

    console.log(cart);

    OrderDTO.items = cart.map((Item: any) => ({
      productId: Item.id,
      quantity: Item.quantity,
      unitPrice: Item.price,
    }));
    console.log(OrderDTO);
    cartService.purchase(OrderDTO).then((response) => {
      console.log(response);
      dispatch(removeAll());
      navigate("/home");
    });
  };
  return (
    <>
      <Breadcrumb title={"Mua Hang"} />
      <div className="container">
        <div className="py-5 text-center">
          <h2>Checkout form</h2>
        </div>
        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge badge-secondary badge-pill">3</span>
            </h4>

            <ul className="list-group mb-3">
              {cart.map((cartItem) => (
                <li
                  key={cartItem.id}
                  className="list-group-item d-flex justify-content-between lh-condensed"
                >
                  <div>
                    <h6 className="my-0">{cartItem.title}</h6>
                    <small className="text-muted">{cartItem.description}</small>
                  </div>
                  <span className="text-muted">${cartItem.price}</span>
                </li>
              ))}
              {/* ... (other list items) */}
            </ul>
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" noValidate>
              <Input
                lable="Name"
                id="txtname"
                name="customerName"
                labelColor="black"
                backgroundColor="#f0f0f0"
                textColor="black"
                // value={}
                onChange={handleInputChange}
                required={true}
                lastrow={false}
                lableSize={5}
              />
              <Input
                lable="email"
                id="txtemail"
                name="email"
                labelColor="black"
                textColor="black"
                backgroundColor="#f0f0f0"
                onChange={handleInputChange}
                required={true}
                lastrow={false}
                lableSize={5}
              />
              <Input
                lable="phone"
                id="txtphone"
                name="phone"
                labelColor="black"
                textColor="black"
                backgroundColor="#f0f0f0"
                onChange={handleInputChange}
                required={true}
                lastrow={false}
                lableSize={5}
              />
              <Input
                lable="country"
                id="txtcountry"
                name="country"
                labelColor="black"
                textColor="black"
                backgroundColor="#f0f0f0"
                onChange={handleInputChange}
                required={true}
                lastrow={false}
                lableSize={5}
              />
              <Input
                lable="provinceOrCity"
                id="txtprovinceOrCity"
                name="provinceOrCity"
                labelColor="black"
                textColor="black"
                backgroundColor="#f0f0f0"
                onChange={handleInputChange}
                required={true}
                lastrow={false}
                lableSize={5}
              />
              <Input
                lable="district"
                id="txtdistrict"
                name="district"
                labelColor="black"
                textColor="black"
                backgroundColor="#f0f0f0"
                onChange={handleInputChange}
                required={true}
                lastrow={false}
                lableSize={5}
              />
              <Input
                lable="wardOrCommune"
                id="txtwardOrCommune"
                name="wardOrCommune"
                labelColor="black"
                textColor="black"
                backgroundColor="#f0f0f0"
                onChange={handleInputChange}
                required={true}
                lastrow={false}
                lableSize={5}
              />
              <Input
                lable="specificAddress"
                id="txtspecificAddress"
                name="specificAddress"
                labelColor="black"
                textColor="black"
                backgroundColor="#f0f0f0"
                onChange={handleInputChange}
                required={true}
                lastrow={false}
                lableSize={5}
              />
              <Input
                lable="note"
                id="txtnote"
                name="note"
                labelColor="black"
                textColor="black"
                backgroundColor="#f0f0f0"
                onChange={handleInputChange}
                required={true}
                lastrow={false}
                lableSize={5}
              />
              <button
                className="btn btn-primary btn-lg btn-block"
                type="submit"
                onClick={handleContinueCheckout}
              >
                Continue to checkout
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
