import { useState } from 'react';


const QUESTIONS = [
	{
		id: 0,
		question: 'Is Ayurveda safe ?',
		answer: `Yes, Ayurveda is safe when practiced by qualified professionals. 
		Our experienced Ayurvedic doctors use natural, time-tested remedies tailored to your individual needs.
		We ensure personalized care, focusing on balancing your body's energies for optimal health.
		Trust our expert practitioners for safe and effective Ayurvedic treatments. 
		Your well-being is our top priority. Ayurveda is safe when practiced by experienced professionals.`
	},
	{
		id: 1,
		question: 'Do you offer online consultations?',
		answer: `Yes, Ayurveda is safe when practiced by qualified professionals. 
		Our experienced Ayurvedic doctors use natural, time-tested remedies tailored to your individual needs.
		We ensure personalized care, focusing on balancing your body's energies for optimal health.
		Trust our expert practitioners for safe and effective Ayurvedic treatments. 
		Your well-being is our top priority. Ayurveda is safe when practiced by experienced professionals.`
	},
	{
		id: 2,
		question: 'Do you also provide the medications ?',
		answer: `Yes, Ayurveda is safe when practiced by qualified professionals. 
		Our experienced Ayurvedic doctors use natural, time-tested remedies tailored to your individual needs.
		We ensure personalized care, focusing on balancing your body's energies for optimal health.
		Trust our expert practitioners for safe and effective Ayurvedic treatments. 
		Your well-being is our top priority. Ayurveda is safe when practiced by experienced professionals.`
	},
	{
		id: 3,
		question: 'What happens if I miss my consultation?',
		answer: `Yes, Ayurveda is safe when practiced by qualified professionals. 
		Our experienced Ayurvedic doctors use natural, time-tested remedies tailored to your individual needs.
		We ensure personalized care, focusing on balancing your body's energies for optimal health.
		Trust our expert practitioners for safe and effective Ayurvedic treatments. 
		Your well-being is our top priority. Ayurveda is safe when practiced by experienced professionals.`
	},
]



function Faq() {
	const [currentQuestion, setCurrentQuestion] = useState(-1);
	const lastId = QUESTIONS.at(-1).id


	function handleQuestion(id) {
		if (currentQuestion === id) {
			setCurrentQuestion(-1);
			return;
		}

		setCurrentQuestion(id);
	}

	return (
		<div className='px-2 py-8'>
			<div className="flex justify-center mb-12">
				<h3 className="text-[#3A643B] px-10 sm:border-b-[6px] border-[#C3D0C4] text-[32px] lg:text-[48px] leading-none font-bold font-robo">
					Frequently Asked Questions
				</h3>
			</div>

			<div className='w-[80%] max-w-[1500px] mx-auto'>
				<div className='relative font-sans space-y-6'>
					{QUESTIONS.map(question => {
						return <Question
							key={question.id}
							info={question}
							lastId={lastId}
							currentQuestion={currentQuestion}
							handleQuestion={handleQuestion}
						></Question>
					})}
				</div>
				<div className='mt-16'>
					<p className="font-sans mb-6 mx-auto text-[18px] font-semibold text-[#3A643C]">
						Still in doubt ? Mail us your query and let us assist you
					</p>
					<form className="flex flex-col sm:flex-row gap-4">
						<input
							type='text'
							placeholder='Write your query'
							className="w-[100%] px-2 sm:px-4 py-4 sm:py-6 font-dmsans rounded-[8px] text-[18px] text-[#2e2626] font-semibold focus:outline-none border-[1.5px] border-[#CED8E0]"
						/>
							
						<button
							type='submit'
							className="w-[100%] sm:w-[291px] py-4 sm:py-6 font-dmsans bg-[#3A643B] rounded-[8px] text-white text-[18px] font-semibold"
						>
							Mail Us
						</button>
					</form>
				</div>

			</div>
		</div>

	);
}


function Question({ info, lastId, currentQuestion, handleQuestion }) {
	const isSelected = info.id === currentQuestion;

	return (
		<div className={`relative font-sans space-y-4 pb-6 ${(!isSelected && info.id !== lastId) && 'border-b border-[#ADADAD]'} `}>
			{!isSelected && <img className='absolute top-2 right-2' src='/arrow-r.png' alt='Arrow Right' />}
			{isSelected && <img className='absolute top-2 right-2' src='/arrow-d.png' alt='Arrow Right' />}

			<p
				onClick={() => handleQuestion(info.id)}
				className="font-semibold text-[18px] cursor-pointer"
			>
				{info.question}
			</p>
			{isSelected && (
				<p className="bg-[#F3FAF1] px-4 py-6 rounded-xl ml-12">
					{info.answer}
				</p>
			)}			
		</div>
	)

}

export default Faq;