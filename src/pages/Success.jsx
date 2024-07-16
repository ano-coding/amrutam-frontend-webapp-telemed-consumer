import { useQuery } from "@tanstack/react-query";
import { markAsCheckedOutCart } from "../services/Shopify";
import { useContext, useEffect } from "react";
import { ShopifyContext } from "../context/ShopifyContext";
import Footer from "../features/Store/components/Footer";
import HomeAppContainer from "../features/Store/components/HomeAppContainer";
import SimilarProducts from "../features/Store/components/SimilarProducts";

const Success = () => {
  const { shopifyId, cartId, setCartId, set_id } = useContext(ShopifyContext);

  //APIs
  const {
    data: markCheckoutCart,
    isLoading: markCheckoutCartLoading,
    error: markCheckoutCartError,
  } = useQuery({
    queryFn: () => markAsCheckedOutCart(Number(shopifyId), cartId),
    queryKey: ["markAsCheckoutCart"],
  });

  //Effects
  useEffect(() => {
    if (!markCheckoutCartLoading && markCheckoutCart) {
      console.log(markCheckoutCart);
      setCartId("");
      localStorage.setItem("cartId", "");
      set_id("");
      localStorage.setItem("_id", "");
    } else if (markCheckoutCartError) {
      console.log(markCheckoutCartError);
    }
  }, [
    markCheckoutCartLoading,
    markCheckoutCartError,
    markCheckoutCart,
    setCartId,
    set_id,
  ]);

  return (
    <div>
      <div className="relative flex flex-col items-center justify-center bg-customlightgreen-100">
        <img
          src="/successLady1.png"
          alt="lady"
          className="mb-[70px] mt-[63px] h-[420px] w-[400px] max-sm:h-[320px] max-sm:w-[300px]"
        />
        <h2 className="m-0 mb-[18px] font-nunito text-[32px] font-extrabold leading-[42px] tracking-tight text-white">
          Order Success
        </h2>
        <p className="m-0 w-[474px] text-center font-nunito text-xl font-medium leading-5 text-offWhite-100 max-sm:mx-5 max-sm:w-[calc(100%_-_40px)]">
          Congratulations! Your Ayurvedic wellness journey has begun. Your order
          is on its way to bring balance and bliss to your life
        </p>
        <button className="mb-[63px] mt-[42px] rounded-xl border-none bg-customgreen-800 px-[101px] py-4 font-nunito text-lg font-bold leading-5 tracking-tight text-white outline-none max-sm:px-[50px] max-sm:py-4">
          View my Order
        </button>
      </div>
      <SimilarProducts from={"success"} />
      <HomeAppContainer />
      <Footer />
    </div>
  );
};

export default Success;
