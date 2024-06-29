import ClipSvg from "../../../assets/clip.svg?react";
import EmojiSvg from "../../../assets/emoji.svg?react";
import MicSvg from "../../../assets/mic.svg?react";
import SendSvg from "../../../assets/send.svg?react";
import ArrowLeftSvg from "../../../assets/arrow-left.svg?react";
import VerticalTripleDotSvg from "../../../assets/vertical-triple-dot.svg?react";

const ChatWindow = ({ selectedContact, messages, onBack }) => {
  return (
    <div className="flex h-[70vh] w-full flex-col justify-between px-2 py-4 pr-0">
      <div className="mb-2 flex items-center justify-between border-b-2 border-gray-100 pb-4">
        <div className="flex w-full items-center pr-4">
          <button
            onClick={onBack}
            className="mr-3 w-[max-content] rounded-lg bg-gray-200 p-2 md:hidden"
          >
            <ArrowLeftSvg className="size-[20px] fill-black" />
          </button>

          <div className="relative">
            {selectedContact.isActive && (
              <div className="absolute left-[55%] size-[10px] rounded-full border-2 border-white bg-[#3a643b]"></div>
            )}

            <img
              src={selectedContact.image}
              alt={selectedContact.name}
              className="mr-4 h-12 w-12 rounded-full"
            />
          </div>

          <div className="flex flex-1 flex-col gap-1">
            <h4 className="text-[14px] font-medium leading-[16.8px]">
              {selectedContact.name}
            </h4>
            <p className="text-[12px] font-medium leading-[18px] text-[#33354880]">
              last seen {selectedContact.lastSeen} ago
            </p>
          </div>
          <div className="rounded-lg bg-[#2E37A40D] p-2">
            <VerticalTripleDotSvg />
          </div>
        </div>
      </div>
      <div
        style={{ scrollbarWidth: "thin" }}
        className="flex-1 overflow-y-auto pr-2"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${message.sender === "me" ? "items-end justify-end" : ""} flex-col`}
          >
            <div
              className={`my-2 w-7/12 p-3 text-[13px] leading-[18px] ${message.sender === "me" ? "rounded-b-xl rounded-l-xl bg-[#28643B0D] text-right text-[#3a643b]" : "rounded-b-xl rounded-r-xl bg-[#3334481A] text-left"}`}
            >
              <p>{message.text}</p>
            </div>
            <span className="text-xs text-gray-500">{message.time}</span>
          </div>
        ))}
        <p className="w-full text-center text-[12px] leading-[15px] text-[#ADADAD]">
          3 New Messages
        </p>
      </div>

      <div className="mr-4 mt-2 flex items-center rounded-xl bg-[#f5f7f5] py-1">
        <button className="mx-2">
          <MicSvg alt="" className="mx-2" />
        </button>
        <input
          type="text"
          placeholder="Type your message here..."
          className="flex-1 border-none bg-transparent p-2 text-[13px] text-[#323232] outline-none ring-0 placeholder:text-[#3334484D] focus:border-none focus:ring-0"
        />
        <button className="mx-2">
          <ClipSvg alt="" />
        </button>
        <button className="mx-2">
          <EmojiSvg alt="" />
        </button>
        <button className="mx-2">
          <SendSvg className="mx-2" />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
