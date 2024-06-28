
const AppointmentPayment = ({ appointmentDetails }) => {
    const handlePayment = () => {
        
    };

    return (
        <div className="space-y-4 bg-white my-8 border border-gray-200 p-2 sm:p-8  w-[90%] rounded-lg">
            <div className="bg-[#EAF2EA] p-4 flex justify-center items-center flex-col rounded-lg px-1 sm:px-8">
                <h3 className="text-xl sm:text-2xl font-bold text-[--primary]  my-6 border-dotted border-b border-[--primary] ">Appointment Details</h3>

                <div className="details flex justify-between items-center w-full my-4">
                    <p className='text-[#646665]'>Expert -</p>
                    <p>{appointmentDetails.expert}</p>
                </div>
                <div className="details flex justify-between items-center w-full my-4">
                    <p className='text-[#646665]'>Appointment Date -</p>
                    <p> {appointmentDetails.date}</p>
                </div>
                <div className="details flex justify-between items-center w-full my-4">
                    <p className='text-[#646665]'>Appointment Time -</p>
                    <p> {appointmentDetails.time}</p>
                </div>
                <div className="details flex justify-between items-center w-full my-4">
                    <p className='text-[#646665]'>Consultation Type  -</p>
                    <p>{appointmentDetails.mode}</p>
                </div>
                <div className="details flex justify-between items-center w-full my-4">
                    <p className='text-[#646665]'>Consultation Fee  -</p>
                    <p>Rs. 699</p>
                </div>

            </div>
                <button className="bg-[--primary] text-white p-2 w-full rounded-lg" onClick={handlePayment}>
                    Proceed to Pay
                </button>
        </div>
    );
};

export default AppointmentPayment;
