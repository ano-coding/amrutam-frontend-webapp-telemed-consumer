// import { useContext } from "react";
// import { QuestionnaireContext } from "../../Context/QuestionnaireContext/QuestionnaireProvider";
const QuestionnaireHero = () => {
  //   const { setSelectedType } = useContext(QuestionnaireContext);

  /* const handleTypeChange = (e) => {
		setSelectedType(e.target.value);
	}; */

  return (
    <div>
      <div className="h-52 bg-[url('/QuestionnaireBg.png')] bg-cover bg-center bg-no-repeat">
        <div className="flex h-full flex-col items-center justify-center text-center md:flex-row">
          <div className="pt-6">
            <h1 className="text-center font-medium md:text-2xl">
              Search Topics
            </h1>
            <div className="relative px-4">
              <img
                src="/arrow-right.png"
                alt="arrow right"
                className="absolute right-7 top-6 w-5 -translate-y-1/2 transform bg-white text-lg md:top-2/3"
              />
              <input
                type="text"
                placeholder="Search eg. Dosha Quiz, Mental Health etc"
                className="mt-2 w-72 rounded-lg border-[1.5px] border-[#cdcdcd] px-5 py-[13px] text-xs outline-none md:mt-4 md:text-sm lg:w-96"
              />
            </div>
          </div>
          <div className="pt-1">
            <h1 className="mt-5 text-center font-medium md:text-2xl">
              Select Type
            </h1>
            <div className="relative px-4">
              {/* <img src='/arrow-down.png' className="w-[12px] absolute right-8 md:top-2/3 top-6 text-lg transform -translate-y-1/2 bg-white " alt='Arrow Down' /> */}
              <select
                // onChange={handleTypeChange}
                type="text"
                placeholder="Select Questionnaire Type"
                className="mt-2 w-72 rounded-lg border-[1.5px] border-[#cdcdcd] px-5 py-[13px] text-xs text-[#e2e2e2] outline-none md:mt-4 md:text-sm lg:w-60"
              >
                <option disabled defaultValue>
                  Select Questionnaire Type
                </option>
                <option value="All">All</option>
                <option value="Self Assessment">Self Assessment</option>
                <option value="Trivia">Trivia</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireHero;
