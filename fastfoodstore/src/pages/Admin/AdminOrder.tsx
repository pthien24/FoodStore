import React, { useEffect, useState } from "react";
import OrderHistoryService, {
  OrderHistoryItem,
} from "../../services/OrderHistory";

const AdminOrder = () => {
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);

  const fetchData = async () => {
    try {
      const response = await OrderHistoryService.getorder();
      setOrders(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getStatusString = (status: number): string => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "moving";
      case 2:
        return "Cancelled";
      default:
        return "Unknown";
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container tm-mt-big tm-mb-big">
      <div className="col-12 tm-block-col">
        <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
          <h2 className="tm-block-title">Orders List</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ORDER NO.</th>
                <th scope="col">STATUS</th>
                <th scope="col">OPERATORS</th>
                <th scope="col">LOCATION</th>
                <th scope="col">DISTANCE</th>
                <th scope="col">START DATE</th>
                <th scope="col">EST DELIVERY DUE</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr>
                  <th scope="row">
                    <b>#{item.id}</b>
                  </th>
                  <td>
                    <div
                      className={`tm-status-circle ${getStatusString(
                        item.status
                      ).toLowerCase()}`}
                    ></div>
                    {getStatusString(item.status)}
                  </td>
                  <td>
                    <b>{item.customerName}</b>
                  </td>
                  <td>
                    <b>{item.provinceOrCity}</b>
                  </td>
                  <td>
                    <b>{item.provinceOrCity}</b>
                  </td>
                  <td>{item.createDate}</td>
                  <td>08:00, 18 NOV 2018</td>
                </tr>
              ))}
              <tr>
                <th scope="row">
                  <b>#122349</b>
                </th>
                <td>
                  <div className="tm-status-circle moving"></div>Moving
                </td>
                <td>
                  <b>Oliver Trag</b>
                </td>
                <td>
                  <b>London, UK</b>
                </td>
                <td>
                  <b>485 km</b>
                </td>
                <td>16:00, 12 NOV 2018</td>
                <td>08:00, 18 NOV 2018</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrder;
