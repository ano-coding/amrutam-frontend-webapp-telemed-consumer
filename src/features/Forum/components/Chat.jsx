import Thought from "./Thougth";
import Question from "./Question";
import { chats } from "./ChatData";



function Chat() {
	return (
		<div className=' border-black'>
			{
				chats.map((chat, index) => {
					if (chat.type === 'Thought') {
						return <Thought thought={chat}  key={index}></Thought>
					}

					return <Question question={chat} key={index}></Question>
					
				})
			}

			<p className="text-[20px] font-medium text-center text-customgray-200 mt-5 mb-16">End of List</p>
			
		</div>

	);
}








export default Chat;