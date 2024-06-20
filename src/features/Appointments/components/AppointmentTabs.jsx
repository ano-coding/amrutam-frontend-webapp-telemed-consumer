import { useState } from "react";
import AppointmentCard from "./AppointmentCard";

const doctors = [
  {
    name: "Prerna Narang",
    specialty: "Gynecologist",
    date: "Wed 28th Feb, 9:30 AM",
    consultationType: "Video consultation",
    fee: "800",
    image: "/user-default.png",
  },
  {
    name: "Prerna Narang",
    specialty: "Gynecologist",
    date: "Wed 28th Feb, 9:30 AM",
    consultationType: "Video consultation",
    fee: "800",
    image: "/user-default.png",
  },
  {
    name: "Prerna Narang",
    specialty: "Gynecologist",
    date: "Wed 28th Feb, 9:30 AM",
    consultationType: "Video consultation",
    fee: "800",
    image: "/user-default.png",
  },
];

const tabs = [
  {
    id: 0,
    name: "Upcoming Appointments",
    content: doctors,
  },
  {
    id: 1,
    name: "Past Appointments",
    content: doctors,
  },
];

const AppointmentTabs = () => {
  const [tab, setTab] = useState(0);

  return (
    <div className="flex w-full flex-col items-center justify-center rounded-[30px] border-[1.8px] border-[#ebe8e8]">
      <div className="mb-4 flex w-full justify-evenly gap-6 rounded-t-[30px] border-b-[1.7px] border-[#9db39e]/50 bg-[#F7FCFA] px-2 pt-1 sm:gap-1 sm:pt-4">
        {tabs.map((tabItem) => (
          <button
            key={tabItem.name}
            className={`relative py-3 font-nunito text-lg font-bold capitalize leading-[140%] tracking-tight sm:text-[24px] ${tab === tabItem.id ? "text-[#3a643b]" : "text-[#747474]"}`}
            onClick={() => setTab(tabItem.id)}
          >
            {`${tabItem.name} (${tabItem.content.length})`}
            {tab === tabItem.id && (
              <span className="absolute mt-2.5 block h-0.5 w-full rounded-full bg-[#3a643b] sm:h-1"></span>
            )}
          </button>
        ))}
      </div>

      <div className="mb-10 mt-5 grid w-full grid-cols-1 gap-2 px-2 md:grid-cols-2 lg:grid-cols-3">
        {tabs.at(tab).content.map((doctor, index) => (
          <div key={index} className="flex items-center justify-center">
            <AppointmentCard
              doctor={doctor}
              status={index === 1 ? "Cancelled" : ""}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentTabs;
