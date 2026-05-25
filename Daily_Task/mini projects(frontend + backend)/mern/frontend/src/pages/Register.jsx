import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Register = () => {

const navigate = useNavigate()

const [formData,setFormData] = useState({
name:"",
email:"",
password:"",
age:""
})

const handleChange = (e)=>{
setFormData({
...formData,
[e.target.name]:e.target.value
})
}

const handleSubmit = (e)=>{
e.preventDefault()

axios.post("http://localhost:3000/user/register",formData)
.then(()=>{
alert("Registration successful!")
navigate("/login")
})
.catch((err)=>{
alert(err.response.data)
})
}

return (

<div>

<Navbar/>

<div style={{

display:"flex",
justifyContent:"center",
alignItems:"center",
height:"100vh",

background:"linear-gradient(135deg,#020617,#1e1b4b,#581c87)",

fontFamily:"Poppins"

}}>

<form

onSubmit={handleSubmit}

style={{

background:"rgba(255,255,255,0.1)",

backdropFilter:"blur(12px)",

padding:"40px",

borderRadius:"16px",

width:"340px",

boxShadow:"0 10px 30px rgba(0,0,0,0.3)",

color:"white"

}}

>

<h2 style={{
textAlign:"center",
marginBottom:"25px",
color:"#a1d8fc"
}}>
Register
</h2>

<input
type="text"
name="name"
placeholder="Enter Name"
value={formData.name}
onChange={handleChange}

style={{
width:"92%",
padding:"12px",
marginBottom:"15px",
borderRadius:"8px",
border:"none",
outline:"none"
}}
/>

<input
type="email"
name="email"
placeholder="Enter Email"
value={formData.email}
onChange={handleChange}

style={{
width:"92%",
padding:"12px",
marginBottom:"15px",
borderRadius:"8px",
border:"none",
outline:"none"
}}
/>

<input
type="password"
name="password"
placeholder="Enter Password"
value={formData.password}
onChange={handleChange}

style={{
width:"92%",
padding:"12px",
marginBottom:"15px",
borderRadius:"8px",
border:"none",
outline:"none"
}}
/>

<input
type="number"
name="age"
placeholder="Enter Age"
value={formData.age}
onChange={handleChange}

style={{
width:"92%",
padding:"12px",
marginBottom:"25px",
borderRadius:"8px",
border:"none",
outline:"none"
}}
/>

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

cursor:"pointer"

}}

>
Register
</button>

</form>

</div>

</div>

)

}

export default Register