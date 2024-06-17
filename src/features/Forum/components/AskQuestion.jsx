import { useState } from "react";
import QuestionForm from "./QuestionForm";



function AskQuestion() {
	const [showForm, setShowForm] = useState(false);


	return (
		<div className='border-b border-[F6F6F5]'>
			<div className='flex items-center flex-col sm:flex-row justify-center py-20 gap-8 px-2 sm:px-8 max-w-[1100px] mx-auto'>
				<div className='flex items-center justify-center gap-4 mx-auto'>
					<img src='/priya.png' alt='Person' />
					<p className='text-[#3A643B] font-semibold min-w-fit'>Priya Singh</p>
				</div>
				
				<button
					onClick={() => setShowForm(!showForm)}
					type='button'
					className='flex-1 sm:w-[125px] bg-[#3A643B] px-8 py-2 text-white hover:shadow-xl rounded-lg duration-500'
				>
					Ask a Question
				</button>
		

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