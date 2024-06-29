import { useContext } from "react";
import { SideBarToggleContext } from "../context/SidebarToggleContext";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, NavLink } from "react-router-dom";
import AppointmentSvg from "../assets/appointment.svg?react";
import ChatSvg from "../assets/chat.svg?react";
import MedicalRecordSvg from "../assets/medical-record.svg?react";
import PaymentSvg from "../assets/payment.svg?react";
import PrescriptionSvg from "../assets/prescription.svg?react";
import ArrowLeftSvg from "../assets/arrow-left.svg?react";
import DashboardSvg from "../assets/dashboard.svg?react";
import CallRecordingsSvg from "../assets/call-recordings.svg?react";
import { calculateAge, formatDate, isNotPhotoUrl } from "../helper/helper";

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

const DashboardSidebar = ({ data }) => {
  const { toggled, setToggled } = useContext(SideBarToggleContext);

  const { dob, state, country, first_name, last_name, photo } =
    data?.data ?? {};

  return (
    <div className="relative ml-0 bg-white lg:ml-10">
      <Sidebar
        customBreakPoint="1024px"
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
        width="300px"
        backgroundColor="#fff"
        rootStyles={{
          border: "2px solid #ECECEC",
          height: "100%",
        }}
      >
        <div className="flex flex-col items-center justify-center gap-[12px] border-b-[3px] border-[#ECECEC] bg-white py-11">
          <Link to="profile">
            <img
              src={isNotPhotoUrl(photo) ? "/avatar-person.svg" : photo}
              alt="Profile Picture"
              className={`h-24 w-24 cursor-pointer rounded-full`}
            />
          </Link>

          <div className="flex flex-col items-center gap-[9px]">
            <Link to="profile">
              <h2 className="cursor-pointer text-[18px] font-semibold text-[#3a643b]">
                {first_name && `${first_name} ${last_name}`}
              </h2>
            </Link>
            <p className="text-[15px] text-[#666]">
              {dob && `${formatDate(dob)}, ${calculateAge(dob)} years`}
            </p>
            <p className="text-[15px] text-[#666]">{`${state || ""}, ${country || ""}`}</p>
          </div>
        </div>

        <Menu closeOnClick={true} className={`w-full bg-white px-6 py-8`}>
          {sidebarItems.map((item) => (
            <MenuItem
              key={item.text}
              component={<MenuComponent setToggled={setToggled} item={item} />}
              icon={
                <div className={`rounded-lg bg-[#f4f5fa] px-2 py-2`}>
                  <item.icon className="size-6" />
                </div>
              }
              className={`w-full items-center justify-center border-b border-gray-200 py-2`}
            >
              <span className="ml-3 text-[18px]">{item.text}</span>
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>
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
