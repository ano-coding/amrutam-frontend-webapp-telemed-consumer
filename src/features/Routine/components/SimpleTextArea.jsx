const SimpleTextArea = ({ label, rows, mdWidth }) => {
  return (
    <div
      className={`relative w-full rounded-[16px] border-[1.5px] border-[#ced8e0] px-3 py-2 shadow-sm md:w-[${mdWidth}px]`}
    >
      <label
        htmlFor="description"
        className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-[12px] leading-[16px] text-neutral-400"
      >
        {label}
      </label>

      <textarea
        rows={rows}
        type="text"
        name="description"
        id="description"
        className="custom-scrollbar block w-full border-0 p-0 py-1.5 pl-1 text-[14px] leading-[24px] text-black placeholder-neutral-400 placeholder:text-sm focus:ring-0"
      />
    </div>
  );
};

export default SimpleTextArea;
