import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { CartContext } from "../context/CartContext";

const ProductDetail = () => {

    const { id } = useParams();
    const [data, setData] = useState(null)
    const [mainImage, setMainImage] = useState("")

    useEffect(() => {
        fetch("https://dummyjson.com/products/" + id)
            .then(res => res.json())
            .then(data => {
                setData(data)
                setMainImage(data.thumbnail)
            })
    }, [id])

    const { addToCart } = useContext(CartContext);

    if (!data) return <h1 style={{ textAlign: "center" }}>Loading...</h1>

    return (
        <div style={{ background: "#f1f3f6", minHeight: "100vh" }}>
            <Navbar />

            <div style={{
                maxWidth: "1200px",
                margin: "40px auto",
                background: "white",
                padding: "30px",
                display: "flex",
                gap: "40px",
                borderRadius: "8px"
            }}>

                {/* LEFT IMAGE SECTION */}
                <div style={{ flex: 1, display: "flex", gap: "15px" }}>

                    {/* Thumbnail column */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {data.images.map((img, index) => (
                            <img
                                key={data.id + index}
                                src={img}
                                onClick={() => setMainImage(img)}
                                style={{
                                    width: "70px",
                                    height: "70px",
                                    objectFit: "cover",
                                    cursor: "pointer",
                                    border: "1px solid #ddd",
                                    borderRadius: "6px"
                                }}
                            />
                        ))}
                    </div>

                    {/* Main Image */}
                    <div style={{ flex: 1 }}>
                        <img
                            src={mainImage}
                            style={{
                                width: "100%",
                                height: "420px",
                                objectFit: "contain",
                                borderRadius: "8px",
                                background: "#fafafa"
                            }}
                        />
                    </div>
                </div>

                {/* RIGHT INFO SECTION */}
                <div style={{ flex: 1.2 }}>

                    <h2 style={{ fontSize: "26px" }}>{data.title}</h2>

                    <p style={{ color: "#888", marginTop: "5px" }}>
                        Brand: <strong>{data.brand}</strong>
                    </p>

                    <div style={{ marginTop: "15px" }}>
                        <span style={{
                            fontSize: "28px",
                            fontWeight: "bold",
                            color: "#212121"
                        }}>
                            ₹ {data.price}
                        </span>

                        <span style={{
                            marginLeft: "10px",
                            color: "green",
                            fontWeight: "bold"
                        }}>
                            {data.discountPercentage}% OFF
                        </span>
                    </div>

                    <p style={{ marginTop: "10px", color: "#388e3c" }}>
                        ⭐ {data.rating} Rating
                    </p>

                    <p style={{ marginTop: "15px", lineHeight: "1.6", color: "#555" }}>
                        {data.description}
                    </p>

                    <div style={{ marginTop: "20px", color: "#444" }}>
                        <p>📦 Stock: {data.stock}</p>
                        <p>🚚 {data.shippingInformation}</p>
                        <p>🛡 {data.warrantyInformation}</p>
                    </div>

                    {/* Buttons */}
                    <div style={{ marginTop: "25px", display: "flex", gap: "15px" }}>
                        <button
                            onClick={() => addToCart(data)}
                            style={{
                                padding: "14px 25px",
                                backgroundColor: "#ff9f00",
                                border: "none",
                                borderRadius: "6px",
                                fontWeight: "bold",
                                cursor: "pointer"
                            }}
                        >
                            ADD TO CART
                        </button>

                    </div>
                </div>
            </div>

            {/* REVIEWS */}
            <div style={{
                maxWidth: "1200px",
                margin: "20px auto",
                background: "white",
                padding: "25px",
                borderRadius: "8px"
            }}>
                <h3>Customer Reviews</h3>

                {data.reviews.map((rev, index) => (
                    <div key={index} style={{
                        borderBottom: "1px solid #eee",
                        padding: "15px 0"
                    }}>
                        <strong>{rev.reviewerName}</strong>
                        <p>⭐ {rev.rating}</p>
                        <p style={{ color: "#555" }}>{rev.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductDetail