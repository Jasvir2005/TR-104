import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../UserContext";
import axios from "axios";

const Home = () => {

const {user} = React.useContext(UserContext);
const [blogs,setBlogs] = React.useState([]);
const [search,setSearch] = React.useState("");   // SEARCH STATE

useEffect(()=>{
  axios.get("http://localhost:3000/blog")
  .then((res)=>{
    setBlogs(res.data)
  })
  .catch((err)=>{
    console.log(err)
  })
},[])

return (

<div>

<Navbar/>

<div style={{
fontFamily:"Poppins",
background:"linear-gradient(135deg,#020617,#1e1b4b,#581c87)",
minHeight:"100vh"
}}>

{/* HEADER */}

<div style={{
textAlign:"center",
padding:"60px 20px"
}}>

{user && (
<h2 style={{color:"#73b8e6"}}>
Welcome, {user.name} 
</h2>
)}

<h1 style={{
fontSize:"40px",
fontWeight:"700",
marginTop:"10px",
color:"#c852ec"
}}>
Latest Blogs
</h1>

<p style={{color:"lightgray"}}>
Discover amazing stories from our writers
</p>

{/* SEARCH BAR */}

<input
type="text"
placeholder="Search blog by title..."
value={search}
onChange={(e)=>setSearch(e.target.value)}

style={{
marginTop:"20px",
padding:"12px",
width:"400px",
borderRadius:"25px",
border:"none",
outline:"none",
textAlign:"center",
fontSize:"14px"
}}
/>

</div>


{/* BLOG GRID */}

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",
gap:"30px",
padding:"40px",
maxWidth:"1200px",
margin:"auto"
}}>

{blogs
.filter((item)=>
item.title.toLowerCase().includes(search.toLowerCase())
)
.map((item)=>(

<div
key={item._id}

style={{
background:"rgba(255,255,255,0.8)",
backdropFilter:"blur(10px)",
borderRadius:"15px",
overflow:"hidden",
boxShadow:"0 10px 25px rgba(0,0,0,0.1)",
transition:"0.3s",
cursor:"pointer"
}}

onMouseEnter={(e)=>{
e.currentTarget.style.transform="translateY(-10px)";
e.currentTarget.style.boxShadow="0 20px 40px rgba(0,0,0,0.15)";
}}

onMouseLeave={(e)=>{
e.currentTarget.style.transform="translateY(0)";
e.currentTarget.style.boxShadow="0 10px 25px rgba(0,0,0,0.1)";
}}

>

{/* IMAGE */}

<div style={{overflow:"hidden"}}>

<img
src={item.image}
alt={item.title}

style={{
width:"100%",
height:"180px",
objectFit:"cover",
transition:"0.4s"
}}

onMouseEnter={(e)=>{
e.target.style.transform="scale(1.1)"
}}

onMouseLeave={(e)=>{
e.target.style.transform="scale(1)"
}}

/>

</div>


{/* CONTENT */}

<div style={{padding:"20px"}}>

<h3 style={{
marginBottom:"10px",
fontSize:"20px"
}}>
{item.title}
</h3>

<p style={{
color:"#555",
fontSize:"14px",
lineHeight:"1.5",
height:"60px",
overflow:"hidden"
}}>
{item.content}
</p>

<p style={{
fontSize:"12px",
color:"#777",
marginTop:"10px"
}}>
By <strong>{item.author}</strong> • {new Date(item.createdAt).toLocaleDateString()}
</p>


{/* BUTTON */}

<button
style={{
marginTop:"15px",
padding:"8px 18px",
border:"none",
borderRadius:"20px",
background:"linear-gradient(90deg,#6366f1,#8b5cf6)",
color:"white",
cursor:"pointer",
fontWeight:"500",
transition:"0.3s"
}}

onMouseEnter={(e)=>{
e.target.style.opacity="0.8"
}}

onMouseLeave={(e)=>{
e.target.style.opacity="1"
}}

>
Read More
</button>

</div>

</div>

))}

</div>

</div>

</div>

)
}

export default Home;