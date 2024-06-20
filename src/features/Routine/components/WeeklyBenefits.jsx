import Breadcrumb from "../../../components/Breadcrumb";
import SimpleDropDownComponent from "../components/DropDownComponent";
import TextAreaWithAddMore from "../components/TextAreaWithAddMore";
import BiQuestionSvg from "../../../assets/bi-question.svg?react";
import ContentBoxLayout from "../../../components/ContentBoxLayout";
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
    name: "Weekly Benefits",
    link: "routines/create/weekly-benefits",
    isActive: true,
  },
];

const WeeklyBenefits = () => {
  return (
    <div className="flex w-full flex-col gap-[37px]">
      <Breadcrumb list={breadCrumbList} />
      <div className="flex items-center gap-3 rounded-[15px] bg-[#FFF7E2] px-2 py-4 lg:px-4 lg:py-6">
        <div className="flex items-center justify-center rounded-full bg-[#EAF2EA] p-1">
          <BiQuestionSvg className={`size-7 fill-[#3a643b]`} />
        </div>
        <div className="text-[16px] font-light text-[#3A643B]">
          This weekly benefit will help potential users track their weekly
          progress while using this routine.
        </div>
      </div>
      <ContentBoxLayout title="Add Weekly Benefits">
        <div className="mb-2 flex w-full flex-col gap-10 rounded-xl px-5 py-4 lg:pr-16">
          <div className="text-[18px] font-medium text-black">
            Enter Weekly Benefits
          </div>
          <SimpleDropDownComponent
            label={`Select Weeks`}
            mdWidth={`w-[400px]`}
            list={[
              "1 week",
              "2 weeks",
              "3 weeks",
              "4 weeks",
              "5 weeks",
              "6 weeks",
            ]}
          />
          <div className="flex flex-wrap gap-5 lg:gap-8">
            <TextAreaWithAddMore label="0-2 Week Benefits" />
            <TextAreaWithAddMore label="2-4 Week Benefits" />
            <TextAreaWithAddMore label="4-6 Week Benefits" />
          </div>
          <button className="mx-auto my-10 box-border rounded-xl bg-[#3A643B] px-16 py-[17px] text-center text-base font-semibold text-white shadow-[0px_4px_14px_rgba(58,_100,_59,_0.25)] duration-100 hover:bg-[#618a61] active:scale-95 md:w-[23.4rem]">
            Save Benefits
          </button>
        </div>
      </ContentBoxLayout>
    </div>
  );
};

export default WeeklyBenefits;
