import { useState } from "react";
import SortModal from "./SortModal";
import SortField from "./SortField";

const MobileFilters = () => {
  //States
  const [showConcernModal, setShowConcernModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  //Handlers
  const showConcernModalHandler = () => {
    setShowConcernModal((prev) => !prev);
  };
  const showCategoryModalHandler = () => {
    setShowCategoryModal((prev) => !prev);
  };
  const closeConcernModalhandler = () => {
    setShowConcernModal(false);
  };
  const closeCategoryModalhandler = () => {
    setShowCategoryModal(false);
  };
  const clearHandler = () => {
    setSelectedOption(null);
  };

  return (
    <>
      <div className="fixed bottom-10 z-20 hidden h-[77px] w-full justify-center gap-[60px] bg-customgreen-100 pt-3 max-sm:flex [&_span]:font-nunito [&_span]:text-base [&_span]:font-medium [&_span]:tracking-tight [&_span]:text-customgreen-800">
        <span onClick={showConcernModalHandler}>Concern</span>
        <div className="h-[15px] w-[1px] bg-customgreen-800" />
        <span onClick={showCategoryModalHandler}>Category</span>
      </div>
      {(showCategoryModal || showConcernModal) && (
        <div className="fixed bottom-9 z-50 mb-10 hidden w-full gap-[60px] bg-customgreen-100 pt-3 max-sm:flex [&_span]:font-nunito [&_span]:text-base [&_span]:font-medium [&_span]:tracking-tight [&_span]:text-customgreen-800">
          {(showCategoryModal || showConcernModal) && (
            <div className="bg-[rgba(0, 0, 0, 0.4)] fixed left-0 top-0 z-10 h-screen w-screen backdrop-blur-lg" />
          )}
          {showConcernModal ? (
            <SortModal
              isOpen={showConcernModal}
              onClose={closeConcernModalhandler}
            >
              <div className="shadow-[0px_-2px_12px_-2px_rgba(0, 0, 0, 0.51)] absolute bottom-[-75px] left-0 z-[100] mx-auto my-0 w-full rounded-t-xl bg-white px-4 py-3">
                <div className="mx-auto my-0 h-1 w-[41px] rounded bg-[#e2e2e2]" />
                <div className="flex items-center justify-between [&_button]:border-none [&_button]:bg-transparent [&_button]:font-nunito [&_button]:text-sm [&_button]:font-bold [&_button]:tracking-tight [&_button]:text-customgreen-800 [&_button]:outline-none">
                  <h3 className="font-nunito text-lg font-bold tracking-tight text-customblack-100">
                    Sort by concern
                  </h3>
                  <button onClick={clearHandler}>Clear</button>
                </div>
                <SortField
                  id={1}
                  name={"Color Protection"}
                  grpName={""}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
                <SortField
                  id={2}
                  name={"Dry and Frizzy Hair"}
                  grpName={"Concern"}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
                <SortField
                  id={3}
                  name={"Shine & Luster"}
                  grpName={"Concern"}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
                <SortField
                  id={4}
                  name={"Hair Growth"}
                  grpName={"Concern"}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
                <SortField
                  id={5}
                  name={"Hair loss and thinning"}
                  border={"none"}
                  grpName={"Concern"}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
              </div>
            </SortModal>
          ) : (
            ""
          )}
          {showCategoryModal ? (
            <SortModal
              isOpen={showCategoryModal}
              onClose={closeCategoryModalhandler}
            >
              <div className="shadow-[0px_-2px_12px_-2px_rgba(0, 0, 0, 0.51)] absolute bottom-[-75px] left-0 z-[100] mx-auto my-0 w-full rounded-t-xl bg-white px-4 py-3">
                <div className="mx-auto my-0 h-1 w-[41px] rounded bg-[#e2e2e2]" />
                <div className="flex items-center justify-between [&_button]:border-none [&_button]:bg-transparent [&_button]:font-nunito [&_button]:text-sm [&_button]:font-bold [&_button]:tracking-tight [&_button]:text-customgreen-800 [&_button]:outline-none">
                  <h3 className="font-nunito text-lg font-bold tracking-tight text-customblack-100">
                    Sort by category
                  </h3>
                  <button onClick={clearHandler}>Clear</button>
                </div>
                <SortField
                  id={6}
                  name={"Hair Care - Spa/Hair Mask"}
                  grpName={"Category"}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
                <SortField
                  id={7}
                  name={"Haire Care - Shampoo & Conditioner"}
                  grpName={"Category"}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
                <SortField
                  id={8}
                  name={"Hair Care - Hair Oils"}
                  grpName={"Category"}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
                <SortField
                  id={9}
                  name={"Hair Care - Hair Malt"}
                  border={"none"}
                  grpName={"Category"}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
              </div>
            </SortModal>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};

export default MobileFilters;
