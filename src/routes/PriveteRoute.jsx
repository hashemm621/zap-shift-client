import React from "react";
import useAuth from "../hooks/useAuth";
import AnimatedLoadingPage from "../pages/Loading/AnimatedLoadingPage";
import { Navigate, useLocation } from "react-router";

const PriveteRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation()


  if (loading) {
    return <AnimatedLoadingPage />;
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }
  return children;
};

export default PriveteRoute;
