import { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import ContentBoxLayout from "../../../components/ContentBoxLayout";
import RoutineCard from "./RoutineCard";
import ExploreNowCard from "./ExploreNowCard";
import SkinCareCard from "./SkinCareCard";
import ClockSvg from "../../../assets/clock.svg?react";
import ChevronRightSvg from "../../../assets/chevron-right.svg?react";
import CreateRoutinePopup from "./CreateRoutinePopup";

const breadCrumbList = [
  {
    name: "Routines",
    link: "routines",
    isActive: true,
  },
];

const todayRoutines = [
  {
    image: "./drinking-water.png",
    title: "Drinking Water",
    type: "Consumable",
    time: "09:30 AM",
    progress: 8,
  },
  {
    image: "./kuntal-care-hair-spa.png",
    title: "Amrutam Kuntal Care Hair Spa",
    type: "Application Based",
    time: "09:30 AM",
    progress: 14,
  },
];

const myRoutines = [
  {
    image: "/mountain.jpg",
    title: "Focus & Work",
    reminders: 3,
    progress: 80,
    finished: true,
  },
  {
    image: "/two-lady.jpg",
    title: "Skin Care Routine",
    reminders: 3,
    progress: 40,
    finished: false,
  },
  {
    image: "/mountain.jpg",
    title: "Focus & Work",
    reminders: 3,
    progress: 80,
    finished: true,
  },
  {
    image: "/two-lady.jpg",
    title: "Skin Care Routine",
    reminders: 3,
    progress: 40,
    finished: false,
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
          <h2 className="px-5 text-[18px] font-medium tracking-[-0.02em] xl:px-9">{`Today's Routines`}</h2>
          <p className="mt-1 px-5 font-nunito text-base font-medium tracking-[-0.02em] text-[#A0A0A0] xl:px-9">
            You have 4 Routines remaining for the day
          </p>
          {todayRoutines.map((routine, index) => (
            <div
              key={index}
              className={`flex items-center justify-between gap-5 ${todayRoutines.length > index + 1 ? `border-b` : ""} px-5 py-7 xl:px-9`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={routine.image}
                  alt=""
                  className="size-[50px] rounded-lg object-cover"
                />

                <div className="flex flex-col gap-[9px]">
                  <h3 className="line-clamp-1 overflow-ellipsis text-sm font-medium tracking-[-0.02em] md:text-[16px]">
                    {routine.title}
                  </h3>
                  <div className="flex flex-col text-[12px] font-medium tracking-[-0.02em] text-[#a0a0a0] sm:flex-row sm:items-center sm:gap-4">
                    <div>{routine.type}</div>
                    <div className="flex items-center gap-1">
                      <ClockSvg />
                      <span className="text-gray-900">{routine.time}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center gap-2.5 sm:gap-5 md:gap-12">
                <span className="whitespace-nowrap text-[15px] font-semibold">
                  {routine.progress} 🌻
                </span>
                <span className="rounded-lg py-1 text-sm font-semibold">
                  <ChevronRightSvg className="size-6" />
                </span>
              </div>
            </div>
          ))}
          <p className="flex w-full cursor-pointer items-center justify-between px-5 text-[14px] font-medium tracking-[-0.02em] text-[#a0a0a0] xl:px-9">
            <span>More Routines (2)</span>
            <span>
              <ChevronRightSvg className="size-6 rotate-90 text-black" />
            </span>
          </p>
        </div>

        <div className="w-full px-5 pt-7 xl:px-9">
          <h2 className="mb-4 text-[18px] font-medium tracking-[-0.02em]">
            My Routine
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {myRoutines.map((routine, index) => (
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

          <div className="mb-6 flex flex-wrap gap-2 md:gap-4">
            {filters.map((filter) => (
              <button
                onClick={() => setSelectedFilter(filter.name)}
                key={filter.name}
                className={`rounded-xl border-[1.5px] border-solid px-4 py-2 text-[14px] font-medium ${selectedFilter === filter.name ? `border-[#3a643b] bg-[#E7F5E7] text-[#3a643b]` : `border-[#D1D1D1] text-[#8e8e8e]`}`}
              >
                {filter.name}
              </button>
            ))}
          </div>

          <div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
            {exploreNow.map((card, index) => (
              <ExploreNowCard key={index} {...card} />
            ))}
          </div>

          <div className="mb-10 grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
            {skinCare.map((card, index) => (
              <SkinCareCard key={index} {...card} />
            ))}
          </div>
        </div>
      </ContentBoxLayout>
    </div>
  );
};

export default RoutineDashboard;
