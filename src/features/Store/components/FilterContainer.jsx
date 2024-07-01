import { useState, useEffect, useRef } from "react";
import Filter from "./Filter";
// import Product from "./Product";
// import SortField from "./SortField";

const productCategoryList = [
  {
    id: "all",
    name: "All",
    width: "33px",
    height: "28px",
    image: "/all.png",
  },
  {
    id: "400744677629",
    name: "Hair",
    width: "78px",
    height: "78px",
    image: "/hair.png",
  },
  {
    id: "400746250493",
    name: "Skin",
    width: "40.37px",
    height: "39px",
    image: "/skin.png",
  },
  {
    id: "400748773629",
    name: "Digestion",
    width: "41.86px",
    height: "37px",
    image: "/digestion.png",
  },
  {
    id: "400748839165",
    name: "Bones",
    width: "35.29px",
    height: "41px",
    image: "/bones.png",
  },
  {
    id: "400748740861",
    name: "Immunity",
    width: "84px",
    height: "84px",
    image: "/immunity1.png",
  },
  {
    id: "400786161917",
    name: "Women",
    width: "35.29px",
    height: "41px",
    image: "/bones.png",
  },
  {
    id: "400786063613",
    name: "Sexual",
    width: "35.29px",
    height: "41px",
    image: "/bones.png",
  },
  {
    id: "400748806397",
    name: "Eye",
    width: "35.29px",
    height: "41px",
    image: "/bones.png",
  },
  {
    id: "400785146109",
    name: "Liver",
    width: "35.29px",
    height: "41px",
    image: "/bones.png",
  },
  {
    id: "400786030845",
    name: "Piles",
    width: "35.29px",
    height: "41px",
    image: "/bones.png",
  },
  {
    id: "400786456829",
    name: "Dental",
    width: "35.29px",
    height: "41px",
    image: "/bones.png",
  },
  {
    id: "400787013885",
    name: "Gifting",
    width: "35.29px",
    height: "41px",
    image: "/bones.png",
  },
];

const FilterContainer = (props) => {
  const scrollerRef = useRef(null);

  //States
  const [visibleCategories, setVisibleCategories] = useState(
    productCategoryList.slice(0, 6),
  );
  const [startIndex, setStartIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");

  //Handlers
  const moreHandler = () => {
    console.log("sfn");
    const newStartIndex = (startIndex + 1) % productCategoryList.length;
    setStartIndex(newStartIndex);
    setVisibleCategories(
      [
        ...productCategoryList.slice(newStartIndex),
        ...productCategoryList.slice(0, newStartIndex),
      ].slice(0, 6),
    );
  };
  const changeCategoryHandler = (id) => {
    setActiveCategory(id);
    props.categoryChange(id);
  };

  //Effects
  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth",
      });
    }
  }, [visibleCategories]);

  return (
    <div className="flex items-center justify-center">
      <div
        ref={scrollerRef}
        className="no-scrollbar relative mt-9 flex max-w-[590px] items-center justify-start gap-9 overflow-x-auto max-md:hidden"
      >
        {visibleCategories.map((filter) => {
          return (
            <Filter
              key={filter.id}
              src={filter.image}
              name={filter.name}
              width={filter.width}
              height={filter.height}
              id={filter.id}
              active={activeCategory}
              onClick={() => changeCategoryHandler(filter.id)}
            />
          );
        })}
      </div>
      <div className="no-scrollbar relative mt-9 hidden items-center justify-start max-md:flex max-md:w-11/12 max-md:gap-4 max-md:overflow-scroll max-md:overflow-y-hidden max-sm:mx-auto max-sm:mb-0 max-sm:mt-6">
        {productCategoryList.map((filter) => {
          return (
            <Filter
              key={filter.id}
              src={filter.image}
              name={filter.name}
              width={filter.width}
              height={filter.height}
              id={filter.id}
              active={activeCategory}
              onClick={() => changeCategoryHandler(filter.id)}
            />
          );
        })}
      </div>
      <Filter
        src="/more.png"
        name={"More"}
        width={"10px"}
        height={"18px"}
        className="ml-7 mt-9 max-md:hidden"
        id={"more"}
        active={activeCategory}
        onClick={moreHandler}
      />

      {/*{moreFilters ? (
        <div className="absolute top-[474px] z-20 flex w-full items-center justify-center bg-customyellow-200 shadow-md max-sm:hidden">
          <div className="flex items-start justify-center gap-16 max-md:flex-col max-md:gap-0 max-md:pb-[50px]">
            <div className="mb-[114px] max-md:mb-0">
              <h4 className="mb-3 mt-12 text-lg font-semibold tracking-tight max-md:text-center">
                Sort by concern
              </h4>
              <SortField
                id={1}
                name={"Color Protection"}
                grpName={"Concern"}
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
            <div>
              <h4 className="mb-3 mt-12 text-lg font-semibold tracking-tight max-md:text-center">
                Sort by category
              </h4>
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
            <div className="mx-[109px] mt-[118px] h-[140px] w-[1px] bg-[#e2e2e2] max-xl:hidden" />
          </div>
          <div className="max-xl:hidden">
            <Product
              src="/bestsellerProduct.png"
              name={
                "Amrutam Kuntal Care Herbal Shampoo | Healthy, Natural and Dynamic Hair"
              }
              cost={"649.00"}
              amount={"200ml"}
              rating={"52"}
              imageWidth={"238px"}
              imageHeight={"269px"}
              nameSize={"16px"}
              infoSize={"14px"}
              inline={"inline-block"}
            />
            <div className="absolute right-[99px] top-[33px] flex h-[32px] w-[146px] items-center justify-center rounded-2xl bg-customcream">
              <span className="text-base tracking-tight text-custommustard">
                Bestseller
              </span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}*/}
    </div>
  );
};

export default FilterContainer;
