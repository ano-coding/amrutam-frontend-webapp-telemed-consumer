import ClockSvg from "../../../assets/clock.svg?react";
import ChevronRightSvg from "../../../assets/chevron-right.svg?react";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import useGetSingleProductFromStore from "../../../hooks/routines/useGetSingleProductFromStore";

const TodayProductReminders = ({ reminder }) => {
  const { token } = useContext(UserContext);
  const { data: productData } = useGetSingleProductFromStore([
    token,
    reminder?.productId,
  ]);

  return (
    <>
      <div className="flex gap-3">
        <img
          src={productData?.data?.ProductData?.at(0)?.image?.src}
          alt=""
          className="size-[50px] rounded-lg object-cover"
        />

        <div className="flex flex-col gap-[9px]">
          <h3 className="line-clamp-1 overflow-ellipsis text-sm font-medium tracking-[-0.02em] md:text-[16px]">
            {reminder?.name}
          </h3>
          <div className="flex flex-col text-[12px] font-medium capitalize tracking-[-0.02em] text-[#a0a0a0] sm:flex-row sm:items-center sm:gap-4">
            <div>
              {reminder?.productType === "applicationBased"
                ? "Application Based"
                : reminder?.productType}
            </div>
            {reminder?.timeSlotsConsumable?.map((timeSlot) => (
              <div key={timeSlot._id} className="flex items-center gap-1">
                <ClockSvg />
                <span className="text-gray-900">{timeSlot?.time}</span>
              </div>
            ))}
            {reminder?.timeSlotsAppBased?.map((timeSlot) => (
              <div key={timeSlot._id} className="flex items-center gap-1">
                <ClockSvg />
                <span className="text-gray-900">{timeSlot?.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-2.5 sm:gap-5 md:gap-12">
        <span className="whitespace-nowrap text-[15px] font-semibold">
          {reminder?.progress} 🌻
        </span>
        <span className="rounded-lg py-1 text-sm font-semibold">
          <ChevronRightSvg className="size-6" />
        </span>
      </div>
    </>
  );
};

export default TodayProductReminders;
