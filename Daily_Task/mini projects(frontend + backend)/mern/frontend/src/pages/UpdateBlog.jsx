import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateBlog = () => {
const [image,setImage] = useState(null)
const { state } = useLocation();
const navigate = useNavigate();

const [blog,setBlog] = useState({
title: state.title,
content: state.content,
image: state.image,
author: state.author
});

const handleChange = (e)=>{
setBlog({
...blog,
[e.target.name]: e.target.value
})
}

const handleSubmit = (e)=>{
e.preventDefault()

let token = localStorage.getItem("token")

let header = {
Authorization:"Bearer "+token
}

const formdata = new FormData()

formdata.append("title",blog.title)
formdata.append("content",blog.content)
formdata.append("author",blog.author)

if(image){
formdata.append("image",image)
}

axios.put(
`http://localhost:3000/blog/update?id=${state._id}`,
formdata,
{
headers:{
Authorization:"Bearer "+token,
"Content-Type":"multipart/form-data"
}
}
)
.then(()=>{
alert("Blog Updated Successfully")
navigate("/dashboard")
})
.catch((err)=>{
console.log(err.response.data)
})
}

return (

<div>

<Navbar/>

<div style={{
display:"flex",
justifyContent:"center",
alignItems:"center",
minHeight:"100vh",
background:"linear-gradient(135deg,#020617,#1e1b4b,#581c87)",
fontFamily:"Poppins"
}}>

<form
onSubmit={handleSubmit}

style={{
background:"rgba(255,255,255,0.1)",
backdropFilter:"blur(12px)",
padding:"40px",
width:"360px",
borderRadius:"16px",
boxShadow:"0 10px 30px rgba(0,0,0,0.3)",
color:"white"
}}
>

<h2 style={{
textAlign:"center",
marginBottom:"30px",
color:"#a1d8fc"
}}>
Update Blog
</h2>

{/* Title */}

<label style={{
display:"block",
marginBottom:"6px",
fontSize:"14px"
}}>
Blog Title
</label>

<input
type="text"
name="title"
placeholder="Enter Blog Title"
value={blog.title}
onChange={handleChange}

style={{
width:"94%",
padding:"12px",
marginBottom:"20px",
borderRadius:"8px",
border:"none",
outline:"none"
}}
/>

{/* Content */}

<label style={{
display:"block",
marginBottom:"6px",
fontSize:"14px"
}}>
Blog Content
</label>

<textarea
name="content"
placeholder="Write your blog content..."
value={blog.content}
onChange={handleChange}
rows="5"

style={{
width:"94%",
padding:"12px",
marginBottom:"20px",
borderRadius:"8px",
border:"none",
outline:"none",
resize:"none"
}}
/>

{/* Image */}

<label style={{
display:"block",
marginBottom:"6px",
fontSize:"14px"
}}>
Upload Image
</label>

{blog.image && (
<img 
src={blog.image} 
alt="blog"
style={{
width:"100%",
height:"180px",
objectFit:"cover",
marginBottom:"10px",
borderRadius:"8px"
}}
/>
)}

<input
type="file"
onChange={(e)=>setImage(e.target.files[0])}

style={{
width:"94%",
padding:"10px",
marginBottom:"20px",
borderRadius:"8px",
background:"white",
color:"black"
}}
/>

{/* Author */}

<label style={{
display:"block",
marginBottom:"6px",
fontSize:"14px"
}}>
Author Name
</label>

<input
type="text"
name="author"
placeholder="Enter Author Name"
value={blog.author}
onChange={handleChange}

style={{
width:"94%",
padding:"12px",
marginBottom:"25px",
borderRadius:"8px",
border:"none",
outline:"none"
}}
/>

{/* Button */}

<button
type="submit"

style={{
width:"100%",
padding:"12px",
border:"none",
borderRadius:"30px",
background:"linear-gradient(90deg,#7c3aed,#a855f7)",
color:"white",
fontWeight:"600",
cursor:"pointer",
fontSize:"15px",
transition:"0.3s"
}}

onMouseOver={(e)=>e.target.style.opacity="0.85"}
onMouseOut={(e)=>e.target.style.opacity="1"}
>
Update Blog
</button>

</form>

</div>

</div>

)

}

export default UpdateBlog;