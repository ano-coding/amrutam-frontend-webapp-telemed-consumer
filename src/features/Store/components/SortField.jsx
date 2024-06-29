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
        checked={props.selectedOption === props.name}
        onChange={() => setSelectedOption(props.name)}
        className="accent-customgreen-400"
      />
    </div>
  );
};

export default SortField;
