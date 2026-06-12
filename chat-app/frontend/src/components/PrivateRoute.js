import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Agar user login nahi hai to login page te bhejo
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}