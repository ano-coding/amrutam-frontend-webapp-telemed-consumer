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
  getProductReviews,
  createReview,
  getSingleProductMeta,
} from "../services/Shopify";
import { toast } from "react-toastify";
import parse from "html-react-parser";
import Footer from "../features/Store/components/Footer";
import Header from "../features/Store/components/Header";
// import Highlight from "../features/Store/components/Highlight";
// import Ingredient from "../features/Store/components/Ingredient";
import HomeAppContainer from "../features/Store/components/HomeAppContainer";
import UserReview from "../features/Store/components/UserReview";
import SimilarProducts from "../features/Store/components/SimilarProducts";
import Doctor from "../features/Store/components/Doctor";
import Spinner from "../features/Store/components/Spinner";
import { ShopifyContext } from "../context/ShopifyContext";
import { UserContext } from "../context/UserContext";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { shopifyId, cartId } = useContext(ShopifyContext);
  const { name, email } = useContext(UserContext);
  const carouselRef = useRef(null);
  const quantityRef = useRef();
  const containerRef = useRef();
  const inputFileRef = useRef(null);
  const totalStars = 5;

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
  const [internalId, setInternalId] = useState("");
  const [showWriteReviewBtn, setShowWriteReviewBtn] = useState(true);
  const [showCancelBtn, setShowCancelBtn] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [showMoreReviews, setShowMoreReviews] = useState(false);
  const [rating, setRating] = useState();
  const [ratingCount, setRatingCount] = useState();
  const [howToUse, setHowToUse] = useState();
  const [generalInstructions, setGeneralInstructions] = useState();

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
    queryKey: ["cart"],
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
    data: productReviews,
    isLoading: productReviewsLoading,
    error: productReviewsError,
  } = useQuery({
    queryFn: () => getProductReviews(internalId),
    queryKey: ["productReviews", internalId],
    enabled: internalId !== "",
  });

  const {
    data: createReviewResponse,
    isLoading: createReviewLoading,
    error: createReviewError,
    refetch: createReviewRefetch,
  } = useQuery({
    queryFn: () =>
      createReview(id, name, email, userRating, description, title, [
        selectedFile,
      ]),
    queryKey: ["createReview"],
    enabled: false,
  });

  const {
    data: productMetaResponse,
    isLoading: productMetaLoading,
    error: productMetaError,
  } = useQuery({
    queryFn: () => getSingleProductMeta(id),
    queryKey: ["singleProductMeta"],
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

  const writeReviewHandler = () => {
    setShowWriteReviewBtn(false);
    setShowCancelBtn(true);
    setShowReviewForm(true);
  };

  const cancelReviewHandler = () => {
    setShowWriteReviewBtn(true);
    setShowCancelBtn(false);
    setShowReviewForm(false);
  };

  const handleStarClick = (starIndex) => {
    setUserRating(starIndex + 1);
  };

  const removeFileHandler = () => {
    setSelectedFile(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      setTitleError("Title cannot be empty");
    } else {
      setTitleError("");
    }
    if (description.trim() === "") {
      setDescriptionError("Description cannot be empty");
    } else {
      setDescriptionError("");
    }
    if (title.trim() !== "" && description.trim() !== "") {
      setShowReviewForm(false);
      setShowCancelBtn(false);
      setShowWriteReviewBtn(true);
      createReviewRefetch();
    }
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
  }, [addToCartLoading, addToCartResponse, addToCartError, type]);

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
      setInternalId(internalProductId?.data?.data?.product?.id);
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

  useEffect(() => {
    if (!productReviewsLoading && productReviews) {
      console.log("reviews=", productReviews);
    } else if (productReviewsError) {
      console.log(productReviewsError);
    }
  }, [productReviews, productReviewsError, productReviewsLoading]);

  useEffect(() => {
    if (!createReviewLoading && createReviewResponse) {
      console.log("create review response=", createReviewResponse);
      toast.success("Review added");
    } else if (createReviewError) {
      console.log(createReviewError);
    }
  }, [createReviewError, createReviewLoading, createReviewResponse]);

  useEffect(() => {
    if (!productMetaLoading && productMetaResponse) {
      console.log("meta=", productMetaResponse);
      const productMeta = productMetaResponse?.data?.data?.products;
      for (let i = 0; i < productMeta.length; i++) {
        if (productMeta[i].key === "rating") {
          setRating(JSON.parse(productMeta[i].value).value);
        } else if (productMeta[i].key === "rating_count") {
          setRatingCount(productMeta[i].value);
        } else if (productMeta[i].key === "how_to_use_") {
          setHowToUse(productMeta[i].value);
        } else if (productMeta[i].key === "general_instructions") {
          setGeneralInstructions(productMeta[i].value);
        }
      }
    } else if (productMetaError) {
      console.log(productMetaError);
    }
  }, [productMetaLoading, productMetaError, productMetaResponse]);

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
                {[...Array(Math.trunc(rating))].map((_, index) => {
                  return <img src="/star.svg" alt="star" key={index} />;
                })}
                <span className="ml-1 text-[18px] font-medium leading-[18px] tracking-tight text-dimgray-100">
                  ({ratingCount} reviews)
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
                    <span className="block max-w-[300px] text-wrap">
                      {variant.option}
                    </span>
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
              {/* <div className="mb-12 max-sm:my-6">
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
              </div> */}
              {/* <div className="hidden h-[8px] w-full bg-offWhite-100 max-sm:block" /> */}
              {/* <div className="max-sm:mt-6">
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
              </div> */}
              {/* <div className="hidden h-[8px] w-full bg-offWhite-100 max-sm:block" /> */}
              {howToUse ? (
                <>
                  <div className="mb-12">
                    <h4 className="m-0 mb-3 text-xl font-bold leading-6 tracking-tight max-md:ml-5 max-md:text-base max-sm:my-6">
                      How to use
                    </h4>
                    <div className="w-[633px] rounded-xl bg-offWhite-200 max-md:mx-5 max-md:w-[calc(100%_-_40px)] [&_p]:m-0 [&_p]:tracking-tight [&_p]:text-dimgray-100">
                      <p className="py-5 pl-3 pr-[18px] text-[18px] leading-[30px]">
                        {howToUse}
                      </p>
                    </div>
                  </div>
                  <div className="hidden h-[8px] w-full bg-offWhite-100 max-sm:block" />
                </>
              ) : (
                ""
              )}
              {generalInstructions ? (
                <>
                  <div className="mb-12">
                    <h4 className="m-0 mb-3 text-xl font-bold leading-6 tracking-tight max-md:ml-5 max-md:text-base max-sm:my-6">
                      General Instructions
                    </h4>
                    <div className="w-[633px] rounded-xl bg-offWhite-200 max-md:mx-5 max-md:w-[calc(100%_-_40px)] [&_p]:m-0 [&_p]:tracking-tight [&_p]:text-dimgray-100">
                      <p className="py-5 pl-3 pr-0 text-base leading-[30px]">
                        {generalInstructions}
                      </p>
                    </div>
                  </div>
                  <div className="hidden h-[8px] w-full bg-offWhite-100 max-sm:block" />
                </>
              ) : (
                ""
              )}
              {/* <div className="mb-[38px] [&_h5]:m-0 [&_h5]:pb-[14px] [&_h5]:pl-3 [&_h5]:pr-[15px] [&_h5]:pt-5 [&_h5]:text-base [&_h5]:font-bold [&_h5]:tracking-tight [&_h5]:text-darkslategray-300">
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
              </div>*/}
            </div>
          </div>
          {/* <div className="hidden h-[8px] w-full bg-offWhite-100 max-sm:block" /> */}
          <div className="mx-[72px] mb-[88px] mt-0 max-md:mb-0 max-sm:mx-0">
            <h3 className="mb-[44px] text-center text-2xl font-semibold leading-6 tracking-tight text-darkslategray-300 max-sm:mb-[28px] max-sm:ml-5 max-sm:mt-6 max-sm:text-left max-sm:text-base">
              Reviews and Ratings
            </h3>
            <div className="mb-[34px] flex items-start justify-between max-lg:flex-col max-lg:items-center">
              <div className="flex h-[124px] w-[308px] items-center justify-start gap-5 rounded-xl bg-offWhite-100 pl-5 max-lg:mb-5 max-lg:w-full max-sm:mx-5 max-sm:w-[calc(100%_-_64px)]">
                <h2 className="font-nunito text-[32px] font-bold leading-[42px] tracking-tight text-customblack-100">
                  {rating}
                </h2>
                <div>
                  <div className="flex items-center gap-1">
                    <img src="/star.svg" alt="star" className="h-6 w-6" />
                    <img src="/star.svg" alt="star" className="h-6 w-6" />
                    <img src="/star.svg" alt="star" className="h-6 w-6" />
                    <img src="/star.svg" alt="star" className="h-6 w-6" />
                    <img src="/star.svg" alt="star" className="h-6 w-6" />
                  </div>
                  <span className="font-nunito text-sm tracking-tight text-darkslategray-300">
                    Based on {ratingCount} reviews
                  </span>
                </div>
              </div>
              <div className="hidden flex-col items-center max-lg:flex">
                {productReviews?.data?.data?.reviews
                  .slice(0, 5)
                  ?.map((review) => {
                    return (
                      <UserReview
                        title={review.title}
                        body={review.body}
                        key={review.id}
                        date={review.created_at}
                        image={review.pictures}
                        name={review.reviewer?.name}
                        rating={review.rating}
                      />
                    );
                  })}
                {showMoreReviews
                  ? productReviews?.data?.data?.reviews
                      .slice(5)
                      ?.map((review) => {
                        return (
                          <UserReview
                            title={review.title}
                            body={review.body}
                            key={review.id}
                            date={review.created_at}
                            image={review.pictures}
                            name={review.reviewer?.name}
                            rating={review.rating}
                          />
                        );
                      })
                  : ""}
              </div>
              <div className="flex items-center justify-center gap-4 max-lg:mb-5 [&_button]:flex [&_button]:h-[40px] [&_button]:w-[156px] [&_button]:items-center [&_button]:justify-center [&_button]:rounded-xl [&_button]:border [&_button]:border-[#e2e2e2] [&_span]:text-sm [&_span]:font-medium [&_span]:leading-6 [&_span]:tracking-tight [&_span]:text-customgreen-800">
                <button onClick={() => setShowMoreReviews(true)}>
                  <span>See more reviews</span>
                </button>
                {showWriteReviewBtn && (
                  <button onClick={writeReviewHandler}>
                    <span>Write a review</span>
                  </button>
                )}
                {showCancelBtn && (
                  <button onClick={cancelReviewHandler}>
                    <span>Cancel</span>
                  </button>
                )}
              </div>
            </div>
            {showReviewForm && (
              <form
                className="flex flex-col items-center justify-center"
                onSubmit={reviewSubmitHandler}
              >
                <h3 className="mb-9 text-2xl font-semibold leading-6 tracking-[-1%]">
                  Write your review
                </h3>
                <div className="mb-9 flex items-center justify-center gap-1">
                  {[...Array(totalStars)].map((_, index) => (
                    <span
                      key={index}
                      onClick={() => handleStarClick(index)}
                      className="cursor-pointer"
                    >
                      <svg
                        width="28"
                        height="25"
                        viewBox="0 0 28 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.1039 0.650614C13.4708 -0.0925545 14.5305 -0.0925533 14.8974 0.650615L18.1457 7.23141C18.2912 7.52626 18.5724 7.73072 18.8978 7.77827L26.1635 8.84027C26.9835 8.96011 27.3102 9.96795 26.7166 10.5461L21.4608 15.6653C21.2249 15.8951 21.1172 16.2262 21.1729 16.5507L22.4131 23.7816C22.5532 24.5986 21.6957 25.2215 20.962 24.8357L14.4661 21.4196C14.1747 21.2664 13.8266 21.2664 13.5352 21.4196L7.03928 24.8357C6.30565 25.2215 5.44811 24.5986 5.58822 23.7816L6.8284 16.5507C6.88407 16.2262 6.7764 15.8951 6.54053 15.6653L1.28466 10.5461C0.691071 9.96795 1.01785 8.96011 1.83777 8.84027L9.10352 7.77827C9.42887 7.73072 9.71006 7.52626 9.8556 7.23141L13.1039 0.650614Z"
                          fill={index < userRating ? "#F79624" : "none"}
                          stroke="#F79624"
                          strokeWidth="1"
                        />
                      </svg>
                    </span>
                  ))}
                </div>
                <div className="mb-4 w-[657px] max-sm:w-[calc(100%_-_40px)]">
                  <label className="flex flex-col rounded-2xl border border-[#CED8E0] px-4 py-2 text-xs text-[#646665]">
                    Review title
                    <input
                      type="text"
                      className="mt-1 w-[100%] font-nunito text-base font-medium tracking-tight text-[#2E2F2E] focus:outline-none"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </label>
                  <p className="my-0 mt-1 px-2 text-sm font-medium text-red-400">
                    {titleError}
                  </p>
                </div>
                <div className="mb-4 w-[657px] max-sm:w-[calc(100%_-_40px)]">
                  <label className="flex flex-col rounded-2xl border border-[#CED8E0] px-4 py-2 text-xs text-[#646665]">
                    Review Description
                    <textarea
                      type="text"
                      rows={3}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1 w-[100%] resize-none font-nunito text-base font-medium tracking-tight text-[#2E2F2E] focus:outline-none"
                    />
                  </label>
                  <p className="my-0 mt-1 px-2 text-sm font-medium text-red-400">
                    {descriptionError}
                  </p>
                </div>
                <div className="mb-9 flex w-[657px] flex-col rounded-2xl border border-[#CED8E0] px-4 py-2 text-xs text-[#646665] max-sm:w-[calc(100%_-_40px)]">
                  <label>
                    Add attachments
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                      hidden
                      ref={inputFileRef}
                      className="mt-1 w-[100%] font-nunito text-base font-medium tracking-tight text-[#2E2F2E] focus:outline-none"
                    />
                  </label>
                  <div className="flex justify-between">
                    <div className="flex w-full justify-between">
                      {selectedFile ? (
                        <>
                          <p className="mt-1 font-nunito text-base font-medium tracking-tight text-[#2E2F2E]">
                            {selectedFile.name}
                          </p>
                          <button
                            onClick={removeFileHandler}
                            className="cursor-pointer"
                          >
                            Remove
                          </button>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    {!selectedFile ? (
                      <img
                        src="/pin.svg"
                        alt="select-file"
                        className="h-7 w-6 cursor-pointer"
                        onClick={() => inputFileRef?.current?.click()}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="mb-16 flex items-center justify-center gap-4">
                  <button
                    onClick={cancelReviewHandler}
                    className="rounded-xl border border-[#e2e2e2] px-12 py-2 text-sm font-medium leading-6 tracking-tight text-customgreen-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={reviewSubmitHandler}
                    className="rounded-xl border-none bg-customgreen-800 px-7 py-2 text-sm font-medium leading-6 tracking-tight text-white"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
            <div className="block max-lg:hidden">
              {productReviews?.data?.data?.reviews
                .slice(0, 5)
                ?.map((review) => {
                  return (
                    <UserReview
                      title={review.title}
                      body={review.body}
                      key={review.id}
                      date={review.created_at}
                      image={review.pictures}
                      name={review.reviewer?.name}
                      rating={review.rating}
                    />
                  );
                })}
              {showMoreReviews
                ? productReviews?.data?.data?.reviews
                    .slice(5)
                    ?.map((review) => {
                      return (
                        <UserReview
                          title={review.title}
                          body={review.body}
                          key={review.id}
                          date={review.created_at}
                          image={review.pictures}
                          name={review.reviewer?.name}
                          rating={review.rating}
                        />
                      );
                    })
                : ""}
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
