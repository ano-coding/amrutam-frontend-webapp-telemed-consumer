import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTopProducts } from "../../../services/Shopify";
import Product from "./Product";
import Spinner from "./Spinner";

const SimilarProducts = () => {
  const location = useLocation();

  //States
  const [size, setSize] = useState();
  const [similarProductsData, setSimilarProductsData] = useState();

  const { data: similarProducts, isLoading: similarProductsLoading } = useQuery(
    {
      queryFn: () => getTopProducts("Checkout"),
      queryKey: ["similarProducts"],
    },
  );
  //Effects
  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth <= 640);
    };

    const isSmallScreen = window.innerWidth <= 640;
    setSize(location.pathname === "/success" && isSmallScreen);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [location]);

  useEffect(() => {
    if (!similarProductsLoading && similarProducts) {
      setSimilarProductsData(similarProducts?.data?.data);
    }
  }, [similarProductsLoading, similarProducts]);

  return (
    <div
      className="mb-[72px] text-center"
      style={{ display: size ? "none" : "block" }}
    >
      <h3 className="mb-[36px] mt-[88px] text-2xl font-medium tracking-tight max-sm:my-[20px] max-sm:ml-[20px] max-sm:text-left max-sm:text-base">
        People also bought
      </h3>
      <div className="flex flex-wrap items-start justify-center gap-[25px] max-md:ml-[16px] max-md:flex-col">
        {similarProductsData ? (
          similarProductsData.map((section) => {
            return section?.ProductList?.map((product) => {
              return (
                <Product
                  key={product.id}
                  src={product?.image?.src}
                  name={product?.title}
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
                  add={true}
                />
              );
            });
          })
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default SimilarProducts;
