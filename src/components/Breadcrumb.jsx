import { Link } from "react-router-dom";

const Breadcrumb = ({ list }) => {
  return (
    <div className="flex w-full items-center gap-[10px] text-[15px] font-medium leading-[22.5px]">
      {list.map((item, i) => (
        <Link
          to={`/${item.link}`}
          key={item.link}
          className="flex items-center gap-[10px]"
        >
          <div
            className={`text-xs font-semibold leading-[22.5px] text-neutral-500 sm:text-base`}
          >
            <span
              className={
                list.length === i + 1 ? `text-[#3a643b]` : `text-neutral-500`
              }
            >
              {item.name}
            </span>
          </div>
          {list.length >= i + 2 ? (
            <div
              className={`text-[20px] font-medium leading-[22.5px] ${list.length === i + 2 ? `text-[#3a643b]` : `text-neutral-500`}`}
            >{`<`}</div>
          ) : (
            ""
          )}
        </Link>
      ))}
    </div>
  );
};

export default Breadcrumb;
