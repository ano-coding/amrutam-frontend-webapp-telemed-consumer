import { Fragment, useState } from "react";
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

export default function SimpleDropDownComponent({
  label = "",
  list,
  // mdWidth,
  placeholder,
}) {
  const [selected, setSelected] = useState("");
  return (
    <Menu as="div" className={`relative inline-block text-left`}>
      <MenuButton className="border-blue-ice relative w-full rounded-[16px] border-[1.5px] px-3 py-2 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <input
            type="text"
            name="name"
            id="name"
            value={selected}
            className="font-poppins block w-full select-none border-0 p-0 py-1.5 pl-1 text-[16px] leading-[24px] text-black placeholder-neutral-400 caret-transparent placeholder:text-sm focus:ring-0"
            placeholder={placeholder}
          />
          <img
            className="mr-2 mt-2"
            src="/arrow-down.png"
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
        <MenuItems className="shadow-blue-ice ring-blue-ice absolute right-0 z-30 mr-2 mt-2 w-3/5 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {list.map((item) => (
              <MenuItem key={item}>
                {({ focus }) => (
                  <span
                    onClick={() => setSelected(item)}
                    className={classNames(
                      focus ? "bg-[#7b7b7b] text-gray-900" : "text-gray-700",
                      "font-poppins block px-4 py-2 text-sm",
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
  );
}
