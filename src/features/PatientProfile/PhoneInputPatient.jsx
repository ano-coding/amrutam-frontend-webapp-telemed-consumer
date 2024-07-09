import { isPossiblePhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-number-input/react-hook-form";

export const PhoneInputPatient = ({ control, isProcessing = false, error }) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <label
        htmlFor="phone"
        className="font-nunito text-[18px] font-semibold leading-[18px]"
      >
        <span>{`Phone `}</span>
        <span className="font-bold text-[#dd461e]">*</span>
      </label>
      <div className="flex w-full flex-col gap-1">
        <div
          className={`relative w-full rounded-[8px] border-[2px] px-3 py-2 shadow-sm ${isProcessing ? "opacity-70" : ""} ${error ? "border-red-500" : "border-[#e5e7eb]"}`}
        >
          <PhoneInput
            smartCaret={false}
            name="phoneNumber"
            control={control}
            disabled={isProcessing}
            rules={{ required: true, validate: isPossiblePhoneNumber }}
            id="phone"
            containerComponent={ContainerComponent}
            className={`block w-full border-0 p-0 py-1.5 text-[16px] leading-[24px] text-black placeholder-neutral-400 placeholder:text-sm focus:ring-0`}
          />
        </div>
        {error && <ErrorElement message="*Invalid phone number" />}
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

const ErrorElement = ({ message }) => (
  <span className="self-end pr-1 text-[13px] font-medium italic leading-4 text-red-600">
    {message || "*This field is required"}
  </span>
);
