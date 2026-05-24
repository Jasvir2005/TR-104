import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const nav = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const resetPassword = async () => {
    try {
      await axios.post(
        "http://localhost:5000/auth/reset-password",
        {
          email,
          password,
        }
      );

      nav("/success");
    } catch (err) {
      console.log(err.response?.data);
      alert(
        err.response?.data?.message ||
          "Reset Failed"
      );
    }
  };

  return (
    <div className="login-wrapper">
      <div className="main-card">

        {/* LEFT */}
        <div className="left-side">
          <h1>Reset Password</h1>
          <div className="line"></div>

          <p>
            Create a strong new password
            for your account and continue
            securely to the chat app.
          </p>

          <button
            className="learn-btn"
            onClick={() =>
              nav("/verify-otp")
            }
          >
            Back
          </button>
        </div>

        {/* RIGHT */}
        <div className="right-side">
          <div className="glass-card">
            <h2>New Password</h2>

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter New Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
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
              onClick={resetPassword}
            >
              Reset Password
            </button>

            <p
              className="signup"
              onClick={() =>
                nav("/login")
              }
            >
              Back to Login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}