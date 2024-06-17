import { useEffect, useState } from "react";
import Cards from "./Cards";
// import { QuestionnaireContext } from "../../../Context/QuestionnaireContext/QuestionnaireProvider";

const ListOfCards = () => {
  const [cards, setCards] = useState([]);
	//   const { selectedType } = useContext(QuestionnaireContext);
	const selectedType = 'All';

  useEffect(() => {
    fetch("./QuestionnaireCards.json")
      .then((res) => res.json())
      .then((data) => setCards(data));
  }, []);

  const filteredData =
    selectedType === "All"
      ? cards
      : cards.filter((card) => card.type === selectedType);
  return (
    <div>
      <div className="border-[1.5px] border-[#e1e1e1] md:mx-28 mx-10 my-10 rounded-xl py-10 md:px-14 px-5">
        {/* filters */}
        <div>
          <h1 className="text-xl font-medium">Explore</h1>
          <div className="lg:space-y-0 space-y-3 space-x-3 mt-4 ">
            <button className="bg-[#e7f5e7] text-green-600 font-semibold   rounded-full py-2 px-5">
              All
            </button>
            <button className="border-[1.5px] border-[#d1d1d1] text-[#8e8e8e] font-semibold py-2 px-4 rounded-full">
              Created by Dr.
            </button>
            <button className="border-[1.5px] border-[#d1d1d1] text-[#8e8e8e] font-semibold py-2 px-4 rounded-full">
              Created by Amrutam
            </button>
            <button className="border-[1.5px] border-[#d1d1d1] text-[#8e8e8e] font-semibold py-2 px-4 rounded-full">
              Created by People
            </button>
          </div>
        </div>
        {/* cards */}
        <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-5 py-5">
          {filteredData?.map((card) => (
            <Cards key={card?.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListOfCards;
