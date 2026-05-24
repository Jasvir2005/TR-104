import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const nav = useNavigate();

  const email =
    localStorage.getItem("resetEmail");

  const verifyOtp = async () => {
    try {
      await axios.post(
        "http://localhost:5000/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      nav("/reset-password");
    } catch (err) {
      console.log(err.response?.data);
      alert(
        err.response?.data?.message ||
          "Wrong OTP"
      );
    }
  };

  return (
    <div className="login-wrapper">
      <div className="main-card">

        {/* LEFT */}
        <div className="left-side">
          <h1>Verify OTP</h1>
          <div className="line"></div>

          <p>
            Enter the OTP sent to your
            registered email address to
            continue password reset.
          </p>

          <button
            className="learn-btn"
            onClick={() => nav("/forgot-password")}
          >
            Back
          </button>
        </div>

        {/* RIGHT */}
        <div className="right-side">
          <div className="glass-card">
            <h2>OTP Check</h2>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value)
              }
            />

            <button
              className="submit-btn"
              onClick={verifyOtp}
            >
              Verify OTP
            </button>

            <p
              className="signup"
              onClick={() =>
                nav("/forgot-password")
              }
            >
              Resend OTP
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}