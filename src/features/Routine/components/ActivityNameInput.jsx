import { useFormContext } from "react-hook-form";

const ActivityNameInput = ({ label, placeholder, className, mdWidth }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col gap-1">
      <div
        className={`relative rounded-[16px] ${className} border-[1.5px] border-[#ced8e0] px-4 py-2 shadow-sm md:w-[${mdWidth}px]`}
      >
        <label
          htmlFor={label}
          className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-[12px] leading-[16px] text-neutral-400"
        >
          {label}
        </label>

        <input
          type="text"
          id={label}
          className="block w-full border-0 p-0 py-1.5 text-[16px] leading-[24px] text-black placeholder-neutral-400 placeholder:text-sm focus:ring-0"
          placeholder={placeholder}
          {...register("activityName", {
            required: "*Activity name is required",
            maxLength: {
              value: 50,
              message: "*Activity name must not exceed 50 characters",
            },
          })}
        />
        {errors?.activityName && (
          <p className="absolute bottom-0 right-2 text-[12px] font-medium text-red-500">
            {errors?.activityName?.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ActivityNameInput;
