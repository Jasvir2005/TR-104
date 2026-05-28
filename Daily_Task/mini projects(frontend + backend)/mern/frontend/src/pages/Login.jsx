import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UserContext } from "../UserContext";

const Login = () => {

const navigate = useNavigate();

const [data,setData] = useState({
email:"",
password:""
})

const {login} = useContext(UserContext)

const handleChange = (e)=>{
setData({
...data,
[e.target.name]:e.target.value
})
}

const handleSubmit = (e)=>{
e.preventDefault()

axios.post("http://localhost:3000/user/login",data)
.then((res)=>{
login(res.data.existingUser)
localStorage.setItem("token",res.data.token)
alert("Login Success")
navigate("/home")
})
.catch((err)=>{
alert("Login Failed "+err.response.data)
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
width:"340px",

borderRadius:"16px",

boxShadow:"0 10px 30px rgba(0,0,0,0.3)",

color:"white"

}}

>

<h2 style={{
textAlign:"center",
marginBottom:"25px",
color:"#a1d8fc"
}}>
Login
</h2>

<input
type="email"
name="email"
placeholder="Enter Email"
onChange={handleChange}

style={{

width:"92%",
padding:"12px",

marginBottom:"18px",

borderRadius:"8px",

border:"none",

outline:"none"

}}
/>

<input
type="password"
name="password"
placeholder="Enter Password"
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

cursor:"pointer",

fontSize:"15px"

}}

>
Login
</button>

</form>

</div>

</div>

)

}

export default Login