import { Fragment, useContext, useState } from "react";
import BandageSvg from "../../../assets/bandage.svg?react";
import CalenderSvg from "../../../assets/calender.svg?react";
import VideoSvg from "../../../assets/video.svg?react";
import MessageSvg from "../../../assets/message.svg?react";
import EditSvg from "../../../assets/edit.svg?react";
import useGetUpcomingAppointments from "../../../hooks/useGetUpcomingAppointments";
import { UserContext } from "../../../context/UserContext";
import { calculateDuration, formatDateWithWeek } from "../../../helper/helper";

const appointmentsStatic = [
  {
    slotBooked: {
      appointmentType: "chat",
      dateBooked: "2024-07-04T00:00:00.000Z",
      day: "Thursday",
      fromTiming: "5:57 PM",
      consultDuration: 30,
      amount: 9,
      currency: "USD",
    },
    payment: {
      channel: "Razorpay",
      refId: "order_OQqGAg8WiRo8jf",
      amount: 900,
    },
    cancelled: {
      status: true,
      reason: "No payment",
      cancelledBy: "patient",
      cancelledAt: "2024-06-25T03:19:16.790Z",
    },
    reschedule: {
      status: false,
      rescheduledAt: null,
    },
    _id: "665dc65742bb3c160f18dd4f",
    doctor: {
      _id: "65eac0a7cd28590235ad12d0",
      specialities: [
        {
          _id: "65e61d084967d101bbbdcbd4",
          name: "Stree Roga Chikitsa (Gynecology)",
        },
        {
          _id: "65f68bffbce3ebc8814a563f",
          name: "Twak Chikitsa (Dermatology)",
        },
        {
          _id: "65e61ca54967d101bbbdcbb0",
          name: "Balachikitsa (Ayurvedic Pediatrics) new",
        },
      ],
      firstname: "Mohd.",
      lastname: "Khateeb",
      timezone: "Asia/Calcutta",
      photo:
        "https://amstorage2024.blob.core.windows.net/amrutam-dev-storage/1716792734572-myphoto.jpg",
    },
    patient: "6602ad6887fdf972034737e6",
    coupon: null,
    slot: "664c517b82f45439bf5e37ce",
    bookedBy: "admin",
    source: "web",
    appointmentType: "chat",
    bookingStatus: "Booked-Paid",
    symptoms: [
      {
        concern: "Headache",
        description: "Pains at night",
        severity: "Very bad",
        duration: "2 weeks",
        _id: "665dc65742bb3c160f18dd50",
      },
    ],
    sleepPattern: "Once a day",
    medicalFiles: ["https://www.google.com"],
    updatedAt: null,
    deletedAt: null,
    createdAt: "2024-06-03T13:34:15.201Z",
    appointmentId: "APPLC05241",
    __v: 0,
    hasRoutine: false,
    id: "665dc65742bb3c160f18dd4f",
  },
  {
    slotBooked: {
      appointmentType: "chat",
      dateBooked: "2024-06-30T00:00:00.000Z",
      day: "Sunday",
      fromTiming: "12:35 AM",
      consultDuration: 30,
      amount: 9,
      currency: "USD",
    },
    payment: {
      channel: "Razorpay | Webhook",
      method: "Razorpay",
      refId: "PAY-5410158140",
      amount: 9,
    },
    cancelled: {
      status: false,
      cancelledAt: null,
    },
    reschedule: {
      status: false,
      rescheduledAt: null,
    },
    _id: "66718fb39942765c2f81dcb2",
    doctor: {
      _id: "65eac0a7cd28590235ad12d0",
      specialities: [
        {
          _id: "65e61d084967d101bbbdcbd4",
          name: "Stree Roga Chikitsa (Gynecology)",
        },
        {
          _id: "65f68bffbce3ebc8814a563f",
          name: "Twak Chikitsa (Dermatology)",
        },
        {
          _id: "65e61ca54967d101bbbdcbb0",
          name: "Balachikitsa (Ayurvedic Pediatrics) new",
        },
      ],
      firstname: "Mohd.",
      lastname: "Khateeb",
      timezone: "Asia/Calcutta",
      photo:
        "https://amstorage2024.blob.core.windows.net/amrutam-dev-storage/1716792734572-myphoto.jpg",
    },
    patient: "6602ad6887fdf972034737e6",
    coupon: "665abc7fc69b0a48d0a94242",
    slot: "665003401cbf1dd61cf6ba03",
    bookedBy: "admin",
    source: "web",
    appointmentType: "chat",
    bookingStatus: "Booked-Paid",
    symptoms: [
      {
        concern: "Headache",
        description: "Pains at night",
        severity: "Very bad",
        duration: "2 weeks",
        _id: "66718fb39942765c2f81dcb3",
      },
    ],
    sleepPattern: "Once a day",
    medicalFiles: ["https://www.google.com"],
    updatedAt: null,
    deletedAt: null,
    hasRoutine: false,
    createdAt: "2024-06-18T13:46:27.447Z",
    appointmentId: "APPLC05241658",
    __v: 0,
    id: "66718fb39942765c2f81dcb2",
  },
  {
    slotBooked: {
      appointmentType: "chat",
      dateBooked: "2024-06-30T00:00:00.000Z",
      day: "Sunday",
      fromTiming: "1:10 AM",
      consultDuration: 30,
      amount: 9,
      currency: "USD",
    },
    payment: {
      channel: "Razorpay | Webhook",
      method: "Razorpay",
      refId: "6671957ffcd05e4a8c678e95",
      amount: 9,
    },
    cancelled: {
      status: false,
      cancelledAt: null,
    },
    reschedule: {
      status: false,
      rescheduledAt: null,
    },
    _id: "6671957ffcd05e4a8c678e95",
    doctor: {
      _id: "65eac0a7cd28590235ad12d0",
      specialities: [
        {
          _id: "65e61d084967d101bbbdcbd4",
          name: "Stree Roga Chikitsa (Gynecology)",
        },
        {
          _id: "65f68bffbce3ebc8814a563f",
          name: "Twak Chikitsa (Dermatology)",
        },
        {
          _id: "65e61ca54967d101bbbdcbb0",
          name: "Balachikitsa (Ayurvedic Pediatrics) new",
        },
      ],
      firstname: "Mohd.",
      lastname: "Khateeb",
      timezone: "Asia/Calcutta",
      photo:
        "https://amstorage2024.blob.core.windows.net/amrutam-dev-storage/1716792734572-myphoto.jpg",
    },
    patient: "6602ad6887fdf972034737e6",
    coupon: "665abc7fc69b0a48d0a94242",
    slot: "665003401cbf1dd61cf6ba03",
    bookedBy: "admin",
    source: "web",
    appointmentType: "chat",
    bookingStatus: "Booked-Paid",
    symptoms: [
      {
        concern: "Headache",
        description: "Pains at night",
        severity: "Very bad",
        duration: "2 weeks",
        _id: "6671957ffcd05e4a8c678e96",
      },
    ],
    sleepPattern: "Once a day",
    medicalFiles: ["https://www.google.com"],
    updatedAt: null,
    deletedAt: null,
    hasRoutine: false,
    createdAt: "2024-06-18T14:11:11.135Z",
    appointmentId: "APPLC05249333",
    __v: 0,
    id: "6671957ffcd05e4a8c678e95",
  },
  {
    slotBooked: {
      appointmentType: "chat",
      dateBooked: "2024-06-30T00:00:00.000Z",
      day: "Sunday",
      fromTiming: "1:45 AM",
      consultDuration: 30,
      amount: 9,
      currency: "USD",
    },
    payment: {
      channel: "Razorpay | Webhook",
      method: "Razorpay",
      refId: "PAY-5530483124",
      amount: 9,
    },
    cancelled: {
      status: false,
      cancelledAt: null,
    },
    reschedule: {
      status: false,
      rescheduledAt: null,
    },
    _id: "6672142ad58a926deda3e1e6",
    doctor: {
      _id: "65eac0a7cd28590235ad12d0",
      specialities: [
        {
          _id: "65e61d084967d101bbbdcbd4",
          name: "Stree Roga Chikitsa (Gynecology)",
        },
        {
          _id: "65f68bffbce3ebc8814a563f",
          name: "Twak Chikitsa (Dermatology)",
        },
        {
          _id: "65e61ca54967d101bbbdcbb0",
          name: "Balachikitsa (Ayurvedic Pediatrics) new",
        },
      ],
      firstname: "Mohd.",
      lastname: "Khateeb",
      timezone: "Asia/Calcutta",
      photo:
        "https://amstorage2024.blob.core.windows.net/amrutam-dev-storage/1716792734572-myphoto.jpg",
    },
    patient: "6602ad6887fdf972034737e6",
    coupon: "665abc7fc69b0a48d0a94242",
    slot: "665003401cbf1dd61cf6ba03",
    bookedBy: "admin",
    source: "web",
    appointmentType: "chat",
    bookingStatus: "Booked-Paid",
    symptoms: [
      {
        concern: "Headache",
        description: "Pains at night",
        severity: "Very bad",
        duration: "2 weeks",
        _id: "6672142ad58a926deda3e1e7",
      },
    ],
    sleepPattern: "Once a day",
    medicalFiles: ["https://www.google.com"],
    updatedAt: null,
    deletedAt: null,
    hasRoutine: false,
    createdAt: "2024-06-18T23:11:38.455Z",
    appointmentId: "APPLC05241291",
    __v: 0,
    id: "6672142ad58a926deda3e1e6",
  },
  {
    slotBooked: {
      appointmentType: "chat",
      dateBooked: "2024-06-30T00:00:00.000Z",
      day: "Sunday",
      fromTiming: "2:20 AM",
      consultDuration: 30,
      amount: 900,
      currency: "INR",
    },
    payment: {
      channel: "Razorpay | Webhook",
      method: "Razorpay",
      refId: "6672bde188dc62e7545e5ae0",
      amount: 900,
    },
    cancelled: {
      status: false,
      cancelledAt: null,
    },
    reschedule: {
      status: false,
      rescheduledAt: null,
    },
    _id: "6672bde188dc62e7545e5ae0",
    doctor: {
      _id: "65eac0a7cd28590235ad12d0",
      specialities: [
        {
          _id: "65e61d084967d101bbbdcbd4",
          name: "Stree Roga Chikitsa (Gynecology)",
        },
        {
          _id: "65f68bffbce3ebc8814a563f",
          name: "Twak Chikitsa (Dermatology)",
        },
        {
          _id: "65e61ca54967d101bbbdcbb0",
          name: "Balachikitsa (Ayurvedic Pediatrics) new",
        },
      ],
      firstname: "Mohd.",
      lastname: "Khateeb",
      timezone: "Asia/Calcutta",
      photo:
        "https://amstorage2024.blob.core.windows.net/amrutam-dev-storage/1716792734572-myphoto.jpg",
    },
    patient: "6602ad6887fdf972034737e6",
    coupon: "6666e9a056ebdf8766c196a6",
    slot: "665003401cbf1dd61cf6ba03",
    bookedBy: "admin",
    source: "web",
    appointmentType: "chat",
    bookingStatus: "Booked-Paid",
    symptoms: [
      {
        concern: "Headache",
        description: "Pains at night",
        severity: "Very bad",
        duration: "2 weeks",
        _id: "6672bde188dc62e7545e5ae1",
      },
    ],
    sleepPattern: "Once a day",
    medicalFiles: ["https://www.google.com"],
    updatedAt: null,
    deletedAt: null,
    hasRoutine: false,
    createdAt: "2024-06-19T11:15:45.947Z",
    appointmentId: "APPLC05247650",
    __v: 0,
    id: "6672bde188dc62e7545e5ae0",
  },
];

const AppointmentTabs = () => {
  const [tab, setTab] = useState(0);
  const { userId, token } = useContext(UserContext);
  const { data, error, isLoading } = useGetUpcomingAppointments(userId, token);

  if (isLoading) return <div>Loading...</div>;
  // const appointments = data?.data ?? {};
  const appointments = appointmentsStatic;

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

  console.log(appointments);

  const tabs = [
    {
      id: 0,
      name: "Upcoming",
      content: appointments,
    },
    {
      id: 1,
      name: "Past",
      content: appointments,
    },
  ];

  return (
    <div className="flex w-full flex-col items-center justify-center rounded-[30px] border-[1.8px] border-[#ebe8e8]">
      <div className="mb-4 flex w-full justify-evenly gap-6 rounded-t-[30px] border-b-[1.7px] border-[#9db39e]/50 bg-[#F7FCFA] px-2 pt-1 sm:gap-1 sm:pt-4">
        {tabs.map((tabItem) => (
          <Fragment key={tabItem.name}>
            <button
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
          </Fragment>
        ))}
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
                      {appointment.consultationType === "Video consultation" ? (
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
  );
};

export default AppointmentTabs;
