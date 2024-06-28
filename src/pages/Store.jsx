import { useNavigate } from "react-router-dom";
import Product from "../features/Store/components/Product";
import Header from "../features/Store/components/Header";
import Footer from "../features/Store/components/Footer";
import HomeAppContainer from "../features/Store/components/HomeAppContainer";
import FilterContainer from "../features/Store/components/FilterContainer";
import BottomNavigation from "../features/Store/components/BottomNavigation";
import MobileFilters from "../features/Store/components/MobileFilters";

const Store = () => {
  const navigate = useNavigate();

  //Handlers
  const prodDetailHandler = () => {
    navigate("/prodDetail");
  };
  return (
    <div>
      <Header name={"Store"} show={true} />
      <FilterContainer />
      <div className="ml-[98px] mt-[60px] max-md:ml-[16px]">
        <h3 className="m-0 mb-[60px] text-xl font-medium tracking-tight max-md:hidden">
          Summer Collection
        </h3>
        <div className="flex items-start justify-start gap-[23px] max-xl:justify-center max-md:mb-[50px] max-md:flex-col">
          <Product
            src="/product1.png"
            name={
              "Amrutam Kuntal care Hair Spa | Do- it yourself Hair Treatment"
            }
            cost={"649.00"}
            amount={"200ml"}
            rating={"52"}
            onClick={prodDetailHandler}
          />
          <div className="bg-offWhite-100 mx-auto my-0 h-[1px] w-full md:hidden" />

          <Product
            src="/product2.png"
            name={
              "Amrutam Kuntal Care Herbal Shampoo | Healthy, Natural and Dynamic Hair"
            }
            cost={"649.00"}
            amount={"200ml"}
            rating={"52"}
          />
          <div className="bg-offWhite-100 mx-auto my-0 h-[1px] w-full md:hidden" />

          <Product
            src="/product3.png"
            name={
              "Amrutam Nari Sondarya Malt | Complete Care For Women's Health And Beauty"
            }
            cost={"649.00"}
            amount={"200ml"}
            rating={"52"}
          />
          <div className="bg-offWhite-100 mx-auto my-0 h-[1px] w-full md:hidden" />

          <div className="border-customgray-800 ml-[37px] mt-[148px] flex h-[70px] w-[70px] items-center justify-center rounded-full border hover:cursor-pointer max-xl:my-[105px] max-xl:ml-0 max-lg:my-[140px] max-lg:h-[40px] max-lg:w-[40px] max-md:hidden">
            <img src="/arrow.png" alt="arrow" className="w-[23px]" />
          </div>
        </div>
        <h3
          style={{ marginTop: "90px" }}
          className="m-0 mb-[60px] text-xl font-medium tracking-tight max-md:hidden"
        >
          Summer Collection
        </h3>
        <div className="mb-[168px] flex items-center justify-start gap-[23px] max-md:mb-[50px] max-md:flex-col">
          <Product
            src="/product1.png"
            name={
              "Amrutam Kuntal care Hair Spa | Do- it yourself Hair Treatment"
            }
            cost={"649.00"}
            amount={"200ml"}
            rating={"52"}
          />
          <div className="bg-offWhite-100 mx-auto my-0 h-[1px] w-full md:hidden" />
          <Product
            src="/product2.png"
            name={
              "Amrutam Kuntal Care Herbal Shampoo | Healthy, Natural and Dynamic Hair"
            }
            cost={"649.00"}
            amount={"200ml"}
            rating={"52"}
          />
          <div className="bg-offWhite-100 mx-auto my-0 h-[1px] w-full md:hidden" />

          <Product
            src="/product3.png"
            name={
              "Amrutam Nari Sondarya Malt | Complete Care For Women's Health And Beauty"
            }
            cost={"649.00"}
            amount={"200ml"}
            rating={"52"}
          />
          <div className="border-customgray-800 mb-[126px] ml-[37px] flex h-[70px] w-[70px] items-center justify-center rounded-full border hover:cursor-pointer max-xl:my-[105px] max-xl:ml-0 max-lg:my-[80px] max-lg:h-[40px] max-lg:w-[40px] max-md:hidden">
            <img src="/arrow.png" alt="arrow" className="w-[23px]" />
          </div>
        </div>
      </div>
      <MobileFilters />
      <div
        style={{ background: " #EAF2EA", width: "100%", height: "75px" }}
        className="sm:hidden"
      >
        <BottomNavigation />
      </div>
      <HomeAppContainer />
      <Footer />
    </div>
  );
};

export default Store;
