import Breadcrumb from "../../../components/Breadcrumb";
import BiQuestionSvg from "../../../assets/bi-question.svg?react";
import TrashSolidSvg from "../../../assets/trash-solid.svg?react";
import ContentBoxLayout from "../../../components/ContentBoxLayout";
import { FormProvider, useForm } from "react-hook-form";
import HookFormDropDown from "./HookFormDropDown";
import AddWeeklyBenefits from "./AddWeeklyBenefits";
import { useLocation, useNavigate } from "react-router-dom";
import useCreateWeeklyBenefits from "../../../hooks/routines/useCreateWeeklyBenefits";
import { Fragment, useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import useUpdateWeeklyBenefit from "../../../hooks/routines/useUpdateWeeklyBenefits";
import useDeleteWeeklyBenefits from "../../../hooks/routines/useDeleteWeeklyBenefits";
import ConfirmationModal from "./ConfirmationModal";
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
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const { createWeeklyBenefitsMutate, createWeeklyBenefitsStatus } =
    useCreateWeeklyBenefits();
  const { updateBenefitMutate, updateBenefitStatus } = useUpdateWeeklyBenefit();
  const { deleteWeeklyBenefitsMutate, deleteWeeklyBenefitsStatus } =
    useDeleteWeeklyBenefits();
  const isDeleting = deleteWeeklyBenefitsStatus === "pending";
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
    <Fragment>
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
                        setConfirmDeleteModal(true);
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
                    <div
                      className="flex flex-col gap-3"
                      key={interval.interval}
                    >
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
                <div className="flex w-full items-center justify-center gap-3 sm:gap-6">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(-1);
                    }}
                    className={`my-10 box-border rounded-xl border-2 border-[#3A643B] px-5 py-[17px] text-center text-base font-semibold text-[#3A643B] shadow-sm duration-100 hover:bg-[#f4f4f4] active:scale-95 sm:w-[15rem] lg:w-[20rem] xl:w-[23.4rem]`}
                  >
                    Cancel
                  </button>
                  <button className="my-10 box-border rounded-xl border-2 border-[#3A643B] bg-[#3A643B] px-16 py-[17px] text-center text-base text-white shadow-[0px_4px_14px_rgba(58,_100,_59,_0.25)] duration-100 hover:bg-[#618a61] active:scale-95 md:w-[23.4rem]">
                    Save Benefits
                  </button>
                </div>
              </div>
            </form>
          </FormProvider>
        </ContentBoxLayout>
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
              {`Are you sure you want to delete `}
              <span className="font-semibold">{name}</span> {`Routine? `}
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
                  deleteWeeklyBenefitsMutate([token, benefits._id], {
                    onSuccess: () => {
                      setConfirmDeleteModal(false);
                      navigate(-1);
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
