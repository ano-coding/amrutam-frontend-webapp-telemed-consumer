const Filter = (props) => {
  return (
    <div
      className="flex flex-col items-center justify-center text-center"
      onClick={props.onClick}
    >
      <div className="bg-whitesmoke-300 mb-2 flex h-[64px] w-[64px] items-center justify-center rounded-full transition-all hover:cursor-pointer">
        <img
          src={props.src}
          alt={props.name}
          style={{ width: `${props.width}`, height: `${props.height}` }}
          className="max-w-max"
        />
      </div>
      <span className="text-base text-darkslategray-300">{props.name}</span>
    </div>
  );
};

export default Filter;
