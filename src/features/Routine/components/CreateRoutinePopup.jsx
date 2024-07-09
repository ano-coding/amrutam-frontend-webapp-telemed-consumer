import {
  CloseButton,
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import CloseCircleSvg from "../../../assets/close-circle.svg?react";

export default function CreateRoutinePopup({ open, setOpen }) {
  const navigate = useNavigate();
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
                    <CloseCircleSvg />
                  </button>
                  <CloseButton
                    onClick={() => {
                      setOpen(false);
                      navigate("create");
                    }}
                    className="whitespace-nowrap rounded-xl bg-[#3a643b] px-4 py-[10px] text-center text-[16px] font-medium leading-[24px] tracking-[-0.01em] text-white duration-100 hover:bg-[#618a61] active:scale-95 sm:py-[17px]"
                  >
                    Create New Routine
                  </CloseButton>
                  <div className="self-center">
                    <ul className="list-inside list-disc whitespace-nowrap pl-2 text-start text-[15px] leading-[24px] tracking-[-0.01em] text-[#646665]">
                      <li>New Personalized templates</li>
                      <li>Add upto 7 reminders</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-center gap-6">
                    <div className="h-0.5 w-[70px] bg-[#b0c1b1]" />
                    <span className="px-1 font-nunito text-[16px] font-semibold leading-[24px] tracking-[-0.01em] text-neutral-500">
                      OR
                    </span>
                    <div className="h-0.5 w-[70px] bg-[#b0c1b1]" />
                  </div>
                  <button className="hover:bg-whitesmoke-100 whitespace-nowrap rounded-xl border-[1.5px] border-[#3a643b] px-4 py-[10px] text-[16px] font-semibold leading-[24px] tracking-[-0.01em] text-[#3a643b] duration-100 active:scale-95 sm:py-[17px]">
                    Import from Templates
                  </button>
                  <div className="self-center">
                    <ul className="ml-2 list-inside list-disc whitespace-nowrap text-start text-[15px] leading-[24px] tracking-[-0.01em] text-[#646665]">
                      <li>Multiple templates created by us</li>
                      <li>Customize according to your need</li>
                    </ul>
                  </div>
                  <div className="text-[15px] font-medium text-[#3a643b] [text-decoration:underline]">
                    View Sample Templates
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
