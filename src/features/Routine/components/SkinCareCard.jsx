import SimpleLineCalendarSvg from "../../../assets/simple-line-calendar.svg?react";
import WorkItemAlertSvg from "../../../assets/work-item-alert.svg?react";
import HeartSvg from "../../../assets/heart.svg?react";
import useCreateLikeReminderList from "../../../hooks/routines/useCreateLikeReminderList";
import useAddUnLikeReminderList from "../../../hooks/routines/useAddUnLikeReminderList";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
const SkinCareCard = ({
  name,
  image,
  duration,
  whatdo,
  productReminders,
  activityReminders,
  likedByCurrentUser,
  _id,
}) => {
  const { token } = useContext(UserContext);
  const { addLikeReminderListMutate, addLikeReminderListStatus } =
    useCreateLikeReminderList();
  const { addUnLikeReminderListMutate, addUnLikeReminderListStatus } =
    useAddUnLikeReminderList();
  return (
    <div className="mt-4 overflow-x-hidden rounded-xl border p-3 shadow-sm sm:p-4">
      <div className="relative w-full">
        <img
          src={image}
          alt={name}
          className="mb-2 aspect-square w-full rounded-xl object-cover"
        />
        <span
          onClick={(e) => {
            e.preventDefault();
            if (likedByCurrentUser) {
              addUnLikeReminderListMutate([token, _id]);
            } else {
              addLikeReminderListMutate([token, _id]);
            }
          }}
          className="absolute right-1.5 top-1.5 rounded-full bg-white p-0.5 sm:right-3 sm:top-3 sm:p-1"
        >
          <HeartSvg
            className={`${likedByCurrentUser ? "fill-red-600 stroke-red-600" : ""}`}
          />
        </span>
      </div>
      <h3 className="text-md line-clamp-1 overflow-ellipsis font-nunito font-bold md:text-lg">
        {name}
      </h3>
      <h3 className="font-nunito text-sm font-bold md:text-lg">{whatdo}</h3>
      <p className="my-2 flex items-center justify-start text-sm text-gray-500">
        <span className="mr-3">
          <SimpleLineCalendarSvg />
        </span>
        {`${duration.number} ${duration.unit}`}
      </p>
      <div className="my-2 flex justify-start text-sm text-gray-500">
        <span className="mr-3">
          <WorkItemAlertSvg className="mt-1" />
        </span>
        <div className="max-w-full overflow-hidden whitespace-nowrap">
          <h1 className="line-clamp-1 block overflow-ellipsis">
            {parseInt(productReminders?.length) +
              parseInt(activityReminders?.length)}{" "}
            reminder items
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SkinCareCard;
