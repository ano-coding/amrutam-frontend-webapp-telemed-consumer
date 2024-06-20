import { useContext, useState } from "react";
import { SideBarToggleContext } from "../context/SidebarToggleContext";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import AppointmentSvg from "../assets/appointment.svg?react";
import ChatSvg from "../assets/chat.svg?react";
import MedicalRecordSvg from "../assets/medical-record.svg?react";
import PaymentSvg from "../assets/payment.svg?react";
import PrescriptionSvg from "../assets/prescription.svg?react";
import ArrowLeftSvg from "../assets/arrow-left.svg?react";
import DashboardSvg from "../assets/dashboard.svg?react";
import CallRecordingsSvg from "../assets/call-recordings.svg?react";
import ChevronLeftSvg from "../assets/chevron-left.svg?react";
import ChevronRightSvg from "../assets/chevron-right.svg?react";

const sidebarItems = [
  {
    icon: DashboardSvg,
    text: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: AppointmentSvg,
    text: "Appointments",
    link: "/appointments",
  },
  {
    icon: PrescriptionSvg,
    text: "Routines",
    link: "/routines",
  },
  {
    icon: MedicalRecordSvg,
    text: "Medical Records",
    link: "/medical-records",
  },
  {
    icon: PaymentSvg,
    text: "Payments",
    link: "/payments",
  },
  {
    icon: ChatSvg,
    text: "Your Chats",
    link: "/chats",
  },
  {
    icon: CallRecordingsSvg,
    text: "Call Recordings",
    link: "/call-recordings",
  },

  {
    icon: ArrowLeftSvg,
    text: "Logout",
    link: "/logout",
  },
];

const DashboardSidebar = () => {
  const { toggled, setToggled } = useContext(SideBarToggleContext);
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="relative bg-white">
      <Sidebar
        customBreakPoint="1024px"
        onBackdropClick={() => setToggled(false)}
        collapsed={collapsed}
        toggled={toggled}
        width="300px"
        backgroundColor="#fff"
        rootStyles={{
          border: "2px solid #ECECEC",
          height: "100%",
        }}
      >
        <div className="flex flex-col items-center justify-center gap-[12px] border-b-[3px] border-[#ECECEC] bg-white py-11">
          <img
            src="/avatar-person.svg"
            alt="Profile Picture"
            className={`${
              collapsed ? "h-auto w-14" : "h-24 w-24"
            } rounded-full`}
          />
          {!collapsed && (
            <div className="flex flex-col items-center gap-[9px]">
              <h2 className="text-[18px] font-semibold text-[#3a643b]">
                Priya Singhal
              </h2>
              <p className="text-[15px] text-[#666]">
                24th July, 1999, 25 years
              </p>
              <p className="text-[15px] text-[#666]">New Delhi, India</p>
            </div>
          )}
        </div>

        <Menu
          closeOnClick={true}
          className={`${collapsed ? "" : "px-6"} w-full bg-white py-8`}
        >
          {sidebarItems.map((item) => (
            <MenuItem
              key={item.text}
              component={
                <MenuComponent
                  collapsed={collapsed}
                  setToggled={setToggled}
                  item={item}
                />
              }
              icon={
                <div
                  className={`${collapsed ? `-mr-2 group-hover:bg-neutral-200` : ""} rounded-lg bg-[#f4f5fa] px-2 py-2`}
                >
                  <item.icon className="size-6" />
                </div>
              }
              className={`${collapsed ? `flex` : ""} w-full items-center justify-center border-b border-gray-200 py-2`}
            >
              {!collapsed && (
                <span className="ml-3 text-[18px]">{item.text}</span>
              )}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>
      <button
        onClick={() => setCollapsed((p) => !p)}
        className="absolute right-1 top-0 hidden translate-x-full border-2 border-solid border-[#ECECEC] py-2 lg:block"
      >
        {collapsed ? <ChevronRightSvg /> : <ChevronLeftSvg />}
      </button>
    </div>
  );
};

export default DashboardSidebar;

function MenuComponent({ children, setToggled, collapsed, item }) {
  return (
    <NavLink
      to={item.link}
      onClick={() => setToggled(false)}
      className={({ isActive }) =>
        `group flex items-center rounded-lg py-3 ${collapsed ? "" : `pl-6 hover:bg-[#e1ebe2]`} hover:text-[#3a643b] ${isActive ? "bg-[#e1ebe2] font-semibold text-[#3a643b]" : "font-medium text-[#7c7c7c]"}`
      }
    >
      {children}
    </NavLink>
  );
}
