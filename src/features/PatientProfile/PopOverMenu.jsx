import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { Datepicker } from "flowbite-react";
import { formatDateToString } from "../../helper/helper";

const PopOverMenu = ({ register, errors, panelWidth, setValue, watch }) => {
  return (
    <Popover>
      {({ close }) => (
        <>
          <PopoverButton className="flex w-full justify-center focus:outline-none data-[active]:text-black data-[hover]:text-black data-[focus]:outline-1 data-[focus]:outline-black">
            <input
              id="dob"
              value={watch("dob") ? formatDateToString(watch("dob")) : ""}
              className={`w-full rounded-[11px] border-[2px] border-solid px-4 py-2.5 focus:outline-none focus:ring-0 ${errors.dob ? "border-red-500 focus:border-red-500" : `border-[#e5e7eb] focus:border-[#e5e7eb]`}`}
              {...register("dob", { required: true })}
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
                    setValue("dob", date);
                    close();
                  }}
                  weekStart={1}
                  defaultDate={new Date()}
                  inline
                />
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default PopOverMenu;
