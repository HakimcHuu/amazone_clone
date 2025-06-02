import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";

function ProtectedRoute({ children, msg, redirect }) {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    console.log("ProtectedRoute - Current user:", user); // Debug log
    if (!user) {
      console.log("ProtectedRoute - No user, redirecting to auth"); // Debug log
      navigate("/auth", {
        state: {
          msg,
          redirect,
        },
      });
    }
  }, [user, msg, redirect, navigate]);

  return user ? children : null;
}

export default ProtectedRoute;
