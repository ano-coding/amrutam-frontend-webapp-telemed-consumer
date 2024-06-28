import { useState } from "react";

function Comments({ comments }) {
	const lastIndex = comments.length - 1


	return ( 
		<div className="md:w-[90%] xl:w-[85%] ml-auto space-y-8 ">
			<div className='flex items-center justify-start sm:justify-center flex-wrap gap-2'>
				<img src='/chat-logo.png' alt='Chat logo' />
				<form className="min-w-[300px] flex items-center justify-center flex-wrap sm:flex-nowrap gap-2 flex-1">
					<input
						type='text' placeholder='Add your comment'
						className='w-[100%] sm:w-[90%] text-[13px] px-4 py-4 placeholder:text-customgray-500 rounded-[11px] border border-[#E0E0E0] focus:outline-none'
					/>
					<button
						type='submit'
						className='w-[100%] sm:w-[185px] bg-[#3A643B] py-4 text-white rounded-lg'
					>
						Add
					</button>

				</form>
			</div>
			<div className="md:w-[95%] ml-auto ">
				{
			
					comments.map((comment, index) => {
						return <Comment comment={comment} key={index} lastComment={lastIndex === index} ></Comment>
					})
				}		   

			</div>
		</div>

	);
}



function Comment({ comment, lastComment }) {
	const [favour, setFavour] = useState(false);

	function toggleFavour() {
		setFavour(!favour);
	}

	return (
		<div className={`relative flex items-start flex-col sm:flex-row gap-4 py-10 ${!lastComment && 'border-b border-[#EDEDED]'}`}>
			<div
				onClick={toggleFavour}
				className="absolute flex items-center gap-1 right-8 top-[50px] sm:right-12 sm:top-10 cursor-pointer"
			>
				<img
					src={favour ? '/favours-active.png' : '/favours.png'}
					alt='Favours / Likes'
				/>
				<p className={`text-[13px] text-[#3A643B] font-medium`}>{comment.favours}</p>
			</div>
			<div className="w-[52px] h-[52px] rounded-[50%] overflow-hidden flex-shrink-0">
				<img src={comment.authorImg} alt='Akash' className="object-cover object-center"/>
			</div>
			<div>
				<div className="flex items-center gap-2">
					<h4 className="inline-block text-customgreen-800 text-[18px] font-medium">{comment.author}</h4> 
					<div className="w-[4px] h-[4px] rounded-[50%] bg-customgray-400"></div>
					<p className='text-customgray-400 text-[14px] font-medium'>{comment.time}</p>
				</div>
				<p className='text-[18px] sm:w-[90%] mt-2 sm:mt-0'>
					{comment.description}
				</p>
			</div>
		</div>
	)
}

export default Comments;