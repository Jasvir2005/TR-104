import React, { useEffect, useState, useContext } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom';
import { CartContext } from "../context/CartContext";
import { FaHeart, FaStar } from "react-icons/fa";

const Products = () => {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [categories, setCategories] = useState([])
  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data.products)
        setFiltered(data.products)
        const unique = [...new Set(data.products.map(p => p.category))]
        setCategories(unique)
      })
  }, [])

  useEffect(() => {
    let result = products

    if (category !== "all") {
      result = result.filter(p => p.category === category)
    }

    if (search !== "") {
      result = result.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    setFiltered(result)
  }, [search, category, products])

  return (
    <div style={{ background: "#eef1f6", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "1300px", margin: "auto", padding: "30px" }}>

        <h1 style={{ textAlign: "center", marginBottom: "25px" }}>
          Discover Products
        </h1>

        {/* Search + Filter */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginBottom: "35px",
          flexWrap: "wrap"
        }}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "12px",
              width: "280px",
              borderRadius: "12px",
              border: "1px solid #ddd"
            }}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "13px",
              border: "1px solid #ddd"
            }}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "25px"
        }}>
          {filtered.map(ele => (
            <div
              key={ele.id}
              style={{
                background: "white",
                borderRadius: "14px",
                padding: "15px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
                transition: "0.3s",
                position: "relative"
              }}
            >

              {/* Discount Badge */}
              <span style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                background: "red",
                color: "white",
                fontSize: "12px",
                padding: "4px 8px",
                borderRadius: "20px"
              }}>
                {Math.round(ele.discountPercentage)}% OFF
              </span>

              {/* Wishlist Icon */}
              <FaHeart style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                cursor: "pointer",
                color: "#ccc"
              }} />

              <Link to={'/products/' + ele.id}
                style={{ textDecoration: "none", color: "black" }}
              >
                <img
                  src={ele.thumbnail}
                  alt=""
                  style={{
                    width: "100%",
                    height: "190px",
                    objectFit: "contain",
                    borderRadius: "10px",
                    backgroundColor: "#f9f9f9"
                  }}
                />

                <h3 style={{ marginTop: "12px", fontSize: "17px" }}>
                  {ele.title}
                </h3>

                {/* Rating */}
                <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "5px" }}>
                  <FaStar color="gold" size={14} />
                  <span style={{ fontSize: "13px" }}>{ele.rating}</span>
                </div>

                <div style={{
                  marginTop: "10px",
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "#2e7d32"
                }}>
                  ₹ {ele.price}
                </div>
              </Link>
              
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Products