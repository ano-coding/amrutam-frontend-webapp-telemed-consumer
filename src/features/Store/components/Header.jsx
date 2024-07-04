import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchCartByUserId } from "../../../services/Shopify";

const Header = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  //States
  const [size, setSize] = useState();
  const [cartItems, setCartItems] = useState();

  //APIs
  const { data: cart, isLoading: cartLoading } = useQuery({
    queryFn: () => fetchCartByUserId(),
    queryKey: ["cart"],
  });

  //Handlers
  const cartHandler = () => {
    navigate("/cart");
  };

  //Effects
  useEffect(() => {
    if (!cartLoading && cart) {
      setCartItems(cart?.data?.cart?.items?.length);
    }
  }, [cart, cartLoading]);

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
    <div
      className="max-md:bg-fill bg-customgreen-100 bg-header-leaves bg-cover bg-center bg-no-repeat max-md:bg-top max-sm:bg-transparent max-sm:bg-none"
      style={{ display: size ? "none" : "block" }}
    >
      <h1
        style={{ padding: props.padding }}
        className="m-0 py-9 text-center text-4xl font-semibold leading-[54px] max-sm:hidden"
      >
        {props.name}
      </h1>
      {props.show ? (
        <div className="flex items-center justify-center gap-5 pb-10 max-sm:mt-10 max-sm:pb-0">
          <div className="flex h-12 w-[539px] items-center justify-start gap-2 rounded-xl border border-[#f0f0f0] bg-white max-md:w-[16rem]">
            <img
              src="/search.svg"
              alt="search"
              className="mb-3 ml-3 mr-0 mt-2"
            />
            <input
              type="text"
              placeholder="Search for Kuntal Care"
              className="bg-transparent placeholder:font-nunito placeholder:text-base placeholder:font-normal placeholder:tracking-tight placeholder:text-darkslategray-300 max-sm:placeholder:text-sm"
            />
          </div>
          <div
            className="relative rounded-lg bg-white py-[6px] pl-[8.5px] pr-[7.5px] hover:cursor-pointer"
            onClick={cartHandler}
          >
            {cartItems > 0 ? (
              <span className="absolute -right-2 top-1 h-6 w-6 rounded-full bg-[#e4b1ab] text-center text-xs leading-6 text-black">
                {cartItems}
              </span>
            ) : (
              ""
            )}
            <img
              src="/cart.svg"
              alt="cart"
              className="max-sm:h-[24px] max-sm:w-[24px]"
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
