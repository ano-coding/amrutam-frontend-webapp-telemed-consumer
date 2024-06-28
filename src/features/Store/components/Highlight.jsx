const Highlight = (props) => {
  return (
    <div className="bg-offWhite-200 flex h-[204px] w-[149px] flex-col items-center justify-center rounded-xl">
      <img
        src="/highlight.png"
        alt="highlight"
        className="h-[124px] w-[124px]"
      />
      <h4 className="mb-3 ml-3 mr-[5px] mt-4 w-[130px] font-nunito text-sm font-bold tracking-tight">
        {props.name}
      </h4>
    </div>
  );
};

export default Highlight;
