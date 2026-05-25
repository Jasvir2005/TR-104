import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { Link } from "react-router-dom";

const SongLayout = () => {
  return (
    <div>
      <Navbar/>
      <div style={{
        display:"flex",
        gap:"10px"
      }}>
        <div style={{
            width:"300px",
            height:"600px",
            backgroundColor:"lightgray",
            display: "flex",
            flexDirection: "column",
            padding: "15px",
            gap: "10px"
        }}>
          <h3>Songs Categories</h3>
            <li><Link to="/songs/hindi">Hindi Songs</Link></li>
            <li><Link to="/songs/english">English Songs</Link></li>
            <li><Link to="/songs/punjabi">Punjabi Songs</Link></li>
        </div>
        <Outlet/>
      </div>
    </div>
  )
}

export default SongLayout
