import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { UserContext } from "./UserContext";
import axios from "axios";
import UserDashboard from "./pages/UserDashboard";
import AddBlog from "./pages/AddBlog";
import UpdateBlog from "./pages/UpdateBlog";

const App = () => {

  let token = localStorage.getItem("token");

  const {user,login} = useContext(UserContext);

  useEffect(() => {
    if(token){

      let header = {
        Authorization:"Bearer "+token
      }
      axios.get("http://localhost:3000/user/verify",{headers:header})
      .then((res)=>{
        login(res.data)
      })
      .catch((err)=>{
        console.log(err.response)
      })
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Register/>} />

        <Route path="/login" element={<Login/>} />

        <Route path="/home" element={<Home/>} />

        <Route path="/dashboard" element={user?<UserDashboard/>:<Login/>} />

        <Route path="/add-blog" element={user?<AddBlog/>:<Login/>} />

        <Route path="/update-blog" element={user?<UpdateBlog/>:<Login/>} />


      </Routes>
    </BrowserRouter>
  );
};

export default App;