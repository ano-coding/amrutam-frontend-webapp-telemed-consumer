import { Fragment, useContext, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import ContentBoxLayout from "../../../components/ContentBoxLayout";
import RoutineCard from "./RoutineCard";
import ExploreNowCard from "./ExploreNowCard";
import SkinCareCard from "./SkinCareCard";
import ChevronRightSvg from "../../../assets/chevron-right.svg?react";
import CreateRoutinePopup from "./CreateRoutinePopup";
import { UserContext } from "../../../context/UserContext";
import useGetReminderTemplates from "../../../hooks/routines/useFetchReminderTemplates";
import useGetTodayReminders from "../../../hooks/routines/useGetTodayReminders";
import useGetReminderList from "../../../hooks/routines/useGetReminderList";
import TodayProductReminders from "./TodayProductReminders";
import useGetTodayActivityReminders from "../../../hooks/routines/useGetTodayActivityReminders";
import TodayActivityReminders from "./TodayActivityReminders";

const breadCrumbList = [
  {
    name: "Routines",
    link: "routines",
    isActive: true,
  },
];

const skinCare = [
  {
    image: "/acne-reduction.jpeg",
    title: "Skin Care Routine",
    whatdo: "(Acne Reduction)",
    duration: "12 Weeks",
    weeks: "12",
    reminders: "3",
  },
  {
    image: "/skin-glow.jpeg",
    title: "Skin Care Routine ",
    whatdo: "(Skin Glow)",
    duration: "6 Weeks",
    weeks: "6",
    reminders: "3",
  },
  {
    image: "/acne-reduction.jpeg",
    title: "Skin Care Routine",
    whatdo: "(Acne Reduction)",
    duration: "12 Weeks",
    weeks: "12",
    reminders: "3",
  },
  {
    image: "/skin-glow.jpeg",
    title: "Skin Care Routine ",
    whatdo: "(Skin Glow)",
    duration: "6 Weeks",
    weeks: "6",
    reminders: "3",
  },
];
const exploreNow = [
  {
    image: "./explore-card-lady.png",
    title: "Skin Care Routine",
    subTitle: "Glass Skin",
    exploreLink: "",
  },
  {
    image: "./explore-card-lady.png",
    title: "Skin Care Routine",
    subTitle: "Glass Skin",
    exploreLink: "",
  },
];

const filters = [
  {
    name: "All Routines",
  },
  {
    name: "Created by Dr.",
  },
  {
    name: "Created by me",
  },
  {
    name: "Imported Template",
  },
];

const RoutineDashboard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(filters[0].name);
  const [viewMoreReminder, setViewMoreReminder] = useState(false);
  const [viewMoreActivityReminder, setViewMoreActivityReminder] =
    useState(false);

  const { token } = useContext(UserContext);
  const {
    data: rtData,
    error: rtError,
    isLoading: rtLoading,
  } = useGetReminderTemplates(token);

  const {
    data: gtrData,
    error: gtrError,
    gtrLoading,
  } = useGetTodayReminders(token);
  const {
    data: gtarData,
    error: gtarError,
    gtarLoading,
  } = useGetTodayActivityReminders(token);

  const {
    data: grlData,
    error: grlError,
    isLoading: grlLoading,
  } = useGetReminderList(token);

  const isLoading = rtLoading || gtrLoading || gtarLoading || grlLoading;
  const error = rtError || gtrError || gtarError || grlError;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex w-full flex-col gap-[37px]">
      <CreateRoutinePopup open={isPopupOpen} setOpen={setIsPopupOpen} />
      <Breadcrumb list={breadCrumbList} />
      <div className="flex w-full flex-col items-center justify-between rounded-[15px] bg-[#FFF7E2] px-5 py-6 md:flex-row lg:px-12 lg:py-8">
        <div className="flex w-full flex-col gap-2">
          <h1 className="font-nunito text-2xl font-bold text-[#3a643b]">
            {`What's a routine?`}
          </h1>
          <div className="flex w-full flex-col gap-5 sm:flex-row sm:items-center sm:gap-20">
            <p className="rounded-lg text-justify font-light text-[#484848]">
              Routines are personalized health plans provided by your doctor, or
              created by you including medicines, diet, exercise, and self-care
              habits tailored to your needs.
            </p>
            <button
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#3a643b] px-4 py-2.5 text-white sm:w-[420px]"
              onClick={() => setIsPopupOpen(true)}
            >
              <span className="whitespace-nowrap">Create a routine</span>
              <span className="text-xl">+</span>
            </button>
          </div>
        </div>
      </div>
      <ContentBoxLayout title={"Routines"}>
        <div className="w-full border-b-2 border-slate-200 py-6">
          <h2 className="px-5 text-[18px] font-medium tracking-[-0.02em] xl:px-9">{`Today's Product Reminders`}</h2>
          <p className="mt-1 px-5 font-nunito text-base font-medium tracking-[-0.02em] text-[#A0A0A0] xl:px-9">
            {`You have ${gtrData?.data?.length} Product Reminders remaining for the day`}
          </p>
          {gtrData?.data?.map((reminder, index) => {
            if (!viewMoreReminder && index > 1) return null;
            const showingRoutinesNumber = viewMoreReminder
              ? gtrData?.data?.length
              : 2;
            return (
              <Fragment key={index}>
                <div
                  className={`flex items-center justify-between gap-5 ${showingRoutinesNumber > index + 1 ? `border-b` : ""} px-5 py-7 xl:px-9`}
                >
                  <TodayProductReminders reminder={reminder} />
                </div>
              </Fragment>
            );
          })}
          <p
            onClick={() => setViewMoreReminder((i) => !i)}
            className="flex w-full cursor-pointer items-center justify-between px-5 text-[14px] font-medium tracking-[-0.02em] text-[#a0a0a0] xl:px-9"
          >
            <span>
              {viewMoreReminder
                ? "Show Less Product Reminders"
                : `Show More Product Reminders (${gtrData?.data?.length - 2})`}
            </span>
            <span>
              <ChevronRightSvg
                className={`size-6 ${viewMoreReminder ? "-rotate-90" : `rotate-90`} text-black`}
              />
            </span>
          </p>
        </div>
        <div className="w-full border-b-2 border-slate-200 py-6">
          <h2 className="px-5 text-[18px] font-medium tracking-[-0.02em] xl:px-9">{`Today's Activity Reminders`}</h2>
          <p className="mt-1 px-5 font-nunito text-base font-medium tracking-[-0.02em] text-[#A0A0A0] xl:px-9">
            {`You have ${gtarData?.data?.length} Activity Reminders remaining for the day`}
          </p>
          {gtarData?.data?.map((reminder, index) => {
            if (!viewMoreActivityReminder && index > 1) return null;
            const showingRoutinesNumber = viewMoreReminder
              ? gtarData?.data?.length
              : 2;
            return (
              <Fragment key={index}>
                <div
                  className={`flex items-center justify-between gap-5 ${showingRoutinesNumber > index + 1 ? `border-b` : ""} px-5 py-7 xl:px-9`}
                >
                  <TodayActivityReminders reminder={reminder} />
                </div>
              </Fragment>
            );
          })}
          <p
            onClick={() => setViewMoreActivityReminder((i) => !i)}
            className="flex w-full cursor-pointer items-center justify-between px-5 text-[14px] font-medium tracking-[-0.02em] text-[#a0a0a0] xl:px-9"
          >
            <span>
              {viewMoreActivityReminder
                ? "Show Less Activity Reminders"
                : `Show More Activity Reminders (${gtarData?.data?.length - 2})`}
            </span>
            <span>
              <ChevronRightSvg
                className={`size-6 ${viewMoreActivityReminder ? "-rotate-90" : `rotate-90`} text-black`}
              />
            </span>
          </p>
        </div>

        <div className="w-full px-5 pt-7 xl:px-9">
          <h2 className="mb-4 text-[18px] font-medium tracking-[-0.02em]">
            My Routine
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {grlData?.data?.map((routine, index) => (
              <RoutineCard key={index} {...routine} />
            ))}
          </div>
        </div>
        <div className="w-full px-5 pt-7 xl:px-9">
          <div className="mb-6 flex w-full items-center justify-between">
            <h1 className="text-[18px] font-medium tracking-[-0.02em]">
              Explore
            </h1>
            <button className="text-[14px] font-medium tracking-[-0.02em] text-[#3a643b] hover:underline">
              See More
            </button>
          </div>

          <div className="overflow-hidden">
            <div
              className="mb-4 flex gap-2 overflow-x-auto pb-2 md:gap-4"
              style={{ scrollbarWidth: "none" }}
            >
              {filters.map((filter) => (
                <button
                  onClick={() => setSelectedFilter(filter.name)}
                  key={filter.name}
                  className={`whitespace-nowrap rounded-xl border-[1.5px] border-solid px-4 py-2 text-[14px] font-medium ${selectedFilter === filter.name ? `border-[#3a643b] bg-[#E7F5E7] text-[#3a643b]` : `border-[#D1D1D1] text-[#8e8e8e]`}`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
            {exploreNow.map((card, index) => (
              <ExploreNowCard key={index} {...card} />
            ))}
          </div>

          <div className="mb-10 grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
            {rtData?.data?.map((card) => (
              <SkinCareCard key={card._id} {...card} />
            ))}
          </div>
        </div>
      </ContentBoxLayout>
    </div>
  );
};

export default RoutineDashboard;
