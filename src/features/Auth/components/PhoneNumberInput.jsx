import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export const PhoneNumberInput = ({ value, setValue, isProcessing = false }) => {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="phone" className="text-[18px] font-medium leading-[18px]">
        <span>{`Phone `}</span>
        <span className="font-bold text-[#dd461e]">*</span>
      </label>
      <div
        className={`relative w-full rounded-[8px] border-[2px] border-[#e5e7eb] px-3 py-2 shadow-sm ${isProcessing ? "opacity-70" : ""}`}
      >
        <PhoneInput
          disabled={isProcessing}
          id="phone"
          onChange={setValue}
          value={value}
          containerComponent={ContainerComponent}
          className={`block w-full border-0 p-0 py-1.5 text-[16px] leading-[24px] text-black placeholder-neutral-400 placeholder:text-sm focus:ring-0`}
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
