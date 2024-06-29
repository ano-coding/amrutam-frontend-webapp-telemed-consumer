const Banner = ({
	name,
	specialization,
	ratings,
	followers,
	following,
	posts,
	photo
}) => {
	return (
		<>
			<img
				className="h-40 w-full overflow-hidden rounded-2xl  object-cover"
				src="/image-160@2x.png"
				alt="background-image"
			/>
			<div className="box-border flex min-h-[151px] w-full -translate-y-7 flex-col items-center border-[1.8px]  border-solid border-slate-200 bg-mintcream-200 md:flex-row">
				<div className="min-w-52">
					<img
						className="z-30 h-[159px] w-[159px] -translate-y-8 translate-x-4 sm:translate-x-8 rounded-[50%]  border-4 border-white bg-no-repeat object-cover"
						alt=""
						src={photo}
					/>
				</div>

				<div className="m-5 flex w-full flex-col items-center gap-5  lg:mx-1 lg:mb-0 lg:ml-0 lg:mr-0  lg:mt-0 lg:flex-row lg:justify-around lg:gap-1 lg:pl-0">
					<div className="flex  flex-col items-start gap-2">
						<div className="flex  items-center gap-2">
							<h3 className=" whitespace-nowrap  font-poppins text-[20px] font-medium leading-[21.6px] text-gray-800">
								{name}
							</h3>
							<div className="relative mb-0.5 h-5 w-5">
								<img alt="" src="/polygon-1.svg" />
								<img
									className="absolute left-[3px] top-[4px] z-[1] !m-[0] h-[13px] w-3.5 shrink-0 overflow-hidden text-white"
									alt=""
									src="/checkmark.svg"
								/>
							</div>
						</div>

						<div className="flex  items-start justify-start py-0 pl-[1.5px] pr-px text-darkolivegreen-200">
							<div className="font-poppins   text-[15px] font-medium  leading-[16.8px]">
								{specialization}
							</div>
						</div>
						<div className=" flex items-center gap-1  ">
							<span className=" font-poppins  text-darkolivegreen-200 ">
								{ratings}
							</span>
							<div className="flex items-center gap-0 ">
								{Array(ratings < 1? 1: Math.round(ratings))
									.fill("star")
									.map((_, index) => (
										<img
											key={index}
											className=" h-[22px] w-5 "
											alt=""
											src="/star.svg"
										/>
									))}
							</div>
						</div>
					</div>

					<div className="  flex w-3/4  items-center justify-between gap-10 lg:w-auto xl:gap-[74px]">
						<div className="flex flex-col items-end justify-start gap-[5px]">
							<div className="relative z-[3] inline-block min-w-[65.8px] shrink-0 font-poppins text-sm font-semibold leading-[16.8px] text-darkolivegreen-200">
								Followers
							</div>
							<div className="flex flex-row items-start justify-end py-0 pl-[13px] pr-[13.4px] text-xl text-gray-700">
								<div className="mq450:text-base mq450:leading-[19px] relative z-[3] inline-block min-w-[39px] shrink-0 font-poppins font-semibold leading-[24px] ">
									{followers}
								</div>
							</div>
						</div>
						<div className="flex flex-col items-end justify-start gap-[5px]">
							<div className="relative z-[3] inline-block min-w-[66.6px] shrink-0  font-poppins text-sm font-semibold leading-[16.8px] text-darkolivegreen-200">
								Following
							</div>
							<div className="flex flex-row items-start justify-end px-4 py-0 text-xl text-gray-700">
								<div className="mq450:text-base mq450:leading-[19px] relative z-[3] inline-block min-w-[34px] shrink-0 font-poppins font-semibold leading-[24px]  ">
									{following}
								</div>
							</div>
						</div>
						<div className="flex flex-col items-start justify-start gap-[5px]">
							<div className="relative z-[3] inline-block min-w-[37.7px] shrink-0  font-poppins text-sm font-semibold leading-[16.8px]  text-darkolivegreen-200 ">
								Posts
							</div>
							<div className="mq450:text-base mq450:leading-[19px] relative z-[3] inline-block min-w-[37.6px] shrink-0 font-poppins text-xl font-semibold leading-[24px] text-gray-700 ">
								{posts}
							</div>
						</div>
					</div>

					<button className="mb-1 mt-2.5 flex scale-90  cursor-pointer  justify-center  overflow-hidden whitespace-nowrap rounded-lg bg-darkolivegreen-200 px-5 py-[18px]  text-center font-inter text-lg font-medium text-white duration-100 [border:none] hover:bg-seagreen active:scale-95 lg:px-[33.5px] lg:text-xl xl:scale-100">
						Book an Appointment
					</button>
				</div>
			</div>
		</>
	);
};

export default Banner;
