// import yogaBg from "../../../../../../assets/yogaImg.png";
const SelfAssessmentRoutineCard = () => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white">
      <div className="relative h-48 bg-[url('./assets/yogaImg.png')] bg-cover bg-center bg-no-repeat">
        <div className=" text-left inset-0 flex flex-col justify-between w-96">
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
      </div>
    </div>
  );
};

export default SelfAssessmentRoutineCard;
