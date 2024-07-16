import { useContext, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

const Auth = () => {
  // if (token) {
  //   return <Navigate to="/dashboard" />;
  // }
  // return <Outlet />;
  const { token } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const redirectTo = new URLSearchParams(location.search).get("redirectTo");
      navigate(redirectTo || "/dashboard");
    }
  }, [token, location, navigate]);

  return <Outlet />;
};

export default Auth;
