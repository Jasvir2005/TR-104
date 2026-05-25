import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { TiShoppingCart } from "react-icons/ti";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();

  const linkStyle = (path) => ({
    textDecoration: "none",
    color: location.pathname === path ? "#fff" : "#333",
    fontWeight: "bold",
    padding: "6px 12px",
    borderRadius: "8px",
    backgroundColor: location.pathname === path ? "#887cd6ff" : "transparent",
    transition: "0.3s"
  });

  return (
    <div style={{
      height: "65px",
      width: "98%",
      background: "linear-gradient(to right, #74ebd5, #9face6)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 30px",
      boxShadow: "0 3px 10px rgba(0,0,0,0.15)"
    }}>

      <div style={{ fontWeight: "bold", fontSize: "20px" }}>
        MyShop
      </div>

      <div style={{
        display: "flex",
        gap: "18px",
        alignItems: "center"
      }}>
        <Link to="/" style={linkStyle("/")}>
          <FaHome size={20}/>
        </Link>

        <Link to="/about" style={linkStyle("/about")}>About</Link>
        <Link to="/contact" style={linkStyle("/contact")}>Contact</Link>
        <Link to="/songs" style={linkStyle("/songs")}>Songs</Link>
        <Link to="/products" style={linkStyle("/products")}>Products</Link>

        <Link to="/cart" style={linkStyle("/cart")}>
          <TiShoppingCart size={24}/>
        </Link>
      </div>
    </div>
  )
}

export default Navbar