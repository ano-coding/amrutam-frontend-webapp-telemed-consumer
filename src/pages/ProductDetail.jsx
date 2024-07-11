import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getSingleProduct,
  addToCart,
  fetchCartByUserId,
  updateCart,
  getInternalProductID,
  mostReviewedDoctors,
} from "../services/Shopify";
import { toast } from "react-toastify";
import parse from "html-react-parser";
import Footer from "../features/Store/components/Footer";
import Header from "../features/Store/components/Header";
import Highlight from "../features/Store/components/Highlight";
import Ingredient from "../features/Store/components/Ingredient";
import HomeAppContainer from "../features/Store/components/HomeAppContainer";
import UserReview from "../features/Store/components/UserReview";
import SimilarProducts from "../features/Store/components/SimilarProducts";
import Doctor from "../features/Store/components/Doctor";
import Spinner from "../features/Store/components/Spinner";
import { ShopifyContext } from "../context/ShopifyContext";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { shopifyId, cartId } = useContext(ShopifyContext);
  const carouselRef = useRef(null);
  const quantityRef = useRef();
  const containerRef = useRef();

  //States
  const [singleProductData, setSingleProductData] = useState();
  const [carouselImages, setCarouselImages] = useState([]);
  const [activeVariantId, setActiveVariantId] = useState();
  const [activeVariant, setActiveVariant] = useState();
  const [variants, setVariants] = useState([]);
  const [price, setPrice] = useState();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cartData, setCartData] = useState();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [doctors, setDoctors] = useState();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  //For Mobile
  const [type, setType] = useState(0);
  const [showAddBtn, setShowAddBtn] = useState(true);
  const [showRanger, setShowRanger] = useState(false);

  //API calls
  const { data: singleProduct, isLoading: singleProductLoading } = useQuery({
    queryFn: () => getSingleProduct(id),
    queryKey: ["singleProductData"],
  });

  const {
    data: cart,
    isLoading: cartLoading,
    refetch: cartRefetch,
  } = useQuery({
    queryFn: () => fetchCartByUserId(Number(shopifyId)),
    queryKey: ["cart", id, activeVariantId, quantity],
  });

  const {
    data: addToCartResponse,
    isLoading: addToCartLoading,
    error: addToCartError,
    refetch: addToCartRefetch,
  } = useQuery({
    queryFn: () =>
      addToCart({
        productId: Number(id),
        variationId: activeVariantId,
        quantity: type === 1 ? quantityRef.current : quantity,
        userId: Number(shopifyId),
        cartId: cartId,
      }),
    queryKey: [`addToCart/${id}`],
    enabled: false,
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
        productId: Number(id),
        variationId: activeVariantId,
        quantity: type === 1 ? quantityRef.current : quantity,
        userId: Number(shopifyId),
        cartId: cartId,
      }),
    queryKey: [`updateCart/${id}`],
    enabled: false,
    gcTime: 100,
  });

  const {
    data: internalProductId,
    isLoading: internalProductIdLoading,
    error: internalProductIdError,
  } = useQuery({
    queryFn: () => getInternalProductID(id),
    queryKey: ["internalProductId"],
  });

  const {
    data: mostReviewedDoctorsResponse,
    isLoading: mostReviewedDoctorsLoading,
    error: mostReviewedDoctorsError,
  } = useQuery({
    queryFn: () => mostReviewedDoctors(),
    queryKey: ["mostReviewedDoctors"],
  });

  //Handlers
  const nextImageHandler = () => {
    setActiveImage((prev) => (prev + 1) % carouselImages.length);
    if (activeImage + 1 === carouselImages.length) {
      carouselRef?.current?.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth",
      });
    } else {
      carouselRef?.current?.scrollBy({ left: 223, top: 0, behavior: "smooth" });
    }
  };

  const incrementHandler = () => {
    quantityRef.current = quantity + 1;
    setQuantity((prev) => prev + 1);
    if (type === 1) {
      updateCartRefetch();
    }
  };

  const decrementHandler = () => {
    quantityRef.current = quantity - 1;
    if (type === 1) {
      setQuantity((prev) => prev - 1);
      updateCartRefetch();
      return;
    }
    setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
  };

  const addToCartHandler = () => {
    const present = cartData?.data?.cart?.items?.some((item) => {
      return (
        item.productId === Number(id) && item.variationId === activeVariantId
      );
    });
    // console.log(present);
    if (present) {
      updateCartRefetch();
    } else {
      addToCartRefetch();
    }
  };

  const addToCartHandlerMobile = () => {
    quantityRef.current = 1;
    setQuantity(1);
    addToCartRefetch();
  };

  const viewCartHandler = () => {
    navigate("/cart");
  };

  const moreExpertsHandler = () => {
    navigate("/find-doctors");
  };

  const scrollHandler = (direction) => {
    const itemWidth = 400;
    let newPosition = scrollPosition + direction * itemWidth;

    if (newPosition < 0) newPosition = 0;
    if (newPosition >= maxScroll) newPosition = maxScroll;

    setScrollPosition(newPosition);
    containerRef?.current?.scrollTo({
      left: newPosition,
      top: 0,
      behavior: "smooth",
    });
  };

  //Effects
  useEffect(() => {
    if (!singleProductLoading && singleProduct) {
      setSingleProductData(singleProduct?.data?.data?.ProductData);
    }
  }, [singleProduct, singleProductLoading]);

  useEffect(() => {
    setCarouselImages(
      singleProductData?.[0] &&
        singleProductData?.[0].images?.map((img, id) => {
          return { src: img.src, id: id, alt: img.alt };
        }),
    );
    setVariants(
      singleProductData?.[0] &&
        singleProductData?.[0].variants.map((variant) => {
          return {
            option: variant.option1,
            price: variant.price,
            id: variant.id,
          };
        }),
    );
    setPrice(
      singleProductData?.[0] && singleProductData?.[0].variants?.[0]?.price,
    );
    setActiveVariantId(
      singleProductData?.[0] && singleProductData?.[0].variants?.[0]?.id,
    );
    setActiveVariant(
      singleProductData?.[0] && singleProductData?.[0].variants?.[0]?.option1,
    );
  }, [singleProductData]);

  useEffect(() => {
    if (!addToCartLoading && addToCartResponse) {
      // console.log("add to cart", addToCartResponse);
      if (type === 0) {
        toast.success("Item added to cart");
      } else if (type == 1) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setShowCart(true);
        }, 4000);
        setShowAddBtn(false);
        setShowRanger(true);
      }
      cartRefetch();
    } else if (addToCartError) {
      toast.error("Item cannot be added");
    }
  }, [addToCartLoading, addToCartResponse, addToCartError, cartRefetch, type]);

  useEffect(() => {
    if (!cartLoading && cart) {
      // console.log("cart fetch=", cart);
      setCartData(cart);
    }
  }, [cartLoading, cart]);

  useEffect(() => {
    if (!updateCartLoading && updateCartResponse) {
      // console.log("update cart", updateCartResponse);
      toast.success("Cart updated successfully");
    } else if (updateCartError) {
      console.log(updateCartError);
      toast.error("Cannot update cart");
    }
  }, [updateCartResponse, updateCartError, updateCartLoading]);

  useEffect(() => {
    if (window.innerWidth <= 640) {
      setType(1);
      // console.log("dfhj");
      const present = cartData?.data?.cart?.items?.some((item) => {
        return (
          item.productId === Number(id) && item.variationId === activeVariantId
        );
      });
      if (present) {
        setShowCart(true);
        setShowAddBtn(false);
        setShowRanger(true);
      } else {
        setShowCart(false);
        setShowAddBtn(true);
        setShowRanger(false);
      }
    } else {
      setType(0);
    }
  }, [cartData, id, activeVariantId]);

  useEffect(() => {
    // console.log("fjjrh");
    const items = cartData?.data?.cart?.items || [];
    for (let i = 0; i < items.length; i++) {
      if (
        items[i].productId === Number(id) &&
        items[i].variationId === activeVariantId
      ) {
        // console.log("fjeg");
        setQuantity(items[i].quantity);
        break;
      }
    }
  }, [activeVariantId, cartData, id]);

  useEffect(() => {
    if (type === 1 && quantity === 0) {
      setShowRanger(false);
      setShowAddBtn(true);
      setShowCart(false);
    }
  }, [quantity, type]);

  useEffect(() => {
    if (!internalProductIdLoading && internalProductId) {
      console.log(internalProductId);
    } else if (internalProductIdError) {
      console.log(internalProductIdError);
    }
  }, [internalProductId, internalProductIdError, internalProductIdLoading]);

  useEffect(() => {
    if (!mostReviewedDoctorsLoading && mostReviewedDoctorsResponse) {
      // console.log(mostReviewedDoctorsResponse);
      setDoctors(mostReviewedDoctorsResponse?.data?.data);
    } else if (mostReviewedDoctorsError) {
      console.log(mostReviewedDoctorsError);
    }
  }, [
    mostReviewedDoctorsResponse,
    mostReviewedDoctorsError,
    mostReviewedDoctorsLoading,
  ]);

  useEffect(() => {
    if (containerRef?.current) {
      const container = containerRef.current;
      const scrollWidth = container.scrollWidth;
      setMaxScroll(scrollWidth);
    }
  }, [containerRef]);

  return (
    <div>
      <Header name={"Store"} show={true} />
      {singleProductData ? (
        <>
          <div className="mt-[74px] flex items-start justify-center gap-[26px] max-xl:flex-col max-xl:items-center max-xl:gap-0 max-sm:mt-[20px]">
            <div className="flex flex-col items-center justify-center gap-[26px]">
              <div className="relative max-xl:flex max-xl:items-center max-xl:justify-center">
                <img
                  src={carouselImages?.[activeImage]?.src}
                  alt={carouselImages?.[activeImage]?.alt}
                  className="h-[626px] w-[636px] rounded-2xl max-xl:h-[75%] max-xl:w-[75%] max-md:h-[344px] max-md:w-[344px]"
                />
                <img
                  src="/carouselArrow.png"
                  alt="arrow"
                  className="absolute right-[23px] top-[50%] h-[55px] w-[55px] cursor-pointer rounded-full border border-transparent transition-all hover:scale-105 hover:border-white max-xl:right-[15%] max-md:right-[1%] max-md:top-[45%]"
                  onClick={nextImageHandler}
                />
              </div>
              <div
                ref={carouselRef}
                className="no-scrollbar flex max-w-[636px] items-center justify-start gap-8 overflow-x-auto max-xl:hidden"
              >
                {carouselImages?.map((item) => (
                  <img
                    key={item.id}
                    src={item.src}
                    alt={item.alt}
                    style={{
                      opacity: activeImage === item.id ? "100%" : "40%",
                    }}
                    className="h-[191px] w-[191px] rounded-2xl"
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="mx-0 mb-[7px] mt-[12px] w-[606px] text-[22px] font-medium leading-[30px] tracking-tight max-xl:mb-0 max-xl:mt-[53px] max-md:mx-[20px] max-md:w-[calc(100%_-_40px)] max-md:text-lg max-md:leading-[18px]">
                {singleProductData?.[0]?.title}
              </h3>
              <div className="mb-[7px] mt-2.5 flex items-center justify-start gap-1 max-md:ml-5 [&_img]:h-[18px] [&_img]:w-[18px]">
                <img src="/star.svg" alt="star" />
                <img src="/star.svg" alt="star" />
                <img src="/star.svg" alt="star" />
                <img src="/star.svg" alt="star" />
                <img src="/star.svg" alt="star" />
                <span className="ml-1 text-[18px] font-medium leading-[18px] tracking-tight text-dimgray-100">
                  (204 reviews)
                </span>
              </div>
              <div className="mb-9 mt-2 flex items-center justify-start max-md:mb-2.5 max-md:ml-5">
                <img src="/ruppee.png" alt="ruppee" className="h-5 w-5" />
                <span className="text-xl font-medium leading-[26px] tracking-tight text-customblack-100">
                  {price}
                </span>
              </div>
              <div className="mb-[52px] flex items-center justify-start gap-2 max-md:ml-5 max-sm:mb-5 [&_div]:rounded-xl [&_div]:bg-[#f0f0f0] [&_div]:px-3 [&_div]:py-2 [&_span]:font-nunito [&_span]:text-[18px] [&_span]:font-medium [&_span]:leading-5 [&_span]:tracking-tight">
                {variants?.map((variant) => (
                  <div
                    key={variant.id}
                    style={{
                      border:
                        activeVariantId === variant.id
                          ? "1px solid #9DB29D"
                          : "",
                      background:
                        activeVariantId === variant.id ? "#EAF2EA" : "",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setActiveVariantId(variant.id);
                      setActiveVariant(variant.option);
                      setPrice(variant.price);
                    }}
                  >
                    <span>{variant.option}</span>
                  </div>
                ))}
              </div>
              <div className="mb-[49px] flex items-center justify-start gap-[26px] max-md:ml-5 max-sm:hidden">
                <div className="flex h-[58px] w-[262px] items-center justify-between rounded-xl border border-[#676767] px-[22px] py-0 max-xl:w-[162px] [&_img]:cursor-pointer">
                  <img
                    src="/minus.svg"
                    alt="minus"
                    onClick={decrementHandler}
                  />
                  <span className="text-xl leading-[30px]">{quantity}</span>
                  <img src="/plus.svg" alt="plus" onClick={incrementHandler} />
                </div>
                <button
                  onClick={addToCartHandler}
                  className="cursor-pointer rounded-xl border-none bg-customgreen-800 px-[103px] py-[19px] text-[18px] font-semibold leading-5 tracking-tight text-white outline-none max-xl:px-[50px]"
                >
                  Add to cart
                </button>
              </div>
              <div className="[&_p]:text-dimgray-100[18px] [&_p]:text-dimgray-100darkslategray-300 max-sm:[&_p]:text-dimgray-100sm mb-12 w-[606px] max-md:mx-5 max-md:w-[calc(100%_-_40px)] max-sm:mb-6 [&_p]:m-0 [&_p]:leading-[30px] [&_p]:tracking-tight max-sm:[&_p]:leading-5">
                {parse(singleProductData?.[0]?.body_html)}
              </div>
              <div className="hidden h-[8px] w-full bg-offWhite-100 max-sm:block" />
              <div className="mb-12 max-sm:my-6">
                <div className="mb-6 flex items-center justify-start gap-[10px] max-md:ml-5">
                  <img
                    src="/recipe.png"
                    alt="recipe"
                    className="h-[32px] w-[42px]"
                  />
                  <h4 className="m-0 text-xl font-medium leading-6 tracking-tight text-darkslategray-300 max-md:text-base max-md:leading-6">
                    Product Highlights
                  </h4>
                </div>
                <div className="flex items-center justify-start gap-3 max-xl:justify-center max-md:flex-wrap">
                  <Highlight name={"Helps with Dry, Frizzy Hair"} />
                  <Highlight name={"Relaxes the scalp, improves hair health"} />
                  <Highlight name={"Makes the hair smooth and shiny"} />
                  <Highlight name={"Reduces hairfall, repairs damaged hair"} />
                </div>
              </div>
              <div className="hidden h-[8px] w-full bg-offWhite-100 max-sm:block" />
              <div className="max-sm:mt-6">
                <div className="mb-6 flex items-center justify-start gap-[10px] max-md:ml-5">
                  <img
                    src="/recipe.png"
                    alt="recipe"
                    className="h-[32px] w-[42px]"
                  />
                  <h4 className="m-0 text-xl font-medium leading-6 tracking-tight text-darkslategray-300 max-md:text-base max-md:leading-6">
                    Key Ingredients
                  </h4>
                </div>
                <div className="mb-12 flex items-center justify-start gap-3 max-xl:justify-center max-md:flex-wrap max-sm:mb-6">
                  <Ingredient
                    name={"Triphala"}
                    desc={"Naturally Repairs and strengthens hair"}
                  />
                  <Ingredient
                    name={"Triphala"}
                    desc={"Naturally Repairs and strengthens hair"}
                  />
                  <Ingredient
                    name={"Triphala"}
                    desc={"Naturally Repairs and strengthens hair"}
                  />
                  <Ingredient
                    name={"Triphala"}
                    desc={"Naturally Repairs and strengthens hair"}
                  />
                </div>
              </div>
              <div className="hidden h-[8px] w-full bg-offWhite-100 max-sm:block" />
              <div className="mb-12">
                <h4 className="m-0 mb-3 text-xl font-bold leading-6 tracking-tight max-md:ml-5 max-md:text-base max-sm:my-6">
                  How to use
                </h4>
                <div className="w-[633px] rounded-xl bg-offWhite-200 max-md:mx-5 max-md:w-[calc(100%_-_40px)] [&_p]:m-0 [&_p]:tracking-tight [&_p]:text-dimgray-100">
                  <p className="py-5 pl-3 pr-[18px] text-[18px] leading-[30px]">
                    Mix one or tow tablespoons of Herbal Child Care Malt with
                    milk or 100-200ml warm water and then consume twice a day or
                    consult our Ayurvedic Expert to find the right Ayurvedic
                    recipe for you.
                  </p>
                </div>
              </div>
              <div className="hidden h-[8px] w-full bg-offWhite-100 max-sm:block" />
              <div className="mb-12">
                <h4 className="m-0 mb-3 text-xl font-bold leading-6 tracking-tight max-md:ml-5 max-md:text-base max-sm:my-6">
                  General Instructions
                </h4>
                <div className="w-[633px] rounded-xl bg-offWhite-200 max-md:mx-5 max-md:w-[calc(100%_-_40px)] [&_p]:m-0 [&_p]:tracking-tight [&_p]:text-dimgray-100">
                  <p className="py-5 pl-3 pr-0 text-base leading-[30px]">
                    Store in a cool and dry palce away from direct sunlight. Not
                    advisable for diabetic patients
                  </p>
                </div>
              </div>
              <div className="hidden h-[8px] w-full bg-offWhite-100 max-sm:block" />
              <div className="mb-[38px] [&_h5]:m-0 [&_h5]:pb-[14px] [&_h5]:pl-3 [&_h5]:pr-[15px] [&_h5]:pt-5 [&_h5]:text-base [&_h5]:font-bold [&_h5]:tracking-tight [&_h5]:text-darkslategray-300">
                <h4 className="m-0 mb-3 text-xl font-bold leading-6 tracking-tight max-md:ml-5 max-md:text-base max-sm:my-6">
                  Commonly Asked Questions
                </h4>
                <div
                  className="w-[633px] rounded-xl bg-offWhite-200 max-md:mx-5 max-md:w-[calc(100%_-_40px)] [&_p]:m-0 [&_p]:pb-5 [&_p]:pl-3 [&_p]:pr-[18px] [&_p]:pt-0 [&_p]:text-sm [&_p]:leading-5 [&_p]:tracking-tight [&_p]:text-dimgray-100"
                  style={{ marginBottom: "12px" }}
                >
                  <h5>
                    Who should be using Amrutam Child Care Malt | Herbal
                    Supplement for Child Care
                  </h5>
                  <p>
                    This product is ideal for growing babies and kids to nurture
                    their health in a holistic manner
                  </p>
                </div>
                <div className="w-[633px] rounded-xl bg-offWhite-200 max-md:mx-5 max-md:w-[calc(100%_-_40px)] [&_p]:m-0 [&_p]:pb-5 [&_p]:pl-3 [&_p]:pr-[20px] [&_p]:pt-0 [&_p]:text-sm [&_p]:leading-5 [&_p]:tracking-tight [&_p]:text-dimgray-100">
                  <h5>
                    Why choose Amrutam Child Care Malt | Herbal Supplement for
                    Child Care
                  </h5>
                  <p>
                    Amrutam&apos;s Child Care Malt helps improve immunity and is
                    useful in enhancing vitality and vigor in children.
                    <br /> This 100% natural Ayurvedic jam is extremely
                    effective in fighting chronic diseases.
                    <br /> Giving your little one Amrutam&apos;s Child Care Malt
                    daily will help them Improve their appetite and digestion.
                    <br /> It is useful in treating anemia, general debility and
                    maintaining a healthy weight. <br />
                    100% Natural and Ayurvedic
                    <br /> PETA certified cruelty-free <br />
                    Hand-picked and ethically sourced ingredients <br />
                    AYUSH certified and US FDA approved
                  </p>
                </div>
              </div>
              <div className="hidden h-[8px] w-full bg-offWhite-100 max-sm:block" />
              <div className="relative mb-[65px] max-sm:my-6">
                <h5 className="mb-3 text-[18px] font-medium leading-6 tracking-tight text-darkslategray-300 max-md:ml-5 max-md:text-base max-sm:mt-0">
                  Trust the voice
                </h5>
                <img
                  src="/expert.png"
                  alt="expert"
                  className="h-[320px] w-[599px] rounded-xl bg-offWhite-200 max-xl:w-full max-md:mx-5 max-md:h-auto max-md:w-[calc(100%_-_40px)]"
                />
                <img
                  src="/play.png"
                  alt="play"
                  className="absolute right-[45%] top-[45%] h-[64px] w-[64px] cursor-pointer rounded-xl bg-none"
                />
              </div>
            </div>
          </div>
          <div className="hidden h-[8px] w-full bg-offWhite-100 max-sm:block" />
          <div className="mx-[72px] mb-[88px] mt-0 max-md:mb-0 max-sm:mx-0">
            <h3 className="mb-[44px] text-center text-2xl font-semibold leading-6 tracking-tight text-darkslategray-300 max-sm:mb-[28px] max-sm:ml-5 max-sm:mt-6 max-sm:text-left max-sm:text-base">
              Reviews and Ratings
            </h3>
            <div className="mb-[34px] flex items-start justify-between max-lg:flex-col max-lg:items-center">
              <div className="flex h-[124px] w-[308px] items-center justify-start gap-5 rounded-xl bg-offWhite-100 pl-5 max-lg:mb-5 max-lg:w-full max-sm:mx-5 max-sm:w-[calc(100%_-_64px)]">
                <h2 className="font-nunito text-[32px] font-bold leading-[42px] tracking-tight text-customblack-100">
                  5.0
                </h2>
                <div>
                  <div className="flex items-center [&_svg]:mx-1 [&_svg]:my-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.10329 0.816631C8.47013 0.0734626 9.52987 0.0734625 9.89671 0.816631L11.8576 4.78909C12.0031 5.08394 12.2843 5.2884 12.6096 5.33595L16.9962 5.97712C17.8161 6.09696 18.1429 7.1048 17.5493 7.68296L14.3768 10.773C14.1409 11.0027 14.0333 11.3339 14.0889 11.6584L14.8374 16.0226C14.9775 16.8396 14.12 17.4626 13.3864 17.0767L9.46545 15.0148C9.17407 14.8615 8.82593 14.8615 8.53455 15.0148L4.61363 17.0767C3.88 17.4626 3.02245 16.8396 3.16257 16.0226L3.91109 11.6584C3.96675 11.3339 3.85908 11.0027 3.62321 10.773L0.450678 7.68296C-0.142915 7.1048 0.183869 6.09696 1.00378 5.97712L5.39037 5.33595C5.71572 5.2884 5.99691 5.08394 6.14245 4.78909L8.10329 0.816631Z"
                        fill="#F79624"
                      />
                    </svg>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.10329 0.816631C8.47013 0.0734626 9.52987 0.0734625 9.89671 0.816631L11.8576 4.78909C12.0031 5.08394 12.2843 5.2884 12.6096 5.33595L16.9962 5.97712C17.8161 6.09696 18.1429 7.1048 17.5493 7.68296L14.3768 10.773C14.1409 11.0027 14.0333 11.3339 14.0889 11.6584L14.8374 16.0226C14.9775 16.8396 14.12 17.4626 13.3864 17.0767L9.46545 15.0148C9.17407 14.8615 8.82593 14.8615 8.53455 15.0148L4.61363 17.0767C3.88 17.4626 3.02245 16.8396 3.16257 16.0226L3.91109 11.6584C3.96675 11.3339 3.85908 11.0027 3.62321 10.773L0.450678 7.68296C-0.142915 7.1048 0.183869 6.09696 1.00378 5.97712L5.39037 5.33595C5.71572 5.2884 5.99691 5.08394 6.14245 4.78909L8.10329 0.816631Z"
                        fill="#F79624"
                      />
                    </svg>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.10329 0.816631C8.47013 0.0734626 9.52987 0.0734625 9.89671 0.816631L11.8576 4.78909C12.0031 5.08394 12.2843 5.2884 12.6096 5.33595L16.9962 5.97712C17.8161 6.09696 18.1429 7.1048 17.5493 7.68296L14.3768 10.773C14.1409 11.0027 14.0333 11.3339 14.0889 11.6584L14.8374 16.0226C14.9775 16.8396 14.12 17.4626 13.3864 17.0767L9.46545 15.0148C9.17407 14.8615 8.82593 14.8615 8.53455 15.0148L4.61363 17.0767C3.88 17.4626 3.02245 16.8396 3.16257 16.0226L3.91109 11.6584C3.96675 11.3339 3.85908 11.0027 3.62321 10.773L0.450678 7.68296C-0.142915 7.1048 0.183869 6.09696 1.00378 5.97712L5.39037 5.33595C5.71572 5.2884 5.99691 5.08394 6.14245 4.78909L8.10329 0.816631Z"
                        fill="#F79624"
                      />
                    </svg>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.10329 0.816631C8.47013 0.0734626 9.52987 0.0734625 9.89671 0.816631L11.8576 4.78909C12.0031 5.08394 12.2843 5.2884 12.6096 5.33595L16.9962 5.97712C17.8161 6.09696 18.1429 7.1048 17.5493 7.68296L14.3768 10.773C14.1409 11.0027 14.0333 11.3339 14.0889 11.6584L14.8374 16.0226C14.9775 16.8396 14.12 17.4626 13.3864 17.0767L9.46545 15.0148C9.17407 14.8615 8.82593 14.8615 8.53455 15.0148L4.61363 17.0767C3.88 17.4626 3.02245 16.8396 3.16257 16.0226L3.91109 11.6584C3.96675 11.3339 3.85908 11.0027 3.62321 10.773L0.450678 7.68296C-0.142915 7.1048 0.183869 6.09696 1.00378 5.97712L5.39037 5.33595C5.71572 5.2884 5.99691 5.08394 6.14245 4.78909L8.10329 0.816631Z"
                        fill="#F79624"
                      />
                    </svg>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.10329 0.816631C8.47013 0.0734626 9.52987 0.0734625 9.89671 0.816631L11.8576 4.78909C12.0031 5.08394 12.2843 5.2884 12.6096 5.33595L16.9962 5.97712C17.8161 6.09696 18.1429 7.1048 17.5493 7.68296L14.3768 10.773C14.1409 11.0027 14.0333 11.3339 14.0889 11.6584L14.8374 16.0226C14.9775 16.8396 14.12 17.4626 13.3864 17.0767L9.46545 15.0148C9.17407 14.8615 8.82593 14.8615 8.53455 15.0148L4.61363 17.0767C3.88 17.4626 3.02245 16.8396 3.16257 16.0226L3.91109 11.6584C3.96675 11.3339 3.85908 11.0027 3.62321 10.773L0.450678 7.68296C-0.142915 7.1048 0.183869 6.09696 1.00378 5.97712L5.39037 5.33595C5.71572 5.2884 5.99691 5.08394 6.14245 4.78909L8.10329 0.816631Z"
                        fill="#F79624"
                      />
                    </svg>
                  </div>
                  <span className="font-nunito text-sm tracking-tight text-darkslategray-300">
                    Based on 20 reviews
                  </span>
                </div>
              </div>
              <div className="hidden flex-col items-center max-lg:flex">
                <UserReview />
                <UserReview />
              </div>
              <div className="flex items-center justify-center gap-4 max-lg:mb-5 [&_div]:flex [&_div]:h-[40px] [&_div]:w-[156px] [&_div]:items-center [&_div]:justify-center [&_div]:rounded-xl [&_div]:border [&_div]:border-[#e2e2e2] [&_span]:text-sm [&_span]:font-medium [&_span]:leading-6 [&_span]:tracking-tight [&_span]:text-customgreen-800">
                <div>
                  <span>See more reviews</span>
                </div>
                <div>
                  <span>Write a review</span>
                </div>
              </div>
            </div>
            <div className="block max-lg:hidden">
              <UserReview />
              <UserReview />
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}

      <div className="hidden h-[8px] w-full bg-offWhite-100 max-sm:block" />
      <SimilarProducts />
      <div className="hidden h-[8px] w-full bg-offWhite-100 max-sm:block" />
      <div className="mt-[137px] max-md:mt-6">
        <h4 className="m-0 mb-[114px] text-center text-2xl font-medium leading-6 tracking-tight max-md:mb-5 max-sm:ml-5 max-sm:text-left max-sm:text-base">
          Meet our Experts
        </h4>
        <div className="mb-[31px] flex items-center justify-center gap-5 max-xl:mx-auto max-xl:my-0 max-xl:mb-[31px]">
          <div
            onClick={() => scrollHandler(-1)}
            style={{
              opacity: scrollPosition === 0 ? 0 : 100,
              cursor: scrollPosition === 0 ? "default" : "pointer",
            }}
            className="flex h-[70px] w-[70px] cursor-pointer items-center justify-center rounded-[50%] border border-customgray-800 max-md:hidden [&_img]:w-[23px]"
          >
            <img src="/leftarrow.png" alt="left-arrow" />
          </div>
          <div
            ref={containerRef}
            className="no-scrollbar flex max-w-[calc(100vw_-_364px)] items-start justify-start gap-12 overflow-scroll max-xl:w-[90%] max-xl:gap-4 max-lg:max-w-[calc(100vw_-_264px)] max-md:max-w-[calc(100vw_-_40px)] max-sm:ml-4 max-sm:max-w-[calc(100%_-_32px)]"
          >
            {doctors ? (
              doctors?.map((doctor) => {
                return (
                  <Doctor
                    key={doctor._id}
                    id={doctor._id}
                    name={doctor?.firstname ?? "" + doctor?.lastname ?? ""}
                    rating={doctor?.averageRating ?? 0}
                    speciality={doctor?.specialities?.[0] ?? 0}
                    experience={doctor?.experience ?? 0}
                    bio={doctor?.bio ?? ""}
                    image={doctor?.photo || 0}
                  />
                );
              })
            ) : (
              <Spinner />
            )}
          </div>
          <div
            onClick={() => scrollHandler(1)}
            style={{
              opacity: scrollPosition + 1164 >= maxScroll ? 0 : 100,
              cursor:
                scrollPosition + 1164 >= maxScroll ? "default" : "pointer",
            }}
            className="flex h-[70px] w-[70px] cursor-pointer items-center justify-center rounded-[50%] border border-customgray-800 max-md:hidden [&_img]:w-[23px]"
          >
            <img src="/arrow.png" alt="right-arrow" />
          </div>
        </div>

        <button
          onClick={moreExpertsHandler}
          className="mx-auto my-0 mb-14 flex w-[276px] items-center justify-center gap-[10px] rounded-[7px] border border-customgreen-800 bg-customlightgreen-300 px-[25px] py-0 max-sm:mb-[100px] max-sm:w-[200px] max-sm:p-0"
        >
          <span className="text-lg font-medium leading-[58px] tracking-tight text-customgreen-800 max-sm:text-[15px]">
            Find more experts
          </span>
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 13L7 7L1 1"
              stroke="#3A643B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="sticky bottom-[-1px] left-0 z-[10000] hidden w-full items-center justify-between bg-white px-5 py-3 shadow-[0px_8px_24px_0px_#00000026] max-sm:flex">
        <div>
          <div className="flex items-center justify-center gap-[5px]">
            <img src="/ruppee.png" alt="ruppee" className="h-5 w-5" />
            <h5 className="m-0 font-nunito text-2xl font-bold tracking-tight text-customblack-100">
              {price}
            </h5>
          </div>
          <span className="font-nunito text-sm font-medium tracking-tight text-dimgray-100">
            {activeVariant}
          </span>
        </div>
        {showAddBtn ? (
          <button
            onClick={addToCartHandlerMobile}
            className="h-[52px] w-[172px] rounded-xl border-none bg-customgreen-800 text-center font-nunito text-[18px] font-bold leading-5 tracking-tight text-white outline-none"
          >
            Add to cart
          </button>
        ) : (
          ""
        )}
        {showRanger ? (
          <div className="flex h-[52px] w-[172px] items-center justify-between rounded-xl border-none bg-[#EAF2EA] px-4 py-0 outline-none">
            <svg
              width="16"
              height="2"
              viewBox="0 0 16 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={decrementHandler}
            >
              <path
                d="M1 1H15"
                stroke="#3A643B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{quantity}</span>

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={incrementHandler}
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
        ) : (
          ""
        )}
      </div>
      {showSuccess ? (
        <div className="fixed bottom-20 left-0 mx-[30px] hidden h-[62px] w-[calc(100%_-_60px)] animate-Morph1 items-center justify-start gap-3 rounded-xl bg-dimgray-400 max-sm:flex">
          <img
            src="/cartSuccess.png"
            alt="success"
            className="ml-3 h-[32px] w-[32px]"
          />
          <span className="font-nunito text-[18px] font-bold leading-[26px] tracking-tight text-darkslategray-300">
            Item added to cart
          </span>
        </div>
      ) : (
        ""
      )}
      {showCart ? (
        <div className="fixed bottom-[78px] left-0 hidden w-full animate-Morph2 items-center justify-between bg-customblue px-5 py-3 max-sm:flex">
          <div className="flex items-center justify-start gap-3">
            <img src="/recipe.png" alt="recipe" className="h-8 w-8" />
            <div>
              <h5 className="m-0 font-nunito text-sm font-bold tracking-tight text-white">
                Proceed to Checkout
              </h5>
              <div className="flex items-center justify-start gap-2 [&_div]:flex [&_div]:items-center [&_div]:justify-center [&_div]:gap-[2px] [&_span]:font-nunito [&_span]:text-xs [&_span]:leading-[18px] [&_span]:tracking-tight [&_span]:text-offWhite-100">
                <span>
                  {quantity} {quantity <= 1 ? "item" : "items"}
                </span>
                <svg
                  width="4"
                  height="4"
                  viewBox="0 0 4 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="2" cy="2" r="2" fill="white" />
                </svg>
                <div>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 1.5H9"
                      stroke="#FAFAFA"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 3.99219H9"
                      stroke="#FAFAFA"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 6.50781L7.25 10.5078"
                      stroke="#FAFAFA"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 6.50781H4.5"
                      stroke="#FAFAFA"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.5 6.5C7.8335 6.5 7.8335 1.5 4.5 1.5"
                      stroke="#FAFAFA"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span>{price}</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={viewCartHandler}
            className="border-none bg-white px-4 py-2 font-nunito text-xs font-bold leading-[18px] tracking-tight text-customgreen-800 outline-none"
          >
            View Cart
          </button>
        </div>
      ) : (
        ""
      )}
      <HomeAppContainer />
      <Footer />
    </div>
  );
};

export default ProductDetail;
