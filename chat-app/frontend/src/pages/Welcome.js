import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Welcome() {
  const nav = useNavigate();

  return (
    <div className="login-wrapper">
      <div className="main-card">

        {/* LEFT */}
        <div className="left-side">
          <h1>Welcome!</h1>
          <div className="line"></div>

          <p>
            Connect instantly with friends,
            send messages, audio and enjoy
            real-time chatting experience.
          </p>
        </div>

        {/* RIGHT */}
        <div className="right-side">
          <div className="glass-card welcome-card">
            <h2>Get Started</h2>

            <p className="success-text">
              Choose an option to continue
            </p>

            <button
              className="submit-btn"
              onClick={() => nav("/login")}
            >
              Login
            </button>

            <button
              className="register-btn"
              onClick={() => nav("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}