import { useState } from "react";
import Comments from "./Comment";
import QuestionPopUp from "./QuestionPopUp";

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
    <div className="border-b border-[#F6F6F5]">
      <div className="mx-auto my-10 px-2 sm:w-[90%] xl:w-[80%]">
        <div className="space-y-4 border-b border-[#EDEDED] p-4">
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

        <div className="my-4 flex items-center justify-center gap-8 *:flex *:flex-wrap *:items-center *:gap-2">
          <div onClick={toggleFavour} className="cursor-pointer">
            <img
              src={favour ? "/favours-active.png" : "favours.png"}
              alt="Favours"
            />
            <p
              className={`${favour ? "text-customgreen-800" : "text-customgray-400"} min-w-fit`}
            >
              {thought.favours}{" "}
              <span className="hidden sm:inline">Favours</span>
            </p>
          </div>
          <div onClick={toggleShowComments} className="cursor-pointer">
            <img
              src={showComments ? "/comments-active.png" : "/comments.png"}
              alt="Comments"
            />
            <p
              className={`${showComments ? "text-customgreen-800" : "text-customgray-400"} min-w-fit`}
            >
              {thought.comments.length}{" "}
              <span className="hidden sm:inline">Comments</span>
            </p>
          </div>
          <div className="cursor-pointer">
            <img src="/shares.png" alt="Shares" />
            <p className="text-customgray-400 min-w-fit">
              {thought.shares} <span className="hidden sm:inline">Shares</span>
            </p>
          </div>
        </div>

        {showComments && <Comments comments={thought.comments}></Comments>}
      </div>
    </div>
  );
}

function ThoughtHeader({ authorLogo, author, time }) {
  const [showPopUp, setShowPopUp] = useState(false);

  function togglePopUp() {
    setShowPopUp(!showPopUp);
  }

  return (
    <div className="relative flex items-center gap-4">
      <div className="h-[52px] w-[52px] overflow-hidden rounded-[50%]">
        <img
          src={authorLogo}
          alt="Author logo"
          className="object-cover object-center"
        />
      </div>
      <div>
        <p className="text-[18px] text-[#1E1E1E]">{author}</p>
        <p className="text-customgray-400 font-semibold">{time}</p>
      </div>

      <div
        onClick={togglePopUp}
        className="ml-auto flex h-[40px] w-[40px] cursor-pointer items-center justify-center self-start rounded-[50%] hover:bg-slate-100"
      >
        <img src="/dots.png" alt="Dots" />
      </div>
      {showPopUp && <QuestionPopUp togglePopUp={togglePopUp}></QuestionPopUp>}
    </div>
  );
}

function ThoughtBody({ title, description, images, videos, files }) {
  return (
    <>
      <div className="space-y-8">
        <h2 className="text-[20px] font-medium">Thought: {title}</h2>
        <p className="text-customgray-100 text-[18px] sm:w-[95%] md:w-[90%]">
          {description}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
        {images?.map((image, index) => {
          return <img src={image} key={index} alt="Thought" />;
        })}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
        {videos?.map((video, index) => {
          return (
            <video
              key={index}
              controls
              className="h-[250px] w-[250px] rounded-xl object-cover"
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
        {files?.map((file, index) => {
          return (
            <a
              key={index}
              download
              href={file.path}
              className="relative flex w-[300px] items-center gap-4 rounded-[8px] border border-[#E0E0E0] p-2 duration-500 hover:shadow-lg sm:w-[432px] sm:px-4 sm:py-2"
            >
              <img src="/pdf-logo.png" alt="Pdf" />
              <div>
                <p className="font-medium sm:text-[20px]">{file.name}</p>
                <div className="text-customgray-400 flex items-center gap-2 font-medium">
                  <p>{file.size}</p>
                  <p>{file.type}</p>
                </div>
              </div>

              <div className="absolute right-2 top-[10px] flex h-[35px] w-[35px] items-center justify-center rounded-[50%] hover:bg-[#7b7b7b]">
                <img src="/pdf-dots.png" alt="Dots" />
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
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
