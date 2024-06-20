import SearchSvg from "../../../assets/search.svg?react";
const SearchBar = () => {
  return (
    <div className="flex w-full items-center gap-[7px] rounded-2xl border-[1.8px] border-solid border-[#ebe8e8] px-6 py-1">
      <SearchSvg />

      <input
        placeholder="Search"
        className="font-nunito border-none text-[16px] font-semibold capitalize leading-[20px] tracking-[-0.01em] text-[#9a9a9a] outline-none placeholder:text-[#9a9a9a] focus:ring-0"
      />
    </div>
  );
};

export default SearchBar;
