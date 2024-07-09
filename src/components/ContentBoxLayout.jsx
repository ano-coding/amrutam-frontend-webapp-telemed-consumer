const ContentBoxLayout = ({ title, children }) => {
  return (
    <div className="flex max-w-full flex-col items-center justify-center overflow-hidden rounded-[30px] border-[1.8px] border-[#ebe8e8]">
      <div className="w-full rounded-t-[30px] border-b-[1.7px] border-[#9db39e]/50 bg-[#F7FCFA] py-4 pl-5 font-nunito text-[24px] font-bold capitalize leading-[140%] text-[#3a643b] sm:py-5 sm:pl-9">
        {title}
      </div>

      {children}
    </div>
  );
};

export default ContentBoxLayout;
