import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Banner from "./Banner";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
  return (
    <Fragment>
      <Banner name="Priya" />
      <div className="flex h-full">
        <DashboardSidebar />
        <section className="mx-auto max-w-6xl flex-1 px-3 py-4 sm:px-5">
          <Outlet />
        </section>
      </div>
    </Fragment>
  );
};

export default DashboardLayout;
