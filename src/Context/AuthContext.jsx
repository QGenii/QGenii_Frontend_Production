import { createContext, useState, useEffect } from "react";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      // Validate token
      validateAuth();
    } else {
      setLoading(false);
    }

    // Setup heartbeat
    const heartbeatInterval = setInterval(() => {
      if (token) {
        api.post("/me/heartbeat").catch(() => { });
      }
    }, 60000); // Every 60 seconds

    return () => clearInterval(heartbeatInterval);
  }, []);

  const validateAuth = async () => {
    try {
      const response = await api.get("/auth/me");
      setUser(response.data.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    const { user, token } = response.data.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    toast.success("Logged In Successfully");
    return user;
  };

  const register = async (userData) => {
    const response = await api.post("/auth/register", userData);
    const { user, token } = response.data.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    toast.success("Registered Successfully");
    return user;
  };

  const businessLogin = async (email, password) => {
    const response = await api.post("/auth/business/login", { email, password });
    const { user, token } = response.data.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    toast.success("Logged In Successfully");
    return user;
  };

  const businessRegister = async (userData) => {
    const response = await api.post("/auth/business/register", userData);
    const { user, token } = response.data.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    toast.success("Business Account Created Successfully");
    return user;
  };

  const logout = () => {
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      toast.success("Logged Out Successfully!");
      // window.location.replace("http://localhost:5173/login");
      navigate("/login")
    }
  };
  const saveUser = (user) => {
    // localStorage.setItem('user','')
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user));
    toast.success('Profile Saved Successfully')
  };

  const isAdmin = () => {
    return user && ["SUPER_ADMIN", "ADMIN"].includes(user.role);
  };

  const isSuperAdmin = () => {
    return user && user.role === 'SUPER_ADMIN';
  };

  const isMentor = () => {
    return user && user.role === 'MENTOR';
  };

  const isHiringPartner = () => {
    return user && user.role === 'HIRING_PARTNER';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        businessLogin,
        businessRegister,
        logout,
        setUser,
        isAdmin,
        saveUser,
        isSuperAdmin,
        isMentor,
        isHiringPartner,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
