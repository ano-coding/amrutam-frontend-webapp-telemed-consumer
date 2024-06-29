import PropTypes from "prop-types";
import like from "/likeWithbg.png";
import play from "/playWithbg.png";
import { NavLink } from "react-router-dom";

const AyurvedaCards = ({ cardDetails }) => {
	const { imgSrc, title, plays, likes, type } = cardDetails;
	return (
		<div className="flex justify-center items-center border-[1.5px] border-gray-200 py-4 sm:py-10 md:mx-28  mx-2 my-10 rounded-xl ">
			<div className="p-2 sm:p-10 rounded-lg overflow-hidden lg:flex ">
				<div className="w-full">
					<img className="w-full " src={imgSrc} alt="Ayurvedic" />
				</div>

				<div className="md:p-6 pt-4 text-center">
					<h2 className="text-xl font-bold font-dmsans">{title}</h2>
					<p className="mt-4 text-[#7a7a7a] font-medium font-dmsans text-[18px]">
						Unlock the secrets of Ayurveda with our Dosha Quiz! Discover your
						unique body type—Vata, Pitta, or Kapha. Embrace holistic well-being
						on your journey to balance and harmony.
					</p>

					<div className="flex gap-5 items-center justify-evenly  lg:mx-36 mx-auto py-4 rounded-xl mt-10 border-[1.5px] border-[#f3f3f3] ">
						<div className="flex items-center justify-center text-gray-600">
							<img src={play} alt="" />
							<div>
								<p className="ml-2 text-gray-400 text-sm">Plays</p>
								<p className="text-black font-semibold mt-1">{plays} </p>
							</div>
						</div>
						<div className="flex items-center justify-center text-gray-600 md:ml-4">
							<img src={like} alt="" />
							<div>
								<p className="ml-2 text-gray-400 text-sm">Likes</p>
								<p className="text-black font-semibold mt-1">{likes} </p>
							</div>
						</div>
					</div>
					<div className="mt-14">
						{type === "Self Assessment" ? (
							<NavLink to="/selfAssessmentQuestions">
								<button className=" bg-[#3a643b] text-white font-nunito font-semibold w-[300px] sm:w-[374px] px-2 py-4 rounded-lg  whitespace-nowrap">
									Play Now
								</button>
							</NavLink>
						) : (
							<NavLink to="/triviaQuestions">
								<button className=" bg-[#3a643b] text-white font-nunito font-semibold w-[300px] sm:w-[374px] px-2 py-4 rounded-lg  whitespace-nowrap">
									Play Now
								</button>
							</NavLink>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

AyurvedaCards.propTypes = {
	cardDetails: PropTypes.object,
};

export default AyurvedaCards;
