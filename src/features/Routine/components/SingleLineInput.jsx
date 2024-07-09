const SingleLineInput = ({
  label,
  placeholder,
  helpText,
  className,
  mdWidth,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <div
        className={`relative rounded-[16px] ${className} border-[1.5px] border-[#ced8e0] px-3 py-2 shadow-sm md:w-[${mdWidth}px]`}
      >
        <label
          htmlFor="concerns"
          className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-[12px] leading-[16px] text-neutral-400"
        >
          {label}
        </label>

        <input
          type="text"
          name="name"
          id="name"
          className="block w-full border-0 p-0 py-1.5 text-[16px] leading-[24px] text-black placeholder-neutral-400 placeholder:text-sm focus:ring-0"
          placeholder={placeholder}
        />
      </div>
      {helpText && (
        <div className="w-full pl-3 text-[12px] leading-[16px] text-neutral-400">
          {helpText}
        </div>
      )}
    </div>
  );
};

export default SingleLineInput;
