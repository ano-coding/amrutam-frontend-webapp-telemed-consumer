import { useState, useEffect } from "react";
import amrutam from "/logoSmall.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ProgressBar from "./ProgressBar";

const TriviaQuestions = () => {
  const [progress, setProgress] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const questions = [
    {
      question: "What best describes your physical structure?",
      options: [
        "Slender, Light build, Active",
        "Medium build, Average activity",
        "Stocky build, Less active",
      ],
      correctAnswer: "Slender, Light build, Active",
    },
    {
      question: "How would you describe your diet?",
      options: [
        "Balanced with fruits and vegetables",
        "High protein and low carb",
        "Mostly fast food and snacks",
      ],
      correctAnswer: "Balanced with fruits and vegetables",
    },
    {
      question: "How do you usually sleep?",
      options: [
        "Deep and restful",
        "Interrupted and light",
        "Short and insufficient",
      ],
      correctAnswer: "Deep and restful",
    },
    {
      question: "What is your usual energy level throughout the day?",
      options: [
        "High and consistent",
        "Fluctuates with energy drops",
        "Low and tired often",
      ],
      correctAnswer: "High and consistent",
    },
  ];

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length) {
      setCurrentQuestionIndex((cQI) => cQI + 1);
      setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
      setSelectedOption(null);
      setFeedback("");
    } else {
      setProgress(100); // Set progress to 100% on the last question
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === questions[currentQuestionIndex].correctAnswer) {
      setFeedback("Correct Answer");
    } else {
      setFeedback("Wrong Answer");
    }
    setTimeout(nextQuestion, 750);
  };

  useEffect(() => {
    if (progress === 100) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "You Successfully Completed Trivia Questions",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/triviaResult");
    }
  }, [progress, navigate]);

  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* <div className="flex items-center "> */}
      {/* <div>
					<img src={amrutam} alt="Logo" />
				</div> */}
      <div className="flex items-center justify-between gap-4 py-10 sm:justify-end">
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

      {/* </div> */}
      <div>
        <h1 className="text-center text-xl font-semibold tracking-wider md:text-left">
          Mental Health Quiz
        </h1>
      </div>
      <div className="py-10">
        <ProgressBar progress={progress} />
        {/* <p className="text-center mt-4">{Math.round(progress)}%</p> */}
      </div>

      <p className="flex items-center gap-2 text-lg font-semibold">
        {/* <IoArrowBackOutline /> */}
        <img src="/arrow-left.png" alt="Arrow Left" />
        Go Back
      </p>

      <p className="mt-6 text-center text-lg font-semibold text-gray-700 md:ml-10 md:text-left lg:ml-0">
        {questions[currentQuestionIndex]?.question}
      </p>

      <div className="mx-auto my-10 items-center gap-12 px-2 md:flex md:px-6 lg:mx-0">
        {questions[currentQuestionIndex]?.options?.map((option, index) => (
          <button
            key={index}
            className={`mt-4 w-full rounded-lg border border-[#f0f0f0] py-2 text-center transition hover:border-[#7b7b7b] md:mt-0 ${selectedOption === option && option !== questions[currentQuestionIndex].correctAnswer && "border-[1.5px] border-[#b00000] font-bold text-[#b00000]"} ${selectedOption && option === questions[currentQuestionIndex].correctAnswer && "border-[1.5px] border-[#3a643b] font-bold text-[#3a643b]"}`}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="my-4 flex text-center text-lg font-semibold">
        {feedback && (
          <p
            className={`${feedback === "Correct Answer" ? "text-[#3a643b]" : "text-[#b00000]"} mx-auto flex items-center gap-1`}
          >
            {feedback === "Correct Answer" ? (
              <img src="/green-tick.png" className="h-5 w-5" alt="Green tick" />
            ) : (
              <img src="/red-cross.png" className="h-5 w-5" alt="Red cross" />
            )}
            {feedback}
          </p>
        )}
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

export default TriviaQuestions;
