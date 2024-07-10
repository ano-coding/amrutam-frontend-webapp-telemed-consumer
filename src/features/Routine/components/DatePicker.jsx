import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { Datepicker } from "flowbite-react";
import { formatDateToString } from "../../../helper/helper";
import { useFormContext } from "react-hook-form";

const DatePicker = ({ panelWidth, hookId, minDate }) => {
  const { clearErrors, setValue, register, watch } = useFormContext();
  return (
    <Popover>
      {({ close }) => (
        <>
          <PopoverButton className="flex w-full justify-center focus:outline-none">
            <input
              id={hookId}
              value={watch(hookId) ? formatDateToString(watch(hookId)) : ""}
              className={`w-full rounded-[16px] border-none placeholder-neutral-400 outline-none ring-0 placeholder:text-sm focus:outline-none focus:ring-0`}
              placeholder="Select Date"
              {...register(hookId, {
                required: "*This field is required",
                validate: (value) => {
                  const startDate = watch("startDate");
                  if (hookId === "endDate" && startDate) {
                    const start = new Date(startDate);
                    const end = new Date(value);
                    start.setHours(0, 0, 0, 0);
                    end.setHours(0, 0, 0, 0);
                    return end > start ? true : "SPECIAL_ERROR_MESSAGE";
                  }
                  return true;
                },
              })}
            />
          </PopoverButton>
          <Transition
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel
              anchor="bottom end"
              className="font-poppins rounded-xl bg-white text-sm/6 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div
                className={`flex w-[${panelWidth}] font-poppins flex-col text-[18px] leading-[21.88px] tracking-[-0.01em] text-[#1E1E1E]`}
              >
                <Datepicker
                  onSelectedDateChanged={(date) => {
                    setValue(hookId, date);
                    clearErrors(hookId);
                    if (hookId === "startDate") {
                      setValue("endDate", undefined);
                    }
                    close();
                  }}
                  weekStart={1}
                  minDate={minDate}
                  defaultDate={
                    watch(hookId) ? new Date(watch(hookId)) : new Date()
                  }
                  inline
                  showTodayButton={false}
                />
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default DatePicker;
