import {
  CloseButton,
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import CloseCircleSvg from "../../../assets/close-circle.svg?react";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";
import SingleLineInput from "./SingleLineInput";

const CareGiverInvitationModal = ({ open, setOpen }) => {
  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={setOpen}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative flex transform flex-col items-center gap-10 overflow-hidden rounded-[24px] bg-white px-6 pb-6 shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                <div className="flex w-full flex-col gap-6 py-5">
                  <button onClick={() => setOpen(false)} className="self-end">
                    <CloseCircleSvg className={`size-[33px]`} />
                  </button>
                  <div className="self-start text-[15px] leading-[16px]">
                    Copy Invitation Link
                  </div>
                  <div
                    className={`relative rounded-[16px] border-[1.5px] border-[#ced8e0] px-3 py-2 shadow-sm`}
                  >
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="block w-full border-0 p-0 py-1.5 text-[16px] leading-[24px] text-black placeholder-neutral-400 placeholder:text-sm focus:ring-0"
                    />
                  </div>

                  <div className="flex items-center justify-center gap-6">
                    <div className="h-0.5 w-[70px] bg-[#b0c1b1]" />
                    <span className="px-1 font-nunito text-[16px] font-semibold leading-[24px] tracking-[-0.01em] text-neutral-500">
                      OR
                    </span>
                    <div className="h-0.5 w-[70px] bg-[#b0c1b1]" />
                  </div>
                  <SingleLineInput label="First Name" />
                  <SingleLineInput label="Last Name" />
                  <SingleLineInput label="Email Id" />
                  <PhoneNumberInput label="Enter Phone Number" />
                  <CloseButton className="whitespace-nowrap rounded-xl bg-[#3a643b] px-4 py-[10px] text-center text-[16px] font-medium leading-[24px] tracking-[-0.01em] text-white hover:bg-[#618a61] active:scale-95 sm:py-[17px]">
                    Submit
                  </CloseButton>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CareGiverInvitationModal;

const PhoneNumberInput = ({ label, className, mdWidth }) => {
  const [value, setValue] = useState();
  return (
    <div className="flex flex-col gap-1">
      <div
        className={`relative rounded-[16px] ${className} border-[1.5px] border-[#ced8e0] px-3 py-2 shadow-sm md:w-[${mdWidth}px]`}
      >
        <label
          htmlFor="concerns"
          className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-[12px] leading-[16px] text-neutral-400"
        >
          {label}
        </label>

        <PhoneInput
          onChange={setValue}
          value={value}
          containerComponent={ContainerComponent}
          className="block w-full border-0 p-0 py-1.5 text-[16px] leading-[24px] text-black placeholder-neutral-400 placeholder:text-sm focus:ring-0"
        />
      </div>
    </div>
  );
};

function ContainerComponent({ children }) {
  return <div className={`m-0 flex items-center p-0`}>{children}</div>;
}
