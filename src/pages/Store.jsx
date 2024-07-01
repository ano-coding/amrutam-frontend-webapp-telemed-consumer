import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductsByCategory, getTopProducts } from "../services/Shopify";
import Product from "../features/Store/components/Product";
import Header from "../features/Store/components/Header";
import Footer from "../features/Store/components/Footer";
import HomeAppContainer from "../features/Store/components/HomeAppContainer";
import FilterContainer from "../features/Store/components/FilterContainer";
import BottomNavigation from "../features/Store/components/BottomNavigation";
import MobileFilters from "../features/Store/components/MobileFilters";
import Scroll from "../features/Store/components/Scroll";
import Spinner from "../features/Store/components/Spinner";

const Store = () => {
  // const navigate = useNavigate();

  //Handlers
  // const prodDetailHandler = () => {
  //   navigate("/prodDetail");
  // };

  //States
  const [allProductsData, setAllProductsData] = useState();
  const [activeCategory, setActiveCategory] = useState("all");
  const [categoryProductsData, setCategoryProductsData] = useState();

  const { data: topProdData, isLoading: topProdLoading } = useQuery({
    queryFn: () => getTopProducts("Store"),
    queryKey: ["topStoreProducts"],
    enabled: activeCategory === "all",
  });
  const { data: categoryProducts, isLoading: categoryProductsLoading } =
    useQuery({
      queryFn: () => getProductsByCategory(activeCategory),
      queryKey: ["categorywiseProducts", activeCategory],
      enabled: activeCategory !== "all",
    });

  //Handlers
  const categoryChange = (category) => {
    console.log(category);
    setActiveCategory(category);
  };

  //Effects
  useEffect(() => {
    if (!topProdLoading && topProdData) {
      setAllProductsData(topProdData?.data?.data);
    }
  }, [topProdLoading, topProdData]);
  useEffect(() => {
    if (!categoryProductsLoading && categoryProducts) {
      console.log(categoryProducts);
      setCategoryProductsData(categoryProducts?.data?.data);
    }
  }, [categoryProducts, categoryProductsLoading]);

  return (
    <div>
      <Header name={"Store"} show={true} />
      <FilterContainer categoryChange={categoryChange} />
      {activeCategory === "all" ? (
        <div className="mt-[60px] flex flex-col items-center justify-center">
          {allProductsData ? (
            allProductsData.map((section) => {
              return <ProductRow section={section} key={section.id} />;
            })
          ) : (
            <Spinner />
          )}
        </div>
      ) : (
        <div className="my-[60px] flex flex-wrap items-start justify-center gap-6 gap-y-14 max-sm:gap-y-6">
          {categoryProductsData ? (
            categoryProductsData.map((product) => {
              return (
                <div key={product?.id} className="max-md:ml-4">
                  <Product
                    src={product?.image?.src || ""}
                    name={product?.title || ""}
                    cost={
                      (product?.variants?.length > 0 &&
                        product?.variants[0]?.price) ||
                      0
                    }
                    amount={
                      product?.variants?.length > 0 &&
                      product?.variants[0]?.weight +
                        " " +
                        product?.variants[0]?.weight_unit
                    }
                    rating={"52"}
                  />
                  <div className="mb-0 mt-5 h-[1px] w-[calc(100vw_-_40px)] bg-offWhite-100 md:hidden" />
                </div>
              );
            })
          ) : (
            <Spinner />
          )}
        </div>
      )}

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

const ProductRow = ({ section }) => {
  const containerRef = useRef(null);
  return (
    <div key={section?.id}>
      <h3 className="m-0 mb-[60px] text-xl font-medium tracking-tight max-md:hidden">
        {section?.title || ""}
      </h3>
      <Scroll containerRef={containerRef} section={section} itemWidth={388}>
        <div
          ref={containerRef}
          className="no-scrollbar flex max-w-[calc(100vw_-_264px)] items-start justify-start gap-[23px] overflow-x-auto overflow-y-hidden scroll-smooth max-md:mb-[50px] max-md:w-full max-md:max-w-full max-md:flex-col"
        >
          {section?.ProductList?.map((product) => {
            return (
              <div key={product?.id} className="max-md:ml-4">
                <Product
                  src={product?.image?.src || ""}
                  name={product?.title || ""}
                  cost={
                    (product?.variants?.length > 0 &&
                      product?.variants[0]?.price) ||
                    0
                  }
                  amount={
                    product?.variants?.length > 0 &&
                    product?.variants[0]?.weight +
                      " " +
                      product?.variants[0]?.weight_unit
                  }
                  rating={"52"}
                />
                <div className="mb-0 mt-5 h-[1px] w-[calc(100vw_-_40px)] bg-offWhite-100 md:hidden" />
              </div>
            );
          })}
        </div>
      </Scroll>
    </div>
  );
};

export default Store;
