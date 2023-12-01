import { RootState } from "../store";
import { useSelector } from "react-redux";

function Total() {
  const cart = useSelector((state: RootState) => state.cart.cart);

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cart.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
    });
    return { totalPrice, totalQuantity };
  };

  return (
    <>
      <table className="total-table">
        <thead className="total-table-head">
          <tr className="table-total-row">
            <th>Total</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr className="total-data">
            <td>
              <strong>Total: ({getTotal().totalQuantity} items) : </strong>
            </td>
            <td>
              <strong>${getTotal().totalPrice}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Total;
