import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export const PhoneNumberInput = () => {
  const [value, setValue] = useState();
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[16px] font-medium leading-[18px]">Phone</label>
      <div
        className={`relative w-full rounded-[8px] border-[1.5px] border-[#e5e7eb] px-3 py-1.5 shadow-sm`}
      >
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
  return (
    <div
      className={`m-0 flex items-center p-0 outline-none focus:outline-none focus:ring-0`}
    >
      {children}
    </div>
  );
}
