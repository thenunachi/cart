
import './App.css';
import React from "react";


import { useState, useEffect } from 'react';
import emptyCart from './images/illustration-empty-cart.svg'
import addToCartSymbol from "./images/icon-add-to-cart.svg";
import increment from "./images/icon-increment-quantity.svg";
import decrement from "./images/icon-decrement-quantity.svg";
import baklava from "./images/image-baklava-desktop.jpg";
import meringue from "./images/image-meringue-desktop.jpg";
import waffle from "./images/image-waffle-desktop.jpg";
import cremeBrulee from "./images/image-creme-brulee-desktop.jpg";
import macroon from "./images/image-macaron-desktop.jpg";
import tiramisu from "./images/image-tiramisu-desktop.jpg"
import pannaCota from "./images/image-panna-cotta-desktop.jpg"
import brownie from "./images/image-brownie-desktop.jpg"
import cake from "./images/image-cake-desktop.jpg"
import AuthTest from './AuthTest';
import Navbar from './Navbar';
import CartSummary from './Cart';



function App({ user, setUser }) {
  const [count, setCount] = useState(0);

  const [total, setTotal] = useState(0)
  const dessertList = [
    {
      "image": {

        "desktop": `${waffle}`
      },
      "name": "Waffle with Berries",
      "category": "Waffle",
      "price": 6.50
    },
    {
      "image": {

        "desktop": `${cremeBrulee}`
      },
      "name": "Vanilla Bean Crème Brûlée",
      "category": "Crème Brûlée",
      "price": 7.00
    },
    {
      "image": {
        "desktop": `${macroon}`
      },
      "name": "Macaron Mix of Five",
      "category": "Macaron",
      "price": 8.00
    },
    {
      "image": {
        "desktop": `${tiramisu}`
      },
      "name": "Classic Tiramisu",
      "category": "Tiramisu",
      "price": 5.50
    },
    {
      "image": {
        "desktop": `${baklava}`
      },
      "name": "Pistachio Baklava",
      "category": "Baklava",
      "price": 4.00
    },
    {
      "image": {
        "desktop": `${meringue}`
      },
      "name": "Lemon Meringue Pie",
      "category": "Pie",
      "price": 5.00
    },
    {
      "image": {
        "desktop": `${cake}`
      },
      "name": "Red Velvet Cake",
      "category": "Cake",
      "price": 4.50
    },
    {
      "image": {
        "desktop": `${brownie}`
      },
      "name": "Salted Caramel Brownie",
      "category": "Brownie",
      "price": 4.50
    },
    {
      "image": {
        "desktop": `${pannaCota}`
      },
      "name": "Vanilla Panna Cotta",
      "category": "Panna Cotta",
      "price": 6.50
    }
  ]
  const [cartItems, setCartItems] = useState({});
  const [showButton, setShowButton] = useState({});


  console.log(user, "user from app")
  const handleAddClick = (name) => {
    setShowButton(prev => ({ ...prev, [name]: true }));
  };
  const addToCart = (dessert) => {
    setCartItems(prev => ({
      ...prev,
      [dessert.name]: {
        price: dessert.price,
        count: prev[dessert.name]?.count ? prev[dessert.name].count + 1 : 1,
        img: dessert.image.desktop
      }
    }));
  };

  const removeFromCart = (dessert) => {
    setCartItems(prev => ({
      ...prev,
      [dessert.name]: {
        price: dessert.price,
        count: prev[dessert.name]?.count ? Math.max(0, prev[dessert.name].count - 1) : 0,
        img: dessert.image.desktop
      }
    }));
  };
  useEffect(() => {
    const newTotal = Object.values(cartItems).reduce((acc, item) => {
      return acc + item.price * item.count;
    }, 0);
    setTotal(newTotal)
  }, [cartItems])
  console.log(cartItems, "cartITems")

  const handleRemoveItem = (itemName) => {
    const updatedCart = { ...cartItems }
    delete updatedCart[itemName]
    setCartItems(updatedCart)
  };
  return (

    <div className="App">
      <Navbar user={user} dessertList={dessertList} />
      {/* <AuthTest onLogin={setUser} /> */}
      {/* <h1>Desserts</h1> */}
      <div className="mainContent">
        <div className="dessertGrid">
          {dessertList.map((dessert) =>
            // <div key={dessert.name} className="dessertCard">
            //   <img src={dessert.image.desktop} alt={dessert.name} className="dessert-img" />
            //   <h4>{dessert.category}</h4>
            //   <h3>{dessert.name}</h3>
            //   <p>${dessert.price}</p>
            //   {!showButton[dessert.name] ? (
            //     <button onClick={() => handleAddClick(dessert.name)}>
            //       <span><img src={addToCartSymbol} /></span>
            //       <span>Add to Cart</span>
            //     </button>
            //   ) : (
            //     <>
            //       <button onClick={() => addToCart(dessert)}><img src={increment} /></button>

            //       <span>{cartItems[dessert.name]?.count || 0}</span>
            //       <button onClick={() => removeFromCart(dessert)}><img src={decrement} /></button>
            //     </>
            //   )}
            // </div>
            <div key={dessert.name} className={`dessertCard ${showButton[dessert.name] ? "inCart" : ""}`}>
              <div className="imageWrapper">
                <img src={dessert.image.desktop} alt={dessert.name} className="dessert-img" />

                {!showButton[dessert.name] ? (
                  <button className="addButton" onClick={() => handleAddClick(dessert.name)}>
                    <img src={addToCartSymbol} />
                    <span>Add to Cart</span>
                  </button>
                ) : (
                  <div className="counterControls">
                    <button onClick={() => addToCart(dessert)}>
                      <img src={increment} />
                    </button>

                    <span>{cartItems[dessert.name]?.count || 0}</span>

                    <button onClick={() => removeFromCart(dessert)}>
                      <img src={decrement} />
                    </button>
                  </div>
                )}
              </div>

              <h4>{dessert.category}</h4>
              <h3>{dessert.name}</h3>
              <p>${dessert.price}</p>

            </div>
          )}
        </div>

        <CartSummary user={user} cartItems={cartItems} onRemoveItem={handleRemoveItem} />
      </div>
    </div>
  );
}

export default App;
