import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import AddMoreButton from "./AddMoreButton";
import ToggleButton from "./ToggleButton";
import { useState } from "react";

const AddReminderChannels = ({ title, channel, isActive, btnLabel }) => {
  return (
    <div className="flex w-full flex-col items-end gap-5 rounded-[20px] border-[1.5px] border-solid border-[#ced8e0] p-4 shadow-md sm:w-96 lg:w-[432px]">
      <div className="flex w-full items-center justify-between">
        <span className="text-[14px] text-black">{title}</span>
        <ToggleButton isActive={isActive} />
      </div>
      <div className="w-full">
        {isActive && <PhoneNumberInput label={channel} />}
      </div>
      <AddMoreButton label={btnLabel} />
    </div>
  );
};

export default AddReminderChannels;

const PhoneNumberInput = ({ label, className, mdWidth }) => {
  const [value, setValue] = useState();
  return (
    <div className="flex flex-col gap-1">
      <div
        className={`relative rounded-[16px] ${className} border-[1.5px] border-[#ced8e0] px-3 py-2 shadow-sm md:w-[${mdWidth}px]`}
      >
        <label
          htmlFor="concerns"
          className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-[12px] leading-[16px] text-neutral-400"
        >
          {label}
        </label>

        <PhoneInput
          onChange={setValue}
          value={value}
          containerComponent={ContainerComponent}
          className="block w-full border-0 p-0 py-1.5 text-[16px] leading-[24px] text-black placeholder-neutral-400 placeholder:text-sm focus:ring-0"
        />
      </div>
    </div>
  );
};

function ContainerComponent({ children }) {
  return <div className={`m-0 flex items-center p-0`}>{children}</div>;
}
