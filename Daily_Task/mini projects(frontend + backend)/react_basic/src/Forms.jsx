import React, { useState } from 'react'
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

const Forms = () => {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [showP,setShowP] = useState(false);

    function handlesubmit(e){
        e.preventDefault();
        console.log({name,email,password})
    }

  return (
    <form onSubmit={handlesubmit} style={{display:"flex",flexDirection:"column",gap:"10px",width:"300px",margin:"20px auto"}}>

        <h2>Register Here</h2>
        <label htmlFor="name">Name</label>
        <input value={name} onChange={(e)=>{
            setName(e.target.value)
        }} style={{height:"35px",padding:"0 10px"}} id="name" type="text" />

        <label htmlFor="email">Email</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} style={{height:"35px",padding:"0 10px"}} id="email" type="text" />

        <label htmlFor="password">Password</label>
        <div style={{display:"flex",justifyContent:"space-between",border:"1px solid black",padding:"0 10px"}}>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} style={{height:"35px",padding:"0 10px",width:"75%",border:"none",outline:"none"}} id="password" type={showP?"text":"password"}/>
            <button style={{border:"none",backgroundColor:"transparent"}} type='button' onMouseEnter={()=>setShowP(true)} onMouseLeave={()=>setShowP(false)}>{showP?<IoIosEyeOff size={25}/>:<IoIosEye size={25}/>}</button>
        </div>
        <button style={{height:"35px",margin:"20px 0px",color:"white",backgroundColor:"black",borderRadius:"7px"}}>Submit</button>
    </form>
  )
}

export default Forms
