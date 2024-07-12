import { Fragment, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { useFormContext, Controller } from "react-hook-form";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const getLabelById = (id, items) => {
  const item = items.find((item) => item.id === id);
  return item ? item.label : null;
};

export default function ActivityTypeDropdown({
  label,
  list,
  mdWidth,
  placeholder,
  className,
  name,
  disabled,
  requiredMessage,
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [selected, setSelected] = useState();

  return (
    <Controller
      name={name}
      rules={{ required: requiredMessage }}
      control={control}
      render={({ field }) => (
        <Menu
          as="div"
          className={`relative ${disabled ? "opacity-55" : ""} ${className} inline-block text-left md:${mdWidth}`}
        >
          <MenuButton
            disabled={disabled}
            className="relative w-full rounded-[16px] border-[1.5px] border-[#ced8e0] px-3 py-2 shadow-sm"
          >
            <label
              htmlFor="search"
              className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-[12px] leading-[16px] text-neutral-400"
            >
              {label}
            </label>
            <div className="relative flex items-center justify-between gap-3">
              <input
                disabled={disabled}
                type="text"
                name={field.name}
                id={field.name}
                value={
                  getLabelById(selected, list) ||
                  getLabelById(field.value, list) ||
                  ""
                }
                className="block w-full select-none border-0 p-0 py-1.5 pl-1 text-[16px] capitalize leading-[24px] text-black placeholder-neutral-400 caret-transparent placeholder:text-sm focus:ring-0"
                placeholder={placeholder}
                readOnly
              />
              <img
                className="mr-2"
                src="/dropdown-icon.svg"
                alt="DropDown Icon"
              />
              {errors?.[name] && (
                <span className="absolute -bottom-2 right-1 text-[12px] font-medium text-red-500">
                  {errors?.[name].message}
                </span>
              )}
            </div>
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
            <MenuItems className="absolute right-0 z-30 mr-2 mt-2 w-3/5 origin-top-right rounded-md bg-white shadow-lg shadow-[#ced8e0] ring-1 ring-[#ced8e0] ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {list.map((item) => (
                  <MenuItem key={item?.id}>
                    {({ focus }) => {
                      return (
                        <span
                          onClick={() => {
                            setSelected(item?.id);
                            field.onChange(item?.id);
                          }}
                          className={classNames(
                            focus
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm capitalize",
                          )}
                        >
                          {getLabelById(item?.id, list)}
                        </span>
                      );
                    }}
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Transition>
        </Menu>
      )}
    />
  );
}
