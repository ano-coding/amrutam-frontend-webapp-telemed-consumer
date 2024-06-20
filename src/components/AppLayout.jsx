import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { SideBarToggleProvider } from "../context/SidebarToggleContext";

const AppLayout = () => {
  return (
    <SideBarToggleProvider>
      <Navbar />
      <Outlet />
    </SideBarToggleProvider>
  );
};

export default AppLayout;
