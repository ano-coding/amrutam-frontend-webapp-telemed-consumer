// import yogaBg from "../../../../../../assets/yogaImg.png";
const SelfAssessmentRoutineCard = () => {
	return (
		<div className="flex-shrink-0 relative max-w-sm rounded overflow-hidden shadow-lg m-2 sm:m-4 bg-white">
			<div className="relative h-48 bg-cover bg-center bg-no-repeat">
				<div className="text-left inset-0 flex flex-col justify-between w-96">
					<div>
						<h2 className=" font-semibold text-lg absolute top-5 left-5">
							Daily Yoga
						</h2>
					</div>
					<div>
						<button className="bg-white text-black border border-black py-2 px-5 rounded-xl  absolute bottom-5 left-5">
							Explore &gt;
						</button>
					</div>
				</div>
				<img src='/yoga.png' className='absolute right-0 top-0' alt='Yoga girl' />
			</div>
			<img
				src='/spiral-bg.png'
				alt='Spiral background'
				className='absolute right-0 top-0'
			/>
		</div>
	);
};

export default SelfAssessmentRoutineCard;
