import { isPossiblePhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-number-input/react-hook-form";

export const PhoneInputReminderChannel = ({
  control,
  name,
  isProcessing = false,
  error,
  channel,
  isActive,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <div
        className={`relative rounded-[16px] border-[1.5px] border-[#ced8e0] px-3 py-2 shadow-sm`}
      >
        <label
          htmlFor={name}
          className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-[12px] leading-[16px] text-neutral-400"
        >
          {channel}
        </label>

        <PhoneInput
          smartCaret={false}
          name={name}
          control={control}
          disabled={isProcessing}
          rules={{
            required: isActive,
            validate: isActive ? isPossiblePhoneNumber : "",
          }}
          id={name}
          containerComponent={ContainerComponent}
          className={`block w-full border-0 p-0 py-1.5 text-[16px] leading-[24px] text-black placeholder-neutral-400 placeholder:text-sm focus:ring-0`}
        />
      </div>
      {isActive && error && <ErrorElement message="*Invalid phone number" />}
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
