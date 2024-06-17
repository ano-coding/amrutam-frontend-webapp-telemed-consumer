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
			setCurrentQuestionIndex(currentQuestionIndex + 1);
			setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
			setSelectedOption(null); // Clear the selected option for the next question
		} else {
			setProgress(100); // Set progress to 100% on the last question
		}
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
		<div className="max-w-6xl mx-auto">
			<div className="flex items-center justify-between py-10 lg:px-0 px-5">
				<div>
					<img src={amrutam} alt="Logo" />
				</div>
				<div className="font-semibold text-gray-400">
					<h1>{`Question ${currentQuestionIndex + 1}/${questions.length}`}</h1>
				</div>
				<div className="font-semibold text-gray-400">
					<h1 className="flex items-center gap-1">
						Finish Later
						{/* <RxCross2 className="text-xl" /> */}
						<img src='/cross.png' alt='Cross Icon' />
					</h1>
				</div>
			</div>
			<div>
				<h1 className="font-semibold text-xl tracking-wider md:text-left text-center lg:px-0 px-5">
					Mental Health Quiz
				</h1>
			</div>
			<div className="py-10 lg:px-0 px-5">
				<ProgressBar progress={progress} />
				<p className="text-center mt-4">{Math.round(progress)}%</p>
			</div>

			<p className="flex items-center gap-2 text-lg font-semibold lg:ml-0 ml-10">
				{/* <IoArrowBackOutline /> */}
				<img src='/arrow-left.png' alt='Arrow Left' />
				Go Back
			</p>

			<p className="text-lg font-semibold text-gray-700 mt-6 md:text-left text-center lg:ml-0 md:ml-10">
				{questions[currentQuestionIndex]?.question}
			</p>

			<div className="my-10 md:flex items-center gap-12 lg:mx-0 mx-10 ">
				{questions[currentQuestionIndex]?.options?.map((option, index) => (
					<button
						key={index}
						className={`w-full py-2 border md:mt-0 mt-4  rounded-lg text-center hover:bg-gray-100 transition ${selectedOption === option ? "text-[#3a643b] font-bold border-[1.5px] border-[#3a643b] " : "border-gray-300"}`}
						onClick={() => setSelectedOption(option)}>
						{option}
					</button>
				))}
			</div>
			<div className="flex md:justify-end justify-center pb-10 lg:mr-0 md:mr-10">
				<button
					onClick={nextQuestion}
					className={`mt-6 font-semibold py-3 px-20 rounded-lg transition ${!selectedOption ? "bg-[#e6e6e6] text-white cursor-not-allowed" : "bg-[#3a643b] text-white"}`}
					disabled={!selectedOption}>
					{currentQuestionIndex >= questions.length
						? "Complete Quiz"
						: "Next Question"}
				</button>
			</div>
		</div>
	);
};

export default SelfAssessmentQuestions;
