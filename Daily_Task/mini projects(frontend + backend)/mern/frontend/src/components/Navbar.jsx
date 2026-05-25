import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Navbar = () => {

const {user,logout} = React.useContext(UserContext);

return (

<div
style={{

display:"flex",
justifyContent:"space-between",
alignItems:"center",

padding:"16px 70px",
background:"linear-gradient(135deg,#020617,#1e1b4b,#581c87)",

color:"white",

boxShadow:"0 6px 25px rgba(0,0,0,0.3)",

fontFamily:"Poppins",

position:"sticky",
top:"0",
zIndex:"1000"

}}
>

{/* LOGO */}

<h2 style={{
fontWeight:"700",
letterSpacing:"2px",
cursor:"pointer"
}}>
MERN BLOG
</h2>


{/* MENU */}

<div style={{
display:"flex",
gap:"30px",
alignItems:"center"
}}>


{/* Home */}

<Link
to="/home"
style={{
color:"white",
textDecoration:"none",
position:"relative"
}}

onMouseEnter={(e)=>{
e.target.style.borderBottom="2px solid #c4b5fd"
}}

onMouseLeave={(e)=>{
e.target.style.borderBottom="none"
}}

>
Home
</Link>


{/* Dashboard */}

{user && (
<Link
to="/dashboard"
style={{
color:"white",
textDecoration:"none"
}}

onMouseEnter={(e)=>{
e.target.style.borderBottom="2px solid #c4b5fd"
}}

onMouseLeave={(e)=>{
e.target.style.borderBottom="none"
}}

>
Dashboard
</Link>
)}


{/* Register */}

<Link
to="/"
style={{
color:"white",
textDecoration:"none"
}}

onMouseEnter={(e)=>{
e.target.style.borderBottom="2px solid #c4b5fd"
}}

onMouseLeave={(e)=>{
e.target.style.borderBottom="none"
}}

>
Register
</Link>


{/* Login / Logout */}

{user ? (

<button
onClick={logout}

style={{

padding:"8px 20px",

border:"none",

borderRadius:"30px",

background:"white",

color:"#4c1d95",

fontWeight:"600",

cursor:"pointer",

transition:"0.3s"

}}

onMouseEnter={(e)=>{
e.target.style.transform="scale(1.08)"
}}

onMouseLeave={(e)=>{
e.target.style.transform="scale(1)"
}}

>
Logout
</button>

) : (

<Link
to="/login"

style={{

padding:"8px 20px",

borderRadius:"30px",

textDecoration:"none",

background:"white",

color:"#4c1d95",

fontWeight:"600"

}}
>
Login
</Link>

)}

</div>

</div>

)

}

export default Navbar