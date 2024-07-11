import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function CancelRedirect() {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const orderStatus = searchParams.get("orderStatus");
    const token = searchParams.get("token");
    console.log("Order cancelled:", orderStatus, token);
  }, [location]);

  // Redirect to cart
  return <Navigate to="/cart" replace />;
}
export default CancelRedirect;
