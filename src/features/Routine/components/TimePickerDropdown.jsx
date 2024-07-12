import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import DropdownSvg from "./../../../assets/dropdown-icon.svg?react";
import { useFormContext } from "react-hook-form";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TimePickerDropdown({ name, label, list, index }) {
  const {
    register,
    setValue,
    formState: { errors },
    clearErrors,
  } = useFormContext();
  return (
    <Menu
      as="div"
      className={`relative inline-block w-[105px] text-left sm:w-[150px]`}
    >
      <MenuButton className="relative w-full rounded-[16px] border-[1.5px] border-[#ced8e0] px-2 py-1 shadow-sm">
        <label
          htmlFor={label}
          className="font-poppins absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-[12px] capitalize leading-[16px] text-neutral-400"
        >
          {label}
        </label>
        <div className="flex items-center justify-between gap-3">
          <input
            readOnly
            type="text"
            id={label}
            className="font-poppins block w-full select-none border-0 p-0 py-1.5 pl-1 text-[16px] leading-[24px] text-black placeholder-neutral-400 caret-transparent placeholder:text-sm focus:ring-0"
            {...register(`${name}.${index}.${label}`, {
              required: `*Select ${label}`,
            })}
          />
          <DropdownSvg className="mr-2 size-5" />
        </div>
        {errors?.[name]?.[index]?.[label] && (
          <span className="absolute bottom-0 right-1 text-[12px] font-medium text-red-500 sm:right-3">
            {errors?.[name]?.[index]?.[label]?.message}
          </span>
        )}
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="custom-scrollbar absolute right-0 z-30 mr-1 mt-1 max-h-52 w-4/5 origin-top-right overflow-auto rounded-md bg-white shadow-lg shadow-[#ced8e0] ring-1 ring-[#ced8e0] ring-opacity-50 focus:outline-none">
          <div className="py-1">
            {list.map((item) => (
              <MenuItem key={item}>
                {({ focus }) => (
                  <span
                    className={classNames(
                      focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "font-poppins block px-4 py-2 text-sm",
                    )}
                    onClick={() => {
                      setValue(`${name}.${index}.${label}`, item);
                      clearErrors(`${name}.${index}.${label}`);
                    }}
                  >
                    {item}
                  </span>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
