import axios from 'axios';
import { useState } from 'react';
import { formatMoney } from "../../utils/money";

export function CartItemDetails({ cartItem, loadCart }) {
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const updateQuantity = async () => {
    if (isUpdatingQuantity) {
      try {
        await axios.put(`/api/cart-items/${cartItem.productId}`, {
          quantity: Number(quantity)
        });
        await loadCart();
        setIsUpdatingQuantity(false);
      } catch (error) {
        console.error("Failed to update quantity:", error);
      }
    } else {
      setIsUpdatingQuantity(true);
    }
  };

  const updateQuantityInput = (event) => {
    setQuantity(event.target.value);
  };

  const deleteCartItem = async () => {
    try {
      await axios.delete(`/api/cart-items/${cartItem.productId}`);
      await loadCart();
    } catch (error) {
      console.error("Failed to delete cart item:", error);
    }
  };

  const handleQuantityKeyDown = (event) => {
    const keyPressed = event.key;

    if (keyPressed === 'Enter') {
      updateQuantity();
    } else if (keyPressed === 'Escape') {
      setQuantity(cartItem.quantity);
      setIsUpdatingQuantity(false);
    }
  }

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />
      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: {isUpdatingQuantity 
              ? <input 
                  type="text" 
                  className="quantity-textbox" 
                  value={quantity}
                  onChange={updateQuantityInput}
                  onKeyDown={handleQuantityKeyDown}
                /> 
              : <span className="quantity-label">{cartItem.quantity}</span>
            }
            
          </span>
          <button
            className="update-quantity-link link-primary"
            onClick={updateQuantity}
          >Update</button>
          <button
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
