import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const nav = useNavigate();

  const register = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/register",
        data
      );

      // Agar register ho janda ta automatically login kar do
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      alert("Registered Successfully");
      nav("/chat");
    } catch (err) {
      console.log(err.response?.data);
      alert(
        err.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="login-wrapper">
      <div className="main-card">
        
        {/* LEFT SIDE */}
        <div className="left-side">
          <h1>Create Account!</h1>
          <div className="line"></div>

          <p>
            Join our real-time chat app and
            connect with friends instantly,
            send messages, audio and enjoy
            premium experience.
          </p>

          <button
            className="learn-btn"
            onClick={() => nav("/login")}
          >
            Login Now
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="right-side">
          <div className="glass-card">
            <h2>Sign Up</h2>

            <input
              type="text"
              placeholder="Full Name"
              value={data.name}
              onChange={(e) =>
                setData({
                  ...data,
                  name: e.target.value,
                })
              }
            />

            <input
              type="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) =>
                setData({
                  ...data,
                  email: e.target.value,
                })
              }
            />

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={data.password}
                onChange={(e) =>
                  setData({
                    ...data,
                    password: e.target.value,
                  })
                }
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOff /> : <IoEye />}
              </button>
            </div>

            <button
              className="submit-btn"
              onClick={register}
            >
              Register
            </button>

            <p
              className="signup"
              onClick={() => nav("/login")}
            >
              Already have account? Login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}