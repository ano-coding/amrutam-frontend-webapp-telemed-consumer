import Breadcrumb from "../../../components/Breadcrumb";
import BiQuestionSvg from "../../../assets/bi-question.svg?react";
import TrashSolidSvg from "../../../assets/trash-solid.svg?react";
import ContentBoxLayout from "../../../components/ContentBoxLayout";
import { FormProvider, useForm } from "react-hook-form";
import HookFormDropDown from "./HookFormDropDown";
import AddWeeklyBenefits from "./AddWeeklyBenefits";
import { useLocation } from "react-router-dom";
import useCreateWeeklyBenefits from "../../../hooks/routines/useCreateWeeklyBenefits";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import useUpdateWeeklyBenefit from "../../../hooks/routines/useUpdateWeeklyBenefits";
import useDeleteWeeklyBenefits from "../../../hooks/routines/useDeleteWeeklyBenefits";
const breadCrumbList = [
  {
    name: "Routines",
    link: "routines",
    isActive: false,
  },
  {
    name: "Create Routine",
    link: "routines/create",
    isActive: false,
  },

  {
    name: "Weekly Benefits",
    link: "routines/create/weekly-benefits",
    isActive: true,
  },
];

const WeeklyBenefits = () => {
  const { token } = useContext(UserContext);
  const { createWeeklyBenefitsMutate, createWeeklyBenefitsStatus } =
    useCreateWeeklyBenefits();
  const { updateBenefitMutate, updateBenefitStatus } = useUpdateWeeklyBenefit();
  const { deleteWeeklyBenefitsMutate, deleteWeeklyBenefitsStatus } =
    useDeleteWeeklyBenefits();
  const { state } = useLocation();
  const totalWeeks = state?.duration?.number;

  const benefits = state?.benefits?.at(0);

  const weeklyBenefitsRemote = benefits?.weeklyBenefits.reduce(
    (acc, { weekRange, benefits }) => {
      acc[weekRange] = benefits.map((description) => ({ description }));
      return acc;
    },
    {},
  );

  const isEdit = weeklyBenefitsRemote ? true : false;

  const defaultValues = {
    weekInterval: totalWeeks / benefits?.weeklyBenefits?.length || undefined,
    weeklyBenefits: weeklyBenefitsRemote,
  };

  const methods = useForm({
    defaultValues,
  });

  const onSubmit = (data) => {
    const benefitData = {
      reminderListId: state.id,
      totalWeeks,
      weeklyBenefits: transformSubmitData(data?.weeklyBenefits),
    };

    if (isEdit) {
      updateBenefitMutate([benefitData, token, benefits._id]);
    } else {
      createWeeklyBenefitsMutate([benefitData, token]);
    }
  };

  return (
    <div className="flex w-full flex-col gap-[37px]">
      <Breadcrumb list={breadCrumbList} />
      <div className="flex items-center gap-3 rounded-[15px] bg-[#FFF7E2] px-2 py-4 lg:px-4 lg:py-6">
        <div className="flex items-center justify-center rounded-full bg-[#EAF2EA] p-1">
          <BiQuestionSvg className={`size-7 fill-[#3a643b]`} />
        </div>
        <div className="text-[16px] font-light text-[#3A643B]">
          This weekly benefit will help potential users track their weekly
          progress while using this routine.
        </div>
      </div>
      <ContentBoxLayout title="Add Weekly Benefits">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
            <div className="mb-2 flex w-full flex-col gap-10 rounded-xl px-5 py-4 lg:pr-16">
              <div className="flex items-center justify-between text-[18px] font-medium text-black">
                <span>Enter Weekly Benefits</span>
                {isEdit && (
                  <TrashSolidSvg
                    onClick={(e) => {
                      e.preventDefault();
                      deleteWeeklyBenefitsMutate([token, benefits._id]);
                    }}
                    className="size-6 cursor-pointer fill-red-600"
                  />
                )}
              </div>
              <div className="flex flex-col gap-0.5">
                <HookFormDropDown
                  disabled={isEdit}
                  label="Select Week Intervals"
                  mdWidth="w-[400px]"
                  list={Array.from({ length: totalWeeks }, (_, i) => i + 1)
                    .filter((i) => totalWeeks % i === 0)
                    .map((i) => `${i} week${i > 1 ? "s" : ""}`)}
                  name="weekInterval"
                />

                <div className="ml-5 text-[12px] text-[#A0A0A0]">
                  Total Weeks for your “Skin Care Routine” is{" "}
                  <span className="text-[#3a643b]">{`${totalWeeks} Weeks`}</span>
                </div>
              </div>
              <div className="flex flex-col gap-10">
                {generateWeekObjects(
                  totalWeeks,
                  methods.watch("weekInterval"),
                ).map((interval) => (
                  <div className="flex flex-col gap-3" key={interval.interval}>
                    <div className="text-[16px] font-medium text-black">
                      {`${interval.weekName} week benefits`}
                    </div>
                    <AddWeeklyBenefits
                      isEdit={isEdit}
                      weekRange={interval.weekName}
                    />
                  </div>
                ))}
              </div>
              {/* ------------- */}

              <button className="mx-auto my-10 mt-20 box-border rounded-xl bg-[#3A643B] px-16 py-[17px] text-center text-base text-white shadow-[0px_4px_14px_rgba(58,_100,_59,_0.25)] duration-100 hover:bg-[#618a61] active:scale-95 md:w-[23.4rem]">
                Save Benefits
              </button>
            </div>
          </form>
        </FormProvider>
      </ContentBoxLayout>
    </div>
  );
};

export default WeeklyBenefits;

function generateWeekObjects(totalWeeks, interval) {
  return Array.from({ length: Math.ceil(totalWeeks / interval) }, (_, i) => {
    const startWeek = i * interval + 1; // Adjust startWeek calculation
    const endWeek = Math.min(startWeek + interval - 1, totalWeeks);
    return {
      interval: i + 1,
      weekName: `${startWeek}-${endWeek}`,
    };
  });
}

const transformSubmitData = (data) => {
  return Object.entries(data)
    .filter(([weekRange]) => weekRange !== "1-NaN")
    .map(([weekRange, benefitsArray]) => ({
      weekRange,
      benefits: benefitsArray.map((benefit) => benefit.description),
    }));
};
