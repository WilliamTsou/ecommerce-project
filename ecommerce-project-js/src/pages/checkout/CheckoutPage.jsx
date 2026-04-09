import axios from 'axios';
import { useState, useEffect } from 'react';
import { CheckoutHeader } from './CheckoutHeader';
import './CheckoutPage.css';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const response = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime");
        setDeliveryOptions(response.data);
      } catch (error) {
        console.error("Failed to load delivery options:", error);
      }
    };

    fetchCheckoutData();
  }, []);

  useEffect(() => {
    const fetchPaymentSummary = async () => {
      try {
        const response = await axios.get("/api/payment-summary");
        setPaymentSummary(response.data);
      } catch (error) {
        console.error("Failed to load payment summary:", error);
      }
    };

    fetchPaymentSummary();
  }, [cart]);

  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />

      <CheckoutHeader cart={cart}/>
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />
          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
        </div>
      </div>
    </>
  );
}
