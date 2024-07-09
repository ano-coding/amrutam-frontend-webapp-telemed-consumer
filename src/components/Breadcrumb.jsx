import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ list }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  }, []);

  return (
    <div className="overflow-hidden">
      <div
        style={{ scrollbarWidth: "none" }}
        ref={scrollContainerRef}
        className="flex w-full cursor-all-scroll items-center gap-[10px] overflow-x-auto pb-2 text-[15px] font-medium leading-[22.5px]"
      >
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
                className={`${list.length === i + 1 ? `text-[#3a643b]` : `text-neutral-500`} whitespace-nowrap`}
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
    </div>
  );
};

export default Breadcrumb;
