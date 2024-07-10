import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import VerticalTripleDotSvg from "./../../../assets/vertical-triple-dot.svg?react";

const RoutinePopOverMenu = ({ render, dotClassNames, panelWidth }) => {
  return (
    <Popover>
      <PopoverButton className="flex w-3 justify-center focus:outline-none data-[active]:text-black data-[hover]:text-black data-[focus]:outline-1 data-[focus]:outline-black">
        <VerticalTripleDotSvg className={dotClassNames} />
      </PopoverButton>
      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel
          modal="true"
          anchor="left start"
          className="font-poppins rounded-xl bg-white text-sm/6 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div
            className={`flex w-[${panelWidth}] font-poppins flex-col text-[18px] leading-[21.88px] tracking-[-0.01em] text-[#1E1E1E]`}
          >
            {render()}
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};

export default RoutinePopOverMenu;
