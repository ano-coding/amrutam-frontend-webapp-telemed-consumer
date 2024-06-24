import SimpleLineCalendarSvg from "../../../assets/simple-line-calendar.svg?react";
import WorkItemAlertSvg from "../../../assets/work-item-alert.svg?react";
import HeartSvg from "../../../assets/heart.svg?react";
const SkinCareCard = ({ title, image, duration, whatdo, reminders }) => {
  return (
    <div className="mt-4 overflow-x-hidden rounded-xl border p-3 shadow-sm sm:p-4">
      <div className="relative w-full">
        <img
          src={image}
          alt={title}
          className="mb-2 aspect-square w-full rounded-xl object-cover"
        />
        <span className="absolute right-1.5 top-1.5 rounded-full bg-white p-0.5 sm:right-3 sm:top-3 sm:p-1">
          <HeartSvg />
        </span>
      </div>
      <h3 className="text-md line-clamp-1 overflow-ellipsis font-nunito font-bold md:text-lg">
        {title}
      </h3>
      <h3 className="font-nunito text-sm font-bold md:text-lg">{whatdo}</h3>
      <p className="my-2 flex items-center justify-start text-sm text-gray-500">
        <span className="mr-3">
          <SimpleLineCalendarSvg />
        </span>
        {duration}
      </p>
      <div className="my-2 flex justify-start text-sm text-gray-500">
        <span className="mr-3">
          <WorkItemAlertSvg className="mt-1" />
        </span>
        <div className="max-w-full overflow-hidden whitespace-nowrap">
          <h1 className="line-clamp-1 block overflow-ellipsis">
            {reminders} reminder items
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SkinCareCard;
