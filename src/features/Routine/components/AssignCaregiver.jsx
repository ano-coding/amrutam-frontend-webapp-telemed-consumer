import { useState } from "react";
import AddMoreButton from "../components/AddMoreButton";

import ModalWindow from "../components/ModalWindow";
import Breadcrumb from "../../../components/Breadcrumb";
import ContentBoxLayout from "../../../components/ContentBoxLayout";
import CareGiverInvitationModal from "./CareGiverInvitationModal";

const breadCrumbList = [
  {
    name: "Routines",
    link: "routines",
    isActive: false,
  },
  {
    name: "Create Routine",
    link: "routines/create",
    isActive: false,
  },
  {
    name: "Assign a Caregiver",
    link: "routines/create/assign-caregiver",
    isActive: true,
  },
];

const CaregiverCard = ({ name, image, description }) => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);

  return (
    <div className="flex justify-between">
      <div className="flex justify-between gap-[10px]">
        <img
          className="h-11 w-11 rounded object-cover"
          src={image}
          alt={name}
        />
        <div>
          <div className="text-[15px] font-semibold leading-[24px] tracking-[0.15px]">
            {name}
          </div>
          <div className="text-[12px] tracking-[-0.02em] text-[#A0A0A0]">
            {description}
          </div>
        </div>
      </div>
      <ModalWindow open={open} name={name} image={image} setOpen={setOpen} />
      <AddMoreButton onClick={openModal} label="Add" />
    </div>
  );
};

const AssignCaregiver = () => {
  const [openInvitationModal, setOpenInvitationModal] = useState(false);
  return (
    <div className="flex w-full flex-col gap-[37px]">
      <Breadcrumb list={breadCrumbList} />
      <div className="flex w-full flex-col items-center justify-between rounded-[15px] bg-[#FFF7E2] px-5 py-6 md:flex-row lg:px-12 lg:py-8">
        <div className="flex w-full flex-col gap-2">
          <h1 className="font-nunito text-2xl font-bold text-[#3a643b]">
            {`What is “Assign a Caregiver”?`}
          </h1>

          <p className="rounded-lg text-justify font-light text-[#484848]">
            {`"Assign a caregiver allows users to designate a person, such as a doctor, friend, or family member, who will receive notifications regarding the user's daily routines.`}
          </p>
        </div>
      </div>
      <ContentBoxLayout title={`Assign a Caregiver`}>
        <div className="flex w-full flex-col gap-6 rounded-xl bg-white px-5 py-4 lg:pr-16">
          <div className="text-[22px] text-black">Assign a Caregiver</div>
          <div className="flex h-10 items-center justify-start gap-2 rounded-xl bg-[#f4f5fa] px-3 md:w-[400px]">
            <img src="/search-icon.svg" alt="Search Icon" />
            <input
              className="flex-1 border-none bg-transparent px-2 py-1 text-[14px] font-medium leading-5 text-[#3A643B] placeholder-[#b0c1b1] focus:border-none focus:outline-none focus:ring-0 focus:ring-offset-0"
              placeholder="Search for a Caregiver"
            />
          </div>
          <div className="text-[14px] font-medium leading-[16px] text-neutral-800">
            Quick Add
          </div>
          <div className="flex flex-col gap-10 px-3">
            <CaregiverCard
              image="/person3.png"
              name="Dr. Pooja"
              description="Recent Consultation"
            />
            <CaregiverCard
              image={"/person2.png"}
              name={"Sister <3"}
              description={"Recent Caregiver"}
            />
          </div>
          <button
            onClick={() => setOpenInvitationModal(true)}
            className="mx-auto my-16 box-border rounded-xl border-[1.5px] border-solid border-[#3A643B] px-16 py-[17px] text-center text-base font-semibold text-[#3A643B] shadow-md duration-100 hover:bg-[#f4f4f4] active:scale-95 md:w-[23.4rem]"
          >
            Invite Your Friend
          </button>
        </div>
      </ContentBoxLayout>
      <CareGiverInvitationModal
        open={openInvitationModal}
        setOpen={setOpenInvitationModal}
      />
    </div>
  );
};

export default AssignCaregiver;
