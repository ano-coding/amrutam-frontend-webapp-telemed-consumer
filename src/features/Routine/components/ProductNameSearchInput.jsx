import { Fragment, useContext, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { Controller, useFormContext } from "react-hook-form";
import { useDebounce } from "use-debounce";
import useGetSearchedProductsFromStore from "../../../hooks/routines/useGetSearchedProductsFromStore";
import { UserContext } from "../../../context/UserContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductNameSearchInput({
  label,
  mdWidth,
  placeholder,
  className,
}) {
  const { token } = useContext(UserContext);
  const {
    register,
    control,
    watch,
    getValues,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const [debouncedValue] = useDebounce(watch("searchProducts"), 300);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const {
    data: searchedProudcts,
    error,
    isLoading,
  } = useGetSearchedProductsFromStore(token, query);

  useEffect(() => {
    if (debouncedValue && debouncedValue.length >= 3) {
      setQuery(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <div
      className={`relative ${className} inline-block text-left md:${mdWidth}`}
    >
      <div className="relative w-full rounded-[16px] border-[1.5px] border-[#ced8e0] px-3 py-2 shadow-sm">
        <label
          htmlFor="concerns"
          className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-[12px] leading-[16px] text-neutral-400"
        >
          {label}
        </label>
        <div className="flex items-center justify-between gap-3">
          <Controller
            name="searchProducts"
            control={control}
            rules={{ required: "*Please Select a Product" }}
            defaultValue=""
            render={({ field }) => (
              <input
                type="text"
                {...field}
                id="search"
                className="block w-full border-0 p-0 py-1.5 pl-1 text-[16px] leading-[24px] text-black placeholder-neutral-400 placeholder:text-sm focus:ring-0"
                placeholder={placeholder}
                onFocus={() => setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 100)}
                onChange={(e) => {
                  field.onChange(e);
                  setValue("searchedProductId", null);
                }}
              />
            )}
          />
        </div>
        {errors?.searchProducts && (
          <p className="absolute bottom-0 right-2 text-[12px] font-medium text-red-500">
            {errors?.searchProducts?.message}
          </p>
        )}
        {!errors?.searchProducts && errors?.searchedProductId && (
          <p className="absolute bottom-0 right-2 text-[12px] font-medium text-red-500">
            {errors?.searchedProductId?.message}
          </p>
        )}

        <input
          type="hidden"
          {...register("searchedProductId", {
            required: "Please Choose from the Dropdown",
          })}
        />
      </div>

      <Transition
        as={Fragment}
        show={
          open && searchedProudcts?.data?.payload?.result?.length > 1
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
            className="max-h-60 overflow-auto py-1"
            style={{
              scrollbarWidth: "thin",
            }}
          >
            {searchedProudcts?.data?.payload?.result?.map((item) => (
              <div key={item.name}>
                <span
                  onClick={() => {
                    setValue("searchProducts", item.name);
                    setValue("searchedProductId", item.groupId);
                    clearErrors("searchProducts");
                    clearErrors("searchedProductId");
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
