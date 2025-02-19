import React, { useState, useRef } from "react";

const AppointmentSelectTimeSlot = ({ onNext }) => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 250, behavior: "smooth" });
  };
  const [selectedDate, setSelectedDate] = useState("Mon, 10 Oct");
  const [selectedTime, setSelectedTime] = useState(null);

  const dates = [
    { date: "Mon, 10 Oct", slots: 10 },
    { date: "Tue, 11 Oct", slots: 2 },
    { date: "Wed, 12 Oct", slots: 0 },
    { date: "Tue, 19 Oct", slots: 2 },
    { date: "Mon, 15 Oct", slots: 10 },
  ];

  const times = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:15 AM",
    "10:30 AM",
    "10:45 AM",
    "11:00 AM",
    "04:00 PM",
    "04:15 PM",
    "04:30 PM",
    "04:45 PM",
    "05:00 PM",
    "05:15 PM",
  ];

  const availableTimes =
    selectedDate === "Mon, 10 Oct"
      ? times
      : selectedDate === "Tue, 11 Oct"
        ? times.slice(0, 2)
        : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext([selectedDate, selectedTime]);
  };
  return (
    <div className="mx-auto w-[100%] space-y-4 rounded-xl bg-white p-4 shadow-md">
      <h2 className="my-5 text-center text-xl font-semibold">
        Pick a time slot
      </h2>

      <div className="relative my-4 flex items-center justify-center rounded-lg border border-[#767676] p-4">
        <button
          onClick={scrollLeft}
          className="absolute left-2 z-10 rounded-full border border-[#e2e2e2] p-1"
          aria-label="Scroll left"
        >
          <span>
            <img
              src="/arrowLeft.svg"
              alt=""
              className="h-[20px] w-[20px] rotate-90"
            />
          </span>
        </button>

        <div
          className="scrollbar-hide flex w-[85%] space-x-2 overflow-x-hidden"
          ref={sliderRef}
        >
          {dates.map((date, index) => (
            <button
              key={index}
              className={`min-w-[150px] rounded-xl p-2 ${selectedDate === date.date ? "border border-[--primary] bg-[#EAF2EA] font-semibold text-[--primary]" : "border border-[#F1F1F1]"} ${date.slots === 0 ? "cursor-not-allowed bg-[#F7F7F7]" : ""}`}
              onClick={() => date.slots > 0 && setSelectedDate(date.date)}
            >
              {date.date}
              <span
                className={`block text-sm font-normal ${date.slots < 5 && date.slots > 0 && "text-[#D5512E]"}`}
              >
                {date.slots} slots available
              </span>
            </button>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-2 z-10 rounded-full border border-[#e2e2e2] p-1"
          aria-label="Scroll right"
        >
          <span>
            <img
              src="/arrowLeft.svg"
              alt=""
              className="h-[20px] w-[20px] rotate-[-90deg]"
            />
          </span>
        </button>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg">Morning</h3>

        <div className="flex flex-wrap items-center justify-start">
          {availableTimes.slice(0, 7).map((time, index) => (
            <button
              key={index}
              className={`m-[8px] rounded-2xl px-2 py-4 ${selectedTime === time ? "bg-[--primary] text-white" : "border border-[#767676] text-gray-600"}`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg">Evening</h3>
        <div className="flex flex-wrap items-center justify-start">
          {availableTimes.slice(7).map((time, index) => (
            <button
              key={index}
              className={`m-[8px] rounded-2xl px-2 py-4 ${selectedTime === time ? "bg-[--primary] text-white" : "border border-[#767676] text-gray-600"}`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
      <button
        className="w-full rounded bg-[--primary] py-2 font-bold text-white"
        onClick={handleSubmit}
      >
        Proceed To Payment
      </button>
    </div>
  );
};

export default AppointmentSelectTimeSlot;
