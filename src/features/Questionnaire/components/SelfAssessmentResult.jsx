import amrutam from "/logoSmall.png";
import SelfAssessmentProduct from "./SelfAssessmentProduct";
import SelfAssessmentRoutineCard from "./SelfAssessmentRoutineCard";
const SelfAssessmentResult = () => {
  const products = [
    {
      id: 1,
      image: "https://i.ibb.co/Qd5KkbR/product-Img1.png",

      description:
        "Amrutam Brainkey Gold Malt A Natural Formula for your Mental Immunity",
      rating: 10,
      price: 5000,
    },
    {
      id: 2,
      image: "https://i.ibb.co/Qd5KkbR/product-Img1.png",

      description:
        "Amrutam Brainkey Gold Malt A Natural Formula for your Mental Immunity",
      rating: 10,
      price: 5000,
    },
  ];
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-5">
      <div className="flex items-center justify-between py-5 sm:justify-end sm:gap-4">
        <div className="flex items-center gap-1 font-semibold text-[#e2e2e2]">
          <img src="/restart.png" alt="Cross Icon" />
          <h1>Restart</h1>
        </div>
        <div className="font-semibold text-[#e2e2e2]">
          <h1 className="flex items-center gap-1">
            Cancel
            <img src="/cross.png" alt="Cross Icon" />
          </h1>
        </div>
      </div>

      {/* result */}
      <div className="text-center">
        <h1 className="text-lg font-semibold text-[#3a643b]">{`"Your Results"`}</h1>
        <p className="mt-7 font-medium tracking-wide">
          This means that you are generally a creative, visionary type—always
          full of new ideas—but your imaginative capacity is helpfully grounded
          by your calm demeanor and steady mind, giving you an especially unique
          combination of traits. You are most likely also gentle, loving,
          tolerant, and sensitive. And when you care about something, you
          probably approach it with quite a bit of zeal. Despite having moderate
          endurance and strength, your healthy enthusiasm for life, travel, and
          adventure has likely left you aware of your tendency to overexert
          yourself. You almost certainly prefer a warmer climate, and you may
          struggle with finicky or weak digestion.
        </p>
      </div>

      {/* product card */}
      <div className="text-center">
        <div className="my-10">
          <h1 className="text-2xl font-semibold text-[#3a643b]">
            Our Recommended Products{" "}
          </h1>
          <p className="mt-4">
            Based on your preferences, we recommend the following products:
          </p>
        </div>
        <div className="sm:no-scrollbar flex items-center justify-start gap-8 overflow-x-scroll px-0 sm:justify-center sm:px-10">
          {products?.map((product) => (
            <SelfAssessmentProduct key={product?.id} product={product} />
          ))}
        </div>
      </div>

      {/* routine and yoga card */}
      <div className="py-5 text-center">
        <div className="my-10">
          <h1 className="text-2xl font-semibold text-[#3a643b]">
            Our Recommended Routines{" "}
          </h1>
          <p className="mt-4">
            Based on your preferences, we recommend the following products:
          </p>
        </div>
        <div className="sm:no-scrollbar flex items-center justify-start gap-8 overflow-x-scroll px-0 sm:justify-center sm:px-10">
          <SelfAssessmentRoutineCard />
          <SelfAssessmentRoutineCard />
        </div>
      </div>
    </div>
  );
};

export default SelfAssessmentResult;
