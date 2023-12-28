import React, { useEffect, useState } from "react";

import OrderHistoryService, {
  OrderHistoryItem,
} from "../../services/OrderHistory";
import { Button, Card, Form, Modal } from "react-bootstrap";

const AdminOrder = () => {
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [order, setOrder] = useState<OrderHistoryItem>();
  const [selectedStatus, setSelectedStatus] = useState(Number);
  const handleClosemodal = () => setShowModal(false);
  const handleShowModal = () => {
    setShowModal(true);
  };
  const fetchData = async () => {
    try {
      const response = await OrderHistoryService.getorder();
      setOrders(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const showmodal = async (e: any, id: number) => {
    if (e) e.preventDefault();
    OrderHistoryService.getorderbyid(id).then((res) => {
      setOrder(res.data);
    });
    handleShowModal();
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
  const handleUpdateStatus = () => {
    // Implement your logic to update the order status here
    // You might want to open a form, make an API request, etc.
    console.log("Updating order status...");
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
                  <td>
                    <a
                      href="/"
                      className="tm-product-delete-link"
                      onClick={(e) => showmodal(e, item.id)}
                    >
                      <i className="far fa-pen-to-square tm-product-delete-icon" />
                    </a>
                  </td>
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
      <Modal show={showModal} onHide={handleClosemodal} centered>
        <Card>
          <Card.Header style={{ backgroundColor: "#435c70", color: "white" }}>
            Order Detail
          </Card.Header>
          <Card.Body style={{ backgroundColor: "#f8f9fa" }}>
            <Card.Title>
              <strong>Order Information</strong>
            </Card.Title>
            <Card.Text>
              <strong>ID:</strong> {order?.id}
              <br />
              <strong>Customer Name:</strong> {order?.customerName}
              <br />
              <strong>Phone:</strong> {order?.phone}
              <strong>Email:</strong> {order?.email}
              <br />
              {/* Add address information */}
              <strong>Address:</strong> {order?.specificAddress},{" "}
              {order?.wardOrCommune}, {order?.district}, {order?.provinceOrCity}
              , {order?.specificAddress}
              <br />
              <strong>Note:</strong> {order?.note}
              <br />
              <strong>Status:</strong> {order?.status}
              <br />
              <strong>Total Amount:</strong> {order?.totalAmount}
              {/* Add other order information as needed */}
            </Card.Text>
            <hr />
            <Card.Title>
              <strong>Order Items</strong>
            </Card.Title>
            {order?.orderItems.map((item) => (
              <Card.Text key={item.id}>
                <strong>Product:</strong> {item.product.productName}
                <br />
                <strong>Quantity:</strong> {item.quantity}
                <br />
                <strong>Unit Price:</strong> {item.unitPrice}
                <br />
                {/* Add other item information as needed */}
              </Card.Text>
            ))}
            <hr />
            <Card.Title>
              <strong>Order Status</strong>
            </Card.Title>
            <Card.Text>
              <strong>Status:</strong> {order?.status}
              <Form>
                <Form.Group controlId="orderStatus">
                  <Form.Label>Update Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={order?.status}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setSelectedStatus(parseInt(e.target.value));
                    }}
                  >
                    <option value={0} selected={order?.status === 0}>
                      Pending
                    </option>
                    <option value={1} selected={order?.status === 1}>
                      Moving
                    </option>
                    <option value={2} selected={order?.status === 2}>
                      Cancelled
                    </option>
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" onClick={handleUpdateStatus}>
                  Update Status
                </Button>
              </Form>
            </Card.Text>

            <Button variant="secondary" onClick={handleClosemodal}>
              Close
            </Button>
          </Card.Body>
        </Card>
      </Modal>
    </div>
  );
};

export default AdminOrder;
