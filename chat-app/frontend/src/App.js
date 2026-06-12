import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import Success from "./pages/Success";
import Welcome from "./pages/Welcome";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Welcome/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} /> 
        <Route path="/reset-password" element={<ResetPassword /> } />
        <Route path="/success" element={<Success />} />
        
        
        {/* Protected Routes - login required (direct open nahi ho sakde) */}
        <Route 
          path="/chat" 
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } 
        />

        
        {/* Agar koi unknown path ho to login pe bhejo */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;