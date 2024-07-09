import DoctorImageSvg from "../../../assets/doctor-image.svg?react";
import ArrowRightSvg from "../../../assets/arrow-right.svg?react";
const BookAppointmentBanner = () => {
  return (
    <div className="flex w-full flex-col items-center justify-between rounded-[30px] border-[1.8px] bg-gradient-to-l from-[#FFFDF7] to-[#FFF7E2] px-6 py-4 md:flex-row">
      <div className="mb-4 flex w-full flex-col items-center justify-between gap-2 md:mb-0 md:flex-row xl:px-[2rem]">
        <DoctorImageSvg className="mr-4 size-[134px] rounded-full md:h-32 md:w-32" />
        <div className="flex flex-col items-center gap-[15px]">
          <h2 className="font-nunito text-2xl font-bold md:text-[35px]">
            Book an appointment
          </h2>
          <p className="text-center text-[14px] text-[#5B5B5B] sm:text-start">
            Schedule your next appointment with our experts
          </p>
        </div>
        <button className="font-nunito mt-5 flex items-center justify-center gap-4 whitespace-nowrap rounded-xl border-[1.8px] border-[#3A643B] bg-white px-3 py-2.5 text-lg font-bold capitalize tracking-[-0.01em] text-[#3A643B] md:mt-0 xl:w-[214px] xl:text-[20px]">
          Book Now
          <ArrowRightSvg className="h-5 w-5 fill-[#3a643b] xl:w-7" />
        </button>
      </div>
    </div>
  );
};

export default BookAppointmentBanner;
