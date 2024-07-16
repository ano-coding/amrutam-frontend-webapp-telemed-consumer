import BookAppointmentBanner from "../features/Appointments/components/BookAppointmentBanner";
import AppointmentSvg from "../assets/appointment.svg?react";
import BandageSvg from "../assets/bandage.svg?react";
import CalenderSvg from "../assets/calender.svg?react";
import VideoSvg from "../assets/video.svg?react";
import MessageSvg from "../assets/message.svg?react";
import EditSvg from "../assets/edit.svg?react";
import useGetUpcomingAppointments from "../hooks/useGetUpcomingAppointments";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { calculateDuration, formatDateWithWeek } from "../helper/helper";

const ConsumerDashboard = () => {
  const { userId, token } = useContext(UserContext);
  const { data, error, isLoading } = useGetUpcomingAppointments(userId, token);

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    if (
      error.response.data.message ===
      "No upcoming appointments found for the patient"
    )
      return (
        <div className="text-center">
          No upcoming appointments found for the patient
        </div>
      );
    return <div>Error...</div>;
  }
  const appointments = data?.data ?? {};

  console.log(appointments);

  return (
    <div className="flex flex-col gap-[37px] pt-4">
      <BookAppointmentBanner />
      <div className="flex w-full flex-col items-center justify-center rounded-[30px] border-[1.8px] border-[#ebe8e8]">
        <div className="w-full rounded-t-[30px] border-b-[1.7px] border-[#9db39e]/50 bg-[#F7FCFA] py-4 pl-5 pr-5 font-nunito text-[24px] font-bold capitalize leading-[140%] text-[#3a643b] sm:py-3 sm:pl-9">
          <div className="mt-1 flex items-center gap-2">
            <span>Upcoming Appointments</span>
            <div className="flex items-center justify-center rounded-full border-[1px] border-solid border-[#D3E4D6] bg-white p-3">
              <AppointmentSvg />
            </div>
          </div>
        </div>
        <div className="flex w-[95%] flex-col gap-[18px] py-[42px] sm:w-11/12 lg:w-10/12">
          {appointments.map((appointment) => (
            <div
              key={appointment.appointmentId}
              className="flex flex-col items-center justify-between gap-5 rounded-[30px] border-[1px] border-solid border-[#dcdcdc] px-5 py-[17px] sm:px-[33px] md:flex-row lg:flex-col xl:flex-row"
            >
              <div className="flex flex-1 flex-col gap-[6px]">
                <div className="flex items-center gap-3 sm:gap-x-[18px]">
                  <img
                    className="h-[142px] w-[105px] rounded-[15px] object-cover sm:w-[122px]"
                    src={appointment?.doctor?.photo ?? "/doctor-dummy.jpg"}
                  />

                  <div className="flex flex-col">
                    <div className="mb-2 font-nunito text-lg font-bold leading-[28px] tracking-[-0.01em] xs:text-[20px] sm:text-[24px]">
                      {`Dr. ${appointment?.doctor?.firstname} ${appointment?.doctor?.lastname}`}
                    </div>
                    <div className="flex flex-col gap-2 font-nunito text-[13px] font-semibold capitalize leading-[20px] text-[#919191] sm:gap-[12px] sm:text-[14px]">
                      <p className="flex items-start gap-2">
                        <BandageSvg className="size-4" />

                        <span>
                          {/* {appointment.doctor.specialities.map((speciality) => (
                          <span key={speciality._id}>{speciality.name},</span>
                        ))} */}

                          <span>
                            {appointment.doctor.specialities.at(0)?.name},
                          </span>
                        </span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CalenderSvg className="size-4" />

                        <span>
                          {`${formatDateWithWeek(appointment.slotBooked.dateBooked)} - ${appointment.slotBooked.fromTiming}`}
                        </span>
                      </p>
                      <p className="flex items-start gap-2">
                        {appointment.consultationType ===
                        "Video consultation" ? (
                          <VideoSvg className="size-4" />
                        ) : (
                          <MessageSvg className="size-4" />
                        )}
                        <div className="block gap-[4px] sm:flex">
                          <div className="whitespace-nowrap capitalize">
                            {`${appointment.slotBooked.appointmentType} Consultation -`}
                          </div>
                          <span>
                            {` ${appointment.slotBooked.amount === "Free" ? "Free" : `${appointment.slotBooked.currency === "USD" ? "$" : "₹"}${appointment.slotBooked.amount}`}`}
                          </span>
                        </div>
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`${appointment.bookingStatus !== "Booked-Paid" ? "bg-[#FFBCBC] text-[#BC0000]" : "bg-[#E2F6ED] text-[#26AF48]"} w-[105px] rounded-[4px] px-2 py-px text-center text-[14px] font-medium capitalize sm:w-[122px]`}
                >
                  {appointment.bookingStatus === "Booked-Paid"
                    ? "Confirmed"
                    : "Unpaid"}
                </div>
              </div>
              <div className="flex w-full flex-col items-center gap-[14px] md:w-[210px] lg:w-[244px]">
                <button className="w-full rounded-lg bg-[#3a643b] px-5 py-[14px] font-nunito text-[16px] font-medium leading-[20px] text-white">
                  {appointment.bookingStatus !== "Booked-Paid"
                    ? "Make Payment"
                    : "Join Appointment"}
                </button>
                <button className="flex w-full items-center justify-center gap-[10px] rounded-lg border-[1px] border-solid border-[#3a643b] px-5 py-[12px] font-nunito text-[16px] font-medium leading-[20px] text-[#3a643b]">
                  <span>Edit</span>
                  <EditSvg />
                </button>

                {appointment.bookingStatus === "Booked-Paid" && (
                  <div className="-mt-1 font-nunito text-[14px] font-semibold text-[#3a643b]">
                    <span>{`Starts in `}</span>
                    <span className="lowercase">
                      {calculateDuration(appointment.slotBooked.dateBooked)}
                    </span>
                  </div>
                )}
                {appointment.bookingStatus !== "Booked-Paid" && (
                  <>
                    <div className="font-nunito text-[16px] font-semibold leading-[20px] text-[#3a643b] [text-decoration:underline]">
                      Cancel Appointment
                    </div>
                    <div className="font-nunito text-[14px] leading-[20px] tracking-[-0.01em] text-[#3a643b]">
                      {`Please make the payment with ${calculateDuration(appointment.slotBooked.dateBooked)}.`}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsumerDashboard;
