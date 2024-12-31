import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  axios.defaults.withCredentials = true;

  const logout = async () => {
    try {
      const { data } = await axios.post(`${backendURL}/auth/logout`);

      if (data.success) {
        setIsLoggedIn(false);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const checkAuthenticationStatus = async () => {
      try {
        const { data } = await axios.get(`${backendURL}/auth/isAuthenticated`);
        if (data.success) setIsLoggedIn(true);

        return;
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    };

    checkAuthenticationStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ backendURL, isLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
