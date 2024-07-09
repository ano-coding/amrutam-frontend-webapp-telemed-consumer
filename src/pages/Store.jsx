import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getProductsByCategory,
  getTopProducts,
  searchWizzy,
} from "../services/Shopify";
import Product from "../features/Store/components/Product";
import Header from "../features/Store/components/Header";
import Footer from "../features/Store/components/Footer";
import HomeAppContainer from "../features/Store/components/HomeAppContainer";
import FilterContainer from "../features/Store/components/FilterContainer";
import MobileFilters from "../features/Store/components/MobileFilters";
import Scroll from "../features/Store/components/Scroll";
import Spinner from "../features/Store/components/Spinner";

const Store = () => {
  const navigate = useNavigate();

  //States
  const [allProductsData, setAllProductsData] = useState();
  const [activeCategory, setActiveCategory] = useState("all");
  const [categoryProductsData, setCategoryProductsData] = useState();
  const [subCategory, setSubCategory] = useState();
  const [mobileSubCategory, setMobileSubCategory] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState();

  const { data: topProdData, isLoading: topProdLoading } = useQuery({
    queryFn: () => getTopProducts("Store"),
    queryKey: ["topStoreProducts"],
    enabled: activeCategory === "all",
  });

  //APIs
  const { data: categoryProducts, isLoading: categoryProductsLoading } =
    useQuery({
      queryFn: () =>
        getProductsByCategory(
          mobileSubCategory
            ? mobileSubCategory
            : subCategory
              ? subCategory
              : activeCategory,
        ),
      queryKey: [
        "categoryWiseProducts",
        activeCategory,
        subCategory,
        mobileSubCategory,
      ],
      enabled: activeCategory !== "all",
    });

  const {
    data: searchResponse,
    isLoading: searchLoading,
    error: searchError,
  } = useQuery({
    queryFn: () => searchWizzy(searchTerm),
    queryKey: ["search"],
    enabled: searchTerm?.length >= 3,
  });

  //Handlers
  const categoryChange = (category) => {
    setActiveCategory(category);
  };

  const prodDetailHandler = (id) => {
    navigate(`/prodDetail/${id}`);
  };

  const searchHandler = (query) => {
    setSearchTerm(query);
    query?.length < 3 ? setSearchData() : "";
  };

  //Effects
  useEffect(() => {
    if (!topProdLoading && topProdData) {
      setAllProductsData(topProdData?.data?.data);
    }
  }, [topProdLoading, topProdData]);

  useEffect(() => {
    if (!categoryProductsLoading && categoryProducts) {
      setCategoryProductsData(categoryProducts?.data?.data);
      console.log(categoryProducts?.data?.data);
    }
  }, [categoryProducts, categoryProductsLoading]);

  useEffect(() => {
    if (!searchLoading && searchResponse) {
      console.log(searchResponse);
      setSearchData(searchResponse?.data?.data?.payload?.result);
    } else if (searchError) {
      console.log(searchError);
    }
  }, [searchError, searchLoading, searchResponse]);

  useEffect(() => {
    console.log("searctTerm=", searchTerm, "searchData=", searchData);
  }, [searchTerm, searchData]);

  return (
    <div>
      <Header name={"Store"} show={true} searchHandler={searchHandler} />
      <FilterContainer
        categoryChange={categoryChange}
        setSubCategory={setSubCategory}
      />
      {searchTerm?.length > 0 ? (
        searchData ? (
          <div>
            <h1 className="my-[70px] ml-[80px] text-2xl font-medium text-black max-xl:ml-[40px] max-xl:text-xl max-sm:my-[30px] max-sm:ml-4 max-sm:text-lg">
              Showing results for {'"' + searchTerm + '"'}
            </h1>
            <div className="mb-[60px] flex flex-wrap items-start justify-center gap-6 gap-y-14 max-sm:mb-40 max-sm:gap-y-6">
              {searchData.map((product) => (
                <div
                  key={product?.id}
                  className="max-md:ml-4"
                  onClick={() => prodDetailHandler(product.groupId)}
                >
                  <Product
                    key={product.id}
                    src={product?.mainImage}
                    name={product?.name || ""}
                    cost={product?.sellingPrice || 0}
                  />
                  <div className="mb-0 mt-5 h-[1px] w-[calc(100vw_-_40px)] bg-offWhite-100 md:hidden" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <h1 className="mx-auto my-24 text-center text-2xl">
            No search results found
          </h1>
        )
      ) : activeCategory === "all" ? (
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
        <div className="my-[60px] flex flex-wrap items-start justify-center gap-6 gap-y-14 max-sm:mb-40 max-sm:gap-y-6">
          {categoryProductsData ? (
            categoryProductsData.map((product) => {
              return (
                <div
                  key={product?.id}
                  className="max-md:ml-4"
                  onClick={() => prodDetailHandler(product.shopify_product_id)}
                >
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

      <MobileFilters
        activeCategory={activeCategory}
        setMobileSubCategory={setMobileSubCategory}
      />

      <HomeAppContainer />
      <Footer />
    </div>
  );
};

const ProductRow = ({ section }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  //Handlers
  const prodDetailHandler = (id) => {
    navigate(`/prodDetail/${id}`);
  };
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
              <div
                key={product?.id}
                className="max-md:ml-4"
                onClick={() => prodDetailHandler(product.shopify_product_id)}
              >
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
