import PropTypes from "prop-types";
import play from "/plays.png";
import like from "/likes.png";
import bulb from "/bulb.png";

// import { CiHeart } from "react-icons/ci";
import { NavLink } from "react-router-dom";

const Cards = ({ card }) => {
  const { title, plays, likes, author, imgSrc, id } = card;
  return (
    <div>
      <NavLink to={`/questionnaireSingleCard/${id}`}>
        <div className=" rounded-lg shadow-md overflow-hidden">
          <div className="relative">
            <div className="bg-white flex justify-center items-center absolute transform right-5 top-2 h-8 w-8 rounded-full">
              {/* <CiHeart className="text-xl" /> */}
				<img src='/heart.png' alt='Heart Icon' />
            </div>
            <img className="w-full   object-cover" src={imgSrc} alt={title} />
          </div>

          <div className="p-4">
            <h3 className="text-sm font-bold tracking-wider">{title}</h3>
            <div className=" text-sm font-medium text-gray-600 mt-2 space-y-2">
              <p className="flex items-center gap-2">
                <img src={play} alt="" />
                {plays} plays
              </p>
              <p className="flex items-center gap-2">
                <img src={like} alt="" />
                {likes} plays
              </p>
            </div>
            <div className="text-sm tracking-wider flex items-center gap-2 text-gray-500 mt-2">
              <img src={bulb} alt="" />
              {author}
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

Cards.propTypes = {
  card: PropTypes.object,
};
export default Cards;
