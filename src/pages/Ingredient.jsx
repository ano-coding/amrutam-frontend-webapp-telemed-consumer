import Header from "../features/Store/components/Header";
import HomeAppContainer from "../features/Store/components/HomeAppContainer";
import Footer from "../features/Store/components/Footer";
import Product from "../features/Store/components/Product";

const Ingredient = () => {
  return (
    <div>
      <Header name={"Ingredient-Triphala"} show={true} />
      <div className="mx-[74px] mt-9 flex flex-wrap items-start justify-evenly gap-[100px]">
        <div>
          <button className="flex items-center justify-center gap-2 rounded-md border border-customgreen-800 px-4 py-2 font-nunito text-base leading-5 -tracking-[1%] outline-none">
            <img src="backArrow.svg" alt="back" />
            <span>Back</span>
          </button>
          <img
            src="Triphala.png"
            alt="ingredient"
            className="mb-10 mt-12 h-[203px] w-[203px] rounded-2xl border border-[#D6D6D6]"
          />
          <h2 className="mb-5 mt-0 text-[32px] font-semibold leading-[30px] -tracking-[1%] text-black">
            Triphala
          </h2>
          <p className="mb-16 w-[600px]">
            It is described as a tridoshic Rasayana in Ayurveda, capable of
            balancing and rejuvenating the three doshas that regulate human
            life: Vata, pitta, and Kapha. It is widely used in several disease
            conditions owing to its properties (laxative, anti-inflammatory,
            antiviral, blood purifying, analgesic, anti-arthritic, hypoglycemic,
            anti-ageing and antibacterial)
          </p>
          <div className="mb-5 flex w-[560px] items-end justify-between">
            <h3 className="text-2xl font-semibold leading-[30px] -tracking-[1%] text-black">
              But why we use Triphala ?
            </h3>
            <button className="border-none text-base font-semibold -tracking-[1%] text-customgreen-800 outline-none">
              Know More
            </button>
          </div>
          <ul className="mb-10 ml-6 w-[550px] list-disc [&>li]:mb-[22px]">
            <li>
              Triphala and its components have demonstrated potent antimicrobial
              properties against a variety of microorganisms.
            </li>
            <li>
              Triphala churna has proven action against the human
              immunodeficiency virus (HIV)
            </li>
            <li>
              Triphala supplementation has been shown to alleviate stress.
            </li>
            <li>
              It might have potential use in the treatment of gout in humans,
              however, more studies are needed for the same.
            </li>
            <li>
              In cancer studies, triphala has shown killing activity on cancer
              cells
            </li>
          </ul>
        </div>
        <div className="mt-[71px]">
          <h4 className="mb-7 mt-0">
            Products with <strong>“Triphala”</strong> as primary ingredient
          </h4>
          <Product
            src="ingredientProd.png"
            name={
              "Amrutam Kuntal Care Hair Spa | Do-It-Yourself Hair Treatment"
            }
            cost={649.0}
            amount={"200ml"}
            rating={"52"}
            add={"plus"}
            sm={true}
          />
          <div className="mb-5 mt-5 h-[1px] w-[450px] bg-[#e2e2e2]" />
          <Product
            src="ingredientProd.png"
            name={
              "Amrutam Kuntal Care Hair Spa | Do-It-Yourself Hair Treatment"
            }
            cost={649.0}
            amount={"200ml"}
            rating={"52"}
            add={"plus"}
            sm={true}
          />
          <div className="mb-5 mt-5 h-[1px] w-[450px] bg-[#e2e2e2]" />
          <Product
            src="ingredientProd.png"
            name={
              "Amrutam Kuntal Care Hair Spa | Do-It-Yourself Hair Treatment"
            }
            cost={649.0}
            amount={"200ml"}
            rating={"52"}
            add={"plus"}
            sm={true}
          />
        </div>
      </div>
      <HomeAppContainer />
      <Footer />
    </div>
  );
};

export default Ingredient;
