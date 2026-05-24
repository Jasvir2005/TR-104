import { useNavigate } from "react-router-dom";
import "./login.css";
import { BsCheckCircleFill } from "react-icons/bs";

export default function Success() {
  const nav = useNavigate();

  return (
    <div className="login-wrapper">
      <div className="main-card">

        {/* LEFT */}
        <div className="left-side">
          <h1>Success!</h1>
          <div className="line"></div>

          <p>
            Your password has been reset
            successfully. You can now log
            in using your new password.
          </p>

          <button
            className="learn-btn"
            onClick={() =>
              nav("/login")
            }
          >
            Login Now
          </button>
        </div>

        {/* RIGHT */}
        <div className="right-side">
          <div className="glass-card success-card">
            
            <div className="success-icon">
              <BsCheckCircleFill />
            </div>

            <h2>Password Updated</h2>

            <p className="success-text">
              Your password has been
              changed successfully.
              Please login with your
              new password.
            </p>

            <button
              className="submit-btn"
              onClick={() =>
                nav("/login")
              }
            >
              Go To Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}