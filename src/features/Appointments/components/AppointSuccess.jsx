import ProgressBar from './ProgressBar';
import { useQuery } from '@tanstack/react-query';
import { Link, useLocation } from 'react-router-dom';
import { fetchSingleDoctor, extractSpeciality, calculateTotalExperience, processNames } from '../../../services/Doctor';
	
function AppointmentSuccess() {
	const location = useLocation();
	const  doctorId = location.state?.doctorId;


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


	const appointmentDetails = location.state?.appointmentDetails;
	const concern = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
	Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
	when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
	It has survived not only five centuries, but also the leap into electronic typesetting, 
	remaining essentially unchanged. 
	It was popularised in the 1960s with the release of Letraset sheets containing Lorem 
	Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker 
	including versions of Lorem Ipsum.`

	const {
		appointmentType,
		appointmentDuration,
		appointmentDate,
		appointmentTime,
		sleepPattern,
		age,
		symptoms
	} = appointmentDetails;


	return (
		<div className='px-2 py-16 bg-[#E4F1F0]'>
			<ProgressBar currentStep={6}></ProgressBar>
			<h2 className='font-sans text-center text-[#161736] mt-[75px] text-2xl'>
				Great! You have successfully completed all your Health details.
			</h2>
			<Link to='/'>
				<button
					className='block bg-[#3A643B] mt-[20px] text-white font-inter font-medium text-[20px] mx-auto py-4 w-[245px] rounded-lg'
				>
					Go Back Home
				</button>
			</Link>
			

			<div className='flex flex-col sm:flex-row justify-center gap-4 md:gap-8 mt-[20px]'>
				<div className='mx-auto sm:mx-0 space-y-4 md:space-y-8'>
					<div className='relative w-[350px] lg:w-[450px] xl:w-[491px] px-4 md:px-6 py-2 md:py-4  bg-white rounded-[25px] font-nunito'>
						<h3 className='lg:text-[20px] font-semibold font-inter mb-4'>Doctor Details</h3>
						<div className='flex gap-2 md:gap-4'>
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
										{totalExprience > 0 ? totalExprience + ' years of Experience': 'Recently Licensed'} 
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='relative w-[350px] lg:w-[450px] xl:w-[491px] px-4 md:px-6 py-2 md:py-4 bg-white rounded-[25px] font-inter'>
						<h3 className='lg:text-[20px] font-semibold mb-4'>Session Details</h3>

						<div className='flex items-center gap-4'>
							<div className='w-[179px] sm:w-[150px] lg:w-[179px] lg:h-[117px] bg-[#F5F8ED] rounded-md px-[17px] py-[15px] border border-[#D6E5D6]'>
								<h4 className='text-[#2B2E2B] mb-2 text-xs md:text-sm lg:text-[18px] font-semibold'>Session Mode</h4>
								<p className='text-[#3A643B] text-[10px] md:text-xs lg:text-base font-medium'>{appointmentType} call</p>
								<p className='text-[#3A643B] text-[10px] md:text-xs lg:text-base font-medium'>{appointmentDuration} Mins</p>
							</div>
							<div className='w-[179px] sm:w-[150px] lg:w-[179px] lg:h-[117px] bg-[#F5F8ED] rounded-md px-[17px] py-[15px] border border-[#D6E5D6]'>
								<h4 className='text-[#2B2E2B] mb-2 text-xs md:text-sm lg:text-[18px] font-semibold'>Date & Time</h4>
								<p className='text-[#3A643B] text-[10px] md:text-xs lg:text-base font-medium'>{appointmentDate}</p>
								<p className='text-[#3A643B] text-[10px] md:text-xs lg:text-base font-medium'>{appointmentTime}</p>
							</div>

						</div>
					</div>
				</div>

				<div className='bg-white border-[#3A643B] w-[350px] mx-auto sm:mx-0 sm:w-[520px] rounded-3xl px-2 md:px-6 py-2 md:py-4'>
					<div className='bg-[#EAF2EA] rounded-[14px] py-6'>
						<div className='flex justify-center'>
							<h2
								className='font-sans px-2 md:px-6 py-2 md:py-4 border-b border-dashed border-[#3A643B7A] font-medium text-[#3A643B] text-lg sm:text-base md:text-lg'
							>
								Your Personal / Health Details
							</h2>
						</div>
						<div className='px-4 mt-6 space-y-6 lg:space-y-8  mx-auto text-sm sm:text-xs md:text-sm xl:text-lg font-nunito'>
							<div className='flex justify-between'>
								<p className='text-[#646665]'>Age - </p>
								<p className='font-medium text-[#0C0C0C]'>{age} years</p>
							</div>
							<div className='flex justify-between'>
								<p className='text-[#646665]'>Gender - </p>
								<p className='font-medium text-[#0C0C0C]'>Male</p>
							</div>
							<div className='flex justify-between'>
								<p className='text-[#646665]'>Concern -  </p>
								<p className='max-w-[155px] md:max-w-[180px] line-clamp-2 font-bold text-sm text-[#0C0C0C]'>
									{symptoms.concern}
									
								</p>
							</div>
							<div className='flex justify-between'>
								<p className='text-[#646665]'>Sleep Pattern - </p>
								<p className='max-w-[155px] md:max-w-[180px] line-clamp-2 font-bold text-sm text-[#0C0C0C]'>
									{sleepPattern}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}

export default AppointmentSuccess;