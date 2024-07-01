import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import FilterContainer from "../features/Store/components/FilterContainer";
import Footer from "../features/Store/components/Footer";
import Header from "../features/Store/components/Header";
import Highlight from "../features/Store/components/Highlight";
import Ingredient from "../features/Store/components/Ingredient";
import HomeAppContainer from "../features/Store/components/HomeAppContainer";
import UserReview from "../features/Store/components/UserReview";
import SimilarProducts from "../features/Store/components/SimilarProducts";
import Doctor from "../features/Store/components/Doctor";

const ProductDetail = () => {
  const navigate = useNavigate();

  const carouselImages = [
    { id: 0, src: "/product1.png" },
    { id: 1, src: "/product2.png" },
    { id: 2, src: "/product3.png" },
  ];

  //States
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [index, setIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCart, setShowCart] = useState(false);
  //For Mobile
  const [itemCount, setItemCount] = useState(0);

  //Handlers
  const nextImageHandler = () => {
    setActiveImage((prev) => (prev + 1) % 3);
  };
  const incrementHandler = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrementHandler = () => {
    setQuantity((prev) => (prev === 0 ? 0 : prev - 1));
  };
  const addToCartHandler = (type) => {
    if (type) {
      setItemCount((prev) => prev + 1);
      setShowCart(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);

        setShowCart(true);
      }, 3000);
    }
    if (localStorage.getItem("amrutam")) {
      const arr = JSON.parse(localStorage.getItem("amrutam"));
      arr.push({ quantity: type ? 1 : quantity, price: 649.0, index: index });
      localStorage.setItem("amrutam", JSON.stringify(arr));
      setIndex((prev) => prev + 1);
    } else {
      localStorage.setItem(
        "amrutam",
        JSON.stringify([
          { quantity: type ? 1 : quantity, price: 649.0, index: index },
        ]),
      );
      setIndex((prev) => prev + 1);
    }
  };
  const viewCartHandler = () => {
    navigate("/cart");
  };

  return (
    <div>
      <Header name={"Store"} show={true} />
      <div className="mt-[74px] flex items-start justify-center gap-[26px] max-xl:flex-col max-xl:items-center max-xl:gap-0 max-sm:mt-[20px]">
        <div className="flex flex-col items-center justify-center gap-[26px]">
          <div className="relative max-xl:flex max-xl:items-center max-xl:justify-center">
            <img
              src={carouselImages[activeImage]?.src}
              alt="product"
              className="h-[626px] w-[636px] rounded-2xl max-xl:h-[75%] max-xl:w-[75%] max-md:h-[344px] max-md:w-[344px]"
            />
            <img
              src="/carouselArrow.png"
              alt="arrow"
              className="absolute right-[23px] top-[50%] h-[55px] w-[55px] cursor-pointer rounded-full border border-transparent transition-all hover:scale-105 hover:border-white max-xl:right-[15%] max-md:right-[1%] max-md:top-[45%]"
              onClick={nextImageHandler}
            />
          </div>
          <div className="flex w-[636px] items-center justify-between max-xl:hidden">
            {carouselImages.map((item) => (
              <img
                key={item.id}
                src={item.src}
                alt="product"
                style={{ opacity: activeImage === item.id ? "100%" : "40%" }}
                className="h-[191px] w-[191px] rounded-2xl"
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="mx-0 mb-[7px] mt-[12px] w-[606px] text-[22px] font-medium leading-[30px] tracking-tight max-xl:mb-0 max-xl:mt-[53px] max-md:mx-[20px] max-md:w-[calc(100%_-_40px)] max-md:text-lg max-md:leading-[18px]">
            Amrutam Kuntal Care Hair Spa | Do-It-Yourself Hair Treatment
          </h3>
          <div className="mb-[7px] mt-2.5 flex items-center justify-start gap-1 max-md:ml-5">
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
            <span className="ml-1 text-[18px] font-medium leading-[18px] tracking-tight text-dimgray-100">
              (204 reviews)
            </span>
          </div>
          <div className="mb-9 mt-2 flex items-center justify-start max-md:mb-2.5 max-md:ml-5">
            <img src="/ruppee.png" alt="ruppee" className="h-5 w-5" />
            <span className="text-xl font-medium leading-[26px] tracking-tight text-customblack-100">
              649
            </span>
          </div>
          <div className="mb-[52px] flex items-center justify-start gap-2 max-md:ml-5 max-sm:mb-5 [&_div]:rounded-xl [&_div]:px-3 [&_div]:py-2 first:[&_div]:border first:[&_div]:border-customlightgreen-100 first:[&_div]:bg-customgreen-100 last:[&_div]:bg-offWhite-100 last:[&_div]:text-offWhite-300 even:[&_div]:bg-[#f0f0f0] [&_span]:font-nunito [&_span]:text-[18px] [&_span]:font-medium [&_span]:leading-5 [&_span]:tracking-tight">
            <div>
              <span>200 ml</span>
            </div>
            <div>
              <span>100 ml</span>
            </div>
            <div>
              <span>Pack of 3</span>
            </div>
          </div>
          <div className="mb-[49px] flex items-center justify-start gap-[26px] max-md:ml-5 max-sm:hidden">
            <div className="flex h-[58px] w-[262px] items-center justify-between rounded-xl border border-[#676767] px-[22px] py-0 max-xl:w-[162px] [&_svg]:cursor-pointer">
              <svg
                width="20"
                height="2"
                viewBox="0 0 20 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={decrementHandler}
              >
                <path
                  d="M1 1H19"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-xl leading-[30px]">{quantity}</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={incrementHandler}
              >
                <path
                  d="M17.1 8.1H9.9V0.9C9.9 0.405 9.495 0 9 0C8.505 0 8.1 0.405 8.1 0.9V8.1H0.9C0.405 8.1 0 8.505 0 9C0 9.495 0.405 9.9 0.9 9.9H8.1V17.1C8.1 17.595 8.505 18 9 18C9.495 18 9.9 17.595 9.9 17.1V9.9H17.1C17.595 9.9 18 9.495 18 9C18 8.505 17.595 8.1 17.1 8.1Z"
                  fill="black"
                />
              </svg>
            </div>
            <button
              onClick={() => addToCartHandler(0)}
              className="cursor-pointer rounded-xl border-none bg-customgreen-800 px-[103px] py-[19px] text-[18px] font-semibold leading-5 tracking-tight text-white outline-none max-xl:px-[50px]"
            >
              Add to cart
            </button>
          </div>
          <div className="[&_p]:text-dimgray-100[18px] [&_p]:text-dimgray-100darkslategray-300 max-sm:[&_p]:text-dimgray-100sm mb-12 w-[606px] max-md:mx-5 max-md:w-[calc(100%_-_40px)] max-sm:mb-6 [&_p]:m-0 [&_p]:leading-[30px] [&_p]:tracking-tight max-sm:[&_p]:leading-5">
            <p>
              Amrutam&apos;s Kuntal Care Do-It-Yourself Hair Spa is an ayurvedic
              marvel filled to the brim with revitalizing herbs and essential
              oils like Eucalyptus oil, Triphala, Balchhad and Bhringraj.{" "}
            </p>
            <p>
              These Ayurvedic ingredients when fused together make a potent
              dollop that nourishes dry and frizzy hair making it soft and
              bouncy! This spa treatment revitalizes the roots, promotes growth,
              provides shine, coats hair with a moisturizing layer and is the
              best stress reliever!
            </p>
            <p>It&apos;s time to bring spa home and unwind.</p>
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
                Mix one or tow tablespoons of Herbal Child Care Malt with milk
                or 100-200ml warm water and then consume twice a day or consult
                our Ayurvedic Expert to find the right Ayurvedic recipe for you.
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
                Who should be using Amrutam Child Care Malt | Herbal Supplement
                for Child Care
              </h5>
              <p>
                This product is ideal for growing babies and kids to nurture
                their health in a holistic manner
              </p>
            </div>
            <div className="w-[633px] rounded-xl bg-offWhite-200 max-md:mx-5 max-md:w-[calc(100%_-_40px)] [&_p]:m-0 [&_p]:pb-5 [&_p]:pl-3 [&_p]:pr-[20px] [&_p]:pt-0 [&_p]:text-sm [&_p]:leading-5 [&_p]:tracking-tight [&_p]:text-dimgray-100">
              <h5>
                Why choose Amrutam Child Care Malt | Herbal Supplement for Child
                Care
              </h5>
              <p>
                Amrutam&apos;s Child Care Malt helps improve immunity and is
                useful in enhancing vitality and vigor in children.
                <br /> This 100% natural Ayurvedic jam is extremely effective in
                fighting chronic diseases.
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
      <div className="hidden h-[8px] w-full bg-offWhite-100 max-sm:block" />
      <SimilarProducts />
      <div className="hidden h-[8px] w-full bg-offWhite-100 max-sm:block" />
      <div className="mt-[137px] max-md:mt-6">
        <h4 className="m-0 mb-[114px] text-center text-2xl font-medium leading-6 tracking-tight max-md:mb-5 max-sm:ml-5 max-sm:text-left max-sm:text-base">
          Meet our Experts
        </h4>
        <div className="no-scrollbar mb-[31px] flex items-center justify-center gap-12 max-xl:mx-auto max-xl:my-0 max-xl:mb-[31px] max-xl:w-[90%] max-xl:justify-start max-xl:gap-4 max-xl:overflow-scroll">
          <div className="flex h-[70px] w-[70px] cursor-pointer items-center justify-center rounded-[50%] border border-customgray-800 max-lg:hidden [&_img]:w-[23px]">
            <img src="/leftarrow.png" alt="left-arrow" />
          </div>
          <Doctor />
          <Doctor />
          <Doctor />
          <div className="flex h-[70px] w-[70px] cursor-pointer items-center justify-center rounded-[50%] border border-customgray-800 max-lg:hidden [&_img]:w-[23px]">
            <img src="/arrow.png" alt="right-arrow" />
          </div>
        </div>
        <div className="mb-10 flex items-center justify-center gap-[30px] max-lg:hidden [&_svg]:h-3 [&_svg]:w-3">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6" cy="6" r="6" fill="#3A643B" />
          </svg>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6" cy="6" r="6" fill="#C3C3C3" />
          </svg>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6" cy="6" r="6" fill="#C3C3C3" />
          </svg>
        </div>
        <button className="mx-auto my-0 mb-14 flex w-[276px] items-center justify-center gap-[10px] rounded-[7px] border border-customgreen-800 bg-customlightgreen-300 px-[25px] py-0 max-sm:mb-[100px] max-sm:w-[200px] max-sm:p-0">
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
              649
            </h5>
          </div>
          <span className="font-nunito text-sm font-medium tracking-tight text-dimgray-100">
            200 ml
          </span>
        </div>
        <button
          onClick={() => addToCartHandler(1)}
          className="h-[52px] w-[172px] rounded-xl border-none bg-customgreen-800 text-center font-nunito text-[18px] font-bold leading-5 tracking-tight text-white outline-none"
        >
          Add to cart
        </button>
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
                  {itemCount} {itemCount <= 1 ? "item" : "items"}
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

                  <span>{itemCount * 649}</span>
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
