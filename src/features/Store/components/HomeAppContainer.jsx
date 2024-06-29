const HomeAppContainer = () => {
  return (
    <div className="peer-data-[65px] flex items-start justify-center bg-customyellow-200 max-xl:flex-wrap max-sm:hidden">
      <div className="ml-[146px] pt-[106px] max-2xl:ml-5 max-xl:mx-5 max-xl:my-0 max-xl:text-center">
        <h2 className="m-0 mb-4 text-3xl font-black text-customgreen-800 max-md:text-2xl">
          Amrutam Home App
        </h2>
        <p className="text-base font-medium tracking-tight text-gray-500">
          The Amrutam Home App is your one-stop app for all things Ayurveda!
          Apart from mimicking the significant characteristics of our website,
          this app offers a wide range of additional features.
        </p>
        <h3 className="mb-[65px] mt-[24px] font-nunito text-3xl font-semibold capitalize text-black max-md:text-2xl">
          Get a diet & lifestyle consultation with ayurvedic experts across the
          globe{" "}
        </h3>
        <h1 className="m-0 mb-[33px] text-4xl font-black capitalize max-md:text-2xl">
          Get the App now
        </h1>
        <div className="mb-[117px] flex items-center justify-start gap-[17px] max-xl:justify-center [&>*]:h-[80px] [&>*]:w-[270px] [&>*]:cursor-pointer max-md:[&>*]:h-[50px] max-md:[&>*]:w-[170px]">
          <img src="/googlePlay.png" alt="google-play" />
          <img src="/appStore.png" alt="app-store" />
        </div>
      </div>
      <div className="relative pt-[65px]">
        <img
          src="iPhone13.png"
          alt="iPhone13"
          className="relative z-10 max-w-max max-2xl:w-[650px] max-md:hidden"
        />
        <div className="bg-customgreen-600 absolute bottom-[275px] left-[150px] h-[258px] w-[258px] rounded-full max-xl:hidden" />
        <div className="bg-customgreen-600 absolute left-[390px] top-[290px] h-[258px] w-[258px] rounded-full max-xl:hidden" />
      </div>
    </div>
  );
};

export default HomeAppContainer;
