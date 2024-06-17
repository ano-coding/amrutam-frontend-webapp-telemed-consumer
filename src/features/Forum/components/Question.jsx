import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Comments from "./Comment";
import ReplyPopUp from './ReplyPopUp';
import QuestionPopUp from './QuestionPopUp';
import AddReply from './AddReply';





function Question({ question, showAllReplies=false }) {
	const [showComments, setShowComments] = useState(false);
	const [favour, setFavour] = useState(false);


	function toggleShowComments() {
		setShowComments(!showComments);
	}

	function toggleFavour() {
		setFavour(!favour);
	}


	return (
		<div className='border-b'>
			<div className="px-2 sm:w-[90%] xl:w-[80%] mx-auto my-10">
				<div className="space-y-4 p-4 border-b border-[#EDEDED]">
					<QuestionHeader
						authorLogo={question.authorImg}
						author={question.author}
						time={question.time}
					>
					</QuestionHeader>
					<QuestionBody
						title={question.title}
						description={question.description}
						tags={question.tags}
						replies={question.replies}
						showAllReplies={showAllReplies}
					></QuestionBody>

				</div>

				<div className="flex items-center justify-center gap-8 *:flex *:items-center *:flex-wrap *:gap-2 my-4">
					<div
						onClick={toggleFavour}
						className="cursor-pointer"
					>
						<img src={favour ? '/favours-active.png' : '/favours.png'} alt='Favours' />
						<p className={`${favour ? 'text-customgreen-800' : 'text-customgray-400'} min-w-fit`}>{question.favours} <span className='hidden sm:inline'>Favours</span></p>
					</div>
					<div
						onClick={toggleShowComments}
						className="cursor-pointer"
					>
						<img src={showComments ? '/comments-active.png' : '/comments.png'} alt='Comments' />
						<p className={`${showComments ? 'text-customgreen-800' : 'text-customgray-400'} min-w-fit`}>{question.comments.length} <span className='hidden sm:inline'>Comments</span></p>
					</div>
					<div
						className="cursor-pointer"
					>
						<img src='/shares.png' alt='Shares' />
						<p className="text-customgray-400 min-w-fit">{question.shares} <span className='hidden sm:inline'>Shares</span></p>
					</div>

				</div>

				{
					showComments && (
						<Comments comments={question.comments}></Comments>
					)
				}

				{
					showAllReplies && (
						<AddReply></AddReply>
					)
				}
			</div>
		</div>

	)

}


function QuestionHeader({ authorLogo, author, time }) {
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
				className="ml-auto self-start w-[40px] h-[40px] rounded-[50%] flex items-center justify-center cursor-pointer hover:bg-slate-200 bg-slate-100"
			>
				<img src='/dots.png' alt='Dots' />
			</div>

			{showPopUp && <QuestionPopUp togglePopUp={togglePopUp}></QuestionPopUp>}

		</div>
	)
}


function QuestionBody({ title, description, tags, replies, showAllReplies }) {
	const lastTagIndex = tags.length - 1;
	const totalReplies = replies.length;

	let currentReplies;

	if (totalReplies <= 3 || showAllReplies) {
		currentReplies = replies;
	} else {
		currentReplies = replies.slice(0, 3);
	}

	


/* 	function toggleShowAllReplies() {
		setShowAllReplies(!showAllReplies);
	} */

	return (
		<>
			<div className="space-y-2">
				<h2 className="text-[20px] font-medium">Question: {title}</h2>
				<p className="md:w-[90%] sm:w-[95%] text-customgray-100 text-[18px]">{description}</p>
			</div>
			<div className='flex items-center gap-4'>
				{
					tags.map((tag, index) => {
						if (index === lastTagIndex) {
							return <p className='text-customgreen-800 font-medium' key={index}>{tag}</p>
						}

						return (
							<Fragment key={index}>
								<p className='text-customgreen-800 font-medium'>{tag}</p>
								<div className='w-[4px] h-[4px] rounded-[50%] bg-customgreen-800 -mr-2'></div>
							</Fragment>
						)
					})
				}
			</div>
			<div className='flex items-center gap-4'>
				<p className='text-customgray-400 font-medium'>Replies</p>
				<div className='w-[4px] h-[4px] rounded-[50%] bg-customgreen-800 -mr-2'></div>
				<p className='text-customgreen-800 font-medium'>{totalReplies} replies</p>
			</div>

			<div className="md:w-[90%] xl:w-[85%] ml-auto space-y-8">
				{
					currentReplies.map((reply, index) => {
						return <Reply
							key={index}
							authorLogo={reply.authorImg}
							time={reply.time} author={reply.author}
							description={reply.description} images={reply.images}
						/>
					})
				}

				{
					totalReplies > 3 && !showAllReplies && (
						<Link
							to={`/commune/post/2`}
							className='block text-customgreen-800 text-center font-semibold cursor-pointer hover:underline'
						>
							View All Replies
						</Link>
					)
				}

			</div>
		</>
	)
}


function ReplyHeader({ authorLogo, author, time }) {
	const [showPopUp, setShowPopUp] = useState(false);

	function toggleShowPopUp() {
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
				onClick={toggleShowPopUp}
				className="ml-auto self-start w-[40px] h-[40px] rounded-[50%] flex items-center justify-center cursor-pointer hover:bg-slate-200 bg-slate-100"
			>
				<img src='/dots.png' alt='Dots' />
			</div>
			{showPopUp && <ReplyPopUp togglePopUp={toggleShowPopUp}></ReplyPopUp>}


		</div>
	)
}


function Reply({ authorLogo, author, time, description, images }) {
	const [showPopUp, setShowPopUp] = useState(false);

	function toggleShowPopUp() {
		setShowPopUp(!showPopUp);
	}

	return (
		<div className='flex items-start gap-1 sm:gap-2 md:gap-4'>
			<div
				onClick={toggleShowPopUp}
				className="w-[30px] h-[30px] flex flex-shrink-0 items-center cursor-pointer justify-center rounded-[50%] bg-[#FCDDB8] text-[#F9B25E] ">
				!
			</div>
			<div className='relative bg-[#F3FAF1] rounded-[8px] p-4 space-y-4'>
				{showPopUp && <div
					className="absolute z-10 rounded-b-lg rounded-tl-none rounded-tr-lg bg-[#FCDDB8] px-[15px] py-[21px] shadow-[0px_0px_6px_rgba(0,_0,_0,_0.25)] w-[85%] md:w-[80%]"
				>
					Thank you for your contribution!
					Your answer is currently under review.
					It will be posted once it has been verified by our admin team.
				</div>}
				<ReplyHeader
					authorLogo={authorLogo}
					author={author}
					time={time}
				></ReplyHeader>
				<div className='font-medium text-justify sm:w-[90%] xl:w-[85%]'>
					<span className='font-semibold'>Ans. {'  '}</span>
					<p className='inline'>{description}</p>
					<div className='flex items-center justify-center sm:justify-start gap-4 flex-wrap mt-4'>
						{
							images?.map((image, index) => {
								return <img key={index} src={image} alt='Question' />
							})
						}
					</div>
				</div>
			</div>
		</div>
	)
}


/* function QuestionActivity({favours, comments, shares, favour, showComments, toggleShowComments, toggleFavour}) {
	return (
		<div className="flex items-center justify-center gap-4 sm:gap-8 *:flex *:items-center *:flex-wrap *:gap-1 sm:*:gap-2 my-4">
			<div
				onClick={toggleFavour}
				className="cursor-pointer"
			>
				<img src={favour ? '/favours-active.png' : 'favours.png'} alt='Favours' />
				<p className={`${favour ? 'text-customgreen-800' : 'text-customgray-400'} min-w-fit`}>{favours} Favours</p>
			</div>
			<div
				onClick={toggleShowComments}
				className="cursor-pointer"
			>
				<img src={showComments ? '/comments-active.png' : '/comments.png'} alt='Comments' />
				<p className={`${showComments ? 'text-customgreen-800' : 'text-customgray-400'} min-w-fit`}>{comments} Comments</p>
			</div>
			<div
				className="cursor-pointer"
			>
				<img src='/shares.png' alt='Shares' />
				<p className="text-customgray-400 min-w-fit">{shares} Shares</p>
			</div>

		</div>

	)
} */



export default Question;