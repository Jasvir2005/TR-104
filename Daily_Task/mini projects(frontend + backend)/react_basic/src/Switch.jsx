import React, {use, useState} from 'react'

const Switch = () => {
    const [flag,setflag]= useState(true)
    function changeSwitch(){
        setflag(!flag)
    }
  return (
    <div 
    onClick={changeSwitch}
    style={{
        height:"100px",
        width:"200px",
        backgroundColor:flag?"green":"red",
        borderRadius:"50px",
        display:"flex",
        alignItems:"center",
        padding:"0 3px",
        justifyContent:flag?"start":"end"
    }}>
      <div style={{
        height:"94px",
        width:"94px",
        backgroundColor:"white",
        borderRadius:"50px"
      }}>
    
      </div>
    </div>
  )
}

export default Switch
