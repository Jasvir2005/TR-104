import { useState } from "react";

function Card({ item }) {
  const [showMore, setShowMore] = useState(false);

  const [imgIndex, setImgIndex] = useState(0);

    function decIndex(){
      if(imgIndex>0){
        setImgIndex(imgIndex-1)
      }
      else{
        setImgIndex(item.images.length-1)
      }
    }

    function incIndex(){
      if(imgIndex<item.images.length-1){
        setImgIndex(imgIndex+1)
      }
      else{
        setImgIndex(0)
      }
    }
  return (
    <div style={{display: "flex",
            gap: "20px",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "16px",
            background: "white",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)"}}>
      <div style={{ position: "relative" }}>
      {/* LEFT IMAGE */}
      <img src={item.images?.[imgIndex] || item.thumbnail} alt={item.title}
      style={{
        width: "260px",
        height: "300px",
        objectFit: "cover",
        borderRadius: "12px"
      }}/> 
      {item.images && item.images.length > 1 && (
        <div style={{ display: "flex", gap: "10px",justifyContent: "center" }}>
        <button style={{height: "30px",width: "80px",backgroundColor: "lightgray",color: "black",borderRadius: "12px",fontSize: "16px"}}onClick={decIndex}>Prev</button>
        <button style={{height: "30px",width: "80px",backgroundColor: "lightgray",color: "black",borderRadius: "12px",fontSize: "16px"}}onClick={incIndex}>Next</button>
    </div>
    )}

</div>

      {/* RIGHT CONTENT */}
      <div style={{ flex: 1 }}>
        <h2>{item.title}</h2>
        <p style={{ color: "#555" }}>{item.description}</p>

        {/* BASIC INFO */}
        <div style={{display: "flex",justifyContent: "space-between",marginTop: "6px"}}>
          <span><b>Brand:</b> {item.brand}</span>
          <span><b>Category:</b> {item.category}</span>
        </div>

        <div style={{display: "flex",justifyContent: "space-between",marginTop: "6px"}}>
          <span><b>Price:</b> ₹{item.price}</span>
          <span style={{color:"red"}}><b>Discount:</b> {item.discountPercentage}%</span>
        </div>

        <div style={{display: "flex",justifyContent: "space-between",marginTop: "6px"}}>
          <span>⭐ {item.rating}</span>
          <span><b>Stock:</b> {item.stock}</span>
        </div>

        <p><b>SKU:</b> {item.sku}</p>
        <p><b>Weight:</b> {item.weight}g</p>
        <p><b>Warranty:</b> {item.warrantyInformation}</p>
        <p><b>Shipping:</b> {item.shippingInformation}</p>
        <p><b>Status:</b> {item.availabilityStatus}</p>

        {/* BUTTON */}
        <button
          onClick={() => setShowMore(!showMore)}
          style={{marginTop: "10px",
            padding: "8px 14px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"}}
        >
          {showMore ? "Hide Details" : "Show Full Data"}
        </button>

        {/* EXPANDABLE FULL DATA */}
        {showMore && (
          <div style={{marginTop: "15px",background: "#f4f4f4",padding: "12px",borderRadius: "10px"}}>

            {/* Dimensions */}
            <h4>📦 Dimensions</h4>
            <p>W: {item.dimensions.width}</p>
            <p>H: {item.dimensions.height}</p>
            <p>D: {item.dimensions.depth}</p>

            {/* Tags */}
            <h4>🏷 Tags</h4>
            <p>{item.tags.join(", ")}</p>

            {/* Return */}
            <p><b>Return Policy:</b> {item.returnPolicy}</p>
            <p><b>Min Order:</b> {item.minimumOrderQuantity}</p>

            {/* Meta */}
            <h4>🔎 Meta</h4>
            <p>Barcode: {item.meta.barcode}</p>
            <img src={item.meta.qrCode} alt="" width="80" />

            {/* Reviews */}
            <h4>⭐ Reviews</h4>
            {item.reviews.map((rev, i) => (
              <div key={i} style={{background: "white",padding: "8px",marginTop: "5px",borderRadius: "6px"}}>
                <b>{rev.reviewerName}</b> ({rev.rating}⭐)
                <p>{rev.comment}</p>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default Card;
