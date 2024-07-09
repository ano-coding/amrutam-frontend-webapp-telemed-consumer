// import { RxCross2 } from "react-icons/rx";
import flower from "/triviaResultFlower.png";
import amrutam from "/logoSmall.png";
import InviteFriend from "./InviteFriend";
import WrongAnswers from "./WrongAnswers";
const TriviaResult = () => {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex items-center justify-between px-5 py-10 lg:px-0">
        <div>
          <img src={amrutam} alt="Logo" />
        </div>
        <div className="font-semibold text-[#e2e2e2]">
          <h1>Restart</h1>
        </div>
        <div className="font-semibold text-[#e2e2e2]">
          <h1 className="flex items-center gap-1">
            Cancel
            {/* <RxCross2 className="text-xl" /> */}
            <img src="/cross.png" alt="Cross Icon" />
          </h1>
        </div>
      </div>
      {/* result */}
      <div className="text-center">
        <h1 className="text-lg font-semibold">{`“Mental Health Trivia Quiz Results”`}</h1>
      </div>

      {/* congrats */}
      <div>
        <div className="mt-10 space-y-5 text-center">
          <h1 className="text-lg font-semibold text-[#3a643b]">
            Congratulations Rohan
          </h1>
          <div className="flex justify-center">
            <img src={flower} alt="" />
          </div>
          <div className="flex items-center justify-center gap-5">
            <p className="text-lg font-bold text-[#3a643b]">8 Correct</p>
            <p className="text-lg font-bold text-[#b00000]">2 Wrong</p>
          </div>
          <p className="font-semibold">
            {`"Great effort! Keep learning and you'll get even better."`}
          </p>
        </div>
      </div>

      {/* invite friends */}
      <InviteFriend />
      <WrongAnswers />
    </div>
  );
};

export default TriviaResult;
