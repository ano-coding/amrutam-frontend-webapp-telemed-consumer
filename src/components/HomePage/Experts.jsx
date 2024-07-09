import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const experts = [
  {
    name: "Dr. Vaishali Sharma",
    study: "Ayurveda Practitioner (BAMS, MD)",
    experience: 25,
    rating: 4.5,
    specialization: "Skin",
  },
  {
    name: "Dr. Vaishali Sharma",
    study: "Ayurveda Practitioner (BAMS, MD)",
    experience: 25,
    rating: 4.5,
    specialization: "Skin",
  },
  {
    name: "Dr. Vaishali Sharma",
    study: "Ayurveda Practitioner (BAMS, MD)",
    experience: 25,
    rating: 4.5,
    specialization: "Skin",
  },
  {
    name: "Dr. Vaishali Sharma",
    study: "Ayurveda Practitioner (BAMS, MD)",
    experience: 25,
    rating: 4.5,
    specialization: "Skin",
  },
  {
    name: "Dr. Vaishali Sharma",
    study: "Ayurveda Practitioner (BAMS, MD)",
    experience: 25,
    rating: 4.5,
    specialization: "Skin",
  },
  {
    name: "Dr. Vaishali Sharma",
    study: "Ayurveda Practitioner (BAMS, MD)",
    experience: 25,
    rating: 4.5,
    specialization: "Skin",
  },
  {
    name: "Dr. Vaishali Sharma",
    study: "Ayurveda Practitioner (BAMS, MD)",
    experience: 25,
    rating: 4.5,
    specialization: "Skin",
  },
  {
    name: "Dr. Vaishali Sharma",
    study: "Ayurveda Practitioner (BAMS, MD)",
    experience: 25,
    rating: 4.5,
    specialization: "Skin",
  },
  {
    name: "Dr. Vaishali Sharma",
    study: "Ayurveda Practitioner (BAMS, MD)",
    experience: 25,
    rating: 4.5,
    specialization: "Skin",
  },
];

function Experts() {
  const scrollContainerSmall = useRef(null);
  const scrollContainerLarge = useRef(null);
  const marginLeft = useRef(0);

  const [scrollCard, setScrollCard] = useState(0);

  function handleScroll(e) {
    const currentCard = Math.min(Math.round(e.target.scrollLeft / 250), 2);
    setScrollCard(currentCard);
  }

  function handleLeftClick() {
    const margin = Math.min(marginLeft.current + 990, 0);
    marginLeft.current = margin;
    scrollContainerLarge.current.style.marginLeft = margin + "px";

    setScrollCard(margin / -990);
  }

  function handleRightClick() {
    const margin = Math.max(marginLeft.current - 990, -1980);
    marginLeft.current = margin;
    scrollContainerLarge.current.style.marginLeft = margin + "px";

    setScrollCard(margin / -990);
  }

  // console.log('margin left ', marginLeft);

  useEffect(() => {
    const scrollDiv = scrollContainerSmall.current;
    scrollDiv.addEventListener("scroll", handleScroll);

    return () => {
      scrollDiv.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="py-12">
      <div className="mb-12 flex justify-center">
        <h3 className="font-robo border-[#abdcac] px-10 text-[32px] font-bold leading-none text-[#3A643B] sm:border-b-4 lg:text-[48px]">
          Meet Our Ayurveda Experts
        </h3>
      </div>

      <div
        ref={scrollContainerSmall}
        className="scrollbar-hide mx-auto flex max-w-[1000px] snap-x snap-mandatory gap-8 overflow-scroll px-8 lg:hidden"
      >
        {experts.slice(0, 6).map((expert, index) => {
          return <ExpertCard key={index} expert={expert} />;
        })}
      </div>

      <div className="hidden items-center justify-center gap-8 lg:flex">
        <img
          onClick={handleLeftClick}
          className="cursor-pointer"
          src="/images/left-arrow.png"
          alt="left arrow"
        />
        <div className="max-w-[990px] overflow-hidden">
          <div
            ref={scrollContainerLarge}
            className={`flex gap-8 px-6 transition-all duration-500 ease-linear`}
          >
            {experts.map((expert, index) => {
              return <ExpertCard key={index} expert={expert} />;
            })}
          </div>
        </div>

        <img
          onClick={handleRightClick}
          className="z-10 cursor-pointer"
          src="/images/right-arrow.png"
          alt="right arrow"
        />
      </div>

      <div className="mx-auto mt-12 flex items-center justify-center gap-4">
        {Array(3)
          .fill(undefined)
          .map((_, index) => {
            return (
              <div
                key={index}
                className={`h-[12px] w-[12px] rounded-[50%] ${index === scrollCard ? "bg-[#3A643B]" : "bg-[#C3C3C3]"} `}
              ></div>
            );
          })}
      </div>

      <Link
        to="/find-doctors"
        className="mx-auto my-12 hidden w-[275px] items-center gap-4 rounded-[7px] border border-[#f0f0f0] bg-[#DBE3DC] px-[25px] py-5 text-[#3A643B] hover:border-[#3A643B] sm:flex"
      >
        <p className="text-[24px] font-medium leading-none">
          Find more experts
        </p>
        <img src="/images/arrow-right.png" alt="right arrow" />
      </Link>
    </div>
  );
}

function ExpertCard({ expert }) {
  return (
    <div className="relative h-[446px] w-[295px] flex-none snap-center rounded-[40px] bg-[#FFF7E2] pt-8">
      <div className="relative mx-auto mb-4 h-[150px] w-[150px] overflow-hidden rounded-[50%]">
        <img src="/images/expert.png" alt="expert" />
      </div>
      <div className="absolute left-[120px] top-[160px] hidden h-[25px] w-[55px] items-center rounded-full bg-gradient-to-b from-[#0B0B0B] to-[#0B0B0BC9] px-1 lg:flex">
        <p className="font-bold leading-none text-white">{expert.rating}</p>
        <img className="scale-75" src="/images/star.png" alt="star" />
      </div>
      <p className="text-center text-[20px] font-semibold">{expert.name}</p>
      <p className="mt-2 text-center text-[15px] font-bold text-[#838383]">
        {expert.study}
      </p>
      <div className="mx-auto mt-2 flex items-center justify-center gap-1">
        <img src="/images/hat.png" alt="hat" />
        <p className="font-medium text-[#0C0C0C]">
          {expert.experience} years of experience
        </p>
      </div>

      <div className="mx-auto mt-4 flex h-[30px] w-[160px] items-center justify-center gap-1 rounded-[18px] bg-[#3A643B1F]">
        <img src="/images/link.png" alt="link" />
        <p className="font-semibold text-[#3A643B]">
          {expert.specialization} Specialist
        </p>
      </div>

      <div className="absolute bottom-0 flex h-[65px] w-full cursor-pointer items-center justify-center rounded-b-[40px] bg-[#3A643B] text-white">
        <p className="text-[20px] font-medium">Book a session</p>
      </div>
    </div>
  );
}

export default Experts;
