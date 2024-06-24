import ContentBoxLayout from "../components/ContentBoxLayout";

const patient = {
  img: "/avatar-person.svg",
  name: "Priya Singhal",
  dob: "24th July, 1999",
  gender: "female",
  mobile: "9906548776",
  height: "179 cm",
  weight: "70 kg",
};

const PatientProfile = () => {
  return (
    <ContentBoxLayout title={"Personal & Contact Details"}>
      <div className="flex w-full flex-col gap-10 p-6 xl:px-10">
        <div className="flex w-full justify-end">
          <button className="rounded-lg border-[1.5px] border-solid border-[#3a643b] px-3 py-1 text-center text-[14px] font-medium leading-[22.5px] text-[#3a643b]">
            Edit Profile
          </button>
        </div>
        <div className="flex flex-col items-center justify-center gap-10 lg:flex-row lg:gap-5 xl:gap-8">
          <img
            src={patient.img}
            className="aspect-square h-[160px] rounded-full xl:h-[174px]"
          />
          <div className="grid w-full grid-cols-1 gap-x-3 gap-y-10 md:grid-cols-3">
            <DetailBox title={"Full Name"} detail={patient.name} />
            <DetailBox title={"DOB"} detail={patient.dob} />
            <DetailBox title={"Gender"} detail={patient.gender} />
            <DetailBox title={"Mob No."} detail={patient.mobile} />
            <DetailBox title={"Height"} detail={patient.height} />
            <DetailBox title={"Weight"} detail={patient.weight} />
          </div>
        </div>
      </div>
    </ContentBoxLayout>
  );
};

export default PatientProfile;

const DetailBox = ({ title, detail }) => {
  return (
    <div className="flex flex-col items-center gap-0.5 lg:items-start">
      <div className="whitespace-nowrap text-[14px] text-[#3a643b]">
        {title}
      </div>
      <div className="whitespace-nowrap text-lg font-semibold text-[#3a643b] xl:text-[18px]">
        {detail}
      </div>
    </div>
  );
};
