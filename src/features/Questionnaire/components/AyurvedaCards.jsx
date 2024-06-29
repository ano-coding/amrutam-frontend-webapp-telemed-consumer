import PropTypes from "prop-types";
import like from "/likeWithbg.png";
import play from "/playWithbg.png";
import { NavLink } from "react-router-dom";

const AyurvedaCards = ({ cardDetails }) => {
  const { imgSrc, title, plays, likes, type } = cardDetails;
  return (
    <div className="mx-2 my-10 flex items-center justify-center rounded-xl border-[1.5px] border-[#767676] py-4 sm:py-10 md:mx-28">
      <div className="overflow-hidden rounded-lg p-2 sm:p-10 lg:flex">
        <div className="w-full">
          <img className="w-full" src={imgSrc} alt="Ayurvedic" />
        </div>

        <div className="pt-4 text-center md:p-6">
          <h2 className="font-dmsans text-xl font-bold">{title}</h2>
          <p className="font-dmsans mt-4 text-[18px] font-medium text-[#7a7a7a]">
            Unlock the secrets of Ayurveda with our Dosha Quiz! Discover your
            unique body type—Vata, Pitta, or Kapha. Embrace holistic well-being
            on your journey to balance and harmony.
          </p>

          <div className="mx-auto mt-10 flex items-center justify-evenly gap-5 rounded-xl border-[1.5px] border-[#f3f3f3] py-4 lg:mx-36">
            <div className="flex items-center justify-center text-gray-600">
              <img src={play} alt="" />
              <div>
                <p className="ml-2 text-sm text-[#e2e2e2]">Plays</p>
                <p className="mt-1 font-semibold text-black">{plays} </p>
              </div>
            </div>
            <div className="flex items-center justify-center text-gray-600 md:ml-4">
              <img src={like} alt="" />
              <div>
                <p className="ml-2 text-sm text-[#e2e2e2]">Likes</p>
                <p className="mt-1 font-semibold text-black">{likes} </p>
              </div>
            </div>
          </div>
          <div className="mt-14">
            {type === "Self Assessment" ? (
              <NavLink to="/selfAssessmentQuestions">
                <button className="w-[300px] whitespace-nowrap rounded-lg bg-[#3a643b] px-2 py-4 font-nunito font-semibold text-white sm:w-[374px]">
                  Play Now
                </button>
              </NavLink>
            ) : (
              <NavLink to="/triviaQuestions">
                <button className="w-[300px] whitespace-nowrap rounded-lg bg-[#3a643b] px-2 py-4 font-nunito font-semibold text-white sm:w-[374px]">
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
