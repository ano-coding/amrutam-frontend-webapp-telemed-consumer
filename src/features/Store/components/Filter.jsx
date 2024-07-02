const Filter = (props) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${props.className ?? ""}`}
      onClick={props.onClick}
    >
      <div
        style={{
          border: props.active === props.id ? "1px solid #3A643C" : "",
        }}
        className="mb-2 flex h-[64px] w-[64px] items-center justify-center rounded-full bg-whitesmoke-300 transition-all hover:cursor-pointer"
      >
        <img
          src={props.src}
          alt={props.name}
          style={{
            width: props.width,
            height: props.height,
          }}
          className="h-[84px] w-[84px] max-w-max rounded-full"
        />
      </div>
      <span
        className="text-base"
        style={{ color: props.active === props.id ? "#3A643B" : "#2E2F2E" }}
      >
        {props.name}
      </span>
    </div>
  );
};

export default Filter;
