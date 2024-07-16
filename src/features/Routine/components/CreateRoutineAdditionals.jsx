import { useContext } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import ContentBoxLayout from "../../../components/ContentBoxLayout";
import { UserContext } from "../../../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import useGetSingleRoutine from "../../../hooks/routines/useGetSingleRoutine";
import useGetReminderChannel from "../../../hooks/routines/useGetReminderChannel";
import AddConvenience from "./AddConvenience";
import DisplayCardSmallReminder from "./DisplayCardSmallReminder";
import DisplayCardSmallReminderActivity from "./DisplayCardSmallReminderActivity";

const breadCrumbList = [
  {
    name: "Routines",
    link: "routines",
    isActive: false,
  },
  {
    name: "Create Routines",
    link: "routines/create",
    isActive: true,
  },
];

const REMINDER_CHANNELS = ["SMS", "WhatsApp", "Email"];

const CreateRoutineAdditionals = () => {
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const { data: reminderChannelData } = useGetReminderChannel(token);
  const { state } = useLocation();
  console.log(state);

  const isEdit = state?.isEdit;
  const routineId = state?.routine?._id || state?.data?.id;
  const {
    data: routineData,
    error: routineError,
    isFetching: isRoutineFetching,
  } = useGetSingleRoutine(token, routineId);

  const dataCurrent = routineData?.data;
  return (
    <div className="flex w-full flex-col gap-[37px]">
      <Breadcrumb list={breadCrumbList} />
      <div className="flex w-full flex-col items-center justify-between rounded-[15px] bg-[#FFF7E2] px-5 py-6 md:flex-row lg:px-12 lg:py-8">
        <div className="flex w-full flex-col gap-2">
          <h1 className="font-nunito text-2xl font-bold text-[#3a643b]">
            {`What's a routine?`}
          </h1>

          <p className="rounded-lg text-justify font-light text-[#484848]">
            {`Reminder items could be products or activities that you want to remember to do at specific times or intervals. They help you stay organized and on track with your routine by prompting you when it's time to complete a particular task.`}
          </p>
        </div>
      </div>
      <ContentBoxLayout title={`${isEdit ? "Update" : `Create`} Routine`}>
        <div className="mt-5 grid w-full grid-cols-2 items-center gap-8 px-6 sm:px-10">
          <div className={`h-[5px] w-full rounded bg-[#3A643B]`} />
          <div className={`h-[5px] w-full rounded bg-[#3A643B]`} />
        </div>
        <div className="mb-2 flex w-full flex-col gap-10 rounded-xl px-5 py-10 lg:pr-16">
          {/* Form Part 2 */}
          {!isRoutineFetching && (
            <>
              <div className="flex flex-col gap-4">
                <AddConvenience
                  link={"add-reminder"}
                  title="Add Reminder Items"
                  subtitle="Add Items for your Routine"
                  state={dataCurrent}
                />
                <div className="flex flex-col flex-wrap gap-4 sm:flex-row sm:gap-10 md:gap-8">
                  <>
                    {dataCurrent?.productReminders?.map((reminder) => (
                      <DisplayCardSmallReminder
                        key={reminder.id}
                        reminder={reminder}
                        title={reminder.name}
                        shopifyId={reminder.productId}
                        tag={
                          reminder.productType === "consumable"
                            ? "Consumable"
                            : "Application Based"
                        }
                      />
                    ))}
                    {dataCurrent?.activityReminders?.map((reminder) => (
                      <DisplayCardSmallReminderActivity
                        key={reminder.id}
                        reminder={reminder}
                        title={reminder.name}
                        tag={
                          reminder.activityType === "physical"
                            ? "Physical"
                            : reminder.activityType
                        }
                      />
                    ))}
                  </>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <AddConvenience
                  title={`${dataCurrent?.benefits.length ? "Edit" : "Add"} Weekly Benefits`}
                  subtitle="Add weekly benefits of this Routine so that users can tally the progress"
                  link="weekly-benefits"
                  state={dataCurrent}
                />
              </div>
              <div className="flex flex-col gap-4">
                <AddConvenience
                  link="add-reminder-channels"
                  title="Add Reminder Channels"
                  subtitle="We will notify you about your Routine using channels."
                  state={reminderChannelData?.data}
                />
                <div className="ml-10 flex gap-3">
                  {REMINDER_CHANNELS.map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between gap-2 rounded-lg bg-[#3a643b] py-[6px] pl-3 pr-2 text-white"
                    >
                      <span className="text-[14px] font-medium leading-[20px] tracking-[0.1px]">
                        {item}
                      </span>
                      <img className="h-[18px]" src="/cross-icon.svg" />
                    </div>
                  ))}
                </div>
              </div>
              {/*
            <div className="flex flex-col gap-4">
              <AddConvenience
                link="assign-caregiver"
                title="Assign a Caregiver"
                subtitle="We will keep updating caregiver about your Routine."
              />
              <div className="flex flex-col flex-wrap gap-4 sm:flex-row sm:gap-10 md:gap-16">
                <div className="flex gap-2 rounded-2xl border-[1px] border-solid border-neutral-200 px-[10px] py-[10px] hover:shadow-md hover:shadow-neutral-100 md:w-[342px]">
                  <img
                    className="h-[100px] w-[100px] rounded-lg object-cover"
                    src="/person4.png"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <span className="text-[16px] font-medium leading-[24px] tracking-[0.15px]">
                      Pema Leilani
                    </span>
                    <div>
                      <span className="rounded-[64px] bg-[#E9F1E0] p-[10px] text-[14px] tracking-[-0.02em] text-[#A0A0A0]">
                        Personal Contact
                      </span>
                    </div>
                    <span className="font-nunito text-[14px] font-semibold text-[#3a643b]">
                      View Details
                    </span>
                  </div>

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
            </div> */}
            </>
          )}
          <div className="flex w-full items-center justify-center gap-3 sm:gap-6">
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate(-1, { relative: "path" });
              }}
              className={`my-10 box-border rounded-xl border-2 border-[#3A643B] px-5 py-[17px] text-center text-base font-semibold text-[#3A643B] shadow-sm duration-100 hover:bg-[#f4f4f4] active:scale-95 sm:w-[15rem] lg:w-[20rem] xl:w-[23.4rem]`}
            >
              Cancel
            </button>
            <button
              onClick={() => navigate("/routines")}
              className="my-10 box-border rounded-xl bg-[#3a643b] px-16 py-[17px] text-center text-base font-semibold text-white shadow-[0px_4px_14px_rgba(58,_100,_59,_0.25)] duration-100 hover:bg-[#618a61] active:scale-95 md:w-[23.4rem]"
            >
              Proceed
            </button>
          </div>
        </div>
      </ContentBoxLayout>
    </div>
  );
};

export default CreateRoutineAdditionals;
