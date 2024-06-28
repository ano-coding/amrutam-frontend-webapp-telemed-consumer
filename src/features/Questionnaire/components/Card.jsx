import PropTypes from "prop-types";
import play from "/plays.png";
import like from "/likes.png";
import bulb from "/bulb.png";

import { NavLink } from "react-router-dom";

function Card({ card }) {
	const { title, plays, likes, author, imgSrc, id } = card;
	return (
		<div className="">
			<NavLink to={`/questionnaireSingleCard/${id}`}>
				<div className="w-[161px] px-2 py-3 rounded-lg hover:shadow-md duration-300 overflow-hidden border border-[#E7E7E7]">
					<div className="relative">
						<div className="bg-white flex justify-center items-center absolute transform right-2 top-2 h-6 w-6 rounded-full">
							<img src='/heart.png' alt='Heart Icon' />
						</div>
						<img className="w-[144px] h-[144px]  object-cover" src={imgSrc} alt={title} />
					</div>

					<div className="py-2 px-1 font-roboto text-[#727272]">
						<h3 className="text-sm font-dmsans text-black font-semibold">{title}</h3>
						<div className=" text-sm  mt-2 space-y-2">
							<p className="flex items-center gap-2">
								<img src={play} alt="" />
								{plays} plays
							</p>
							<p className="flex items-center gap-2">
								<img src={like} alt="" />
								{likes} plays
							</p>
						</div>
						<div className="text-sm tracking-wider flex items-center gap-2 mt-2">
							<img src={bulb} alt="" />
							{author}
						</div>
					</div>
				</div>
			</NavLink>
		</div>
	);
}

Card.propTypes = {
	card: PropTypes.object,
};
export default Card;
