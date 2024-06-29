import TrashSvg from "./../../../assets/trash.svg?react";
import { useState } from "react";
import AddMoreButton from "./AddMoreButton";
import SimpleTextArea from "./SimpleTextArea";

const AddWeeklyBenefits = () => {
  const [benefitNo, setBenefitNo] = useState(1);
  return (
    <div className="my-2 flex flex-col gap-10 md:mr-10">
      {Array.from({ length: benefitNo }, (_, i) => 1 + i).map((item) => (
        <div
          key={item}
          className="flex items-center justify-between gap-3 sm:gap-10"
        >
          <div className="flex-1 sm:hidden">
            <SimpleTextArea rows={3} label={`Benefit ${item}`} />
          </div>
          <div className="hidden flex-1 sm:block">
            <SimpleTextArea rows={1} label={`Benefit ${item}`} />
          </div>
          <div className="w-4 sm:w-8">
            <TrashSvg
              onClick={() => setBenefitNo((no) => no > 1 && no - 1)}
              className={`size-4 cursor-pointer ${benefitNo <= item && benefitNo !== 1 ? "" : "hidden"}`}
            />
          </div>
        </div>
      ))}
      <div className="mr-[28px] self-end">
        <AddMoreButton onClick={() => setBenefitNo((no) => no + 1)} />
      </div>
    </div>
  );
};

export default AddWeeklyBenefits;
