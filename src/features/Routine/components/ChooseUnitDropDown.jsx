import { Fragment, useContext, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { Controller, useFormContext } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { UserContext } from "../../../context/UserContext";
import useGetUnits from "../../../hooks/routines/useGetUnits";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function filterByQuery(units, query) {
  return units?.filter((item) =>
    item?.name?.toLowerCase().includes(query?.toLowerCase()),
  );
}

export default function ChooseUnitDropDown({
  label,
  mdWidth,
  placeholder,
  className,
}) {
  const { token } = useContext(UserContext);
  const {
    control,
    clearErrors,
    watch,
    register,

    setValue,
    formState: { errors },
  } = useFormContext();

  const { data: units } = useGetUnits(token);
  const [debouncedValue] = useDebounce(watch("dosageUnit"), 500);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredUnits = filterByQuery(units?.data, query);

  useEffect(() => {
    if (debouncedValue && debouncedValue.length >= 0) {
      setQuery(debouncedValue);
      setOpen(true);
    } else {
      setQuery("");
    }
  }, [debouncedValue]);

  return (
    <div
      className={`relative ${className} inline-block text-left md:${mdWidth}`}
    >
      <div className="relative w-full rounded-[16px] border-[1.5px] border-[#ced8e0] px-3 py-2 shadow-sm">
        <label
          htmlFor="units"
          className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-[12px] leading-[16px] text-neutral-400"
        >
          {label}
        </label>
        <div className="flex items-center justify-between gap-3">
          <Controller
            name="dosageUnit"
            control={control}
            rules={{ required: "*Please Select a Unit" }}
            defaultValue=""
            render={({ field }) => (
              <input
                type="text"
                {...field}
                id="units"
                className="block w-full border-0 p-0 py-1.5 pl-1 text-[16px] leading-[24px] text-black placeholder-neutral-400 placeholder:text-sm focus:ring-0"
                placeholder={placeholder}
                onFocus={() => setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 100)}
                onChange={(e) => {
                  field.onChange(e);
                  setValue("dosageUnitId", null);
                }}
              />
            )}
          />
        </div>
        {errors?.dosageUnit && (
          <p className="absolute bottom-0 right-2 text-[12px] font-medium text-red-500">
            {errors?.dosageUnit?.message}
          </p>
        )}
        {!errors?.dosageUnit && errors?.dosageUnitId && (
          <p className="absolute bottom-0 right-2 text-[12px] font-medium text-red-500">
            {errors?.dosageUnitId?.message}
          </p>
        )}

        <input
          type="hidden"
          {...register("dosageUnitId", {
            required: "Choose from Dropdown",
          })}
        />
      </div>

      <Transition
        as={Fragment}
        show={
          open &&
          !filteredUnits?.some(
            (item) =>
              item?.name?.toLowerCase() === watch("dosageUnit")?.toLowerCase(),
          )
            ? true
            : false
        }
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="absolute right-0 z-30 mr-2 mt-2 w-4/5 origin-top-right rounded-md bg-white shadow-lg shadow-[#ced8e0] ring-1 ring-[#ced8e0] ring-opacity-5 focus:outline-none">
          <div
            className="max-h-36 overflow-auto py-1"
            style={{
              scrollbarWidth: "thin",
            }}
          >
            {filteredUnits?.map((item) => (
              <div key={item.name}>
                <span
                  onClick={() => {
                    setValue("dosageUnit", item.name);
                    setValue("dosageUnitId", item._id);
                    clearErrors("dosageUnitId");
                    clearErrors("dosageUnit");
                  }}
                  className={classNames(
                    "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                    "block px-4 py-2 text-sm",
                  )}
                >
                  <span className="line-clamp-3">{item.name}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Transition>
    </div>
  );
}
