const Ingredient = (props) => {
  return (
    <div className="bg-offWhite-200 flex h-[204px] w-[149px] flex-col items-start justify-end rounded-xl">
      <h5 className="mb-0.5 ml-3 font-nunito text-sm font-bold tracking-tight text-darkslategray-300">
        {props.name}
      </h5>
      <p className="mb-[12px] ml-[12px] mr-[5px] mt-0 font-nunito text-xs tracking-tight text-dimgray-100">
        {props.desc}
      </p>
    </div>
  );
};

export default Ingredient;
