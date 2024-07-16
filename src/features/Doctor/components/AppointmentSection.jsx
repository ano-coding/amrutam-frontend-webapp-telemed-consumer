import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { extractSessions } from '../../../services/Doctor';
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { fetchDateByAppointmentType, DAYS, MONTHS } from '../../../services/Doctor';
import { Link, useLocation } from 'react-router-dom';
// import { useAppointment } from '../../Appointments/AppointmentContext';

function AppointmentSection({ doctorId, charges }) {
	const location = useLocation();

	const [sessionModeIndex, setSessionModeIndex] = useState(-1);
	const [slotIndex, setSlotIndex] = useState(0);
	const [slotDateIndex, setSlotDateIndex] = useState(-1);
	const [slotTime, setSlotTime] = useState("");
	const [appointmentFee, setAppointmentFee] = useState(0);


	const sessions = extractSessions(charges);
	const appointmentType = sessions[sessionModeIndex]?.type;


	// Fetches dates and all available slots on a particular date
	// This function internally calls fetchSlotsByDate to get all slots for a particular date

	const { data, isLoading: isAppointmentsLoading } = useQuery({
		queryFn: () => fetchDateByAppointmentType(appointmentType, doctorId),
		queryKey: ['appointments', appointmentType, doctorId]
	})

	const dates = data?.map(date => new Date(Date.parse(date.date)));



	const morningSlots = [];
	const afternoonSlots = [];
	const eveningSlots = []

	if (slotDateIndex !== -1 && data && data[slotDateIndex]?.slots) {
		const slots = data[slotDateIndex].slots;

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




	if (isAppointmentsLoading) {
		return <div
			className="flex w-full flex-col gap-4  rounded-2xl  border-[2px] border-solid border-neutral-300 px-2 sm:px-5  pb-[31px]  pt-[40px] lg:gap-[27px]"
		>
			... Appointments & Slots are loading
		</div>
	}



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
						{/* <img
							className="relative h-5 w-5 object-contain"
							loading="lazy"
							alt=""
							src="/chevronleft.png"
						/> */}

						<div className="no-scrollbar flex  gap-2  overflow-y-auto">
							{data.length > 0 && dates.map((date, index) => {
								return (
									<div
										key={index}
										onClick={() => setSlotDateIndex(index)}
										className={`flex flex-col items-center justify-center rounded-xl border-[1px] px-1 sm:px-3 py-2 font-medium ${slotDateIndex === index ? 'bg-[#F2FBF2] border-darkolivegreen-200' : 'border-neutral-300'} cursor-pointer hover:border-darkolivegreen-200 hover:bg-lightolivegreen  hover:font-semibold hover:text-darkolivegreen-200`}
									>
										<span className={`${slotDateIndex === index && 'font-semibold text-[#3A643B]'} whitespace-nowrap font-inter text-[16px] tracking-[0.2px]`}>
											{DAYS[date.getDay()]}, {date.getDate()} {MONTHS[date.getMonth()]}
										</span>
										<span className={`${slotDateIndex === index && 'font-bold'} font-nunito text-center text-[16px] font-semibold  ${data[index].slots.length < 10 ? 'text-[#F1B93A]' : 'text-neutral-500'} ${data[index].slots.length < 5 && 'text-[#D5512E]'}`}>
											{data[index].slots.length} slots
										</span>
									</div>
								)
							})}
							{dates.length === 0 && <p className='text-[#3A643B] text-lg font-medium'>No Slots available!</p>}
						</div>
						{/* <img
							className="relative h-5 w-5"
							loading="lazy"
							alt=""
							src="/chevronright.svg"
						/> */}
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

				{afternoonSlots.length > 0&& (
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
					to={`/appointment/${doctorId}`}
					state={{
						data: {
							appointmentType: sessions[sessionModeIndex]?.type,
							appointmentDuration: sessions[sessionModeIndex]?.slots[slotIndex].timing,
							appointmentFee: sessions[sessionModeIndex]?.slots[slotIndex].amount,
							appointmentDate: data[slotDateIndex]?.date,
							appointmentTime: slotTime
						},
						details: {
							sessionModeIndex,
							slotIndex,
							slotDateIndex,
							slotTime
						},
						from: location.pathname
					}}
					className="block text-center p-4 rounded-xl bg-darkolivegreen-200 font-inter text-[16px] sm:text-[20px] font-medium capitalize text-white duration-100 hover:bg-darkolivegreen-300 active:scale-95">
					Make an appointment
				</Link>
			) : (
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

export default AppointmentSection;