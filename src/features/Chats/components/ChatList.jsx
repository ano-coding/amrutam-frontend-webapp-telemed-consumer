import SearchSolidSvg from "../../../assets/search-solid.svg?react";
const ChatList = ({ contacts, onSelect, isHidden }) => {
  return (
    <div
      className={`h-[70vh] w-full border-r-2 border-gray-100 ${isHidden ? "hidden md:block" : ""}`}
    >
      <div className="mx-5 my-5 flex max-w-full items-center justify-center rounded-xl border border-none bg-[#f4f5fa] px-2">
        <SearchSolidSvg className="" />
        <input
          type="text"
          placeholder="Search Here"
          className="w-full border-none bg-[#f4f5fa] px-4 py-2 text-[13px] text-[#303030] ring-0 placeholder:text-[#3A643B4D] focus:border-none focus:ring-0"
        />
      </div>
      <ul
        className="my-1 h-full overflow-y-auto px-4"
        style={{
          scrollbarWidth: "thin",
        }}
      >
        {contacts.map((contact, index) => (
          <li
            key={index}
            className={`flex cursor-pointer items-center ${contacts.length > index + 2 ? `border-b` : ""} py-3`}
            onClick={() => onSelect(contact)}
          >
            <div className="relative">
              {contact.isActive && (
                <div className="absolute left-[55%] h-[13px] w-[13px] rounded-full border-2 border-white bg-[#3a643b]"></div>
              )}

              <img
                src={contact.image}
                alt={contact.name}
                className="mr-4 h-12 w-12 rounded-full"
              />
            </div>
            <div className="flex flex-1 items-start justify-between py-3">
              <div className="flex flex-col items-start justify-start">
                <h4 className="text-sm font-semibold">{contact.name}</h4>
                <p className="truncate text-sm text-gray-500">
                  {contact.message}
                </p>
              </div>
              <div className="flex flex-col items-end justify-end gap-2">
                <span className="text-xs text-gray-500">{contact.time}</span>
                <span className="flex size-5 items-center justify-center rounded-full bg-[#3a643b] p-0 text-center text-xs leading-none text-white">
                  <span>{contact.newMessages}</span>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
