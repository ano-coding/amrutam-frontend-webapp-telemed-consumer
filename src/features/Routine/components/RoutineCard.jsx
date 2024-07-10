import { CloseButton } from "@headlessui/react";
import RoutinePopOverMenu from "./RoutinePopoverMenu";
import useDeleteRoutine from "../../../hooks/routines/useDeleteRoutine";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { Link } from "react-router-dom";

const RoutineCard = ({ ...routine }) => {
  const {
    image,
    name,
    productReminders,
    activityReminders,
    progress,
    _id: routineId,
  } = routine;
  const { token } = useContext(UserContext);
  const { deleteRoutineMutate, deleteRoutineStatus } = useDeleteRoutine();
  return (
    <div className="relative mx-1 mb-4 w-[auto] rounded-2xl border p-3 sm:p-4 md:mx-2">
      <div className="absolute right-6 top-7">
        <RoutinePopOverMenu
          render={() => (
            <>
              <Link
                to="create"
                state={{
                  routine,
                  isEdit: true,
                }}
              >
                <CloseButton className="flex w-full cursor-pointer items-center justify-start gap-[21px] border-b-[1.5px] border-solid border-[#EDEDED] px-[20px] pb-[11px] pt-[10px] text-base">
                  <span className="cursor-pointer select-none">Edit</span>
                </CloseButton>
              </Link>
              <CloseButton
                onClick={() => {
                  deleteRoutineMutate([routineId, token]);
                }}
                className="flex w-full cursor-pointer items-center justify-start gap-[21px] border-b-[1.5px] border-solid border-[#EDEDED] px-[20px] pb-[11px] pt-[10px] text-base"
              >
                <span className="cursor-pointer select-none">Delete</span>
              </CloseButton>
            </>
          )}
          dotClassNames={"size-5 fill-[#000000]"}
          panelWidth="130px"
        />
      </div>
      <img
        src={image}
        alt={name}
        className="mb-2 aspect-square w-full rounded-xl object-cover"
      />

      <div className="flex w-full items-center justify-between gap-1 font-nunito text-sm font-bold md:text-lg">
        <h4 className="line-clamp-1 overflow-ellipsis">{name}</h4>
        <span className="whitespace-nowrap">{progress} 🌻</span>
      </div>

      <p className="text-xs font-medium text-[#a0a0a0] md:text-base">
        {parseInt(productReminders.length) + parseInt(activityReminders.length)}{" "}
        Reminder Items
      </p>

      <div className="mt-2 flex w-full items-center justify-between">
        <div className="my-1 h-1.5 w-full rounded-full bg-gray-200">
          <div
            className={`h-1.5 rounded-full bg-[#3a643b]`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <span className="text-[10px] font-medium text-[#a0a0a0] sm:text-sm">
        {progress}% Finished
      </span>
    </div>
  );
};

export default RoutineCard;
