import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link, matchRoutes } from "react-router-dom";
import { useParams } from "react-router-dom";
import { extractSessions, fetchDateByAppointmentType, DAYS, MONTHS, fetchReviewsOfDoctor, calculateTotalExperience, getFilteredReviews, FULL_MONTHS, fetchAppointmentsByDate } from "../../../services/Doctor";
import { useQuery } from "@tanstack/react-query";



function ProfileDetails({
	languages,
	socials,
	about,
	specializationList,
	concerns,
	workExperience,
	featuredReviews,
	charges,
	bookingSlots,
}) {
	const { id: doctorId } = useParams();

	const [showLess, setShowLess] = useState(true);
	const [concernsShowMore, setConcernsShowMore] = useState(false);

	const bioLength = about?.split(' ').length;

	const { data: reviews, isLoading: isReviewsLoading } = useQuery({
		queryFn: () => fetchReviewsOfDoctor(doctorId),
		queryKey: ['reviews', doctorId]
	});

	// Only consider the reviews with patient details, reviews messages

	let filteredReviews;

	if (reviews) {
		filteredReviews = getFilteredReviews(reviews);
	}

	const totalExprience = calculateTotalExperience(workExperience);


	if (isReviewsLoading) {
		return <div>...Reviews loading</div>
	}




	return (
		<div className="mt-3 grid grid-cols-1 gap-7  lg:grid-cols-2">
			{/* Column - 1 */}
			<div className="w-full">
				<div className=" flex flex-col gap-7">
					{/* About Me Section */}
					<div className="  flex max-w-full flex-col items-start justify-start gap-[27px] self-stretch rounded-2xl border-[2px] border-solid border-neutral-300 bg-white pb-[31px] pl-px pr-0 pt-0">
						<div className=" flex flex-wrap items-center justify-between  gap-5 self-stretch  overflow-hidden rounded-tl-2xl rounded-tr-2xl px-[13px] sm:px-[35px] py-[13px] text-gray-700 [background:linear-gradient(-89.96deg,_#fbfcfb,_#f4f7ec)]">
							<h3 className="pt-px  min-w-fit font-nunito text-[20px] sm:text-[24px] font-semibold ">
								A Little About me
							</h3>
							<button className="flex cursor-pointer  items-center  justify-center gap-[6.7px]  rounded-xl border-[1.5px] border-solid border-darkolivegreen-200 bg-white py-1 px-4 sm:pl-[21px] sm:pr-[19px] duration-100 hover:scale-105 hover:bg-neutral-100 active:scale-95">
								<div className="text-center font-poppins text-[11px] sm:text-[16px] text-base font-medium leading-[24px] text-dimgray-300">
									Follow
								</div>
								<img className="w-2.5 h-2.5 sm:h-3.5 sm:w-3.5" alt="Add" src="/group-39517.svg" />
							</button>
						</div>

						<div className="flex flex-col  items-start  gap-[33px] px-2 sm:px-[34px] font-poppins ">
							<div className="flex max-w-full flex-col items-start justify-center gap-[6px] self-stretch">
								<p
									className={`${bioLength > 100 && showLess ? `line-clamp-3` : ``} text-justify  text-[16px] leading-[27px] text-neutral-400 `}
								>
									{about}
								</p>
								{bioLength > 100 && (
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
											className="whitespace-nowrap text-[16px] font-medium leading-[27px] text-gray-700  [text-decoration:underline] hover:font-semibold"
										>
											{!showLess ? "Read Less" : `Read More`}
										</button>
									</div>
								)}
							</div>

							{languages.length > 0 && (
								<div className=" flex flex-col items-start justify-start  gap-[15px] xl:flex-row xl:items-center">
									<div className=" whitespace-nowrap font-nunito  text-[20px] font-medium  leading-[20px]  tracking-[-0.01em] text-black">{`Language Spoken `}</div>
									<div className="flex flex-wrap items-center gap-4">
										{languages &&
											languages.map((language) => (
												<button key={language} className="whitespace-nowrap rounded-2xl  bg-ghostWhite  px-[19.5px] py-2.5 font-nunito text-lg   leading-[20px] tracking-[-0.01em] [border:none]">
													{language}
												</button>
											))}
									</div>
								</div>
							)}


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
					{specializationList.length > 0 && (
						<div className="  flex max-w-full flex-col items-start justify-start gap-[27px] self-stretch rounded-2xl border-[2px] border-solid border-neutral-300 bg-white pb-[31px] pl-px pr-0 pt-0">
							<div className=" flex items-center justify-between  gap-5 self-stretch  overflow-hidden rounded-tl-2xl rounded-tr-2xl px-[13px] sm:px-[35px] py-[13px] text-gray-700 [background:linear-gradient(-89.96deg,_#fbfcfb,_#f4f7ec)]">
								<h3 className=" pt-px font-nunito text-[20px] sm:text-[24px] font-semibold ">
									I Specialize In
								</h3>
							</div>
							<div className="box-border flex px-2 sm:px-[30px] py-0 text-base text-black">
								<div className=" z-[1] flex max-w-full flex-row flex-wrap items-center justify-center gap-[14px]">
									{specializationList &&
										specializationList.map((item, index) => (
											<div key={index} className="flex h-[123px] flex-col items-center justify-start gap-[7px]">
												<div className="box-border flex   flex-col  items-center justify-center overflow-hidden rounded-xl border-[2px] border-solid border-whitesmoke-200 bg-mintcream-200 px-[7px] py-[9px] duration-200 hover:border-neutral-300">
													<img
														className=" max-h-full h-[84px] w-[84px]  overflow-hidden object-cover"
														alt=""
														src={`/${item.toLowerCase().replace(/[^a-zA-Z0-9]/g, "")}.svg`}
													/>
												</div>
												<div className="text-[12px] font-nunito text-center  font-medium capitalize leading-[20px]">
													{item}
												</div>
											</div>
										))}
								</div>
							</div>
						</div>
					)}
					{/* Concern Keywords Section */}
					<div className="  flex max-w-full flex-col items-start justify-start gap-[27px] self-stretch rounded-2xl border-[2px] border-solid border-neutral-300 bg-white pb-[31px] pl-px pr-0 pt-0">
						<div className=" flex items-center justify-between  gap-5 self-stretch  overflow-hidden rounded-tl-2xl rounded-tr-2xl  px-[13px] sm:px-[35px] py-[13px] text-gray-700 [background:linear-gradient(-89.96deg,_#fbfcfb,_#f4f7ec)]">
							<h3 className=" pt-px font-nunito text-[20px] sm:text-[24px] font-semibold ">
								The Concerns I Treat
							</h3>
						</div>
						<div className=" flex flex-wrap gap-x-1 sm:gap-x-3 gap-y-[18px] px-1 sm:px-7 py-0 ">
							{concerns
								?.slice(0, Number(concernsShowMore ? concerns.length : 6))
								.map(item => (
									<span key={item._id} className=" box-border flex h-[43px] flex-row items-center justify-center rounded-[19px]  bg-ghostWhite px-3 py-2.5 font-poppins  text-[16px] font-medium text-darkolivegreen-200">
										{item.name}
									</span>
								))}
							{concerns.length > 6 && (
								<button
									onClick={() => setConcernsShowMore((x) => !x)}
									className=" box-border  flex h-[43px] flex-row items-center justify-center rounded-[19px]  border-[1.6px] border-solid border-slate-300 px-5 py-2.5 font-poppins  text-[16px] font-medium text-darkolivegreen-200  duration-100 hover:bg-slate-50 active:scale-95"
								>
									{concernsShowMore
										? `Show Less`
										: `+ ${concerns.length - 6} More`}
								</button>
							)}
						</div>
					</div>
					{/* Work Experience */}

					{workExperience.length > 0 && (
						<div className="  flex max-w-full flex-col items-start justify-start gap-[27px] self-stretch rounded-2xl border-[2px] border-solid border-neutral-300 bg-white pb-[31px] pl-px pr-0 pt-0">
							<div className=" flex items-center justify-between  gap-5 self-stretch  overflow-hidden rounded-tl-2xl rounded-tr-2xl  px-[13px] sm:px-[35px] py-[13px] text-gray-700 [background:linear-gradient(-89.96deg,_#fbfcfb,_#f4f7ec)]">
								<h3 className=" pt-px font-nunito  text-[20px] sm:text-[24px] font-semibold ">
									My Work Experience
								</h3>
							</div>
							<div className="box-border flex w-full flex-col gap-5 px-[10px] sm:px-[30px] py-0 ">
								<h3 className="flex items-center text-left font-poppins text-[18px] font-semibold uppercase leading-[19.2px] text-darkolivegreen-200">{`I have been in practice for : ${totalExprience} Years`}</h3>
								<hr className=" my-0.5 h-2 w-3/4 border-neutral-300 " />
								{workExperience.map((experience, index) => (
									<div key={index} className="flex justify-between rounded-lg p-1 font-poppins hover:bg-neutral-50">
										<div className="flex flex-col sm:flex-row flex-1  items-start justify-start gap-3 ">
											<div className="w-full sm:w-auto flex items-center justify-between flex-shrink-0 overflow-hidden rounded-md bg-ghostWhite p-3 [border:none]">
												<img
													className=" h-6 w-6  overflow-hidden"
													alt="Hospital Icon"
													src="/hospital.svg"
												/>
												<span className="sm:hidden min-w-fit text-neutral-400 xl:mr-10">
													{experience.fromDate.split("-")[0]} - {experience.currentWorking ? 'PRESENT' : experience.toDate.split('-')[0]}
												</span>

											</div>
											<div className="flex flex-col items-start justify-center ">
												<h4 className="font-medium">{experience.clinicName}</h4>
												<p className=" text-neutral-400">{experience.designation}</p>
											</div>
										</div>
										<span className="hidden sm:inline text-neutral-400 xl:mr-10">
											{experience.fromDate.split("-")[0]} - {experience.currentWorking ? 'PRESENT' : experience.toDate.split('-')[0]}
										</span>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Featured Reviews */}
					<div className="  flex max-w-full flex-col items-start justify-start gap-[27px] self-stretch rounded-2xl border-[2px] border-solid border-neutral-300 bg-white pb-[38px] pl-px pr-0 pt-0">
						<div className=" flex items-center justify-between  gap-5 self-stretch  overflow-hidden rounded-tl-2xl rounded-tr-2xl px-[13px] sm:px-[35px] py-[13px] text-gray-700 [background:linear-gradient(-89.96deg,_#fbfcfb,_#f4f7ec)]">
							<h3 className=" pt-px font-nunito text-[20px] sm:text-[24px] font-semibold ">
								Featured Reviews ({filteredReviews.length})
							</h3>
						</div>
						<div className="box-border flex flex-col gap-6 px-2 sm:px-[30px] py-0 ">
							{filteredReviews.map(review => {
								const [year, month, date] = review.createdAt.slice(0, review.createdAt.indexOf('T')).split('-');

								return (
									<div key={review._id} className="flex w-full flex-col gap-1  rounded-2xl bg-neutral-100 px-9 py-4 ">
										<div className="mb-3 flex flex-col items-center  justify-between gap-3 md:flex-row">
											<div className="flex flex-col items-center justify-start  gap-1 md:flex-row ">
												<img
													className="relative h-14 w-[54px] shrink-0 overflow-hidden rounded-[50%] object-cover"
													loading="lazy"
													alt="Profile Photo"
													src={`/${review.patient.photo}`}
												/>
												<div className="flex flex-col items-center justify-center px-3 md:items-start">
													<h3 className=" font-nunito text-[20px] font-semibold text-black">
														{review.patient.first_name} {review.patient.last_name}
													</h3>
													<span className="font-nunito text-[16px] text-neutral-400">
														{review.reason}
													</span>
												</div>
											</div>
											<span className=" font-nunito text-[16px] text-neutral-400">
												{year} {FULL_MONTHS[+month]} {date}
											</span>
										</div>
										<div className="mt-0.5 flex items-center gap-0 ">
											{Array(review.rating >= 4.5 ? 5 : 4)
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
										<div className="text-justify font-nunito text-base">
											{review.title}
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</div>
			{/* Column - 2 */}
			<div className=" w-full">
				{/* Appointment Section */}

				<AppointmentSection doctorId={doctorId} charges={charges} bookingSlots={bookingSlots} />
			</div>
		</div>
	);
}



function AppointmentSection({ doctorId, charges }) {
	const [sessionModeIndex, setSessionModeIndex] = useState(-1);
	const [slotIndex, setSlotIndex] = useState(0);
	const [slotDateIndex, setSlotDateIndex] = useState(-1);
	const [slotTime, setSlotTime] = useState("");
	const [appointmentFee, setAppointmentFee] = useState(0);

	const sessions = extractSessions(charges);
	const appointmentType = sessions[sessionModeIndex]?.type;


	const { data, isLoading: isAppointmentsLoading } = useQuery({
		queryFn: () => fetchDateByAppointmentType(appointmentType, doctorId),
		queryKey: ['appointments', appointmentType, doctorId]
	})

	const dates = data?.map(date => new Date(Date.parse(date)));

    // Selecting the first available date because slots need date to fetch them from api
	if (slotDateIndex === -1 && dates?.length > 0) {
		setSlotDateIndex(0);
	}


	const { data: slots, isLoading: isSlotsLoading } = useQuery({
		queryFn: () => fetchAppointmentsByDate(doctorId, dates[slotDateIndex]),
		queryKey: ['slots', slotDateIndex, doctorId]
	});



	const morningSlots = [];
	const afternoonSlots = [];
	const eveningSlots = []

	if (slots) {
		for (let slot of slots) {
			// Eg slot  2:30 PM  3:00 AM
			if (slot.at(-2) === 'A') {
				morningSlots.push(slot);
				continue;
			}

			const hour = slot.split(':')[0];

			if (hour < 4 || hour == 12) {
				afternoonSlots.push(slot);
			} else {
				eveningSlots.push(slot)
			}
		}
	}



	if (isAppointmentsLoading || isSlotsLoading) {
		return <div
			className="flex w-full flex-col gap-4  rounded-2xl  border-[2px] border-solid border-neutral-300 px-2 sm:px-5  pb-[31px]  pt-[40px] lg:gap-[27px]"
		>
			... Appointments & Slots are loading
		</div>
	}

	console.log('Slot Time ', slotTime);




	return (
		<div className=" flex w-full flex-col gap-4  rounded-2xl  border-[2px] border-solid border-neutral-300 px-2 sm:px-5  pb-[31px]  pt-[40px] lg:gap-[27px]">
			<div className=" flex w-full justify-between  rounded-[15px] border-[1px] border-solid border-neutral-200 px-3 py-3.5 font-nunito   text-xl text-black lg:px-7">
				<span className="  font-semibold ">Appointment Fee</span>
				<span className=" font-inter font-semibold  text-darkolivegreen-200">
					{appointmentFee > 0 && appointmentFee} {appointmentFee > 0 ? sessions[sessionModeIndex].slots[slotIndex]?.currency : 'N/A'}
				</span>
			</div>
			<div className="mx-1 mt-5 flex items-center gap-5">
				<span className="inline-block whitespace-nowrap font-nunito text-[20px] font-bold  tracking-[0.5px] text-black">
					Select your mode of session
				</span>
				<hr className="hidden sm:inline mt-2 h-2 w-full border-neutral-300 " />
			</div>
			<div className="mt-4 flex items-center flex-wrap gap-2 sm:gap-4 ">
				{sessions.map((session, index) => {
					if (session.slots.length > 0) {
						return (
							<div
								key={session.type}
								className={`flex flex-1 min-w-[150px]  cursor-pointer flex-col items-center justify-center  rounded-xl border-[2px] py-3  hover:border-darkolivegreen-100 group hover:bg-lightolivegreen ${sessionModeIndex === index ? ` border-darkolivegreen-100 bg-lightolivegreen` : `border-neutral-300`}`}
								onClick={() => {
									setSessionModeIndex(index);
									if (appointmentFee === 0 || sessionModeIndex !== index) {
										setAppointmentFee(session.slots[0].amount);
										setSlotIndex(0)
									}
								}}
							>
								<div
									className={`flex items-center justify-center gap-1 font-gotham text-[18px] font-medium tracking-[0.5px] ${sessionModeIndex === index ? `text-darkolivegreen-200` : `text-black`}`}
								>
									<span className="text-nowrap min-w-fit">{session.type}</span>
									{sessionModeIndex === index && (
										<CheckCircleIcon className="w-6" />
									)}
								</div>

								{session.slots.length > 1 ? (
									<select
										onChange={(e) => {
											setAppointmentFee(e.target.value);
											setSlotIndex(e.target.selectedIndex);
										}}
										value={index === sessionModeIndex && session.slots[slotIndex].amount}
										className={`shrink-0 group-hover:bg-lightolivegreen ${sessionModeIndex === index && 'bg-lightolivegreen'} outline-none font-nunito text-[16px] tracking-[0.5px]  text-neutral-500`}
									>
										{session.slots.map((slot, index) => {
											return <option key={index} value={slot.amount}>{slot.timing} Mins</option>
										})}
									</select>

								) : (
									<span className="font-nunito text-[16px] tracking-[0.5px]  text-neutral-500">
										{session.slots[0].timing} Mins
									</span>
								)}
							</div>
						)
					}
				})}
			</div>

			{sessionModeIndex !== -1 && (
				<>
					<div className="mx-1 mt-5 flex items-center gap-5">
						<span className="inline-block whitespace-nowrap font-nunito text-[20px] font-bold  tracking-[0.5px] text-black">
							Pick a Time slot
						</span>
						<hr className="hidden sm:inline mt-2 h-2 w-full border-neutral-300 " />
						<div className=" flex items-center justify-center rounded-[50%] border-[1px] border-solid border-gray-400 p-2 ">
							<img className="w-5 sm:w-10 flex-shrink-0" alt="Calendar Icon" src="/calendar.svg" />
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
							{dates.map((date, index) => {
								return (
									<div
										key={index}
										onClick={() => setSlotDateIndex(index)}
										className={`flex flex-col items-center justify-center rounded-xl border-[1px] px-1 sm:px-3 py-2 font-medium ${slotDateIndex === index ? 'bg-[#F2FBF2] border-darkolivegreen-200' : 'border-neutral-300'} cursor-pointer hover:border-darkolivegreen-200 hover:bg-lightolivegreen  hover:font-semibold hover:text-darkolivegreen-200`}
									>
										<span className={`${slotDateIndex === index && 'font-semibold text-[#3A643B]'} whitespace-nowrap font-inter text-[16px] tracking-[0.2px]`}>
											{DAYS[date.getDay()]}, {date.getDate()} {MONTHS[date.getMonth()]}
										</span>
										<span className={`${slotDateIndex === index && 'font-bold'} font-nunito text-center text-[16px] font-semibold  ${slots.length < 10 ? 'text-[#F1B93A]' : 'text-neutral-500'} ${slots.length < 5 && 'text-[#D5512E]'}`}>
											{slots.length} slots
										</span>
									</div>
								)
							})}
						</div>
						<img
							className="relative h-5 w-5"
							loading="lazy"
							alt=""
							src="/chevronright.svg"
						/>
					</div>
				</>
			)}

			<div className=" mx-2  lg:mx-4">
				{morningSlots.length > 0 && (
					<div className="my-5">
						<h3 className="mb-2 ml-4 flex text-center font-nunito text-[18px] font-bold capitalize tracking-[0.2px] text-black">
							Morning
						</h3>
						<div className=" flex flex-wrap gap-x-3 gap-y-4 ">
							{morningSlots.map((time, index) => (
								<span
									key={index}
									className={`cursor-pointer rounded-3xl border-[1px] border-neutral-300 px-3 py-6 text-center font-inter text-[15px] font-medium tracking-[0.2px] duration-150 hover:border-darkolivegreen-200 hover:bg-lightolivegreen hover:text-darkolivegreen-200 active:scale-95 ${slotTime === time ? ` bg-darkolivegreen-200 text-white` : ``}`}
									onClick={() => setSlotTime(time)}
								>
									{time}
								</span>
							))}
						</div>
					</div>
				)}

				{afternoonSlots.length > 0 && (
					<div className="my-5">
						<h3 className="mb-2 ml-4 flex text-center font-nunito text-[18px] font-bold capitalize tracking-[0.2px] text-black">
							Afternoon
						</h3>
						<div className=" flex flex-wrap gap-x-3 gap-y-4 ">
							{afternoonSlots.map((time, index) => (
								<span
									key={index}
									className={`cursor-pointer rounded-3xl border-[1px] border-neutral-300 px-3 py-6 text-center font-inter text-[15px] font-medium tracking-[0.2px] duration-150 hover:border-darkolivegreen-200 hover:bg-lightolivegreen hover:text-darkolivegreen-200 active:scale-95 ${slotTime === time ? ` bg-darkolivegreen-200 text-white` : ``}`}
									onClick={() => setSlotTime(time)}
								>
									{time}
								</span>
							))}
						</div>
					</div>
				)}

				{eveningSlots.length > 0 && (
					<div className="my-5">
						<h3 className="mb-2 ml-4 flex text-center font-nunito text-[18px] font-bold capitalize tracking-[0.2px] text-black">
							Evening
						</h3>
						<div className=" flex flex-wrap gap-x-3 gap-y-4 ">
							{eveningSlots.map((time, index) => (
								<span
									key={index}
									className={`cursor-pointer rounded-3xl border-[1px] border-neutral-300 px-3 py-6 text-center font-inter text-[15px] font-medium tracking-[0.2px] duration-150 hover:border-darkolivegreen-200 hover:bg-lightolivegreen hover:text-darkolivegreen-200 active:scale-95 ${slotTime === time ? ` bg-darkolivegreen-200 text-white` : ``}`}
									onClick={() => setSlotTime(time)}
								>
									{time}
								</span>
							))}
						</div>
					</div>
				)}

			</div>
			{slotTime ? (
				<Link
					to='/appointment-booking'
					className="block text-center p-4 rounded-xl bg-darkolivegreen-200 font-inter text-[16px] sm:text-[20px] font-medium capitalize text-white duration-100 hover:bg-darkolivegreen-300 active:scale-95">
					Make an appointment
				</Link>
			):(
				<button
					type='button'
					disabled={true}
						className="block cursor-not-allowed text-center p-4 rounded-xl  bg-slate-200 font-inter text-[16px] sm:text-[20px] font-medium capitalize text-[#333333]">
					Make an appointment
				</button>
			)}
		
		</div>

	)
}

export default ProfileDetails;
