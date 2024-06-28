import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Filter from "./Filter";
import Product from "./Product";
import SortField from "./SortField";

const FilterContainer = () => {
  const location = useLocation();

  //States
  const [moreFilters, showMoreFilters] = useState(false);
  const [size, setSize] = useState();
  const [selectedOption, setSelectedOption] = useState(null);

  //Handlers
  const moreFilterHandler = () => {
    showMoreFilters((prev) => !prev);
  };

  //Effects
  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth <= 640);
    };

    const isSmallScreen = window.innerWidth <= 640;
    setSize(
      (location.pathname === "/prodDetail" || location.pathname === "/cart") &&
        isSmallScreen,
    );
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [location]);

  return (
    <>
      <div
        className="noscroll relative mt-9 flex items-center justify-center gap-9 max-md:gap-4 max-sm:mx-auto max-sm:mb-0 max-sm:mt-6 max-sm:w-11/12 max-sm:justify-start max-sm:overflow-scroll max-sm:overflow-y-hidden"
        style={{ display: size ? "none" : "flex" }}
      >
        <Filter src="/all.png" name={"All"} width={"33px"} height={"28px"} />
        <Filter src="/hair.png" name={"Hair"} width={"78px"} height={"78px"} />
        <Filter
          src="/skin.png"
          name={"Skin"}
          width={"40.37px"}
          height={"39px"}
        />
        <Filter
          src="/digestion.png"
          name={"Digestion"}
          width={"41.86px"}
          height={"37px"}
        />
        <Filter
          src="/bones.png"
          name={"Bones"}
          width={"35.29px"}
          height={"41px"}
        />
        <Filter
          src="/immunity1.png"
          name={"Immunity"}
          width={"84px"}
          height={"84px"}
        />
        <Filter
          src="/more.png"
          name={"More"}
          width={"10px"}
          height={"18px"}
          onClick={moreFilterHandler}
        />
      </div>
      {moreFilters ? (
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
            <div className="mx-[109px] mt-[118px] h-[140px] w-[1px] bg-gray-400 max-xl:hidden" />
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
      )}
    </>
  );
};

export default FilterContainer;
