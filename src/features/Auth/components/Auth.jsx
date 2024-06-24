import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

const Auth = () => {
  const {token} = useContext(UserContext);

  if (token) {
    return <Navigate to="/dashboard" />;
  }
  return <Outlet />;
};


export default Auth;
