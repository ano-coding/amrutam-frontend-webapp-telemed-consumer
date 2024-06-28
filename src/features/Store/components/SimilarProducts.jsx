import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Product from "./Product";

const SimilarProducts = () => {
  const location = useLocation();

  //States
  const [size, setSize] = useState();

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
  return (
    <div
      className="mb-[72px] text-center"
      style={{ display: size ? "none" : "block" }}
    >
      <h3 className="mb-[36px] mt-[88px] text-2xl font-medium tracking-tight max-sm:my-[20px] max-sm:ml-[20px] max-sm:text-left max-sm:text-base">
        People also bought
      </h3>
      <div className="flex items-start justify-center gap-[25px] max-md:ml-[16px] max-md:flex-col">
        <Product
          src="/product1.png"
          name={"Amrutam Kuntal care Hair Spa | Do- it yourself Hair Treatment"}
          cost={"649.00"}
          amount={"200ml"}
          rating={"52"}
          add={true}
        />
        <Product
          src="/product2.png"
          name={
            "Amrutam Kuntal Care Herbal Shampoo | Healthy, Natural and Dynamic Hair"
          }
          cost={"649.00"}
          amount={"200ml"}
          rating={"52"}
          add={true}
        />
        <Product
          src="/product3.png"
          name={
            "Amrutam Nari Sondarya Malt | Complete Care For Women's Health And Beauty"
          }
          cost={"649.00"}
          amount={"200ml"}
          rating={"52"}
          add={true}
        />
      </div>
    </div>
  );
};

export default SimilarProducts;
