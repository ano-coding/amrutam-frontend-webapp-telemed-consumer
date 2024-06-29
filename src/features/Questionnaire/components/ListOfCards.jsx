import { useEffect, useState } from "react";
import Card from "./Card";
// import { QuestionnaireContext } from "../../../Context/QuestionnaireContext/QuestionnaireProvider";

function ListOfCards() {
	const [cards, setCards] = useState([]);
	//   const { selectedType } = useContext(QuestionnaireContext);
	const [selectedFilter, setSelectedFilter] = useState('All')

	useEffect(() => {
		fetch("./QuestionnaireCards.json")
			.then((res) => res.json())
			.then((data) => setCards(data));
	}, []);

	const filteredData =
		selectedFilter === "All"
			? cards
			: cards.filter((card) => card.filter === selectedFilter);
	return (
		<div className="px-4">
			<div className="sm:w-[90%] max-w-[1200px] mx-auto border-[1.5px] border-[#e1e1e1] my-10 rounded-xl p-4 sm:p-10">
				{/* filters */}
				<div className="space-y-4">
					<h1 className="text-xl font-medium">Explore</h1>
					<div className="flex items-center gap-2 overflow-x-scroll no-scrollbar">
						<button
							onClick={() => setSelectedFilter('All')}
							className={`${selectedFilter === 'All' ? 'bg-[#e7f5e7] text-[#3A643B] font-medium border-0' : 'text-[#8E8E8E] border'} border-[#D1D1D1]  rounded-full py-2 px-5`}>
							All
						</button>
						<button
							onClick={() => setSelectedFilter('Doctor')}
							className={`min-w-fit ${selectedFilter === 'Doctor' ? 'bg-[#e7f5e7] text-[#3A643B] font-medium border-0' : 'text-[#8E8E8E] border'} border-[#D1D1D1]  py-2 px-4 rounded-full`}>
							Created by Dr.
						</button>
						<button
							onClick={() => setSelectedFilter('Amrutam')}
							className={`min-w-fit ${selectedFilter === 'Amrutam' ? 'bg-[#e7f5e7] text-[#3A643B] font-medium border-0' : 'text-[#8E8E8E] border'} border-[#D1D1D1]  py-2 px-4 rounded-full`}>
							Created by Amrutam
						</button>
						<button
							onClick={() => setSelectedFilter('People')}
							className={`min-w-fit ${selectedFilter === 'People' ? 'bg-[#e7f5e7] text-[#3A643B] font-medium border-0' : 'text-[#8E8E8E] border'} border-[#D1D1D1] py-2 px-4 rounded-full`}>
							Created by People
						</button>
					</div>
				</div>
				{/* cards */}
				{/* <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-5 py-5"> */}
				<div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 sm:gap-x-12 sm:gap-y-16 py-8">
					{filteredData?.map((card) => (
						<Card key={card?.id} card={card} />
					))}
				</div>
			</div>
		</div>
	);
}

export default ListOfCards;
