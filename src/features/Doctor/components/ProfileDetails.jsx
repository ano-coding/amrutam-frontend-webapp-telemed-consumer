import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link } from "react-router-dom";

function ProfileDetails({
	languages,
	socials,
	about,
	specializationList,
	treatments,
	workExperience,
	featuredReviews,
	sessionMode,
	bookingSlots,
}) {
	const [showLess, setShowLess] = useState(true);
	const [treatmentsShowMore, setTreatmentsShowMore] = useState(false);
	const [choosedSessionMode, setChoosedSessionMode] = useState("");
	const [slotTime, setSlotTime] = useState("");

	return (
		<div className="mt-3 grid grid-cols-1 gap-7  lg:grid-cols-2">
			{/* Column - 1 */}
			<div className="w-full">
				<div className=" flex flex-col gap-7">
					{/* About Me Section */}
					<div className="  flex max-w-full flex-col items-start justify-start gap-[27px] self-stretch rounded-2xl border-[2px] border-solid border-neutral-300 bg-white pb-[31px] pl-px pr-0 pt-0">
						<div className=" flex flex-wrap items-center justify-between  gap-5 self-stretch  overflow-hidden rounded-tl-2xl rounded-tr-2xl  px-[35px] py-[13px] text-gray-700 [background:linear-gradient(-89.96deg,_#fbfcfb,_#f4f7ec)]">
							<h3 className="pt-px min-w-fit font-nunito text-[24px] font-semibold ">
								A Little About me
							</h3>
							<button className="flex ml-auto cursor-pointer  items-center  justify-center gap-[6.7px]  rounded-xl border-[1.5px] border-solid border-darkolivegreen-200 bg-white py-1 pl-[21px] pr-[19px] duration-100 hover:scale-105 hover:bg-neutral-100 active:scale-95">
								<div className="text-center font-poppins  text-[16px] text-base font-medium leading-[24px] text-dimgray-300">
									Follow
								</div>
								<img className="h-3.5 w-3.5" alt="Add" src="/group-39517.svg" />
							</button>
						</div>

						<div className="flex flex-col  items-start  gap-[33px] px-[34px] font-poppins ">
							<div className="flex max-w-full flex-col items-start justify-center gap-[6px] self-stretch">
								<p
									className={`font-poppins  ${showLess ? `line-clamp-3` : ``} text-justify  text-[16px]  leading-[27px] text-neutral-400 `}
								>
									{about}
								</p>
								<div className=" flex max-w-full flex-row items-end justify-start gap-[10px] self-stretch text-gray-600">
									<div className=" flex  max-w-full flex-1 flex-col items-start justify-end px-0 pb-[13px] pt-0">
										<img
											className="  max-w-full self-stretch "
											alt=""
											src="/image-combiner.svg"
										/>
									</div>
									<button
										onClick={() => setShowLess((x) => !x)}
										className="whitespace-nowrap   font-poppins text-[16px] font-medium leading-[27px] text-gray-700  [text-decoration:underline] hover:font-semibold"
									>
										{!showLess ? "Read Less" : `Read More`}
									</button>
								</div>
							</div>

							<div className=" flex flex-col items-start justify-start  gap-[15px] xl:flex-row xl:items-center">
								<div className=" whitespace-nowrap font-nunito  text-[20px] font-medium  leading-[20px]  tracking-[-0.01em] text-black">{`Language Spoken `}</div>
								<div className="flex flex-wrap items-center gap-4">
									{languages &&
										languages.map((language) => (
											<button className="whitespace-nowrap rounded-2xl  bg-ghostWhite  px-[19.5px] py-2.5 font-poppins text-lg   leading-[20px] tracking-[-0.01em] [border:none]">
												{language}
											</button>
										))}
								</div>
							</div>

							<div className="flex  justify-start gap-[15px]">
								{Object.entries(socials).map(([platform, link]) => (
									<Link
										to={link}
										key={platform}
										className=" relative z-[1] box-border h-[40.6px] w-[40.6px] rounded-[50%] border-[1px] border-solid border-gray-300 bg-ghostWhite duration-100  hover:-translate-y-1 hover:bg-neutral-200 active:scale-95"
									>
										<img
											className="absolute bottom-[25%] left-[25%] right-[25%] top-[25%] z-[1] !m-[0] h-3/6 max-h-full w-6/12 max-w-full overflow-hidden"
											alt={platform}
											src={`/${platform}.svg`}
										/>
									</Link>
								))}
							</div>
						</div>
					</div>
					{/* Specialization Section */}
					<div className="  flex max-w-full flex-col items-start justify-start gap-[27px] self-stretch rounded-2xl border-[2px] border-solid border-neutral-300 bg-white pb-[31px] pl-px pr-0 pt-0">
						<div className=" flex items-center justify-between  gap-5 self-stretch  overflow-hidden rounded-tl-2xl rounded-tr-2xl  px-[35px] py-[13px] text-gray-700 [background:linear-gradient(-89.96deg,_#fbfcfb,_#f4f7ec)]">
							<h3 className=" pt-px font-nunito text-[24px] font-semibold ">
								I Specialize In
							</h3>
						</div>
						<div className="box-border flex  px-[30px] py-0 text-base text-black">
							<div className=" z-[1] flex max-w-full flex-row flex-wrap items-center justify-start gap-[14px]">
								{specializationList &&
									specializationList.map((item) => (
										<div className="flex h-[123px] flex-col items-center justify-start gap-[7px]">
											<div className="box-border flex   flex-col  items-center justify-center overflow-hidden rounded-xl border-[2px] border-solid border-whitesmoke-200 bg-mintcream-200 px-[7px] py-[9px] duration-200 hover:border-neutral-300">
												<img
													className=" max-h-full w-[84px]  overflow-hidden object-cover"
													alt=""
													src={`/${item.toLowerCase().replace(/[^a-zA-Z0-9]/g, "")}.svg`}
												/>
											</div>
											<div className=" text-center  font-medium capitalize leading-[20px]">
												{item}
											</div>
										</div>
									))}
							</div>
						</div>
					</div>
					{/* Concern Keywords Section */}
					<div className="  flex max-w-full flex-col items-start justify-start gap-[27px] self-stretch rounded-2xl border-[2px] border-solid border-neutral-300 bg-white pb-[31px] pl-px pr-0 pt-0">
						<div className=" flex items-center justify-between  gap-5 self-stretch  overflow-hidden rounded-tl-2xl rounded-tr-2xl  px-[35px] py-[13px] text-gray-700 [background:linear-gradient(-89.96deg,_#fbfcfb,_#f4f7ec)]">
							<h3 className=" pt-px font-nunito text-[24px] font-semibold ">
								The Concerns I Treat
							</h3>
						</div>
						<div className=" flex flex-wrap   gap-x-3 gap-y-[18px] px-7 py-0 ">
							{treatments &&
								treatments
									.slice(0, Number(treatmentsShowMore ? treatments.length : 6))
									.map((item) => (
										<span className=" box-border flex h-[43px] flex-row items-center justify-center rounded-[19px]  bg-ghostWhite px-3 py-2.5 font-poppins  text-[16px] font-medium text-darkolivegreen-200">
											{item}
										</span>
									))}
							{treatments.length > 6 && (
								<button
									onClick={() => setTreatmentsShowMore((x) => !x)}
									className=" box-border  flex h-[43px] flex-row items-center justify-center rounded-[19px]  border-[1.6px] border-solid border-slate-300 px-5 py-2.5 font-poppins  text-[16px] font-medium text-darkolivegreen-200  duration-100 hover:bg-slate-50 active:scale-95"
								>
									{treatmentsShowMore
										? `Show Less`
										: `+ ${treatments.length - 6} More`}
								</button>
							)}
						</div>
					</div>
					{/* Work Experience */}
					<div className="  flex max-w-full flex-col items-start justify-start gap-[27px] self-stretch rounded-2xl border-[2px] border-solid border-neutral-300 bg-white pb-[31px] pl-px pr-0 pt-0">
						<div className=" flex items-center justify-between  gap-5 self-stretch  overflow-hidden rounded-tl-2xl rounded-tr-2xl  px-[35px] py-[13px] text-gray-700 [background:linear-gradient(-89.96deg,_#fbfcfb,_#f4f7ec)]">
							<h3 className=" pt-px font-nunito text-[24px] font-semibold ">
								My Work Experience
							</h3>
						</div>
						<div className="box-border flex w-full flex-col gap-5 px-[10px] sm:px-[30px] py-0 ">
							<h3 className="flex items-center text-left font-poppins text-[18px] font-semibold uppercase leading-[19.2px] text-darkolivegreen-200">{`I have been in practice for : ${workExperience.years} Years`}</h3>
							<hr className=" my-0.5 h-2 w-3/4 border-neutral-300 " />
							{workExperience.hospitals.map((hospital, index) => (
								<div key={index} className="flex justify-between rounded-lg p-1 font-poppins hover:bg-neutral-50">
									<div className="flex flex-1 items-start justify-start gap-3 ">
										<div className="flex flex-shrink-0 overflow-hidden rounded-md bg-ghostWhite p-3 [border:none]">
											<img
												className=" h-6 w-6  overflow-hidden"
												alt="Hospital Icon"
												src="/hospital.svg"
											/>
										</div>
										<div className="flex flex-col items-start justify-center ">
											<h4 className=" font-medium">{hospital.name}</h4>
											<p className="text-neutral-400">{hospital.role}</p>
										</div>
									</div>
									<span className="text-neutral-400 xl:mr-10">
										{hospital.years}
									</span>
								</div>
							))}
						</div>
					</div>
					{/* Featured Reviews */}
					<div className="  flex max-w-full flex-col items-start justify-start gap-[27px] self-stretch rounded-2xl border-[2px] border-solid border-neutral-300 bg-white pb-[38px] pl-px pr-0 pt-0">
						<div className=" flex items-center justify-between  gap-5 self-stretch  overflow-hidden rounded-tl-2xl rounded-tr-2xl  px-[35px] py-[13px] text-gray-700 [background:linear-gradient(-89.96deg,_#fbfcfb,_#f4f7ec)]">
							<h3 className=" pt-px font-nunito text-[24px] font-semibold ">
								Featured Reviews (102)
							</h3>
						</div>
						<div className="box-border flex flex-col gap-6  px-[30px] py-0 ">
							{featuredReviews.map((featured, index) => (
								<div key={index}  className="flex w-full flex-col  ---------------------------------------------------------------------------gap-1  rounded-2xl bg-neutral-100 px-9 py-4 ">
									<div className="mb-3 flex flex-col items-center  justify-between gap-3 md:flex-row">
										<div className="flex flex-col items-center justify-start  gap-1 md:flex-row ">
											<img
												className="relative h-14 w-[54px] shrink-0 overflow-hidden rounded-[50%] object-cover"
												loading="lazy"
												alt="Profile Photo"
												src={`/${featured.picture}`}
											/>
											<div className="flex flex-col items-center justify-center px-3 md:items-start">
												<h3 className=" font-nunito text-[20px] font-semibold text-black">
													{featured.name}
												</h3>
												<span className="font-nunito text-[16px] text-neutral-400">
													{`Consulted for ${featured.consultedFor}`}
												</span>
											</div>
										</div>
										<span className=" font-nunito text-[16px] text-neutral-400">
											{featured.date}
										</span>
									</div>
									<div className="mt-0.5 flex items-center gap-0 ">
										{Array(featured.stars >= 4.5 ? 5 : 4)
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
									<div className="text-justify text-base">
										{featured.description}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			{/* Column - 2 */}
			<div className=" w-full">
				{/* Appointment Section */}
				<div className="  flex w-full flex-col gap-4  rounded-2xl  border-[2px] border-solid border-neutral-300 px-5  pb-[31px]  pt-[40px] lg:gap-[27px]">
					<div className=" flex w-full justify-between  rounded-[15px] border-[1px] border-solid border-neutral-200 px-3 py-3.5 font-nunito   text-xl text-black lg:px-7">
						<span className="  font-semibold ">Appointment Fee</span>
						<span className=" font-inter font-semibold  text-darkolivegreen-200">
							₹699.00
						</span>
					</div>
					<div className="mx-1 mt-5 flex items-center gap-5">
						<span className="inline-block whitespace-nowrap font-nunito text-[20px] font-bold  tracking-[0.5px] text-black">
							Select your mode of session
						</span>
						<hr className=" mt-2 h-2 w-full border-neutral-300 " />
					</div>
					<div className="mt-4 grid grid-cols-3 gap-4 ">
						{sessionMode &&
							sessionMode.map((session) => (
								<div
									className={`flex  cursor-pointer flex-col items-center justify-center  rounded-xl border-[2px] py-3  hover:border-darkolivegreen-100   hover:bg-lightolivegreen ${choosedSessionMode === session.type ? ` border-darkolivegreen-100 bg-lightolivegreen` : `border-neutral-300`}`}
									key={session.type}
									onClick={() => setChoosedSessionMode(session.type)}
								>
									<div
										className={`flex items-center justify-center gap-1 font-gotham text-[18px] font-medium tracking-[0.5px] ${choosedSessionMode === session.type ? `text-darkolivegreen-200` : `text-black`}`}
									>
										<span>{session.type}</span>
										{choosedSessionMode === session.type && (
											<CheckCircleIcon className="w-6" />
										)}
									</div>
									<span className="font-nunito text-[16px] tracking-[0.5px]  text-neutral-500">
										{session.time}
									</span>
								</div>
							))}
					</div>

					<div className="mx-1 mt-5 flex items-center gap-5">
						<span className="inline-block whitespace-nowrap font-nunito text-[20px] font-bold  tracking-[0.5px] text-black">
							Pick a Time slot
						</span>
						<hr className=" mt-2 h-2 w-full border-neutral-300 " />
						<div className=" flex items-center justify-center rounded-[50%] border-[1px] border-solid border-gray-400 p-2 ">
							<img className="w-10" alt="Calendar Icon" src="/calendar.svg" />
						</div>
					</div>
					<div className="mx-2 flex items-center justify-around gap-2 rounded-[21px] border-[1px] border-neutral-300 px-3 py-6 xl:px-8">
						<img
							className="relative h-5 w-5 object-contain"
							loading="lazy"
							alt=""
							src="/chevronleft.png"
						/>

						<div className="no-scrollbar flex  gap-2  overflow-y-auto">
							<div className="flex flex-col items-center justify-center rounded-xl border-[1px] border-neutral-300 px-3 py-2 font-medium hover:border-darkolivegreen-200 hover:bg-lightolivegreen  hover:font-semibold hover:text-darkolivegreen-200">
								<span className=" whitespace-nowrap font-inter text-[16px] tracking-[0.2px] ">
									Mon, 10 Oct
								</span>
								<span className="font-nunito text-[16px] font-semibold  text-neutral-500">
									10 slots
								</span>
							</div>
							<div className="flex flex-col items-center justify-center rounded-xl border-[1px] border-neutral-300 px-4 py-2.5 font-medium hover:border-darkolivegreen-200 hover:bg-lightolivegreen  hover:font-semibold hover:text-darkolivegreen-200">
								<span className="whitespace-nowrap  font-inter text-[16px] font-medium tracking-[0.2px]">
									Tue, 11 Oct
								</span>
								<span className="font-nunito text-[16px] font-semibold text-red-600">
									02 slots
								</span>
							</div>
							<div className="flex flex-col items-center justify-center rounded-xl border-[1px] border-neutral-300 px-3 py-2 font-medium hover:border-darkolivegreen-200 hover:bg-lightolivegreen   hover:font-semibold hover:text-darkolivegreen-200">
								<span className="whitespace-nowrap font-inter text-[16px] tracking-[0.2px]">
									Wed, 12 Oct
								</span>
								<span className="font-nunito text-[16px] font-semibold text-yellow-400">
									05 slots
								</span>
							</div>
						</div>
						<img
							className="relative h-5 w-5"
							loading="lazy"
							alt=""
							src="/chevronright.svg"
						/>
					</div>

					<div className=" mx-2  lg:mx-4">
						{bookingSlots.map((slots) => (
							<div className="my-5">
								<h3 className="mb-2 ml-4 flex text-center font-nunito text-[18px] font-bold capitalize tracking-[0.2px] text-black">
									{slots.part}
								</h3>
								<div className=" flex flex-wrap gap-x-3 gap-y-4 ">
									{slots.timing.map((time) => (
										<span
											className={`cursor-pointer rounded-3xl border-[1px] border-neutral-300 px-3 py-6 text-center font-inter text-[15px] font-medium tracking-[0.2px] duration-150 hover:border-darkolivegreen-200 hover:bg-lightolivegreen hover:text-darkolivegreen-200     active:scale-95 ${slotTime === time ? ` bg-darkolivegreen-200 text-white` : ``}`}
											onClick={() => setSlotTime(time)}
										>
											{time}
										</span>
									))}
								</div>
							</div>
						))}
					</div>
					<Link to='/appointment-booking' className="flex justify-center mx-8 rounded-xl bg-darkolivegreen-200 py-3 font-inter text-[20px] font-medium capitalize text-white duration-100 hover:bg-darkolivegreen-300 active:scale-95">
						Make an appointment
					</Link>
				</div>
			</div>
		</div>
	);
}

export default ProfileDetails;
