const SortField = ({ setSelectedOption, ...props }) => {
  return (
    <div
      className="flex w-[328px] items-center justify-between border-b border-[#e2e2e2] px-0 py-4 max-sm:w-full"
      style={{ borderBottom: props.border }}
    >
      <label htmlFor={props.id} className="text-base tracking-tight">
        {props.name}
      </label>
      <input
        type="radio"
        id={props.id}
        name={props.grpName}
        style={{ width: "16px", height: "16px" }}
        value={props.name}
        checked={props.selectedOption === props.id}
        onChange={() => setSelectedOption(props.id)}
        className="checked:border-customgreen4text-customgreen-400 hover:ring-customgreen400 h-[20px] w-[20px] border-2 border-neutral-500 text-customgreen-400 ring-0 checked:ring-0 hover:ring-0 focus:ring-customgreen-400 focus-visible:bg-customgreen-400 active:ring-transparent"
      />
    </div>
  );
};

export default SortField;
