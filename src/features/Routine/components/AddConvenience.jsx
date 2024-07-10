import { Link } from "react-router-dom";

const AddConvenience = ({ title, subtitle, link, state }) => {
  return (
    <div className="flex gap-[10px]">
      <Link to={link} state={state}>
        <img className="cursor-pointer" src="/add-icon-plus.svg" />
      </Link>
      <div className="flex flex-col justify-between gap-1">
        <Link to={link} state={state}>
          <span className="cursor-pointer text-[14px] font-medium tracking-[-0.02em] text-[#3A643B]">
            {title}
          </span>
        </Link>
        <span className="text-[12px] leading-[16px] text-neutral-400">
          {subtitle}
        </span>
      </div>
    </div>
  );
};

export default AddConvenience;
