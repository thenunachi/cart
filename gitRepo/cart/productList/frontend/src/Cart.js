import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import emptyCart from './images/illustration-empty-cart.svg'
import "./cart.css";
import Modal from './Modal';
import { saveOrder } from "./services/orderServices"

export default function CartSummary({ user, cartItems, onRemoveItem }) {
    console.log(user,cartItems, "cartItems from cart")
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

    const handleConfirmOrder = async () => {

        if (!user.userId) return alert("Please log in to confirm your order.");
        if (Object.keys(cartItems).length === 0) return;
        console.log("is it coming here")
        try {
            await saveOrder(user.userId, cartItems, total);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error saving order:", error);
        }
    };

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
                                    <img
                                        src={value.img}
                                        alt={key}
                                        className="cartItemImage"
                                    />
                                    <div className="cartItemText">
                                        <p className="cartItemName">{key}</p>
                                        <p className="cartItemPrice">
                                            <span className="cartItemCount">{value.count}x</span>
                                            <span className="cartItemEach">@ ${value.price.toFixed(2)}</span>
                                            <span className="cartItemTotal">${(value.price * value.count).toFixed(2)}</span>
                                        </p>
                                    </div>
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

                    <button
                        onClick={() => {
                            console.log("🖱️ Button clicked!");
                            handleConfirmOrder();
                        }}
                        className="confirmOrderButton"
                    >
                        Confirm Order
                    </button>
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