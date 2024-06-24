import { useState } from "react";
import BandageSvg from "../../../assets/bandage.svg?react";
import CalenderSvg from "../../../assets/calender.svg?react";
import VideoSvg from "../../../assets/video.svg?react";
import MessageSvg from "../../../assets/message.svg?react";
import EditSvg from "../../../assets/edit.svg?react";

const doctors = [
  {
    id: 1,
    name: "Prerna Narang",
    specialty: "Gynecologist",
    date: "Wed 28th Feb, 9:30 AM",
    consultationType: "Video consultation",
    fee: "800",
    image: "/user-default.png",
    status: "Confirmed",
  },
  {
    id: 2,
    name: "Vikas Jain",
    specialty: "dermatologist",
    date: "Wed 28th Feb, 9:30 AM",
    consultationType: "Chat consultation",
    fee: "Free",
    image: "/user-default-2.png",
    status: "unpaid",
  },
  {
    id: 3,
    name: "Prerna Narang",
    specialty: "Gynecologist",
    date: "Wed 28th Feb, 9:30 AM",
    consultationType: "Video consultation",
    fee: "800",
    image: "/user-default.png",
    status: "Confirmed",
  },
];

const tabs = [
  {
    id: 0,
    name: "Upcoming",
    content: doctors,
  },
  {
    id: 1,
    name: "Past",
    content: doctors,
  },
];

const AppointmentTabs = () => {
  const [tab, setTab] = useState(0);

  return (
    <div className="flex w-full flex-col items-center justify-center rounded-[30px] border-[1.8px] border-[#ebe8e8]">
      <div className="mb-4 flex w-full justify-evenly gap-6 rounded-t-[30px] border-b-[1.7px] border-[#9db39e]/50 bg-[#F7FCFA] px-2 pt-1 sm:gap-1 sm:pt-4">
        {tabs.map((tabItem) => (
          <>
            <button
              key={tabItem.name}
              className={`relative hidden py-3 font-nunito text-lg font-bold capitalize leading-[140%] tracking-tight sm:text-[24px] md:block ${tab === tabItem.id ? "text-[#3a643b]" : "text-[#747474]"}`}
              onClick={() => setTab(tabItem.id)}
            >
              {`${tabItem.name} Appointments (${tabItem.content.length})`}
              {tab === tabItem.id && (
                <span className="absolute mt-2.5 block h-0.5 w-full rounded-full bg-[#3a643b] sm:h-1"></span>
              )}
            </button>
            <button
              key={tabItem.name}
              className={`relative block py-3 font-nunito text-lg font-bold capitalize leading-[140%] tracking-tight sm:text-[24px] md:hidden ${tab === tabItem.id ? "text-[#3a643b]" : "text-[#747474]"}`}
              onClick={() => setTab(tabItem.id)}
            >
              <div>
                <div>{tabItem.name}</div>
                <div>{`Appointments (${tabItem.content.length})`}</div>
              </div>
              {tab === tabItem.id && (
                <span className="absolute mt-2.5 block h-0.5 w-full rounded-full bg-[#3a643b] sm:h-1"></span>
              )}
            </button>
          </>
        ))}
      </div>

      <div className="flex w-[95%] flex-col gap-[18px] py-[42px] sm:w-11/12 lg:w-10/12">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="flex flex-col items-center justify-between gap-5 rounded-[30px] border-[1px] border-solid border-[#dcdcdc] px-5 py-[17px] sm:px-[33px] md:flex-row lg:flex-col xl:flex-row"
          >
            <div className="flex flex-1 flex-col gap-[6px]">
              <div className="flex items-center gap-3 sm:gap-x-[18px]">
                <img
                  className="h-[142px] w-[105px] rounded-[15px] object-cover sm:w-[122px]"
                  src={doctor.image}
                />

                <div className="flex flex-col">
                  <div className="mb-2 font-nunito text-lg font-bold leading-[28px] tracking-[-0.01em] xs:text-[20px] sm:text-[24px]">
                    Dr. {doctor.name}
                  </div>
                  <div className="flex flex-col gap-2 font-nunito text-[13px] font-semibold capitalize leading-[20px] text-[#919191] sm:gap-[12px] sm:text-[14px]">
                    <p className="flex items-start gap-2">
                      <BandageSvg className="size-4" />

                      <span>{doctor.specialty}</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CalenderSvg className="size-4" />

                      <span>{doctor.date}</span>
                    </p>
                    <p className="flex items-start gap-2">
                      {doctor.consultationType === "Video consultation" ? (
                        <VideoSvg className="size-4" />
                      ) : (
                        <MessageSvg className="size-4" />
                      )}
                      <div className="block gap-[4px] sm:flex">
                        <div className="whitespace-nowrap">
                          {`${doctor.consultationType} -`}
                        </div>
                        <span>
                          {` ${doctor.fee === "Free" ? "Free" : `₹${doctor.fee}`}`}
                        </span>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`${doctor.status === "unpaid" ? "bg-[#FFBCBC] text-[#BC0000]" : "bg-[#E2F6ED] text-[#26AF48]"} w-[105px] rounded-[4px] px-2 py-px text-center text-[14px] font-medium capitalize sm:w-[122px]`}
              >
                {doctor.status}
              </div>
            </div>
            <div className="flex w-full flex-col items-center gap-[14px] md:w-[210px] lg:w-[244px]">
              <button className="w-full rounded-lg bg-[#3a643b] px-5 py-[14px] font-nunito text-[16px] font-medium leading-[20px] text-white">
                {doctor.status === "unpaid"
                  ? "Make Payment"
                  : "Join Appointment"}
              </button>
              <button className="flex w-full items-center justify-center gap-[10px] rounded-lg border-[1px] border-solid border-[#3a643b] px-5 py-[12px] font-nunito text-[16px] font-medium leading-[20px] text-[#3a643b]">
                <span>Edit</span>
                <EditSvg />
              </button>

              {doctor.status === "Confirmed" && (
                <div className="-mt-1 font-nunito text-[14px] font-semibold text-[#3a643b]">
                  <span>{`Starts in `}</span>
                  <span className="lowercase">3 Hours 10 mins</span>
                </div>
              )}
              {doctor.status === "unpaid" && (
                <>
                  <div className="font-nunito text-[16px] font-semibold leading-[20px] text-[#3a643b] [text-decoration:underline]">
                    Cancel Appointment
                  </div>
                  <div className="font-nunito text-[14px] leading-[20px] tracking-[-0.01em] text-[#3a643b]">
                    Please make the payment with 1 Hour.
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentTabs;
