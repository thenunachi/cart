import React from "react";
import "./Modal.css";
import { FaCheckCircle } from "react-icons/fa";

const Modal = ({ isOpen, onClose, cartItems, total, clearCart }) => {
  if (!isOpen) return null;
  console.log(cartItems, "modal file cart")
  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalBox" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <FaCheckCircle className="successIcon" />
          <h2 className="modalTitle">Order Confirmed</h2>
          <p className="modalSubtitle">We hope you enjoy your food!</p>
        </div>

        <div className="modalContent">
          <ul className="modalItemList">
            {Object.entries(cartItems).map(([key, value]) => (
              <li key={key} className="modalItem">
                <div className="modalItemLeft">
                  <img
                    src={value.img}
                    alt={key}
                    className="modalItemImage"
                  />
                  <div>
                    <p className="modalItemName">{key}</p>
                    <p className="modalItemDetails">
                      <span className="modalItemCount">{value.count}x</span>{" "}
                      <span className="modalItemEach">@ ${value.price.toFixed(2)}</span>
                    </p>
                  </div>
                </div>
                <p className="modalItemTotal">
                  ${(value.price * value.count).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>

          <div className="orderTotalSection">
            <p>Order Total</p>
            <p>${total.toFixed(2)}</p>
          </div>
        </div>

        <button className="newOrderButton" onClick={() => {
          clearCart();     // ✅ Clears cart (sets cartItems to {})
          onClose();       // ✅ Closes modal
        }}>
          Start New Order
        </button>
      </div>
    </div>
  );
};

export default Modal;