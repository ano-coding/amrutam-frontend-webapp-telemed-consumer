const AddMoreButton = ({ label = "Add More", onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center gap-[10px]"
    >
      <img className="h-[26px]" src="/add-icon-plus.svg" />
      <div className="text-[14px] font-medium tracking-[-0.02em] text-[#3A643B]">
        {label}
      </div>
    </div>
  );
};

export default AddMoreButton;
