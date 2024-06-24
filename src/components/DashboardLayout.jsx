import { Fragment, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Banner from "./Banner";
import DashboardSidebar from "./DashboardSidebar";
import { UserContext } from "../context/UserContext";

const DashboardLayout = () => {
  const { token } = useContext(UserContext);

  if (token === null) {
    return <Navigate to="/login" />;
  }
  return (
    <Fragment>
      <Banner name="Priya" />
      <div className="flex h-full max-w-full overflow-hidden">
        <DashboardSidebar />
        <section className="mx-auto max-w-full flex-1 overflow-hidden px-3 py-4 sm:px-5">
          <Outlet />
        </section>
      </div>
    </Fragment>
  );
};

export default DashboardLayout;
