import { NavLink } from "react-router-dom";
import BandageSvg from "../../../assets/bandage.svg?react";
import CalenderSvg from "../../../assets/calender.svg?react";
import VideoSvg from "../../../assets/video.svg?react";

const AppointmentCard = ({ doctor, status }) => (
  <div className="flex w-full max-w-[300px] flex-col items-center gap-3 rounded-[24px] border p-4 lg:p-6">
    <img
      className="w-full rounded-xl border-2 p-2"
      src={doctor.image}
      alt={`Dr. ${doctor.name}`}
    />

    <div className="mb-2 text-[20px] font-medium leading-[28px]">
      Dr. {doctor.name}
    </div>
    <div className="flex flex-col gap-2 font-nunito text-[14px] font-semibold capitalize leading-[20px] text-[#919191] md:text-base">
      <p className="flex items-center gap-2">
        <span>
          <BandageSvg className="size-4" />
        </span>
        <span>{doctor.specialty}</span>
      </p>
      <p className="flex items-center gap-2">
        <span>
          <CalenderSvg className="size-4" />
        </span>
        <span>{doctor.date}</span>
      </p>
      <p className="flex items-center gap-2">
        <span>
          <VideoSvg className="size-4" />
        </span>
        <span>
          {doctor.consultationType} - ₹{doctor.fee}
        </span>
      </p>
    </div>
    <div className="mt-2 flex w-[95%] flex-col items-center justify-center gap-3">
      <button
        className={`rounded-lg ${status === "Cancelled" ? "bg-red-200 text-red-500" : "border border-[#3a643b] text-[#3a643b]"} w-full px-4 py-2.5 font-nunito text-base font-semibold leading-[20px]`}
      >
        {status === "Cancelled" ? "Cancelled" : "View Routine"}
      </button>
      <button className="w-full rounded-lg bg-[#3a643b] px-4 py-2.5 font-nunito text-base font-semibold leading-[20px] text-white">
        <NavLink to="/appointment/appointment-booking">Book Appintment</NavLink>
      </button>
    </div>
    <button className="mt-2 w-full text-[13px] font-medium text-[#3a643b] lg:text-base">
      <NavLink to="/appointments/123">View Details </NavLink>
    </button>
  </div>
);

export default AppointmentCard;
