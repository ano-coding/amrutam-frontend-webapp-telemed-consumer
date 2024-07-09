import { useState, useEffect } from "react";
const Scroll = (props) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    if (props.containerRef.current) {
      const container = props.containerRef.current;
      const scrollWidth = container.scrollWidth;
      setMaxScroll(scrollWidth);
    }
  }, [props.section, props.containerRef]);

  //Handlers
  const scrollHandler = (direction) => {
    const itemWidth = props.itemWidth || 388;
    let newPosition = scrollPosition + direction * itemWidth;

    if (newPosition < 0) newPosition = 0;
    if (newPosition >= maxScroll) newPosition = maxScroll;

    setScrollPosition(newPosition);
    props.containerRef?.current?.scrollTo({
      left: newPosition,
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="mb-[90px] flex items-start justify-start gap-3">
      <div
        onClick={() => scrollHandler(-1)}
        style={{
          opacity: scrollPosition === 0 ? 0 : 100,
          cursor: scrollPosition === 0 ? "default" : "pointer",
        }}
        className="mt-[148px] flex h-[70px] w-[70px] items-center justify-center rounded-full border border-customgray-800 max-xl:my-[105px] max-lg:my-[140px] max-lg:h-[40px] max-lg:w-[40px] max-md:hidden"
      >
        <img src="/leftarrow.png" alt="left-arrow" className="w-[23px]" />
      </div>
      {props.children}
      <div
        onClick={() => scrollHandler(1)}
        style={{
          opacity: scrollPosition + 1164 >= maxScroll ? 0 : 100,
          cursor: scrollPosition + 1164 >= maxScroll ? "default" : "pointer",
        }}
        className="mt-[148px] flex h-[70px] w-[70px] items-center justify-center rounded-full border border-customgray-800 max-xl:my-[105px] max-lg:my-[140px] max-lg:h-[40px] max-lg:w-[40px] max-md:hidden"
      >
        <img src="/arrow.png" alt="arrow" className="w-[23px]" />
      </div>
    </div>
  );
};

export default Scroll;
