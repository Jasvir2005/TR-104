import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const nav = useNavigate();

  const sendOtp = async () => {
    try {
      await axios.post(
        "http://localhost:5000/auth/forgot-password",
        { email }
      );

      alert("OTP Sent");

      localStorage.setItem(
        "resetEmail",
        email
      );

      nav("/verify-otp");
    } catch (err) {
      console.log(err.response?.data);
      alert(
        err.response?.data?.message ||
          "Failed to send OTP"
      );
    }
  };

  return (
    <div className="login-wrapper">
      <div className="main-card">
        
        {/* LEFT */}
        <div className="left-side">
          <h1>Forgot Password?</h1>
          <div className="line"></div>

          <p>
            Don’t worry. Enter your email
            address and we’ll send you an
            OTP to reset your password.
          </p>

          <button
            className="learn-btn"
            onClick={() => nav("/login")}
          >
            Back To Login
          </button>
        </div>

        {/* RIGHT */}
        <div className="right-side">
          <div className="glass-card">
            <h2>Reset Access</h2>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <button
              className="submit-btn"
              onClick={sendOtp}
            >
              Send OTP
            </button>

            <p
              className="signup"
              onClick={() => nav("/login")}
            >
              Remember password? Login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}