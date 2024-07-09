const Banner = ({ name }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 bg-[url('/banner.png')] bg-cover bg-center bg-no-repeat py-8 sm:gap-[18px] sm:py-14">
      <h1 className="text-[36px] font-semibold">
        Namaste, <span className="text-[#3a643b]"> {name}</span>
      </h1>
      <p className="text-lg text-[#3a643b] md:text-[20px]">
        How are you feeling today?
      </p>
    </div>
  );
};

export default Banner;
