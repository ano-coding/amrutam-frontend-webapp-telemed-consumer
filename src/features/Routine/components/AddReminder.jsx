import { Fragment, useContext, useEffect, useState } from "react";
import TrashSvg from "../../../assets/trash.svg?react";
import Breadcrumb from "../../../components/Breadcrumb";
import { Checkbox } from "@headlessui/react";
import SimpleDropDownComponent from "../components/DropDownComponent";
import SingleLineInput from "../components/SingleLineInput";
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
  useFieldArray,
} from "react-hook-form";
import AddMoreButton from "../components/AddMoreButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ContentBoxLayout from "../../../components/ContentBoxLayout";
import ProductNameSearchInput from "./ProductNameSearchInput";
import ProductTypeDropDown from "./ProductTypeDropdown";
import ChooseUnitDropDown from "./ChooseUnitDropDown";
import ChooseQuantityInput from "./ChooseQuantityInput";
import DatePicker from "./DatePicker";
import TimePickerDropdown from "./TimePickerDropdown";
import useCreateProductReminder from "../../../hooks/routines/useCreateProductReminder";
import { UserContext } from "../../../context/UserContext";
import useUpdateProductReminder from "../../../hooks/routines/useUpdateProductReminder";
import ActivityNameInput from "./ActivityNameInput";
import ActivityTypeDropdown from "./ActivityTypeDropdown";
import ChooseGoalInput from "./ChooseGoalInput";
import ChooseActivityUnitDropDown from "./ChooseActivityUnitDropDown";
import useCreateActivityReminder from "../../../hooks/routines/useCreateActivityReminder";
import useUpdateActivityReminder from "../../../hooks/routines/useUpdateActivityReminder";

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
    name: "Add Reminder",
    link: "routines/create/add-reminder",
    isActive: true,
  },
];

function getNextDate(date) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + 1);
  return nextDate;
}

const CustomCheckbox = ({ field, id }) => {
  const { getValues } = useFormContext();
  return (
    <Checkbox
      disabled={field.value === id || getValues("isEdit") ? true : false}
      checked={field.value === id || false}
      onChange={(checked) => field.onChange(checked ? id : undefined)}
      className={`group absolute left-4 top-[41px] size-6 rounded-full border border-solid border-neutral-500 bg-white p-1 ${field.value === id ? "data-[checked]:bg-[#3A643B]" : ""}`}
    >
      <img
        src="/check-icon.svg"
        className="hidden size-4 group-data-[checked]:block"
      />
    </Checkbox>
  );
};

const NavigationButtons = ({ step, setStep }) => {
  const navigate = useNavigate();
  return (
    <div className="mx-auto flex gap-5">
      {step > 1 && (
        <button
          onClick={(e) => {
            e.preventDefault();
            setStep((step) => {
              if (step > 1) return step - 1;
            });
          }}
          className={`my-10 box-border rounded-xl border-2 border-[#3A643B] px-5 py-[17px] text-center text-base font-semibold text-[#3A643B] shadow-sm duration-100 hover:bg-[#f4f4f4] active:scale-95 sm:w-[15rem] lg:w-[20rem] xl:w-[23.4rem]`}
        >
          Back
        </button>
      )}
      {step === 1 && (
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          className={`my-10 box-border rounded-xl border-2 border-[#3A643B] px-5 py-[17px] text-center text-base font-semibold text-[#3A643B] shadow-sm duration-100 hover:bg-[#f4f4f4] active:scale-95 sm:w-[15rem] lg:w-[20rem] xl:w-[23.4rem]`}
        >
          Cancel
        </button>
      )}
      <button
        type="submit"
        className={`my-10 box-border rounded-xl bg-[#3A643B] px-16 py-[17px] text-center text-base font-semibold text-white shadow-[0px_4px_14px_rgba(58,_100,_59,_0.25)] duration-100 hover:bg-[#618a61] active:scale-95 sm:w-[15rem] lg:w-[20rem] xl:w-[23.4rem]`}
      >
        {step === 3 ? `Submit (${step}/3)` : `Next (${step}/3)`}
      </button>
    </div>
  );
};

function convertFrequency(customDays) {
  const mapDays = {
    Sun: "Sunday",
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
  };

  return customDays.map((day) => mapDays[day]);
}
function convertToAbbreviatedDays(fullDays) {
  const mapDays = {
    Sunday: "Sun",
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
  };

  return fullDays.map((day) => mapDays[day]);
}

const convertTimeSlotsFromApiFormat = (timeSlots) =>
  timeSlots?.map(({ time, timing }) => {
    const [hour, minutes] = time.split(" ")[0].split(":");
    const ampm = time.split(" ")[1];

    return {
      hour: hour.padStart(2, "0"),
      minutes: minutes.padStart(2, "0"),
      "am/pm": ampm,
      timing,
    };
  });

function convertTimeSlotsToApiFormat(timeSlots) {
  return timeSlots.map((slot) => {
    const hoursNum = parseInt(slot.hour, 10);
    const hours = hoursNum.toString().padStart(2, "0");
    const minutes = slot.minutes.padStart(2, "0");
    const ampm = slot["am/pm"];
    const time = `${hours}:${minutes} ${ampm}`;
    return {
      time: time,
      timing: slot.timing,
    };
  });
}
function convertActivityTimeSlotsToApiFormat(timeSlots) {
  return timeSlots.map((slot) => {
    const hoursNum = parseInt(slot.hour, 10);
    const hours = hoursNum.toString().padStart(2, "0");
    const minutes = slot.minutes.padStart(2, "0");
    const ampm = slot["am/pm"];
    const time = `${hours}:${minutes} ${ampm}`;
    return {
      time: time,
    };
  });
}

function ConvertDataToActivityApiFormat(data, id) {
  const {
    reminderType,
    goalUnitId,
    goalUnit,
    goal,
    activityType,
    activityName,
    customActivityDays,
    activityStartDate,
    activityEndDate,
    activityTimeSlots,
    activityFrequency,
  } = data;
  return {
    name: activityName,
    activityType,
    goal,
    unit: goalUnitId,
    reminderListId: id,
    timeslotActivityBased:
      convertActivityTimeSlotsToApiFormat(activityTimeSlots),
    frequency:
      activityFrequency === "daily"
        ? [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ]
        : convertFrequency(customActivityDays),
    endDate: activityEndDate,
    startDate: activityStartDate,
  };
}
function ConvertDataToApiFormat(data, id) {
  const {
    reminderType,
    searchedProductId,
    searchProducts,
    productType,
    dosageQty,
    dosageUnitId,
    dosageUnit,
    productFrequency,
    customDays,
    startDate,
    endDate,
    timeSlots,
  } = data;
  return {
    name: searchProducts,
    isAmrutamProduct: searchedProductId ? true : false,
    source: searchedProductId ? "Amrutam" : "",
    productId: searchedProductId ? searchedProductId : "",
    productUrl: searchedProductId ? "" : "",
    brandName: searchedProductId ? "Amrutam" : "",
    isPrescribed: false,
    dosageQty: dosageQty,
    reminderListId: id,
    dosageUnit: dosageUnitId,
    frequency:
      productFrequency === "daily"
        ? [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ]
        : convertFrequency(customDays),
    endDate,
    startDate,
    productType,
    timeSlotsConsumable:
      productType === "consumable"
        ? convertTimeSlotsToApiFormat(timeSlots)
        : [],
    timeSlotsAppBased:
      productType === "applicationBased"
        ? convertTimeSlotsToApiFormat(timeSlots)
        : [],
  };
}
// Default Main Component
const AddReminder = () => {
  const { token } = useContext(UserContext);
  const { state } = useLocation();

  console.log(state);

  let defaultValues = {};
  if (state?.isEdit) {
    if (state.reminderType === "product") {
      defaultValues = {
        isEdit: true,
        reminderType: state.reminderType,
        searchedProductId: state.productId,
        searchProducts: state.name,
        productType: state.productType,
        dosageQty: state.dosageQty,
        dosageUnitId: state.dosageUnit,
        dosageUnit: state?.dosageUnitObject?.data?.at(0)?.name,
        productFrequency: state.frequency.length === 7 ? "daily" : "customDays",
        customDays: convertToAbbreviatedDays(state.frequency),
        startDate: state.startDate,
        endDate: state.endDate,
        timeSlots: convertTimeSlotsFromApiFormat(
          state.productType === "consumable"
            ? state.timeSlotsConsumable
            : state.timeSlotsAppBased,
        ),
      };
    }
    if (state.reminderType === "activity") {
      defaultValues = {
        isEdit: true,
        reminderType: state.reminderType,
        goalUnitId: state.unit,
        goalUnit: state?.goalUnitObject?.data?.at(0)?.name,
        goal: state.goal,
        activityType: state.activityType,
        activityName: state.name,
        customActivityDays: convertToAbbreviatedDays(state.frequency),
        activityStartDate: state.startDate,
        activityEndDate: state.endDate,
        activityTimeSlots: convertTimeSlotsFromApiFormat(
          state.timeslotActivityBased,
        ),
        activityFrequency:
          state.frequency.length === 7 ? "daily" : "customDays",
      };
    }
  }
  const methods = useForm({ defaultValues });
  const { createProductReminderMutate, createProductReminderStatus } =
    useCreateProductReminder();

  const { createActivityReminderMutate, createActivityReminderStatus } =
    useCreateActivityReminder();

  const { updateProductReminderMutate, updateProductReminderStatus } =
    useUpdateProductReminder();

  const { updateActivityReminderMutate, updateActivityReminderStatus } =
    useUpdateActivityReminder();

  const onSubmit = (data) => {
    if (step < 3) return setStep((step) => step + 1);
    if (step < 3) {
      return;
    }
    if (state?.isEdit) {
      if (state.reminderType === "product") {
        const apiData = ConvertDataToApiFormat(data, state.reminderListId);
        updateProductReminderMutate([apiData, token, state.id]);
      } else if (state.reminderType === "activity") {
        const apiData = ConvertDataToActivityApiFormat(
          data,
          state.reminderListId,
        );

        updateActivityReminderMutate([apiData, token, state._id]);
      }
    } else {
      if (data.reminderType === "product") {
        const apiData = ConvertDataToApiFormat(data, state.id);
        createProductReminderMutate([apiData, token]);
      } else if (data.reminderType === "activity") {
        const apiData = ConvertDataToActivityApiFormat(data, state.id);
        createActivityReminderMutate([apiData, token]);
      }
    }
  };

  const [step, setStep] = useState(1);

  return (
    <div className="flex w-full flex-col gap-[37px]">
      <Breadcrumb list={breadCrumbList} />
      <div className="flex w-full flex-col items-center justify-between rounded-[15px] bg-[#FFF7E2] px-5 py-6 md:flex-row lg:px-12 lg:py-8">
        <div className="flex w-full flex-col gap-2">
          <h1 className="font-nunito text-2xl font-bold text-[#3a643b]">
            {`what are Reminder Items?`}
          </h1>

          <p className="rounded-lg text-justify font-light text-[#484848]">
            {`Reminder items could be products or activities that you want to remember to do at specific times or intervals. They help you stay organized and on track with your routine by prompting you when it's time to complete a particular task.`}
          </p>
        </div>
      </div>
      <ContentBoxLayout
        title={`${state?.isEdit ? "Edit" : "Add"} Reminder Items`}
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex max-w-5xl flex-col gap-10 px-5 py-10">
              <ProgressBar step={step} />
              {step === 1 && <FirstStage />}

              {step === 2 && methods.watch("reminderType") === "activity" && (
                <ActivityDetails />
              )}
              {step === 3 && methods.watch("reminderType") === "activity" && (
                <ActivityTimeSlot />
              )}
              {step === 2 && methods.watch("reminderType") === "product" && (
                <ProductDetails />
              )}
              {step === 3 && methods.watch("reminderType") === "product" && (
                <ProductTimeSlot />
              )}
              <NavigationButtons step={step} setStep={setStep} />
            </div>
          </form>
        </FormProvider>
      </ContentBoxLayout>
    </div>
  );
};

export default AddReminder;

const ProgressBar = ({ step }) => {
  return (
    <div className="flex w-full items-center gap-[17px]">
      <div
        className={`h-[5px] w-full rounded xl:w-[295.3px] ${step >= 1 ? "bg-[#3A643B]" : `bg-[#D9D9D9]`}`}
      />
      <div
        className={`h-[5px] w-full rounded xl:w-[295.3px] ${step >= 2 ? "bg-[#3A643B]" : `bg-[#D9D9D9]`}`}
      />
      <div
        className={`h-[5px] w-full rounded xl:w-[295.3px] ${step >= 3 ? "bg-[#3A643B]" : `bg-[#D9D9D9]`}`}
      />{" "}
    </div>
  );
};

const FirstStage = () => {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <div className="flex flex-col gap-6">
      <div className="text-[18px] font-medium leading-[16px] text-neutral-800">
        Select Reminder Type
      </div>
      <div className="flex max-w-5xl flex-col items-center justify-between gap-5 lg:flex-row">
        <Controller
          name="reminderType"
          control={control}
          rules={{ required: "*You must select an option" }}
          render={({ field }) => (
            <>
              <div className="relative">
                <CustomCheckbox field={field} id="product" />
                <img className="w-[342px]" src="/product-based.png" />
              </div>
              <div className="flex items-center gap-[8px] text-[14px] lg:flex-col">
                <div className="h-[0.8px] w-[40px] bg-[#b0c1b1] lg:h-[40px] lg:w-[0.8px]" />
                <div className="font-medium leading-[24px] tracking-[-0.01em] text-neutral-500">
                  OR
                </div>
                <div className="h-[0.8px] w-[40px] bg-[#b0c1b1] lg:h-[40px] lg:w-[0.8px]" />
              </div>
              <div className="relative">
                <CustomCheckbox field={field} id="activity" />
                <img className="w-[342px]" src="/activity-based.png" />
              </div>
            </>
          )}
        />
      </div>
      {errors.reminderType && (
        <div className="self-end text-sm font-medium leading-[16px] text-red-600">
          {errors.reminderType.message}
        </div>
      )}
    </div>
  );
};

const ActivityDetails = () => {
  const {
    watch,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col gap-6">
      <div className="text-[18px] font-medium leading-[16px] text-neutral-800">
        Enter Activity Details
      </div>
      <div className="flex max-w-5xl flex-col items-center justify-between gap-5 md:w-full lg:flex-row lg:items-start">
        <div className="flex w-full flex-col gap-1 md:w-fit">
          <ActivityNameInput
            label="Activity Name"
            mdWidth={400}
            placeholder="Select Activity"
          />
          <div className="ml-5 text-[12px] font-medium leading-[16px] text-[#3A643B]">
            Unable to find activity? Add your Activity
          </div>
        </div>
        <ActivityTypeDropdown
          label="Activity Type"
          list={[
            { label: "Physical", id: "physical" },
            { label: "Spiritual", id: "spiritual" },
          ]}
          mdWidth="w-[400px]"
          placeholder="Select Activity Type"
          className={`w-full`}
          name="activityType"
          requiredMessage="*Please Select an Activity Type"
        />
      </div>
      <div className="flex w-full max-w-5xl flex-col items-center justify-between gap-5 lg:flex-row lg:items-start">
        <div className="grid w-full grid-cols-2 gap-10 md:w-[400px]">
          <ChooseGoalInput name="goal" label="Goal" placeholder={"10"} />
          <ChooseActivityUnitDropDown
            label="Unit"
            placeholder="Start Typing..."
          />
        </div>
        <div className="flex w-full flex-col gap-[30px] md:w-[400px] lg:items-end">
          <div className="flex gap-12 pl-3 sm:w-[400px]">
            <CustomRadioButton
              name="activityFrequency"
              id="daily"
              label="Daily"
            />
            <CustomRadioButton
              name="activityFrequency"
              id="customDays"
              label="Custom Days"
            />
          </div>
          {errors?.activityFrequency && (
            <p className="text-[12px] font-medium text-red-500">
              {errors?.activityFrequency?.message}
            </p>
          )}
          <div className="w-full">
            {watch("activityFrequency") === "customDays" && (
              <SelectDays name="customActivityDays" />
            )}
          </div>
          {errors?.customActivityDays && (
            <p className="self-end text-[12px] font-medium text-red-500">
              {errors?.customActivityDays?.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
const ProductDetails = () => {
  const {
    watch,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="text-[18px] font-medium leading-[16px] text-neutral-800">
        Enter Product Details
      </div>
      <div className="flex w-full max-w-5xl flex-col items-center justify-between gap-5 lg:items-start xl:flex-row">
        <div className="flex w-full flex-col gap-1 md:w-fit">
          <ProductNameSearchInput
            label="Product Name"
            mdWidth="w-[400px]"
            placeholder="Start Typing to Search Product"
          />
          <Link to="product-details">
            <div className="ml-5 text-[12px] font-medium leading-[16px] text-[#3A643B]">
              Unable to find product? Add your Product
            </div>
          </Link>
        </div>

        <ProductTypeDropDown
          label="Product Type"
          list={[
            { label: "Application Based", id: "applicationBased" },
            { label: "Consumable", id: "consumable" },
          ]}
          mdWidth="w-[400px]"
          placeholder="Select Product Type"
          className={`w-full`}
          name="productType"
        />
      </div>
      <div className="flex w-full max-w-5xl flex-col items-center justify-between gap-5 lg:flex-row lg:items-start">
        <div className="grid w-full grid-cols-2 gap-4 sm:gap-10 md:w-[400px]">
          <ChooseQuantityInput label="Quantity" placeholder={"5"} />
          <ChooseUnitDropDown label="Unit" placeholder="Start Typing..." />
        </div>
        <div className="flex w-full flex-col gap-[30px] md:w-[400px] lg:items-end">
          <div className="flex gap-12 pl-3 sm:w-[400px]">
            <CustomRadioButton
              name="productFrequency"
              id="daily"
              label="Daily"
            />
            <CustomRadioButton
              name="productFrequency"
              id="customDays"
              label="Custom Days"
            />
          </div>
          {errors?.productFrequency && (
            <p className="text-[12px] font-medium text-red-500">
              {errors?.productFrequency?.message}
            </p>
          )}

          <div className="w-full">
            {watch("productFrequency") === "customDays" && (
              <SelectDays name="customDays" />
            )}
          </div>
          {errors?.customDays && (
            <p className="self-end text-[12px] font-medium text-red-500">
              {errors?.customDays?.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const CustomRadioButton = ({ id, label, name }) => {
  const { register, clearErrors } = useFormContext();
  return (
    <div className="flex items-center">
      <input
        {...register(name, { required: "*Please Select an Option" })}
        onClick={() => {
          clearErrors("customDays");
        }}
        id={id}
        value={id}
        type="radio"
        className="h-[20px] w-[20px] border-2 border-neutral-500 text-[#3A643B] ring-0 checked:border-[#3A643B] checked:ring-0 hover:ring-0 hover:ring-[#3A643B] focus:outline-none focus:ring-[#3a643b] focus-visible:bg-[#3a643b] active:ring-0"
      />
      <label htmlFor={id} className="ml-3 text-[14px] leading-[16px]">
        {label}
      </label>
    </div>
  );
};

const SelectDays = ({ name }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const { control } = useFormContext();

  return (
    <div className="flex w-fit gap-[6px] rounded-2xl bg-[#E9F1E0] p-2 sm:gap-2">
      {days.map((day) => (
        <Fragment key={day}>
          <Controller
            control={control}
            name={name}
            rules={{ required: "*Please Select a Day" }}
            render={({ field }) => {
              const { onChange, value = [] } = field;
              const isSelected = value.includes(day);

              return (
                <Fragment>
                  <label
                    htmlFor={day}
                    onClick={() => {
                      const newValues = isSelected
                        ? value.filter((d) => d !== day)
                        : [...value, day];
                      onChange(newValues);
                    }}
                    className={`w-[35px] text-[11px] sm:w-[41px] sm:text-[12px] ${
                      isSelected ? "bg-[#3A643B] text-white" : "text-[#A0A0A0]"
                    } font-dm cursor-pointer rounded-[8px] px-1 py-[10px] text-center sm:px-2`}
                  >
                    {day}
                  </label>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}}
                    value={day}
                    id={day}
                    className="hidden"
                    readOnly
                  />
                </Fragment>
              );
            }}
          />
        </Fragment>
      ))}
    </div>
  );
};

const hoursArray = Array.from({ length: 12 }, (_, i) =>
  (i + 1).toString().padStart(2, "0"),
);
const minutesArray = Array.from({ length: 60 }, (_, i) =>
  i.toString().padStart(2, "0"),
);

const ActivityTimeSlot = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `activityTimeSlots`,
    rules: { required: "*Please add at least one Time Slot" },
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({
        hour: "",
        minutes: "",
        "am/pm": "",
        timing: "",
      });
    }
  }, [append, fields.length]);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="text-[18px] font-medium leading-[16px] text-neutral-800">
        Add Date Range
      </div>
      <div className="my-2 grid w-full grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <div
            className={`relative rounded-[16px] border-[1.5px] border-[#ced8e0] px-1.5 py-1 shadow-sm lg:w-60`}
          >
            <label
              htmlFor="activityStartDate"
              className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-[12px] leading-[16px] text-neutral-400"
            >
              {"Start Date"}
            </label>
            <div className="flex w-full flex-col gap-1">
              <DatePicker hookId={"activityStartDate"} minDate={new Date()} />
            </div>
            {errors?.activityStartDate && (
              <p className="absolute bottom-0 right-2 text-[12px] font-medium text-red-500">
                {errors?.activityStartDate?.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div
            className={`relative rounded-[16px] border-[1.5px] border-[#ced8e0] px-1.5 py-1 shadow-sm lg:w-60`}
          >
            <label
              htmlFor="activityEndDate"
              className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-[12px] leading-[16px] text-neutral-400"
            >
              {"End Date"}
            </label>
            <div className="flex w-full flex-col gap-1">
              <DatePicker
                hookId={"activityEndDate"}
                minDate={getNextDate(watch("activityStartDate"))}
              />
            </div>
            {errors?.activityEndDate &&
              errors?.activityEndDate?.message !== "SPECIAL_ERROR_MESSAGE" && (
                <p className="absolute bottom-0 right-2 text-[12px] font-medium text-red-500">
                  {errors?.activityEndDate?.message}
                </p>
              )}
          </div>
        </div>
      </div>
      {errors?.activityEndDate &&
        errors?.activityEndDate?.message === "SPECIAL_ERROR_MESSAGE" && (
          <p className="-mt-5 self-end text-[12px] font-medium text-red-500">
            *End date must be after start date
          </p>
        )}
      <div className="text-[18px] font-medium leading-[16px] text-neutral-800">
        Add Time Slot
      </div>
      {fields.map((item, index) => (
        <div
          className="relative flex w-full flex-col items-end sm:flex-row sm:items-center sm:gap-5"
          key={item.id}
        >
          <div className="my-4 flex flex-col gap-4">
            <div className="flex w-fit max-w-5xl items-center gap-2 lg:items-start">
              <TimePickerDropdown
                label="hour"
                index={index}
                list={hoursArray}
                name="activityTimeSlots"
              />
              <div className="text-3xl text-neutral-500">:</div>
              <TimePickerDropdown
                index={index}
                label="minutes"
                list={minutesArray}
                name="activityTimeSlots"
              />
              <div className="mr-2"></div>
              <TimePickerDropdown
                index={index}
                label="am/pm"
                list={["AM", "PM"]}
                name="activityTimeSlots"
              />
            </div>
          </div>
          <TrashSvg
            onClick={() => remove(index)}
            className={`absolute bottom-4 right-0 size-4 cursor-pointer sm:static ${fields.length > 1 ? "" : "hidden"}`}
          />
        </div>
      ))}
      <div className="mt-5">
        <AddMoreButton
          onClick={() => append({ hour: "", minutes: "", "am/pm": "" })}
          label="Add More Slots"
        />
      </div>
    </div>
  );
};

const ProductTimeSlot = () => {
  const {
    control,
    watch,
    register,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `timeSlots`,
    rules: { required: "*Please add at least one Time Slot" },
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({
        hour: "",
        minutes: "",
        "am/pm": "",
        timing: "",
      });
    }
  }, [append, fields.length]);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="text-[18px] font-medium leading-[16px] text-neutral-800">
        Add Date Range
      </div>
      <div className="my-2 grid w-full grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <div
            className={`relative rounded-[16px] border-[1.5px] border-[#ced8e0] px-1.5 py-1 shadow-sm lg:w-60`}
          >
            <label
              htmlFor="startDate"
              className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-[12px] leading-[16px] text-neutral-400"
            >
              {"Start Date"}
            </label>
            <div className="flex w-full flex-col gap-1">
              <DatePicker hookId={"startDate"} minDate={new Date()} />
            </div>
            {errors?.startDate && (
              <p className="absolute bottom-0 right-2 text-[12px] font-medium text-red-500">
                {errors?.startDate?.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div
            className={`relative rounded-[16px] border-[1.5px] border-[#ced8e0] px-1.5 py-1 shadow-sm lg:w-60`}
          >
            <label
              htmlFor="endDate"
              className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-[12px] leading-[16px] text-neutral-400"
            >
              {"End Date"}
            </label>
            <div className="flex w-full flex-col gap-1">
              <DatePicker
                hookId={"endDate"}
                minDate={getNextDate(watch("startDate"))}
              />
            </div>
            {errors?.endDate &&
              errors?.endDate?.message !== "SPECIAL_ERROR_MESSAGE" && (
                <p className="absolute bottom-0 right-2 text-[12px] font-medium text-red-500">
                  {errors?.endDate?.message}
                </p>
              )}
          </div>
        </div>
      </div>
      {errors?.endDate &&
        errors?.endDate?.message === "SPECIAL_ERROR_MESSAGE" && (
          <p className="-mt-5 self-end text-[12px] font-medium text-red-500">
            *End date must be after start date
          </p>
        )}
      <div className="text-[18px] font-medium leading-[16px] text-neutral-800">
        Add Time Slot
      </div>
      {fields.map((item, index) => (
        <div
          className="relative flex w-full flex-col items-end sm:flex-row sm:items-center sm:gap-5"
          key={item.id}
        >
          <div className="my-4 flex flex-col gap-4">
            <div className="flex w-fit max-w-5xl items-center gap-2 lg:items-start">
              <TimePickerDropdown
                label="hour"
                index={index}
                list={hoursArray}
                name="timeSlots"
              />
              <div className="text-3xl text-neutral-500">:</div>
              <TimePickerDropdown
                index={index}
                label="minutes"
                list={minutesArray}
                name="timeSlots"
              />
              <div className="mr-2"></div>
              <TimePickerDropdown
                index={index}
                label="am/pm"
                list={["AM", "PM"]}
                name="timeSlots"
              />
            </div>

            <div className="ml-3 flex w-full flex-col gap-[10px] md:w-[400px] lg:items-end">
              <div className="flex gap-12 sm:w-[400px]">
                <div className="flex items-center">
                  <input
                    {...register(`timeSlots.${index}.timing`, {
                      required: "*Please Select Timing",
                    })}
                    onClick={() => {
                      clearErrors(`timeSlots.${index}.timing`);
                    }}
                    id={`timeSlots.${index}.beforeMeal`}
                    type="radio"
                    value="beforeMeal"
                    className="h-[20px] w-[20px] border-2 border-neutral-500 text-[#3A643B] ring-0 checked:border-[#3A643B] checked:ring-0 hover:ring-0 hover:ring-[#3A643B] focus:outline-none focus:ring-[#3a643b] focus-visible:bg-red-500 active:ring-0"
                  />
                  <label
                    htmlFor={`timeSlots.${index}.beforeMeal`}
                    className="ml-3 text-[14px] leading-[16px]"
                  >
                    Before Meal
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    {...register(`timeSlots.${index}.timing`, {
                      required: "*Please Select Timing",
                    })}
                    onClick={() => {
                      clearErrors(`timeSlots.${index}.timing`);
                    }}
                    id={`timeSlots.${index}.afterMeal`}
                    type="radio"
                    value="afterMeal"
                    className="h-[20px] w-[20px] border-2 border-neutral-500 text-[#3A643B] ring-0 checked:border-[#3A643B] checked:ring-0 hover:ring-0 hover:ring-[#3A643B] focus:outline-none focus:ring-[#3a643b] focus-visible:bg-red-500 active:ring-0"
                  />
                  <label
                    htmlFor={`timeSlots.${index}.afterMeal`}
                    className="ml-3 text-[14px] leading-[16px]"
                  >
                    After Meal
                  </label>
                </div>
              </div>
              {errors?.timeSlots?.[index]?.timing && (
                <p className="mr-2 self-end text-[12px] font-medium text-red-500">
                  {errors?.timeSlots?.[index]?.timing?.message}
                </p>
              )}
            </div>
          </div>
          <TrashSvg
            onClick={() => remove(index)}
            className={`absolute bottom-4 right-0 size-4 cursor-pointer sm:static sm:mb-9 ${fields.length > 1 ? "" : "hidden"}`}
          />
        </div>
      ))}
      <div className="mt-5">
        <AddMoreButton
          onClick={() => append({ hour: "", minutes: "", "am/pm": "" })}
          label="Add More Slots"
        />
      </div>
    </div>
  );
};
