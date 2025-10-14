import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import emptyCart from './images/illustration-empty-cart.svg'
import "./cart.css";
import Modal from './Modal';

export default function CartSummary({ cartItems, onRemoveItem }) {
    console.log(cartItems,"cartItems from cart")
    const [total, setTotal] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const totalItems = Object.values(cartItems).reduce(
        (acc, item) => acc + item.count,
        0
    );

    useEffect(() => {
        const newTotal = Object.values(cartItems).reduce(
            (acc, item) => acc + item.price * item.count,
            0
        );
        setTotal(newTotal);
    }, [cartItems]);

    const hasItems = Object.keys(cartItems).length > 0;

    return (
        <div className="cartSummaryContainer">
            <h2 className="cartTitle">
                Your Cart{hasItems ? ` (${totalItems})` : ""}
            </h2>

            {hasItems ? (
                <>
                    <ul className="cartItemList">
                        {Object.entries(cartItems).map(([key, value]) => (
                            <li key={key} className="cartItem">
                                <div className="cartItemDetails">
                                    <p className="cartItemName">{key}</p>
                                    <p className="cartItemPrice">
                                        <span className="cartItemCount">{value.count}x</span>{" "}
                                        <span className="cartItemEach">@ ${value.price.toFixed(2)}</span>{" "}
                                        <span className="cartItemTotal">${(value.price * value.count).toFixed(2)}</span>
                                    </p>
                                </div>
                                <button
                                    onClick={() => onRemoveItem(key)}
                                    className="removeItemButton"
                                >
                                    <FaTimes />
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="orderTotalSection">
                        <p className="orderTotalLabel">Order Total</p>
                        <p className="orderTotalValue">${total.toFixed(2)}</p>
                    </div>

                    <div className="carbonNote">
                        <span className="carbonIcon">🌱</span>
                        This is a <span className="carbonBold">carbon-neutral</span> delivery
                    </div>

                    <button onClick={() => setIsModalOpen(true)} className="confirmOrderButton">Confirm Order</button>
                   <Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  cartItems={cartItems}
  total={total}
/>
                </>
            ) : (
                <div className="emptyCart">
                    <img src={emptyCart} alt="Empty Cart" className="emptyCartImage" />
                    <h3 className="emptyCartTitle">Your added items appear here.</h3>
                    <p className="emptyCartText">No items in cart</p>
                </div>
            )}
        </div>
    );
}