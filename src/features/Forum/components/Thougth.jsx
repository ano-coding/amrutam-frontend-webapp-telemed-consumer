import { useState } from 'react';
import Comments from "./Comment";
import QuestionPopUp from './QuestionPopUp';

function Thought({ thought }) {
	const [showComments, setShowComments] = useState(false);
	const [favour, setFavour] = useState(false);


	function toggleShowComments() {
		setShowComments(!showComments);
	}

	function toggleFavour() {
		setFavour(!favour);
	}


	return (
		<div className='border-b border-[#F6F6F5]'>
			<div className="px-2 sm:w-[90%] xl:w-[80%] mx-auto my-10">
				<div className="space-y-4 p-4 border-b border-[#EDEDED]">
					<ThoughtHeader
						authorLogo={thought.authorImg}
						author={thought.author}
						time={thought.time}
					></ThoughtHeader>
					<ThoughtBody
						title={thought.title}
						description={thought.description}
						images={thought.images}
						videos={thought.videos}
						files={thought.files}
					></ThoughtBody>
				</div>

				<div className="flex items-center justify-center gap-8 *:flex *:items-center *:flex-wrap *:gap-2 my-4">
					<div
						onClick={toggleFavour}
						className="cursor-pointer"
					>
						<img src={favour? '/favours-active.png': 'favours.png'} alt='Favours'  />
						<p className={`${favour ? 'text-customgreen-800' : 'text-customgray-400'} min-w-fit`}>{thought.favours}  <span className='hidden sm:inline'>Favours</span></p>
					</div>
					<div
						onClick={toggleShowComments}
						className="cursor-pointer"
					>
						<img src={showComments? '/comments-active.png': '/comments.png'} alt='Comments'  />
						<p className={`${showComments ? 'text-customgreen-800' : 'text-customgray-400'} min-w-fit`}>{thought.comments.length}  <span className='hidden sm:inline'>Comments</span></p>
					</div>
					<div
						className="cursor-pointer"
					>
						<img src='/shares.png' alt='Shares'  />
						<p className="text-customgray-400 min-w-fit">{thought.shares} <span className='hidden sm:inline'>Shares</span></p>
					</div>

				</div>

				{
					showComments && (
						<Comments comments={thought.comments}></Comments>
					)
				}	
			</div>
		</div>

	)

}


function ThoughtHeader({ authorLogo, author, time }) {
	const [showPopUp, setShowPopUp] = useState(false);


	function togglePopUp() {
		setShowPopUp(!showPopUp);
	}


	return (
		<div className='relative flex items-center gap-4'>
			<div className='w-[52px] h-[52px] overflow-hidden rounded-[50%]'>
				<img src={authorLogo} alt='Author logo' className='object-cover object-center' />
			</div>
			<div>
				<p className="text-[#1E1E1E] text-[18px]">{author}</p>
				<p className="text-customgray-400 font-semibold">{time}</p>
			</div>

			<div
				onClick={togglePopUp}
				className="ml-auto self-start w-[40px] h-[40px] rounded-[50%] flex items-center justify-center cursor-pointer hover:bg-slate-100">
				<img src='/dots.png' alt='Dots' />
			</div>
			{showPopUp && <QuestionPopUp togglePopUp={togglePopUp}></QuestionPopUp>}
		</div>
	)
}


function ThoughtBody({title, description, images, videos, files}) {
	return (
		<>
			<div className="space-y-8 ">
				<h2 className="text-[20px] font-medium">Thought: {title}</h2>
				<p className="md:w-[90%] sm:w-[95%] text-customgray-100 text-[18px]">{description}</p>
			</div>
			<div className='flex items-center justify-center sm:justify-start gap-4 flex-wrap'>
				{
					images?.map((image, index) => {
						return <img src={image} key={index} alt='Thought' />
					})
				}
			</div>

			<div className='flex items-center justify-center sm:justify-start gap-4 flex-wrap'>
				{
					videos?.map((video, index) => {
						return (
							<video
								key={index}
								controls
								className='w-[250px] h-[250px] object-cover rounded-xl'
							>
								<source src={video} type="video/mp4" />
								Your browser does not support the video tag.
							</video>
						)
					})
				}
			</div>

			<div className='flex items-center justify-center sm:justify-start gap-4 flex-wrap'>
				{
					files?.map((file, index) => {
						return (
							<a
								
								key={index}
								download
								href={file.path}
								className='w-[300px] sm:w-[432px] relative flex items-center gap-4 hover:shadow-lg duration-500 p-2 sm:px-4 sm:py-2 rounded-[8px] border border-[#E0E0E0]'
							>
								<img src='/pdf-logo.png' alt='Pdf' />
								<div>
									<p className='sm:text-[20px] font-medium'>{file.name}</p>
									<div className='flex items-center gap-2 text-customgray-400 font-medium'>
										<p>{file.size}</p>
										<p>{file.type}</p>
									</div>
								</div>

								<div className='absolute top-[10px] right-2 w-[35px] h-[35px] flex items-center justify-center rounded-[50%] hover:bg-gray-100'>
									<img src='/pdf-dots.png' alt='Dots' />
								</div>
							</a>
						)
					})
				}
			</div>
		</>
	)
}


// function ThoughtActivity({favours, comments, shares, favour, showComments, toggleShowComments, toggleFavour}) {
// 	return (
// 		<div className="flex items-center justify-center gap-4 sm:gap-8 *:flex *:items-center *:flex-wrap *:gap-1 sm:*:gap-2 my-4">
// 			<div
// 				onClick={toggleFavour}
// 				className="cursor-pointer"
// 			>
// 				<img src={favour ? '/favours-active.png' : 'favours.png'} alt='Favours' />
// 				<p className={`${favour ? 'text-customgreen-800' : 'text-customgray-400'} min-w-fit`}>{favours} Favours</p>
// 			</div>
// 			<div
// 				onClick={toggleShowComments}
// 				className="cursor-pointer"
// 			>
// 				<img src={showComments ? '/comments-active.png' : '/comments.png'} alt='Comments' />
// 				<p className={`${showComments ? 'text-customgreen-800' : 'text-customgray-400'} min-w-fit`}>{comments} Comments</p>
// 			</div>
// 			<div
// 				className="cursor-pointer"
// 			>
// 				<img src='/shares.png' alt='Shares' />
// 				<p className="text-customgray-400 min-w-fit">{shares} Shares</p>
// 			</div>

// 		</div>

// 	)
// }



export default Thought;