import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTopProducts, fetchCartByUserId } from "../../../services/Shopify";
import { ShopifyContext } from "../../../context/ShopifyContext";
import Product from "./Product";
import Spinner from "./Spinner";

const SimilarProducts = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { shopifyId } = useContext(ShopifyContext);

  //States
  const [size, setSize] = useState();
  const [similarProductsData, setSimilarProductsData] = useState();
  const [commonIds, setCommonIds] = useState([]);

  //Handlers
  const prodDetailHandler = (id) => {
    console.log(id);
    navigate(`/prodDetail/${id}`);
    window.location.reload();
  };

  //APIs
  const { data: similarProducts, isLoading: similarProductsLoading } = useQuery(
    {
      queryFn: () => getTopProducts("Checkout"),
      queryKey: ["similarProducts"],
    },
  );
  const {
    data: cart,
    isLoading: cartLoading,
    error: cartError,
  } = useQuery({
    queryFn: () => fetchCartByUserId(Number(shopifyId)),
    queryKey: ["cart"],
  });

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
    let cartIds = new Set();
    let topProductIds = new Set();
    if (!cartLoading && cart) {
      cart?.data?.cart?.items?.map((item) => cartIds.add(item.variationId));
      console.log(cartIds);
    }
    if (!similarProductsLoading && similarProducts) {
      console.log("similar=", similarProducts);
      similarProducts?.data?.data.map((section) => {
        return section?.ProductList?.map((product) =>
          topProductIds.add(product?.variants?.[0].id),
        );
      });
      setSimilarProductsData(similarProducts?.data?.data);
    }
    if (cartIds.size > 0 && topProductIds.size > 0) {
      setCommonIds([...cartIds.intersection(topProductIds)]);
    } else if (cartError) {
      console.log(cartError);
    }
  }, [similarProductsLoading, similarProducts, cartLoading, cart, cartError]);

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
                  key={product.shopify_product_id}
                  id={product.shopify_product_id}
                  variantId={product?.variants?.[0].id}
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
                  // rating={"52"}
                  add={
                    commonIds.includes(product?.variants?.[0].id)
                      ? "minus"
                      : "plus"
                  }
                  onClick={() => prodDetailHandler(product?.shopify_product_id)}
                  from={props.from}
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
