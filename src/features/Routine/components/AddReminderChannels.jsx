import "react-phone-number-input/style.css";
import { useFormContext } from "react-hook-form";
import { PhoneInputReminderChannel } from "./PhoneInputReminderChannel";
import ToggleButtonReminderChannel from "./ToggleButtonReminderChannel";

const AddReminderChannels = ({ title, channel, name }) => {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const isActive = watch(`${name}Status`);

  return (
    <div className="flex w-full flex-col items-end gap-5 rounded-[20px] border-[1.5px] border-solid border-[#ced8e0] p-4 shadow-md sm:w-96 lg:w-[432px]">
      <div className="flex w-full items-center justify-between">
        <span className="text-[14px] text-black">{title}</span>
        <ToggleButtonReminderChannel isActive={isActive} name={name} />
      </div>
      <div
        className={`relative w-full select-none ${!isActive ? `opacity-40` : ""}`}
      >
        {!isActive && <div className={`absolute z-20 h-full w-full`}></div>}
        {["sms", "call", "whatsapp"].includes(name) && (
          <PhoneInputReminderChannel
            name={name}
            channel={channel}
            control={control}
            error={errors[name]}
            isActive={isActive}
          />
        )}
        {["email"].includes(name) && (
          <div className="flex flex-col gap-1">
            <div
              className={`relative rounded-[16px] border-[1.5px] border-[#ced8e0] shadow-sm`}
            >
              <label
                htmlFor={name}
                className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-[12px] leading-[16px] text-neutral-400"
              >
                {channel}
              </label>
              <input
                id={name}
                className={`w-full rounded-[16px] border-none px-4 py-2.5 focus:outline-none focus:ring-0`}
                {...register(name, {
                  required: isActive ? "*Email is required" : false,
                  pattern: {
                    value: isActive
                      ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                      : ``,
                    message: "*Invalid email address",
                  },
                })}
              />
            </div>
            {isActive && errors.email && (
              <span className="self-end pr-1 text-[13px] font-medium italic leading-4 text-red-600">
                {errors.email.message}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddReminderChannels;
