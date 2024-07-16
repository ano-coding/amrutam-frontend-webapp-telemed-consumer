import ContentBoxLayout from "../../../components/ContentBoxLayout";
import BookAppointmentBanner from "./BookAppointmentBanner";
import SearchBar from "./SearchBar";
const AppointmentDetails = () => {
  return (
    <div className="flex flex-col gap-[37px] pt-4">
      <BookAppointmentBanner />
      <SearchBar />
      <ContentBoxLayout title="Appointment Detail">
        <div className="flex w-full items-center justify-center">
          <div className="mb-6 flex w-[100%] flex-col items-center gap-5 p-6 sm:flex-row sm:items-start sm:justify-center sm:gap-16">
            <div className="flex flex-col items-center text-center">
              <img
                src="/user-default.png"
                alt="Dr. Prerna Narang"
                className="mb-2 size-32 rounded-full object-cover md:size-[182px]"
              />
              <h3 className="w-full text-[20px] font-medium leading-[28px] tracking-[-0.01em]">
                Dr. Prerna Narang
              </h3>
              <p className="text-[16px] font-medium leading-[28px] tracking-[-0.01em] text-[#7c7c7c]">
                Gynecologist (MBBS, MD)
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/user-default-2.png"
                alt="Sharan Shikhar"
                className="mb-2 size-32 rounded-full object-cover md:size-[182px]"
              />
              <h3 className="text-[20px] font-medium leading-[28px] tracking-[-0.01em]">
                Sharan Shikhar
              </h3>
            </div>
          </div>
        </div>
        <div className="flex w-[100%] flex-col items-center justify-center border-t border-gray-200 p-6">
          <h3 className="mb-2 w-full text-[20px] font-medium leading-[28px] tracking-[-0.01em] text-[#2e2f2e] md:w-[90%]">
            Details
          </h3>
          <div className="content justify- flex w-[100%] flex-col items-center">
            <div className="mt-6 grid w-full grid-cols-2 items-center justify-between gap-6 text-gray-700 md:w-[90%] md:grid-cols-3">
              <div className="col-span-1 flex flex-col items-start justify-center">
                <p className="text-[14px] font-light text-black">
                  Date and Time
                </p>
                <h2 className="text-[16px] font-medium">
                  Mon 15 April 2024, at 5:38 pm
                </h2>
              </div>
              <div className="col-span-1 flex flex-col items-start justify-center">
                <p className="text-[14px] font-light text-black">Booked by</p>
                <p className="text-[16px] font-medium">Admin</p>
              </div>
              <div className="col-span-1 flex flex-col items-start justify-center">
                <p className="text-[14px] font-light text-black">Source</p>
                <p className="text-[16px] font-medium">Web</p>
              </div>
              <div className="col-span-1 flex flex-col items-start justify-center">
                <p className="text-[14px] font-light text-black">
                  Appointment Type
                </p>
                <p className="text-[16px] font-medium">Video Call, 30 min</p>
              </div>
              <div className="col-span-1 flex flex-col items-start justify-center">
                <p className="text-[14px] font-light text-black">
                  Appointment Status
                </p>
                <p className="text-[16px] font-medium">Booked: Unpaid</p>
              </div>
              <div className="col-span-1 flex flex-col items-start justify-center">
                <p className="text-[14px] font-light text-black">Amount</p>
                <p className="text-[16px] font-medium">Rs. 400.00</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-end justify-end md:w-[90%]">
            <button className="rounded-lg bg-[#3a643b] px-5 py-2 text-[16px] font-medium leading-[22.5px] text-white focus:outline-none">
              Pay Now
            </button>
          </div>
        </div>

        <div className="mt-6 flex w-[100%] items-center justify-center border-t border-gray-200 p-6">
          <div className="grid w-full grid-cols-2 gap-4 md:w-[90%] md:grid-cols-3">
            <div>
              <p className="text-[14px] font-light text-black">Description</p>
              <p className="text-[16px] font-medium">Pains at night</p>
            </div>
            <div>
              <p className="text-[14px] font-light text-black">Severity</p>
              <p className="text-[16px] font-medium">Very Bad</p>
            </div>
            <div>
              <p className="text-[14px] font-light text-black">Duration</p>
              <p className="text-[16px] font-medium">2 weeks</p>
            </div>
            <div>
              <p className="text-[14px] font-light text-black">Sleep Pattern</p>
              <p className="text-[16px] font-medium">Once a Day</p>
            </div>
          </div>
        </div>
      </ContentBoxLayout>
    </div>
  );
};

export default AppointmentDetails;
