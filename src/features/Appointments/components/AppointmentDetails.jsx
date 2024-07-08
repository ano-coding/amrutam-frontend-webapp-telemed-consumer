import arrowRight from '../../../assets/appointments/arrow-right.svg';
import arrowLeft from '../../../assets/appointments/arrow-left.svg';
// import { useAppointment } from '../useAppointment.js';
import { useNavigate,  useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchSingleDoctor } from '../../../services/Doctor.js';
import { extractSpeciality, processNames, calculateTotalExperience } from '../../../services/Doctor.js';
import { DAYS, MONTHS } from '../../../services/Doctor.js';



function AppointmentDetails({ from, currentStep, setCurrentStep, appointmentDetails }) {
	const navigate = useNavigate();
	const date = new Date(Date.parse(appointmentDetails.appointmentDate));


	// Disabling going back after payment
	const backNotAllowed = currentStep === 4;

	
	// const { appointmentDetails } = useAppointment();
	const { doctorId } = useParams();

	const { data, isLoading } = useQuery({
		queryFn: () => fetchSingleDoctor(doctorId),
		queryKey: ['doctor', doctorId]
	});




	if (isLoading) {
		return <div>... Doctor details loading</div>
	}

	const Doctor = data.doctor;
	const specialities = data.specialities.map(extractSpeciality);
	const workExperience = data.workExperiences;
	const totalExprience = calculateTotalExperience(workExperience);


	let speciality = 'General Physician';

	if (specialities.length !== 0) {
		speciality = specialities[0];
	}



	const {
		firstname,
		lastname,
		photo,
	} = Doctor;


	const [firstName, lastName] = processNames(firstname, lastname);


	function handleClick() {
		if (currentStep === 0) {
			navigate(from);
			return;
		}
		
		if (backNotAllowed) {
			return;
		}

		setCurrentStep(currentStep - 1);
	}
	



	return (
		<div className='sm:min-h-[100vh] bg-[#E4F1F0]'>
			<div className='flex items-center justify-center '>
				<div className='mt-2 my-4 sm:my-0 sm:mt-10 space-y-4'>
					<img
						onClick={handleClick}
						src={arrowLeft}
						alt='Arrow Left'
						className={`w-8 h-8 ${backNotAllowed? 'cursor-not-allowed': 'cursor-pointer'} mr-auto lg:w-12 lg:h-12`}
					/>
					<div className='relative w-[300px] md:w-[350px] lg:w-[450px] xl:w-[491px] px-4 md:px-6 py-2 md:py-4 flex gap-2 md:gap-4 bg-white rounded-[25px] font-nunito'>
						<img
							src={arrowRight}
							alt='Arrow Right'
							className='absolute w-8 h-8 lg:w-12 lg:h-12 top-8 md:top-10 right-4'
						/>
						<div className='w-[70px] h-[80px] lg:w-[97px] lg:h-[106px] rounded-xl overflow-hidden'>
							<img
								className="w-full h-full object-cover"
								alt="Doctor photo"
								src={photo}
							/>
						</div>

						<div className="space-y-1">
							<h3 className="text-lg lg:text-[20px] font-bold text-[#2E2F2E]">
								Dr. {firstName} {lastName}
							</h3>
							<div className="flex items-center gap-[10px]">
								<img
									className="h-4 w-4 shrink-0 overflow-hidden"
									loading="lazy"
									alt="speciality"
									src="/frame.svg"
								/>
								<div className="text-xs lg:text-base text-[#646665]">
									{speciality}
								</div>
							</div>
							<div className="flex items-center gap-[7px]">
								<img
									className="h-5 w-5 shrink-0 overflow-hidden"
									alt="experience"
									src="/hat.svg"
								/>
								<div className="text-xs lg:text-base text-[#646665]">
									{totalExprience} years of Experience
								</div>
							</div>
						</div>

					</div>
					<div className='relative w-[300px] md:w-[350px] lg:w-[450px] xl:w-[491px] px-4 md:px-6 py-2 md:py-4 bg-white rounded-[25px] font-inter'>
						<h3 className='lg:text-[20px] font-semibold mb-4'>Session Details</h3>
						<img
							src={arrowRight}
							alt='Arrow Right'
							className='absolute w-8 h-8 lg:w-12 lg:h-12 top-3 md:top-4 right-4'
						/>
						<div className='flex items-center gap-4'>
							<div className='w-[179px] sm:w-[150px] lg:w-[179px] lg:h-[117px] bg-[#F5F8ED] rounded-md px-[17px] py-[15px] border border-[#D6E5D6]'>
								<h4 className='text-[#2B2E2B] mb-2 text-xs md:text-sm lg:text-[18px] font-semibold'>Session Mode</h4>
								<p className='text-[#3A643B] text-[10px] md:text-xs lg:text-base font-medium'>{appointmentDetails.appointmentType || 'Not Selected'}</p>
								<p className='text-[#3A643B] text-[10px] md:text-xs lg:text-base font-medium'>{appointmentDetails.appointmentDuration && appointmentDetails.appointmentDuration +' Mins'}  </p>
							</div>
							<div className='w-[179px] sm:w-[150px] lg:w-[179px] lg:h-[117px] bg-[#F5F8ED] rounded-md px-[17px] py-[15px] border border-[#D6E5D6]'>
								<h4 className='text-[#2B2E2B] mb-2 text-xs md:text-sm lg:text-[18px] font-semibold'>Date & Time</h4>
								<p className='text-[#3A643B] text-[10px] md:text-xs lg:text-base font-medium'>{appointmentDetails.appointmentDate ? `${DAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`: 'Not Selected' }</p>
								<p className='text-[#3A643B] text-[10px] md:text-xs lg:text-base font-medium'>{appointmentDetails.appointmentTime || 'Not selected'}</p>
							</div>

						</div>
					</div>
				</div>

			</div>
		</div>
	)
}


export default AppointmentDetails;