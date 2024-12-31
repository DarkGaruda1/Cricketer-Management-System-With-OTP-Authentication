import React, { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const contextData = useContext(AuthContext);
  const { checkAuthenticationStatus, isLoggedIn } = contextData;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
