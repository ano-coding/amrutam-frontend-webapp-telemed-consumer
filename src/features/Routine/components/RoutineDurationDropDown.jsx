import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function RoutineDurationDropDown({
  value,
  onChange,
  label,
  list,
  mdWidth,
  placeholder,
  className,
}) {
  return (
    <div
      className={`relative ${className} inline-block text-left md:${mdWidth}`}
    >
      <Menu as="div" className="relative w-full">
        <MenuButton className="relative w-full rounded-[16px] border-[1.5px] border-[#ced8e0] px-3 py-2 shadow-sm">
          <label
            htmlFor="dropdown"
            className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-[12px] leading-[16px] text-neutral-400"
          >
            {label}
          </label>
          <div className="flex items-center justify-between gap-3">
            <input
              type="text"
              name="dropdown"
              id="dropdown"
              value={value || ""}
              readOnly
              className="block w-full select-none border-0 p-0 py-1.5 pl-1 text-[16px] leading-[24px] text-black placeholder-neutral-400 caret-transparent placeholder:text-sm focus:ring-0"
              placeholder={placeholder}
            />
            <img
              className="mr-2"
              src="/dropdown-icon.svg"
              alt="DropDown Icon"
            />
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
                <MenuItem key={item}>
                  {({ active }) => (
                    <span
                      onClick={() => onChange(item)}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm",
                      )}
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
    </div>
  );
}
