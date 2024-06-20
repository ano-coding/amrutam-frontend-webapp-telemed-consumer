import ClipSvg from "../../../assets/clip.svg?react";
import EmojiSvg from "../../../assets/emoji.svg?react";
import MicSvg from "../../../assets/mic.svg?react";
import SendSvg from "../../../assets/send.svg?react";
import ArrowLeftSvg from "../../../assets/arrow-left.svg?react";

const ChatWindow = ({ selectedContact, messages, onBack }) => {
  console.log(selectedContact);
  return (
    <div className="flex h-[60vh] w-full flex-col p-4 md:w-2/3">
      <div className="mb-4 flex items-center justify-between border-b-2 border-gray-100 pb-4">
        <div className="flex items-center justify-center">
          <button
            onClick={onBack}
            className="mr-3 w-[max-content] rounded-lg bg-gray-200 p-2 md:hidden"
          >
            <ArrowLeftSvg className="size-[20px] fill-black" />
          </button>

          <div className="relative">
            {selectedContact.isActive && (
              <div className="absolute left-[55%] h-[13px] w-[13px] rounded-full border-2 border-white bg-[#3a643b]"></div>
            )}

            <img
              src={selectedContact.image}
              alt={selectedContact.name}
              className="mr-4 h-12 w-12 rounded-full"
            />
          </div>

          <div>
            <h4 className="font-semibold">{selectedContact.name}</h4>
            <p className="text-sm text-gray-500">
              Last seen {selectedContact.lastSeen} ago
            </p>
          </div>
        </div>
      </div>
      <div
        style={{ scrollbarWidth: "none" }}
        className="flex-1 overflow-y-auto"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${message.sender === "me" ? "items-end justify-end" : ""} flex-col`}
          >
            <div
              className={`my-2 rounded-xl p-4 ${message.sender === "me" ? "bg-[#3334481A] text-right text-[#3a643b]" : "bg-[#28643b1a]"}`}
            >
              <p>{message.text}</p>
            </div>
            <span className="text-xs text-gray-500">{message.time}</span>
          </div>
        ))}
        <p className="w-full text-center text-gray-600">3 new Messages</p>
      </div>

      <div className="mt-4 flex items-center rounded-xl bg-[#3a643b12] py-2">
        <button className="mx-2">
          <MicSvg alt="" className="mx-2" />
        </button>
        <input
          type="text"
          placeholder="Type your message here..."
          className="flex-1 border-none bg-transparent p-2 outline-none ring-0 focus:border-none focus:ring-0"
        />
        <button className="mx-2">
          <ClipSvg alt="" className="" />
        </button>
        <button className="mx-2">
          <EmojiSvg alt="" className="" />
        </button>
        <button className="mx-2">
          <SendSvg className="mx-2" />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
