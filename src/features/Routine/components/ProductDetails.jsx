import Breadcrumb from "../../../components/Breadcrumb";
import PhotoUploader from "../components/PhotoUploader";
import SingleLineInput from "../components/SingleLineInput";
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
    name: "Add Reminder",
    link: "routines/create/add-reminder",
    isActive: false,
  },

  {
    name: "Add Your Product",
    link: "routines/create/add-reminder/product-details",
    isActive: true,
  },
];
const ProductDetails = () => {
  return (
    <div className="flex w-full flex-col gap-[37px]">
      <Breadcrumb list={breadCrumbList} />
      <div className="flex items-center gap-3 rounded-[15px] bg-[#FFF7E2] px-2 py-4 lg:px-4 lg:py-6">
        <div className="flex items-center justify-center rounded-full bg-[#EAF2EA] p-1">
          <BiQuestionSvg className={`size-7 fill-[#3a643b]`} />
        </div>
        <div className="text-[16px] font-light text-[#3A643B]">
          Unable to find your product? Add your product by filling a few details
          for better experience with Amrutam. 🤝🏻
        </div>
      </div>
      <ContentBoxLayout title="Add Your Product">
        <div className="mb-2 flex w-full flex-col gap-10 rounded-xl px-5 py-4 lg:pr-16">
          <div className="text-[18px] font-medium text-black">
            Enter Product Details
          </div>
          <div className="flex w-full flex-col items-center gap-20 md:flex-row md:items-start xl:gap-[16rem]">
            <div className="flex w-full flex-col gap-10 md:w-fit">
              <SingleLineInput
                label="Product Name"
                placeholder="Ex. Chyawanprash"
                mdWidth={400}
              />
              <SingleLineInput
                label="Brand Name"
                placeholder="Ex. Dabar"
                mdWidth={400}
              />
            </div>
            <PhotoUploader />
          </div>
          <div className="my-10 flex items-center justify-center gap-6">
            <div className="h-0.5 w-full bg-[#b0c1b1] sm:w-[160px]" />
            <span className="px-1 font-nunito text-[16px] font-semibold leading-[24px] tracking-[-0.01em] text-neutral-500">
              OR
            </span>
            <div className="h-0.5 w-full bg-[#b0c1b1] sm:w-[160px]" />
          </div>
          <SingleLineInput
            label={"Product Link"}
            mdWidth={400}
            placeholder={`https://www.company.com/`}
          />
          <button className="mx-auto my-10 box-border rounded-xl bg-[#3A643B] px-16 py-[17px] text-center text-base font-semibold text-white shadow-[0px_4px_14px_rgba(58,_100,_59,_0.25)] md:w-[23.4rem]">
            Add Product
          </button>
        </div>
      </ContentBoxLayout>
    </div>
  );
};

export default ProductDetails;
