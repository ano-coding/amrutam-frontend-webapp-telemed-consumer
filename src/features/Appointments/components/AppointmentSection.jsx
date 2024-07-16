import { useEffect, useState, useContext, useRef } from "react";
import { UserContext } from '../../../context/UserContext.jsx';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Modal from './AuthModal';
import { fetchSingleDoctor, extractSessions } from '../../../services/Doctor';
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { fetchDateByAppointmentType, DAYS, MONTHS } from '../../../services/Doctor';
import { SessionContext } from "../../../context/SessionDetailsContext";



export default function AppointmentSection({ setStep, appointmentDetails, setAppointmentDetails, sessionData }) {
	const { userId } = useContext(UserContext);
	const { sessionDetails, setSessionDetails } = useContext(SessionContext);
	const { doctorId } = useParams();
	const [show, setShow] = useState(false);

	const { data: doctor, isLoading: isDoctorLoading } = useQuery({
		queryFn: () => fetchSingleDoctor(doctorId),
		queryKey: ['doctor']
	});

	const [sessionModeIndex, setSessionModeIndex] = useState(sessionDetails?.sessionModeIndex ?? -1);
	const [slotIndex, setSlotIndex] = useState(sessionDetails?.slotIndex ?? 0);
	const [slotDateIndex, setSlotDateIndex] = useState(sessionDetails?.slotDateIndex ?? -1);
	const [slotTime, setSlotTime] = useState(sessionDetails?.slotTime ?? "");
	const [appointmentFee, setAppointmentFee] = useState(0);
	
	const charges = doctor?.charges;
	const sessions = extractSessions(charges);
	const appointmentType = sessions[sessionModeIndex]?.type;

	function handleClick() {
		if (userId) {
			setStep(1);
		} else {
			setShow(true);
		}
	}


	useEffect(() => {
		function handleAppointment() {
			if (sessionModeIndex !== -1 && sessions[sessionModeIndex]?.type !== appointmentDetails.appointmentType) {
				setAppointmentDetails({
					...appointmentDetails,
					appointmentType: sessions[sessionModeIndex]?.type
				});
			}

			if (sessionModeIndex !== -1 && sessions[sessionModeIndex]?.slots[slotIndex].timing !== appointmentDetails.appointmentDuration) {
				setAppointmentDetails({
					...appointmentDetails,
					appointmentDuration: sessions[sessionModeIndex]?.slots[slotIndex].timing
				})
			}

			if (appointmentFee !== 0 && appointmentDetails.appointmentFee !== appointmentFee) {
				setAppointmentDetails({
					...appointmentDetails,
					appointmentFee
				})
			}

			if (slotTime !== '' && slotTime !== appointmentDetails.appointmentTime) {
				setAppointmentDetails({
					...appointmentDetails,
					appointmentTime: slotTime
				})
			}

			if (slotDateIndex !== -1 && data && data[slotDateIndex]?.date !== appointmentDetails.appointmentDate) {
				setAppointmentDetails({
					...appointmentDetails,
					appointmentDate: data[slotDateIndex]?.date
				})
			}


		}

		function handleSession() {
			if (sessionModeIndex !== -1 && sessionModeIndex !== sessionDetails.sessionModeIndex) {
				setSessionDetails({
					...sessionDetails,
					sessionModeIndex
				});
			}

			if (sessionModeIndex !== -1 && slotIndex !== sessionDetails.slotIndex) {
				setSessionDetails({
					...sessionDetails, // todo
					slotIndex
				})
			}

			if (slotTime !== '' && slotTime !== sessionDetails.slotTime) {
				setSessionDetails({
					...sessionDetails,
					slotTime
				})
			}

			if (slotDateIndex !== -1 && slotDateIndex !== sessionDetails.slotDateIndex) {
				setSessionDetails({
					...sessionDetails,
					slotDateIndex
				})
			}
		}

		handleAppointment();
		handleSession();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	})

	useEffect(() => {
		if (userId && userId !== appointmentDetails.patientId) {
			setAppointmentDetails({
				...appointmentDetails,
				patientId: userId
			})
		}
	})


	const { data, isLoading: isAppointmentsLoading } = useQuery({
		queryFn: () => fetchDateByAppointmentType(appointmentType, doctorId),
		queryKey: ['appointments', appointmentType, doctorId]
	})

	const dates = data?.map(date => new Date(Date.parse(date.date)));

	const morningSlots = [];
	const afternoonSlots = [];
	const eveningSlots = [];


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




	if (isAppointmentsLoading || isDoctorLoading) {
		return <div
			className="flex w-full flex-col gap-4  rounded-2xl  border-[2px] border-solid border-neutral-300 px-2 sm:px-5  pb-[31px]  pt-[40px] lg:gap-[27px]"
		>
			... Appointments & Slots are loading
		</div>
	}


	return (
		<div className=" flex w-full flex-col gap-4  rounded-2xl  border-[2px] border-solid border-neutral-300 px-2 sm:px-5  py-6  lg:gap-[27px]">
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
					<div
						
						className="mx-2 flex items-center justify-around gap-2 rounded-[21px] border-[1px] border-neutral-300 px-3 py-6 xl:px-8"
					>
						{/* {dates.length > 0 && <img
							className="relative h-5 w-5 object-contain"
							onClick={handleLeftClick}
							loading="lazy"
							alt=""
							src="/chevronleft.png"
						/>} */}

						<div
							id="dates-container"
							className="no-scrollbar flex  gap-2  overflow-y-auto"
						>
							{dates.length > 0 && dates.map((date, index) => {
								return (
									<div
										key={index}
										onClick={() => setSlotDateIndex(index)}
										className={`flex flex-col items-center justify-center rounded-xl border-[1px] px-1 sm:px-3 py-2 font-medium ${slotDateIndex === index ? 'bg-[#F2FBF2] border-darkolivegreen-200' : 'border-neutral-300'} cursor-pointer hover:border-darkolivegreen-200 hover:bg-lightolivegreen  hover:font-semibold hover:text-darkolivegreen-200`}
									>
										<span className={`${slotDateIndex === index && 'font-semibold text-[#3A643B]'} whitespace-nowrap font-inter text-[16px] tracking-[0.2px]`}>
											{DAYS[date.getDay()]}, {date.getDate()} {MONTHS[date.getMonth()]}
										</span>
										<span className={`${slotDateIndex === index && 'font-bold'} font-nunito text-center text-[16px] font-semibold  ${data[index].slots.length < 10 ? 'text-[#F1B93A]' : 'text-neutral-500'} ${data[index].slots.length  < 5 && 'text-[#D5512E]'}`}>
											{data[index].slots.length} slots
										</span>
									</div>
								)
							})}
							{dates.length === 0 && <p className='text-[#3A643B] text-lg font-medium'>No Slots available!</p>}

						</div>
						{/* {dates.length > 0 && <img
							className="relative h-5 w-5"
							onClick={handleRightClick}
							loading="lazy"
							alt=""
							src="/chevronright.svg"
						/>} */}
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
			
			<button
				type='button'
				disabled={slotTime === ''}
				onClick={handleClick}
				className={`block text-center p-4 rounded-xl  ${slotTime ? 'bg-[#3A643B] text-white cursor-pointer' :'bg-slate-200 text-[#333333] cursor-not-allowed'} font-inter text-[16px] sm:text-[20px] font-medium capitalize`}>
				Make an appointment
			</button>

			<Modal show={show} setShow={setShow}>
				<AuthPopUp />
			</Modal>
		</div>

	)
}



function AuthPopUp() {
	return (
		<div className="min-h-[400px] p-6 pt-10 font-sans bg-white rounded-xl">
			<img src='/amrutam.png' alt='Amrutam' />
			<p className="text-[20px] mt-10 font-medium">Please sign up to secure your appointment</p>
			<Link
				to='/login'
				className='w-[90%] sm:w-[80%] mt-6 flex justify-center py-4 rounded-xl bg-[#3A643B] text-white font-medium '
			>
				Sign In
			</Link>
		</div>
	)
}