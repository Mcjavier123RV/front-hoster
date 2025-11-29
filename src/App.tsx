import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";

interface UserData {
  token: string;
  userId: string;
  name: string;
  email: string;
  role: string; // Admin | Tenant | Owner
  expiresAt: string;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (data: UserData) => {
    setUserData(data);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem("token");
  };

  const handleBackToLogin = () => {
    setShowRegister(false);
  };

  const role = userData?.role ?? "";

  return (
    <>
      {!isLoggedIn ? (
        showRegister ? (
          <Register onBack={handleBackToLogin} />
        ) : (
          <Login
            onLogin={handleLogin}
            onShowRegister={() => setShowRegister(true)}
          />
        )
      ) : role === "Admin" ? (
        <AdminDashboard userEmail={userData!.email} onLogout={handleLogout} />
      ) : (
        <Dashboard userEmail={userData!.email} onLogout={handleLogout} />
      )}
    </>
  );
}
