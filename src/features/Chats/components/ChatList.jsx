import SearchSolidSvg from "../../../assets/search-solid.svg?react";
const ChatList = ({ contacts, onSelect, isHidden }) => {
  return (
    <div
      className={`w-full border-r-2 border-gray-100 p-4 md:w-[50%] ${isHidden ? "hidden md:block" : ""}`}
    >
      <div className="my-4 mb-4 flex w-full items-center justify-center rounded-lg border bg-gray-200 px-4">
        <SearchSolidSvg className="" />
        <input
          type="text"
          placeholder="Search"
          className="w-full border-none bg-transparent px-4 py-2 ring-0 focus:border-none focus:ring-0"
        />
      </div>
      <ul>
        {contacts.map((contact, index) => (
          <li
            key={index}
            className="mb-4 flex cursor-pointer items-center py-3"
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
            <div className="flex flex-1 items-start justify-between border-b py-1">
              <div className="flex flex-col items-start justify-start">
                <h4 className="text-sm font-semibold">{contact.name}</h4>
                <p className="truncate text-sm text-gray-500">
                  {contact.message}
                </p>
              </div>
              <div className="flex flex-col items-end justify-end">
                <span className="text-xs text-gray-500">{contact.time}</span>
                <span className="h-5 w-5 rounded-full bg-[#3a643b] p-1 text-center text-xs font-semibold text-white">
                  {contact.newMessages}
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
