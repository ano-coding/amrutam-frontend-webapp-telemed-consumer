import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCartByUserId,
  updateCart,
  clearCart,
  shopfloCheckout,
} from "../services/Shopify";
import { formatNumber } from "../helper/formatNumber";
import Header from "../features/Store/components/Header";
import HomeAppContainer from "../features/Store/components/HomeAppContainer";
import Footer from "../features/Store/components/Footer";
import SimilarProducts from "../features/Store/components/SimilarProducts";
import { toast } from "react-toastify";
import { ShopifyContext } from "../context/ShopifyContext";

const Cart = () => {
  const { shopifyId, cartId, setCartId, _id } = useContext(ShopifyContext);

  //States
  const [cartProducts, setCartProducts] = useState();
  const [updatedItem, setUpdatedItem] = useState(null);
  const [redirectURL, setRedirectURL] = useState();

  //APIs
  const {
    data: cart,
    isLoading: cartLoading,
    refetch: cartRefetch,
  } = useQuery({
    queryFn: () => fetchCartByUserId(Number(shopifyId)),
    queryKey: ["cart"],
    gcTime: 100,
  });

  const {
    data: updateCartResponse,
    isLoading: updateCartLoading,
    error: updateCartError,
    refetch: updateCartRefetch,
  } = useQuery({
    queryFn: () =>
      updateCart({
        productId: updatedItem.productId,
        variationId: updatedItem.variationId,
        quantity: updatedItem.quantity,
        userId: Number(shopifyId),
        cartId: cartId,
      }),
    queryKey: [`updateCart/${updatedItem?.variationId}`],
    enabled: false,
    gcTime: 100,
  });

  const {
    data: clearCartData,
    isLoading: clearCartLoading,
    error: clearCartError,
    refetch: clearCartRefetch,
  } = useQuery({
    queryFn: () => clearCart(shopifyId, cartId),
    queryKey: ["clearCart"],
    enabled: false,
    gcTime: 100,
  });

  const {
    data: shopfloCheckoutResponse,
    isLoading: shopfloCheckoutLoading,
    error: shopflowCheckoutError,
    refetch: shopfloCheckoutRefetch,
  } = useQuery({
    queryFn: () => shopfloCheckout(_id),
    queryKey: ["cart"],
    enabled: false,
    gcTime: 100,
  });

  //Handlers
  const incrementHandler = (productId, variationId, quantity) => {
    setUpdatedItem({
      productId: productId,
      variationId: variationId,
      quantity: quantity + 1,
    });
  };

  const decrementHandler = (productId, variationId, quantity) => {
    setUpdatedItem({
      productId: productId,
      variationId: variationId,
      quantity: quantity - 1,
    });
  };

  const checkoutHandler = () => {
    shopfloCheckoutRefetch();
  };

  const clearCartHandler = () => {
    clearCartRefetch();
    cartRefetch();
  };

  //Effects
  useEffect(() => {
    if (!cartLoading && cart) {
      setCartProducts(cart);
    }
  }, [cart, cartLoading]);

  useEffect(() => {
    if (!updateCartLoading && updateCartResponse) {
      console.log("update response", updateCartResponse);
      let msg =
        updateCartResponse?.data?.success === "Item Removed"
          ? "Item removed from cart"
          : "Cart updated successfully";
      toast.success(msg);
      cartRefetch();
    } else if (updateCartError) {
      toast.error("Cannot update cart");
    }
  }, [updateCartError, updateCartLoading, updateCartResponse, cartRefetch]);

  useEffect(() => {
    if (updatedItem === null) {
      return;
    }
    updateCartRefetch();
  }, [updatedItem, updateCartRefetch]);

  useEffect(() => {
    if (!clearCartLoading && clearCartData) {
      console.log(clearCartData);
      setCartId(clearCartData?.data?.newCartID);
      toast.success("Cart emptied");
    } else if (clearCartError) {
      toast.error("Cannot empty cart");
    }
  }, [clearCartError, clearCartLoading, clearCartData, setCartId]);

  useEffect(() => {
    if (!shopfloCheckoutLoading && shopfloCheckoutResponse) {
      console.log(shopfloCheckoutResponse);
      setRedirectURL(
        shopfloCheckoutResponse?.data?.data?.response?.checkout_url || "",
      );
    } else if (shopflowCheckoutError) {
      console.log(shopflowCheckoutError);
      // toast.error("Can't proceed at the moment");
    }
  }, [shopfloCheckoutLoading, shopfloCheckoutResponse, shopflowCheckoutError]);

  useEffect(() => {
    if (redirectURL) {
      window.location.href = redirectURL;
    }
  }, [redirectURL]);

  useEffect(() => {
    const showCancelToast = sessionStorage.getItem("showCancelToast");
    if (showCancelToast === "true") {
      toast.info("Payment was cancelled. No transaction was made.");
      sessionStorage.removeItem("showCancelToast");
    }
  }, []);

  return (
    <div>
      <Header name={"Cart"} show={false} padding={"72px 0"} />
      {cartProducts?.data?.cart?.items?.length ? (
        <>
          <div className="my-[56px] mr-24 flex items-center justify-end max-md:mr-5 max-sm:mb-0 max-sm:mt-5">
            <button
              className="cursor-pointer text-lg font-medium hover:underline max-sm:text-sm"
              onClick={clearCartHandler}
            >
              Clear Cart
            </button>
          </div>
          <div className="mx-[73px] mb-[36px] flex items-center justify-between border-b-[1px] border-[#e2e2e2] pb-[32px] max-xl:hidden [&_h4]:m-0 [&_h4]:text-[18px] [&_h4]:leading-[27px] [&_h4]:tracking-[0.04em] last:[&_h4]:mr-[50px] even:[&_h4]:ml-[300px]">
            <h4>PRODUCTS</h4>
            <h4>QUANTITY</h4>
            <h4>PRICE</h4>
          </div>
          {cartProducts?.data?.cart?.items?.map((product) => (
            <div key={product.variationId}>
              <div className="mx-[73px] mb-[61px] mt-0 flex items-start justify-between max-xl:mx-[20px] max-xl:mb-[61px] max-xl:items-center max-xl:justify-around max-sm:mx-[10px] max-sm:mb-0 max-sm:items-end max-sm:justify-center">
                <div className="flex items-center justify-start gap-[20px] max-sm:mt-[40px] max-sm:w-[calc(100%_-_20px)]">
                  <img
                    src={product.productImg}
                    alt="product"
                    className="h-[176px] w-[176px] rounded-2xl max-sm:h-[140px] max-sm:w-[140px]"
                  />
                  <div className="flex flex-col items-start justify-start gap-8 max-xl:w-min max-xl:gap-2.5 max-sm:w-[calc(100%_-_20px)]">
                    <p className="m-0 w-[307px] text-[18px] font-medium leading-[30px] text-customblack-100 max-xl:text-[15px] max-lg:w-[200px] max-sm:w-full max-sm:text-sm">
                      {product.productName}
                    </p>
                    <div className="flex items-center justify-start gap-4 [&_div]:flex [&_div]:items-center [&_span]:text-[18px] [&_span]:leading-[18px] [&_span]:tracking-tight max-sm:[&_span]:text-xs">
                      <div>
                        <img
                          src="/ruppee.png"
                          alt="ruppee"
                          className="h-[19px] w-[19px] max-sm:h-3 max-sm:w-3"
                        />
                        <span>{formatNumber(product.price)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex h-[58px] w-[193px] items-center justify-between rounded-xl border border-[#676767] px-[22px] py-0 max-lg:w-[150px] max-sm:hidden [&_img]:cursor-pointer [&_span]:text-xl [&_span]:leading-[30px]">
                  <img
                    src="/minus.svg"
                    onClick={() =>
                      decrementHandler(
                        product.productId,
                        product.variationId,
                        product.quantity,
                      )
                    }
                  />

                  <span>{product.quantity}</span>
                  <img
                    src="/plus.svg"
                    onClick={() =>
                      incrementHandler(
                        product.productId,
                        product.variationId,
                        product.quantity,
                      )
                    }
                  />
                </div>
                <div className="flex items-center max-lg:hidden">
                  <img
                    src="/ruppee.png"
                    alt="ruppee"
                    className="h-[25px] w-[25px]"
                  />
                  <span className="text-2xl leading-[18px] tracking-tight">
                    {formatNumber(product.price * product.quantity)}
                  </span>
                </div>
              </div>
              <div className="float-right mr-[20px] hidden h-[32px] w-[94px] items-center justify-between rounded-lg bg-customgreen-100 px-[5px] py-0 text-customgreen-800 max-sm:flex">
                <svg
                  width="16"
                  height="2"
                  viewBox="0 0 16 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() =>
                    decrementHandler(
                      product.productId,
                      product.variationId,
                      product.quantity,
                    )
                  }
                >
                  <path
                    d="M1 1H15"
                    stroke="#3A643B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{product.quantity}</span>

                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() =>
                    incrementHandler(
                      product.productId,
                      product.variationId,
                      product.quantity,
                    )
                  }
                >
                  <path
                    d="M5 12H19"
                    stroke="#3A643B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 5V19"
                    stroke="#3A643B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}
          <div className="mx-[73px] mb-[59px] flex items-center justify-between max-sm:mx-[20px] max-sm:mb-[20px] max-sm:mt-[100px]">
            <h4 className="m-0 text-2xl font-medium uppercase leading-[18px] tracking-tight max-md:text-[18px] max-md:capitalize">
              Order amount
            </h4>
            <div
              className="flex items-center max-lg:hidden"
              style={{ display: "flex" }}
            >
              <img
                src="/ruppee.png"
                alt="ruppee"
                className="h-[25px] w-[25px] max-lg:h-[18px] max-lg:w-[18px] max-sm:h-[15px] max-sm:w-[15px]"
              />
              <span className="text-2xl leading-[18px] tracking-tight max-md:text-[18px] max-sm:text-[15px]">
                {formatNumber(cartProducts?.data?.cart?.subtotal)}
              </span>
            </div>
          </div>
          <div className="mx-[73px] mb-[59px] flex items-center justify-between max-sm:mx-[20px] max-sm:mb-[20px] max-sm:mt-[30px]">
            <h4 className="m-0 text-2xl font-medium uppercase leading-[18px] tracking-tight max-md:text-[18px] max-md:capitalize">
              Discount amount
            </h4>
            <div
              className="flex items-center max-lg:hidden"
              style={{ display: "flex" }}
            >
              <img
                src="/ruppee.png"
                alt="ruppee"
                className="h-[25px] w-[25px] max-lg:h-[18px] max-lg:w-[18px] max-sm:h-[15px] max-sm:w-[15px]"
              />
              <span className="text-2xl leading-[18px] tracking-tight max-md:text-[18px] max-sm:text-[15px]">
                0
              </span>
            </div>
          </div>
          <div className="mx-[73px] h-[1px] bg-[#e2e2e2] max-sm:mx-[20px]" />
          <h4 className="m-0 mr-[73px] mt-[44px] text-right text-2xl font-medium uppercase leading-[18px] tracking-tight max-md:text-lg max-md:capitalize max-sm:mx-[20px] max-sm:mb-[50px] max-sm:mt-[30px]">
            Total amount : Rs {formatNumber(cartProducts?.data?.cart?.subtotal)}
          </h4>
          <button
            className="ml-[73px] mt-[43px] w-[calc(100vw_-_146px)] cursor-pointer rounded-xl border-none bg-customgreen-800 px-0 py-[26.5px] text-[18px] font-medium leading-5 tracking-tight text-white outline-none max-sm:fixed max-sm:bottom-[20px] max-sm:left-[16px] max-sm:z-[1000] max-sm:m-0 max-sm:h-[52px] max-sm:w-[calc(100%_-_32px)] max-sm:p-0"
            onClick={checkoutHandler}
          >
            Proceed to checkout
          </button>
        </>
      ) : (
        <div className="mx-5 mt-5 flex flex-col items-center justify-center rounded-lg border border-gray-200 py-24">
          <img src="/cart.svg" alt="cart" />
          <span className="pt-2 text-lg">Your cart is empty</span>
        </div>
      )}
      <SimilarProducts from={"cart"} />
      <HomeAppContainer />
      <Footer />
    </div>
  );
};

export default Cart;
