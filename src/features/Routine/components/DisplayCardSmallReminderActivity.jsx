import { Fragment, useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { Link } from "react-router-dom";
import useGetSingleUnit from "../../../hooks/routines/useGetSingleUnit";
import useDeleteActivityReminder from "../../../hooks/routines/useDeleteActivityReminder";
import ConfirmationModal from "./ConfirmationModal";

const DisplayCardSmallReminderActivity = ({ title, tag, reminder }) => {
  const { token } = useContext(UserContext);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const { data: singleUnit } = useGetSingleUnit([token, reminder?.unit]);
  const { deleteActivityReminderMutate, deleteActivityReminderStatus } =
    useDeleteActivityReminder();

  const isDeleting = deleteActivityReminderStatus === "pending";

  return (
    <Fragment>
      <div className="flex gap-3 rounded-2xl border-[1px] border-solid border-neutral-200 px-[10px] py-[10px] hover:shadow-lg hover:shadow-neutral-100 md:w-[380px]">
        <img
          className="h-[100px] w-[100px] rounded-lg object-cover"
          src={`/activity-reminder-default-thumbnail.png`}
        />
        <div className="flex flex-1 flex-col justify-between">
          <span className="line-clamp-1 text-[16px] font-medium leading-[24px] tracking-[0.15px]">
            {title}
          </span>
          <div>
            <span className="rounded-[64px] bg-[#E9F1E0] p-[10px] py-2 text-[14px] capitalize tracking-[-0.02em] text-[#A0A0A0]">
              {tag}
            </span>
          </div>
          <Link
            to="add-reminder"
            state={{
              isEdit: true,
              goalUnitObject: singleUnit,
              reminderType: "activity",
              ...reminder,
            }}
            className="cursor-pointer font-nunito text-[14px] font-bold text-[#3A643B]"
          >
            Edit
          </Link>
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            setConfirmDeleteModal(true);
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="cross-icon">
              <path
                id="icon"
                d="M14.25 4.8075L13.1925 3.75L9 7.9425L4.8075 3.75L3.75 4.8075L7.9425 9L3.75 13.1925L4.8075 14.25L9 10.0575L13.1925 14.25L14.25 13.1925L10.0575 9L14.25 4.8075Z"
                fill="#3A643B"
              />
            </g>
          </svg>
        </div>
      </div>
      <ConfirmationModal
        open={confirmDeleteModal}
        setOpen={setConfirmDeleteModal}
        render={() => (
          <>
            <h1
              className={
                "font-poppins self-start text-2xl font-semibold text-red-700"
              }
            >
              Delete
            </h1>
            <p className="font-poppins text-start text-sm font-medium">
              Are you sure you want to delete this Reminder?{" "}
              <span className="font-semibold tracking-wide">
                This cannot be undone.
              </span>
            </p>
            <div className="flex w-full justify-end gap-6">
              <button
                disabled={isDeleting}
                onClick={() => setConfirmDeleteModal(false)}
                className={`font-poppins font-semibold text-neutral-600 ${
                  isDeleting ? "opacity-55" : ""
                }`}
              >
                Cancel
              </button>
              <button
                disabled={isDeleting}
                onClick={(e) => {
                  e.preventDefault();
                  deleteActivityReminderMutate([token, reminder._id], {
                    onSuccess: () => {
                      setConfirmDeleteModal(false);
                    },
                  });
                }}
                className={`font-poppins font-semibold text-red-700 ${
                  isDeleting ? "opacity-55" : ""
                }`}
              >
                Confirm
              </button>
            </div>
          </>
        )}
      />
    </Fragment>
  );
};

export default DisplayCardSmallReminderActivity;
