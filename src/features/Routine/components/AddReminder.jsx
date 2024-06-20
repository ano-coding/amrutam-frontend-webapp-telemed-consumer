import { Fragment, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import { Checkbox } from "@headlessui/react";
import SimpleDropDownComponent from "../components/DropDownComponent";
import SingleLineInput from "../components/SingleLineInput";
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
} from "react-hook-form";
import AddMoreButton from "../components/AddMoreButton";
import { Link } from "react-router-dom";
import ContentBoxLayout from "../../../components/ContentBoxLayout";

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

const CustomCheckbox = ({ id }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name="reminderType"
      control={control}
      render={({ field }) => (
        <Checkbox
          checked={field.value === id || false}
          onChange={(checked) => field.onChange(checked ? id : "")}
          className="group absolute left-4 top-[41px] size-6 rounded-full border border-solid border-neutral-500 bg-white p-1 data-[checked]:bg-[#3A643B]"
        >
          <img
            src="/check-icon.svg"
            className="hidden size-4 group-data-[checked]:block"
          />
        </Checkbox>
      )}
    />
  );
};

const NavigationButtons = ({ step, setStep }) => {
  console.log(step);

  return (
    <div className="mx-auto flex gap-5">
      {step > 1 && (
        <button
          onClick={() =>
            setStep((step) => {
              if (step > 1) return step - 1;
            })
          }
          className={`my-10 box-border rounded-xl border-2 border-[#3A643B] px-5 py-[17px] text-center text-base font-semibold text-[#3A643B] shadow-sm duration-100 hover:bg-[#f4f4f4] active:scale-95 sm:w-[15rem] lg:w-[20rem] xl:w-[23.4rem]`}
        >
          Back
        </button>
      )}
      <button
        onClick={() => {
          if (step < 3) return setStep((step) => step + 1);
        }}
        className={`my-10 box-border rounded-xl bg-[#3A643B] px-16 py-[17px] text-center text-base font-semibold text-white shadow-[0px_4px_14px_rgba(58,_100,_59,_0.25)] duration-100 hover:bg-[#618a61] active:scale-95 sm:w-[15rem] lg:w-[20rem] xl:w-[23.4rem]`}
      >
        {`Next (${step}/3)`}
      </button>
    </div>
  );
};

const AddReminder = () => {
  const methods = useForm();
  const onSubmit = (data) => console.log(data);

  const [step, setStep] = useState(1);
  console.log(step);

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
      <ContentBoxLayout title="Add Reminder Items">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex max-w-5xl flex-col gap-10 px-5 py-10">
              <ProgressBar step={step} />
              {step === 1 && <FirstStage />}

              {step === 2 && methods.watch("reminderType") === "activity" && (
                <ActivityDetails />
              )}
              {step === 3 && methods.watch("reminderType") === "activity" && (
                <TimeSlot />
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
  return (
    <div className="flex flex-col gap-6">
      <div className="text-[18px] font-medium leading-[16px] text-neutral-800">
        Select Reminder Type
      </div>
      <div className="flex max-w-5xl flex-col items-center justify-between gap-5 lg:flex-row">
        <div className="relative">
          <CustomCheckbox id="product" />
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
          <CustomCheckbox id="activity" />
          <img className="w-[342px]" src="/activity-based.png" />
        </div>
      </div>
    </div>
  );
};

const ActivityDetails = () => {
  const { watch } = useFormContext();
  return (
    <div className="flex flex-col gap-6">
      <div className="text-[18px] font-medium leading-[16px] text-neutral-800">
        Enter Activity Details
      </div>
      <div className="flex max-w-5xl flex-col items-center justify-between gap-5 md:w-full lg:flex-row lg:items-start">
        <div className="flex w-full flex-col gap-1 md:w-fit">
          <SimpleDropDownComponent
            label="Activity Name"
            list={[
              "Drinking Water",
              "Walking",
              "Running",
              "Exercise",
              "Medication",
              "Yoga",
            ]}
            mdWidth="w-[400px]"
            placeholder="Select Activity"
          />
          <div className="ml-5 text-[12px] font-medium leading-[16px] text-[#3A643B]">
            Unable to find activity? Add your Activity
          </div>
        </div>
        <SimpleDropDownComponent
          label="Activity Type"
          list={["Physical", "Spiritual"]}
          mdWidth="w-[400px]"
          placeholder="Select Activity Type"
          className={`w-full`}
        />
      </div>
      <div className="flex w-full max-w-5xl flex-col items-center justify-between gap-5 lg:flex-row lg:items-start">
        <div className="grid w-full grid-cols-2 gap-10 md:w-[400px]">
          <SingleLineInput label="Quantity" />
          <SingleLineInput label="Unit" />
        </div>
        <div className="flex w-full flex-col gap-[30px] md:w-[400px] lg:items-end">
          <div className="flex gap-12 pl-3 sm:w-[400px]">
            <CustomRadioButton
              name="activity-frequency"
              id="daily"
              label="Daily"
            />
            <CustomRadioButton
              name="activity-frequency"
              id="custom-days"
              label="Custom Days"
            />
          </div>
          <div className="w-full">
            {watch("activity-frequency") === "custom-days" && <SelectDays />}
          </div>
        </div>
      </div>
    </div>
  );
};
const ProductDetails = () => {
  const { watch } = useFormContext();
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="text-[18px] font-medium leading-[16px] text-neutral-800">
        Enter Product Details
      </div>
      <div className="flex w-full max-w-5xl flex-col items-center justify-between gap-5 lg:items-start xl:flex-row">
        <div className="flex w-full flex-col gap-1 md:w-fit">
          <SimpleDropDownComponent
            label="Product Name"
            list={[
              "Amrutam Skinkey Malt",
              "Amrutam Skinkey Body Oil",
              "Amrutam Skinkey Face Clean",
              "Amrutam Nari Sondarya Malt",
            ]}
            mdWidth="w-[400px]"
            placeholder="Select Product"
          />
          <Link to="product-details">
            <div className="ml-5 text-[12px] font-medium leading-[16px] text-[#3A643B]">
              Unable to find product? Add your Product
            </div>
          </Link>
        </div>
        <SimpleDropDownComponent
          label="Product Type"
          list={["Consumable", "Non-Consumable"]}
          mdWidth="w-[400px]"
          placeholder="Select Product Type"
          className={`w-full`}
        />
      </div>
      <div className="flex w-full max-w-5xl flex-col items-center justify-between gap-5 lg:flex-row lg:items-start">
        <div className="grid w-full grid-cols-2 gap-10 md:w-[400px]">
          <SingleLineInput label="Quantity" />
          <SingleLineInput label="Unit" />
        </div>
        <div className="flex w-full flex-col gap-[30px] md:w-[400px] lg:items-end">
          <div className="flex gap-12 pl-3 sm:w-[400px]">
            <CustomRadioButton
              name="product-frequency"
              id="daily"
              label="Daily"
            />
            <CustomRadioButton
              name="product-frequency"
              id="custom-days"
              label="Custom Days"
            />
          </div>
          <div className="w-full">
            {watch("product-frequency") === "custom-days" && <SelectDays />}
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomRadioButton = ({ id, label, name }) => {
  const { register } = useFormContext();
  return (
    <div className="flex items-center">
      <input
        {...register(name)}
        id={id}
        value={id}
        name={name}
        type="radio"
        className="h-[20px] w-[20px] border-2 border-neutral-500 text-[#3A643B] checked:border-[#3A643B] checked:ring-0 hover:ring-0 hover:ring-[#3A643B] focus-visible:bg-red-500 active:ring-0"
      />
      <label htmlFor={id} className="ml-3 text-[14px] leading-[16px]">
        {label}
      </label>
    </div>
  );
};

const SelectDays = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const { setValue } = useFormContext();
  const [selectedDays, setSelectedDays] = useState([]);
  function handleDayClick(day) {
    const dayIndex = selectedDays.indexOf(day);

    if (dayIndex !== -1) {
      const newDays = [...selectedDays];
      newDays.splice(dayIndex, 1);

      setSelectedDays(newDays);
    } else {
      const newDays = [...selectedDays];
      newDays.push(day);

      setSelectedDays(newDays);
    }
  }

  const getDaysFromIndex = (daysArray, indicesArray) => {
    const sortedIndices = indicesArray.slice().sort((a, b) => a - b);

    return sortedIndices.map((index) => daysArray[index]);
  };

  return (
    <div className="flex w-fit gap-[6px] rounded-2xl bg-[#E9F1E0] p-2 sm:gap-2">
      {days.map((day, index) => {
        const selected = selectedDays.includes(index);

        return (
          <Fragment key={day}>
            <label
              htmlFor={day}
              onClick={() => handleDayClick(index)}
              className={`w-[35px] text-[11px] sm:w-[41px] sm:text-[12px] ${
                selected ? "text-white" : "text-[#A0A0A0]"
              } ${
                selected && "bg-[#3A643B]"
              } font-dm cursor-pointer rounded-[8px] px-1 py-[10px] text-center sm:px-2`}
            >
              {day}
            </label>
            <input
              type="checkbox"
              onClick={() =>
                setValue("custom-days", getDaysFromIndex(days, selectedDays))
              }
              value={day}
              id={day}
              className="hidden"
            />
          </Fragment>
        );
      })}
    </div>
  );
};

const TimeSlot = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="text-[18px] font-medium leading-[16px] text-neutral-800">
        Add Time Slot
      </div>
      <div className="flex w-fit max-w-5xl items-center gap-2 sm:gap-5 lg:items-start">
        <SimpleDropDownComponent
          label="Hours"
          list={[
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
          ]}
          className="w-[105px] sm:w-[150px]"
          placeholder="Hours"
        />

        <SingleLineInput
          label="Minutes"
          className={`w-[105px] sm:w-[150px]`}
          placeholder="Minutes"
        />
        <SimpleDropDownComponent
          label="Unit"
          list={["AM", "PM"]}
          className="w-[105px] sm:w-[150px]"
          placeholder="Unit"
        />
      </div>
      <div className="flex flex-col gap-[30px] md:w-[400px] lg:items-end">
        <div className="flex gap-12 sm:w-[400px]">
          <CustomRadioButton
            name="moment"
            id="before-meal"
            label="Before Meal"
          />
          <CustomRadioButton name="moment" id="after-meal" label="After Meal" />
        </div>
      </div>
      <div className="mt-5">
        <AddMoreButton label="Add More Slots" />
      </div>
    </div>
  );
};
const ProductTimeSlot = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="text-[18px] font-medium leading-[16px] text-neutral-800">
        Add Time Slot
      </div>
      <div className="my-2 w-full">
        <SimpleDropDownComponent
          label="Meal"
          list={["Breakfast", "Lunch", "Dinner"]}
          mdWidth={"w-[400px]"}
        />
      </div>
      <div className="flex w-fit max-w-5xl items-center gap-2 sm:gap-5 lg:items-start">
        <SimpleDropDownComponent
          label="Hours"
          list={[
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
          ]}
          className="w-[105px] sm:w-[150px]"
          placeholder="Hours"
        />

        <SingleLineInput
          label="Minutes"
          className={`w-[105px] sm:w-[150px]`}
          placeholder="Minutes"
        />
        <SimpleDropDownComponent
          label="Unit"
          list={["AM", "PM"]}
          className="w-[105px] sm:w-[150px]"
          placeholder="Unit"
        />
      </div>
      <div className="flex w-full flex-col gap-[30px] md:w-[400px] lg:items-end">
        <div className="flex gap-12 sm:w-[400px]">
          <CustomRadioButton
            name="moment"
            id="before-meal"
            label="Before Meal"
          />
          <CustomRadioButton name="moment" id="after-meal" label="After Meal" />
        </div>
      </div>
      <div className="mt-5">
        <AddMoreButton label="Add More Slots" />
      </div>
    </div>
  );
};
