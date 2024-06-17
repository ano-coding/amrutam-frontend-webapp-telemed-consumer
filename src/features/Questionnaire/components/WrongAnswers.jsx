const WrongAnswers = () => {
	return (
		<div className="mt-4 px-5">
			<div className=" my-20">
				<div className="mb-6 text-[#b00000]">
					<p className="text-xl font-bold flex items-center">Wrong Answers</p>
				</div>
				<div className="mb-8">
					<p className="mb-4 text-lg font-semibold text-gray-800">
						What best describes Ayurveda?
					</p>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-3 font-semibold">
						<button className="w-full py-2 text-[#3a643b] border border-[#3a643b] rounded-lg focus:outline-none">
							Slender, Light build, Active
						</button>
						<button className="w-full py-2 text-[#b00000] border border-[#b00000] rounded-lg focus:outline-none">
							Slender, Light build, Active
						</button>
						<button className="w-full py-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none">
							Slender, Light build, Active
						</button>
					</div>
				</div>
				<div>
					<p className="mb-4 text-lg font-semibold text-gray-800">
						What best describes Ayurveda?
					</p>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
						<button className="w-full py-2 text-[#b00000] border border-[#b00000] rounded-lg focus:outline-none">
							Slender, Light build, Active
						</button>
						<button className="w-full py-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none">
							Slender, Light build, Active
						</button>
						<button className="w-full py-2 text-[#3a643b] border border-[#3a643b] rounded-lg focus:outline-none">
							Slender, Light build, Active
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WrongAnswers;
