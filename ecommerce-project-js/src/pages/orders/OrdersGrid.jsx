import { Fragment } from "react";
import { OrderDetailsGrid } from "./OrdersDetailsGrid";
import { OrderHeader } from "./OrdersHeader";

export function OrderGrid({ orders, loadCart }) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-container">
            <OrderHeader order={order} />
            <OrderDetailsGrid order={order} loadCart={loadCart} />
            
          </div>
        );
      })}
    </div>
  );
}
