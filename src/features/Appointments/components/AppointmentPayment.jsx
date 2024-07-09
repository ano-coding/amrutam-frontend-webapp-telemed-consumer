const AppointmentPayment = ({ appointmentDetails }) => {
  const handlePayment = () => {};

  return (
    <div className="my-8 w-[90%] space-y-4 rounded-lg border border-[#767676] bg-white p-2 sm:p-8">
      <div className="flex flex-col items-center justify-center rounded-lg bg-[#EAF2EA] p-4 px-1 sm:px-8">
        <h3 className="my-6 border-b border-dotted border-[--primary] text-xl font-bold text-[--primary] sm:text-2xl">
          Appointment Details
        </h3>

        <div className="details my-4 flex w-full items-center justify-between">
          <p className="text-[#646665]">Expert -</p>
          <p>{appointmentDetails.expert}</p>
        </div>
        <div className="details my-4 flex w-full items-center justify-between">
          <p className="text-[#646665]">Appointment Date -</p>
          <p> {appointmentDetails.date}</p>
        </div>
        <div className="details my-4 flex w-full items-center justify-between">
          <p className="text-[#646665]">Appointment Time -</p>
          <p> {appointmentDetails.time}</p>
        </div>
        <div className="details my-4 flex w-full items-center justify-between">
          <p className="text-[#646665]">Consultation Type -</p>
          <p>{appointmentDetails.mode}</p>
        </div>
        <div className="details my-4 flex w-full items-center justify-between">
          <p className="text-[#646665]">Consultation Fee -</p>
          <p>Rs. 699</p>
        </div>
      </div>
      <button
        className="w-full rounded-lg bg-[--primary] p-2 text-white"
        onClick={handlePayment}
      >
        Proceed to Pay
      </button>
    </div>
  );
};

export default AppointmentPayment;
