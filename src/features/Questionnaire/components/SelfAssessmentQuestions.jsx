import { useState, useEffect } from "react";
import amrutam from "/logoSmall.png";
// import { RxCross2 } from "react-icons/rx";
import ProgressBar from "./ProgressBar";
// import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SelfAssessmentQuestions = () => {
  const [progress, setProgress] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const questions = [
    {
      question: "What best describes your physical structure?",
      options: [
        "Slender, Light build, Active",
        "Medium build, Average activity",
        "Stocky build, Less active",
      ],
    },
    {
      question: "How would you describe your diet?",
      options: [
        "Balanced with fruits and vegetables",
        "High protein and low carb",
        "Mostly fast food and snacks",
      ],
    },
    {
      question: "How do you usually sleep?",
      options: [
        "Deep and restful",
        "Interrupted and light",
        "Short and insufficient",
      ],
    },
    {
      question: "What is your usual energy level throughout the day?",
      options: [
        "High and consistent",
        "Fluctuates with energy drops",
        "Low and tired often",
      ],
    },
  ];

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length) {
      setCurrentQuestionIndex((cQI) => cQI + 1);
      setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
      setSelectedOption(null); // Clear the selected option for the next question
    } else {
      setProgress(100); // Set progress to 100% on the last question
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setTimeout(nextQuestion, 500);
  };

  useEffect(() => {
    if (progress === 100) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "You Successfully Completed Your Self Assessment",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/selfAssessmentResult");
    }
  }, [progress, navigate]);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-10 sm:gap-8 lg:px-0">
        <div className="flex flex-1 items-center justify-between gap-4 sm:justify-end sm:gap-8">
          <div className="font-semibold text-[#e2e2e2]">
            <h1>{`Question ${currentQuestionIndex + 1}/${questions.length}`}</h1>
          </div>
          <div className="font-semibold text-[#e2e2e2]">
            <h1 className="flex items-center gap-1">
              Finish Later
              <img src="/cross.png" alt="Cross Icon" />
            </h1>
          </div>
        </div>
      </div>
      <div>
        <h1 className="px-5 text-center text-xl font-semibold tracking-wider md:text-left lg:px-0">
          Mental Health Quiz
        </h1>
      </div>
      <div className="px-5 py-10 lg:px-0">
        <ProgressBar progress={progress} />
      </div>

      <p className="flex items-center gap-2 px-5 text-lg font-semibold lg:px-0">
        <img src="/arrow-left.png" alt="Arrow Left" />
        Go Back
      </p>

      <p className="mt-6 text-center text-lg font-semibold text-gray-700 md:ml-10 md:text-left lg:ml-0">
        {questions[currentQuestionIndex]?.question}
      </p>

      <div className="mx-10 my-10 items-center gap-12 md:flex lg:mx-0">
        {questions[currentQuestionIndex]?.options?.map((option, index) => (
          <button
            key={index}
            className={`mt-4 w-full rounded-lg border py-2 text-center transition hover:border-[#7b7b7b] md:mt-0 ${selectedOption === option ? "border-[1.5px] border-[#3a643b] font-bold text-[#3a643b]" : "border-[#f0f0f0]"}`}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="flex justify-center pb-10 md:mr-10 md:justify-end lg:mr-0">
        <button
          onClick={nextQuestion}
          className={`mt-6 rounded-lg px-20 py-3 font-semibold transition ${!selectedOption ? "cursor-not-allowed bg-[#e6e6e6] text-white" : "bg-[#3a643b] text-white"}`}
          disabled={!selectedOption}
        >
          {currentQuestionIndex >= questions.length
            ? "Complete Quiz"
            : "Next Question"}
        </button>
      </div>
    </div>
  );
};

export default SelfAssessmentQuestions;
