import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import { RiDeleteBin5Line } from "react-icons/ri";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);


  return (
    <div style={{ background: "#eef2f7", minHeight: "100vh" }}>
      <Navbar />

      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto",
          display: "flex",
          gap: "30px",
          padding: "0 20px",
        }}
      >
        {/* LEFT - CART ITEMS */}
        <div style={{ flex: 2 }}>
          <h2 style={{ marginBottom: "20px" }}>Shopping Cart</h2>

          {cart.length === 0 ? (
            <p style={{ color: "gray" }}>Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "white",
                  borderRadius: "15px",
                  padding: "15px",
                  marginBottom: "20px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.07)",
                  position: "relative",
                }}
              >
                <img
                  src={item.thumbnail}
                  alt=""
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "contain",
                    marginRight: "20px",
                  }}
                />

                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: "8px" }}>{item.title}</h3>
                  <p style={{ margin:"0 0 8px 0",color: "green", fontWeight: "bold" }}>
                    ₹ {item.price}
                  </p>
                  <p style={{
                    margin: 0,
                    color:"gray",
                    fontSize:"14px"
                  }}>
                    Quantity: {item.quantity || 1}
                  </p>
                </div>

                <RiDeleteBin5Line
                  size={24}
                  style={{
                    cursor: "pointer",
                    color: "#ff4d4f",
                  }}
                  onClick={() => removeFromCart(item.id)}
                />
              </div>
            ))
          )}
        </div>

       
      </div>
    </div>
  );
};

export default Cart;