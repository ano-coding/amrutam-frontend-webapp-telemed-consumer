import { useState, useEffect } from "react";
import SortModal from "./SortModal";
import SortField from "./SortField";
import { category } from "../../../data/subcategory";

const MobileFilters = (props) => {
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

  //Effects
  useEffect(() => {
    props.setMobileSubCategory(selectedOption);
    setShowConcernModal(false);
    setShowCategoryModal(false);
  }, [selectedOption, props]);

  useEffect(() => {
    if (
      props.activeCategory !== "400744677629" &&
      props.activeCategory !== "400746250493"
    ) {
      setSelectedOption(null);
    }
  }, [props]);
  return (
    <div className="fixed bottom-0 mb-10 hidden h-[77px] w-full justify-center gap-[60px] bg-customgreen-100 pt-3 max-sm:flex [&_span]:font-nunito [&_span]:text-base [&_span]:font-medium [&_span]:tracking-tight [&_span]:text-customgreen-800">
      <span onClick={showConcernModalHandler}>Concern</span>
      <div className="h-[15px] w-[1px] bg-customgreen-800" />
      <span onClick={showCategoryModalHandler}>Category</span>

      {(showCategoryModal || showConcernModal) && (
        <div className="bg-[rgba(0, 0, 0, 0.4)] fixed left-0 top-0 z-10 h-screen w-screen backdrop-blur-lg" />
      )}
      {showConcernModal ? (
        <SortModal isOpen={showConcernModal} onClose={closeConcernModalhandler}>
          <div className="shadow-[0px_-2px_12px_-2px_rgba(0, 0, 0, 0.51)] absolute bottom-[-75px] left-0 z-[100] mx-auto my-0 w-full rounded-t-xl bg-white px-4 py-3">
            <div className="mx-auto my-0 h-1 w-[41px] rounded bg-[#e2e2e2]" />
            <div className="flex items-center justify-between [&_button]:border-none [&_button]:bg-transparent [&_button]:font-nunito [&_button]:text-sm [&_button]:font-bold [&_button]:tracking-tight [&_button]:text-customgreen-800 [&_button]:outline-none">
              <h3 className="font-nunito text-lg font-bold tracking-tight text-customblack-100">
                Sort by concern
              </h3>
              <button onClick={clearHandler}>Clear</button>
            </div>
            {category[
              props.activeCategory === "400744677629" ? 0 : 1
            ].subcat[0].concern.map((concern) => {
              return (
                <SortField
                  key={concern.id}
                  id={concern.id}
                  name={concern.name}
                  grpName={"Concern"}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
              );
            })}
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
            {category[
              props.activeCategory === "400744677629" ? 0 : 1
            ].subcat[0].category.map((category) => {
              return (
                <SortField
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  grpName={"Concern"}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
              );
            })}
          </div>
        </SortModal>
      ) : (
        ""
      )}
    </div>
  );
};

export default MobileFilters;
