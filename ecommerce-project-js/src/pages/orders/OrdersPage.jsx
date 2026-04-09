import axios from "axios";
import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import "./OrdersPage.css";
import { OrderGrid } from "./OrdersGrid";

export function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const response = await axios.get("/api/orders?expand=products");
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to load orders:", error);
      }
    };

    fetchOrdersData();
  }, []);

  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrderGrid orders={orders} loadCart={loadCart}/>
      </div>
    </>
  );
}
