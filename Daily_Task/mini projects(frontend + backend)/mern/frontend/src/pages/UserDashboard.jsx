import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

const UserDashboard = () => {

const [blogs,setBlogs] = useState([]);

let token = localStorage.getItem("token");

let header = {
Authorization:"Bearer "+token
};

useEffect(()=>{

axios.get("http://localhost:3000/blog/myblogs",{headers:header})
.then((res)=>{
setBlogs(res.data);
})
.catch((err)=>{
console.log(err.response.data);
})

},[])

const navigate = useNavigate();

const deleteBlog = (id,publicId)=>{

axios.delete(`http://localhost:3000/blog/delete?id=${id}&publicid=${publicId}`,{headers:header})
.then(()=>{
const filtered = blogs.filter((blog)=>blog._id !== id);
setBlogs(filtered);
})
.catch((err)=>{
console.log(err.response.data);
})

}

const updateBlog = (blog)=>{
navigate("/update-blog",{state:blog})
}

const addBlog = ()=>{
navigate("/add-blog")
}

return (

<div>

<Navbar/>

<div style={{
minHeight:"100vh",
background:"linear-gradient(135deg,#020617,#1e1b4b,#581c87)",
fontFamily:"Poppins"
}}>

{/* HEADER */}

<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"25px 60px"
}}>

<h1 style={{
fontSize:"32px",
fontWeight:"700",
color:"#5b96bd"
}}>
My Blog Dashboard
</h1>

<button
onClick={addBlog}

style={{
padding:"12px 22px",
border:"none",
borderRadius:"30px",
background:"linear-gradient(90deg,#6366f1,#8b5cf6)",
color:"white",
fontWeight:"500",
cursor:"pointer",
boxShadow:"0 8px 20px rgba(99,102,241,0.4)",
transition:"0.3s"
}}

onMouseEnter={(e)=>{
e.target.style.transform="scale(1.05)"
}}

onMouseLeave={(e)=>{
e.target.style.transform="scale(1)"
}}

>
+ Add Blog
</button>

</div>

{/* BLOG GRID */}

<div style={{

display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",
gap:"35px",
padding:"40px",
maxWidth:"1300px",
margin:"auto"

}}>

{blogs.map((blog)=>(

<div
key={blog._id}

style={{

background:"rgba(255,255,255,0.8)",
backdropFilter:"blur(10px)",
borderRadius:"18px",
overflow:"hidden",
boxShadow:"0 10px 30px rgba(0,0,0,0.12)",
transition:"0.4s",
cursor:"pointer"

}}

onMouseEnter={(e)=>{
e.currentTarget.style.transform="translateY(-10px)"
e.currentTarget.style.boxShadow="0 20px 40px rgba(0,0,0,0.15)"
}}

onMouseLeave={(e)=>{
e.currentTarget.style.transform="translateY(0)"
e.currentTarget.style.boxShadow="0 10px 30px rgba(0,0,0,0.12)"
}}

>

{/* IMAGE */}

<div style={{overflow:"hidden"}}>

<img
src={blog.image}

style={{
width:"100%",
height:"200px",
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

<div style={{padding:"22px"}}>

<h3 style={{
marginBottom:"10px",
fontSize:"20px",
color:"#1e293b"
}}>
{blog.title}
</h3>

<p style={{
fontSize:"14px",
color:"#475569",
lineHeight:"1.5",
height:"60px",
overflow:"hidden"
}}>
{blog.content}
</p>

<p style={{
fontSize:"12px",
color:"#64748b"
}}>
By <strong>{blog.author}</strong>
</p>


{/* BUTTONS */}

<div style={{

display:"flex",
gap:"10px",
marginTop:"16px"

}}>

<button
onClick={()=>updateBlog(blog)}

style={{
flex:"1",
padding:"8px",
border:"none",
borderRadius:"20px",
background:"#3b82f6",
color:"white",
cursor:"pointer",
fontSize:"13px",
transition:"0.3s"
}}

onMouseEnter={(e)=>{
e.target.style.opacity="0.8"
}}

onMouseLeave={(e)=>{
e.target.style.opacity="1"
}}

>
Update
</button>


<button
onClick={()=>deleteBlog(blog._id,blog.publicId)}

style={{
flex:"1",
padding:"8px",
border:"none",
borderRadius:"20px",
background:"#ef4444",
color:"white",
cursor:"pointer",
fontSize:"13px",
transition:"0.3s"
}}

onMouseEnter={(e)=>{
e.target.style.opacity="0.8"
}}

onMouseLeave={(e)=>{
e.target.style.opacity="1"
}}

>
Delete
</button>

</div>

</div>

</div>

))}

</div>

</div>

</div>

)

}

export default UserDashboard;