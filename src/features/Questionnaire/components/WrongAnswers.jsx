const WrongAnswers = () => {
  return (
    <div className="mt-4 px-5">
      <div className="my-20">
        <div className="mb-6 text-[#b00000]">
          <p className="flex items-center text-xl font-bold">Wrong Answers</p>
        </div>
        <div className="mb-8">
          <p className="mb-4 text-lg font-semibold text-gray-800">
            What best describes Ayurveda?
          </p>
          <div className="grid grid-cols-1 gap-4 font-semibold md:grid-cols-3">
            <button className="w-full rounded-lg border border-[#3a643b] py-2 text-[#3a643b] focus:outline-none">
              Slender, Light build, Active
            </button>
            <button className="w-full rounded-lg border border-[#b00000] py-2 text-[#b00000] focus:outline-none">
              Slender, Light build, Active
            </button>
            <button className="w-full rounded-lg border border-[#f0f0f0] py-2 text-gray-600 focus:outline-none">
              Slender, Light build, Active
            </button>
          </div>
        </div>
        <div>
          <p className="mb-4 text-lg font-semibold text-gray-800">
            What best describes Ayurveda?
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <button className="w-full rounded-lg border border-[#b00000] py-2 text-[#b00000] focus:outline-none">
              Slender, Light build, Active
            </button>
            <button className="w-full rounded-lg border border-[#f0f0f0] py-2 text-gray-600 focus:outline-none">
              Slender, Light build, Active
            </button>
            <button className="w-full rounded-lg border border-[#3a643b] py-2 text-[#3a643b] focus:outline-none">
              Slender, Light build, Active
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WrongAnswers;
