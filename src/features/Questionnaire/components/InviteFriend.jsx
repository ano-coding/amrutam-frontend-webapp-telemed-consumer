const InviteFriend = () => {
	return (
		<div className="flex flex-col items-center justify-center mt-10 ">
			<div className=" p-6 text-center">
				<button className=" py-2 px-7 mt-2 text-[#3a643b] border-[1.8px] font-semibold border-[#3a643b] rounded-lg h">
					Invite Friends
				</button>
				<p className="mb-4 text-center text-gray-700 mt-4">
					Challenge your friends to beat your score!
				</p>
				<div className="text-center mt-20">
					<p className="mb-2 text-lg font-semibold text-gray-800">
						Want to learn more about{" "}
						<span className="text-[#3a643b]">Ayurveda</span>? Read our “Daily
						Reads”
					</p>
					<button className=" py-2 px-7 mt-2 text-[#3a643b] border-[1.8px] font-semibold border-[#3a643b] rounded-lg h">
						Read Daily Reads
					</button>
				</div>
				<p className="mt-4 text-center text-gray-600 px-10">
					Recipes, DIYs and the easiest Ayurvedic life hacks! Expect to find
					detailed information on complex topics broken down in simple parlance
					in the Daily Reads section.
				</p>
			</div>
		</div>
	);
};

export default InviteFriend;
