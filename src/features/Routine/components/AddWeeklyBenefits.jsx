import { useMediaQuery } from "react-responsive";
import TrashSvg from "./../../../assets/trash.svg?react";
import AddMoreButton from "./AddMoreButton";
import { useFieldArray, useFormContext } from "react-hook-form";

const AddWeeklyBenefits = ({ weekRange, isEdit }) => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 640 });
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `weeklyBenefits.${weekRange}`,
    shouldUnregister: true,
  });

  if (!isEdit && fields.length === 0) {
    append({ description: "" }); // Append an initial field
  }

  return (
    <div className="my-2 flex flex-col gap-10 md:mr-10">
      {fields.map((field, i) => (
        <div
          key={field.id}
          className="flex items-center justify-between gap-3 sm:gap-10"
        >
          <div className="flex-1">
            <div className="relative w-full rounded-[16px] border-[1.5px] border-[#ced8e0] px-3 py-2 shadow-sm">
              <label
                htmlFor={`description-${weekRange}-${i}`}
                className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-[12px] leading-[16px] text-neutral-400"
              >
                {`Benefit ${i + 1}`}
              </label>
              <textarea
                rows={isTabletOrMobile ? 4 : 1}
                type="text"
                id={`description-${weekRange}-${i}`}
                className="custom-scrollbar row block w-full border-0 p-0 py-1.5 pl-1 text-[14px] leading-[24px] text-black placeholder-neutral-400 placeholder:text-sm focus:ring-0"
                {...register(`weeklyBenefits.${weekRange}.${i}.description`, {
                  required: "*This field cannot be empty",
                })}
              />

              {errors?.weeklyBenefits?.[weekRange]?.at(i)?.description
                ?.message && (
                <span className="absolute bottom-0.5 right-7 text-[12px] text-red-600">
                  {
                    errors?.weeklyBenefits?.[weekRange]?.at(i)?.description
                      ?.message
                  }
                </span>
              )}
            </div>
          </div>
          <div className="w-4 sm:w-8">
            <TrashSvg
              onClick={() => remove(i)}
              className={`size-4 cursor-pointer ${fields.length > 1 ? "" : "hidden"}`}
            />
          </div>
        </div>
      ))}
      <div className="mr-[28px] self-end">
        <AddMoreButton onClick={() => append({ description: "" })} />
      </div>
    </div>
  );
};

export default AddWeeklyBenefits;
