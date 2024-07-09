import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState } from "react";

export default function ModalWindow({ open, name, image, setOpen }) {
  const [isAssigned, setIsAssigned] = useState(false);
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
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative flex transform flex-col items-center gap-10 overflow-hidden rounded-[24px] bg-white px-6 pb-6 shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="relative mt-2 h-1 w-11 rounded bg-neutral-300" />
                <div className="mt-5 flex flex-col items-center gap-3">
                  <img
                    className="h-11 shrink-0 rounded object-cover"
                    src={image}
                  />
                  <div className="text-[15px] font-medium leading-[24px] tracking-[0.15px]">
                    {name}
                  </div>
                  <div className="text-center text-[14px] leading-[20px] text-neutral-500">
                    {isAssigned
                      ? `Your request for Assign as Caregiver has been sent ✅`
                      : `Are you sure you want to Assign Dr. Pooja as your Caregiver for this Routine?`}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {!isAssigned && (
                    <>
                      <button
                        onClick={() => setIsAssigned(true)}
                        className="mx-auto box-border rounded-xl bg-[#3A643B] px-16 py-[15px] text-center text-base font-medium text-white shadow-[0px_4px_14px_rgba(58,_100,_59,_0.25)] duration-100 hover:bg-[#618a61] active:scale-95 md:w-[23.4rem]"
                      >
                        Assign as Caregiver
                      </button>

                      <button className="mx-auto box-border rounded-xl border-[1.5px] border-solid border-[#3A643B] px-16 py-[15px] text-center text-base font-semibold text-[#3A643B] shadow-md duration-100 hover:bg-[#f4f4f4] active:scale-95 md:w-[23.4rem]">
                        View Profile
                      </button>
                    </>
                  )}
                  {isAssigned && (
                    <button
                      onClick={() => setOpen(false)}
                      className="mx-auto box-border rounded-xl border-[1.5px] border-solid border-[#3A643B] px-16 py-[15px] text-center text-base font-semibold text-[#3A643B] shadow-md duration-100 hover:bg-[#f4f4f4] active:scale-95 md:w-[23.4rem]"
                    >
                      Go back
                    </button>
                  )}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
