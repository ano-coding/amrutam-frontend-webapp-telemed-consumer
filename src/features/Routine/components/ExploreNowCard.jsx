const ExploreNowCard = ({ title, subTitle, image }) => {
  return (
    <>
      <div className="relative flex h-[191px] w-full items-center justify-between rounded-[22px] bg-gradient-to-l from-[#91a8fa68] to-[#F5F5F5]">
        <img
          src="./spiral.png"
          alt="Skin Care Routine"
          className="absolute h-[191px] w-full object-cover"
        />
        <div className="ml-5 flex h-full flex-col justify-between py-5">
          <div>
            <h2 className="text-[21.99px] font-medium leading-tight tracking-[-0.02em]">
              {title}
            </h2>

            <p className="text-[#787878 text-[17.59px] font-medium tracking-[-0.02em]">
              {subTitle}
            </p>
          </div>

          <button className="rounded-lg border-2 border-black px-5 py-2 font-nunito text-sm font-semibold text-[#101018] sm:w-[126px]">
            Explore now
          </button>
        </div>
        <img src={image} alt="" className="z-10 h-[191px]" />
      </div>
    </>
  );
};

export default ExploreNowCard;
