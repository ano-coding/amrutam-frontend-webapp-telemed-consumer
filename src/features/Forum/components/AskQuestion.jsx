import { useState } from "react";
import QuestionForm from "./QuestionForm";



function AskQuestion() {
	const [showForm, setShowForm] = useState(false);


	return (
		<div className='border-b border-[#F6F6F5] px-2 sm:px-0'>
			<div className='flex flex-col sm:items-center sm:flex-row justify-center py-20 gap-4 sm:gap-6 px-2 sm:px-8 max-w-[1100px] mx-auto'>
				{
					!showForm && (
						<>
							<div className='flex items-center justify-center gap-4 mb-4 sm:mb-0 self-start sm:self-auto'>
								<img src='/priya.png' alt='Person' />
								<p className='text-[#3A643B] text-[19px] font-semibold min-w-fit'>Priya Singh</p>
							</div>
							<input
								type='text'
								onFocus={() => setShowForm(true)}
								placeholder="Ask your question here"
								className="flex-1 h-[39px] px-4 py-2 placeholder:text-[#7B7B7B] placeholder:text-[15px] rounded-[11px] border border-[#E0E0E0] focus:outline-none"
							/>
							<button
								onClick={() => setShowForm(true)}
								type='button'
								className='bg-[#3A643B] h-[39px] px-12 py-2 text-white hover:shadow-xl rounded-lg duration-500'
							>
								Ask
							</button>
						</>
					)
				}
				{
					showForm && (
						<div className="w-full">
							<QuestionForm showForm={showForm} setShowForm={setShowForm}></QuestionForm>
						</div>						
					)
				}				
			</div>
		</div>
		

	);
}

export default AskQuestion;