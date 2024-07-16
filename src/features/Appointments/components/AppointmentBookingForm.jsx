/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
// import Razorpay from 'react-razorpay';
import { useQuery } from '@tanstack/react-query';
import Lottie from 'lottie-react';
import { useLocation } from 'react-router-dom';
import Confetti from '../../../assets/appointments/confetti.json';


import AppointmentSection from './AppointmentSection';
import AppointmentDetails from './SessionDetails.jsx';
import { DAYS, fetchSingleDoctor, processNames, MONTHS } from '../../../services/Doctor';
import {  uploadFile } from '../../../services/Appointments';
import ProgressBar from './ProgressBar';
import { SessionContext } from '../../../context/SessionDetailsContext.jsx';


import PhotoFrame from '../../../assets/appointments/photo-frame.svg';
import RedCross from '../../../assets/appointments/red-cross.svg';
import Coupons from './Coupons';

import Symptoms from './Symptoms.jsx';
import BasicInfo from './BasicInfo.jsx';
import Payment from './Payment.jsx';

function AppointmentBookingForm() {
	const location = useLocation();
	const from = location.state?.from;


	const [appointmentDetails, setAppointmentDetails] = useState({});
	const [currentStep, setCurrentStep] = useState(0);
	const { setSessionDetails } = useContext(SessionContext);
	const showConfetti = useRef(true);
	const showCouponModal = useRef(true);
	const previousCoupon = useRef('');
	const paymentStepVisited = useRef(false);



	useEffect(() => {
		if (location.state?.data) {

			setAppointmentDetails({
				...appointmentDetails,
				...location.state.data
			});
			setCurrentStep(1);
		}

		if (location.state?.details) {
			setSessionDetails(location.state.details);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (currentStep > 4) {
			showConfetti.current = false;
		}

		if (currentStep === 3) {
			console.log('code block 1');
			showCouponModal.current = true;
			paymentStepVisited.current = true;
		}

		// Disable showing coupon modal after payment step is reached

		if (paymentStepVisited.current && currentStep < 3) {
			console.log('code block 2')
			showCouponModal.current = false;
		}

	}, [currentStep]);


	useEffect(() => {
		// Enable showing coupon modal when user selects or enters different coupon code

		if (appointmentDetails.coupon && previousCoupon.current != appointmentDetails.coupon) {
			console.log('code block 3')
			showCouponModal.current = true;
			previousCoupon.current = appointmentDetails.coupon;
		}

		// if (appointmentDetails.coupon && previousCoupon.current == appointmentDetails.coupon) {
		// 	// console.log('code block 3')
		// 	showCouponModal.current = false;
		// }


	})

	
		

	
console.log('previous coupon ', previousCoupon.current);
console.log('current coupon ', appointmentDetails.coupon);


	const formSteps = [
		<AppointmentSection
			key='appointment-section'
			setStep={setCurrentStep}
			appointmentDetails={appointmentDetails}
			setAppointmentDetails={setAppointmentDetails}
		/>,
		<Symptoms
			key='symptoms'
			setStep={setCurrentStep}
			appointmentDetails={appointmentDetails}
			setAppointmentDetails={setAppointmentDetails}
		/>,
		<Confirmation
			key='confirmation'
			setStep={setCurrentStep}
			appointmentDetails={appointmentDetails}
		/>,
		<Payment
			key='payment'
			setStep={setCurrentStep}
			setAppointmentDetails={setAppointmentDetails}
			appointmentDetails={appointmentDetails}
			showCouponModal={showCouponModal}
			previousCoupon={previousCoupon}
		/>,
		<AttachReports
			key='attach-reports'
			setStep={setCurrentStep}
			appointmentDetails={appointmentDetails}
			setAppointmentDetails={setAppointmentDetails}
		/>,
		<BasicInfo
			key='basic-info'
			setStep={setCurrentStep}
			appointmentDetails={appointmentDetails}
			setAppointmentDetails={setAppointmentDetails}
		/>,
		<Coupons
			key='coupons'
			setStep={setCurrentStep}
			appointmentDetails={appointmentDetails}
			setAppointmentDetails={setAppointmentDetails}
		/>
	];


	return (
		<div className='relative sm:grid grid-cols-2 pb-10 sm:pb-0'>
			<AppointmentDetails
				from={from}
				currentStep={currentStep}
				setCurrentStep={setCurrentStep}
				appointmentDetails={appointmentDetails}
			/>
			<div className='py-10'>
				<div className='sm:px-4 mb-16 flex justify-center'>
					{currentStep < formSteps.length - 1 && <ProgressBar currentStep={currentStep}></ProgressBar>}
				</div>
				<div
					className=' px-2 xl:w-[90%] mx-auto'
				>
					{formSteps[currentStep]}
				</div>

			</div>
			{(currentStep === 4 && showConfetti.current) && (
				<div className='absolute z-10 top-0 left-[50%] translate-x-[-50%] sm:right-[200px] md:right-[400px] xl:right-[600px] w-[100%] max-w-[500px] sm:w-[300px] xl:w-[500px]'>
					<Lottie loop={false} animationData={Confetti} />
				</div>
			)}
		</div>

	);
}





function Confirmation({ setStep, appointmentDetails }) {
	const { doctorId } = useParams();
	const date = new Date(Date.parse(appointmentDetails.appointmentDate));

	// const { appointmentDetails } = useAppointment();

	const { data, isLoading } = useQuery({
		queryFn: () => fetchSingleDoctor(doctorId),
		queryKey: ['doctor', doctorId]
	});



	if (isLoading) {
		return <div>... Doctor details loading</div>
	}

	const Doctor = data.doctor;


	const {
		firstname,
		lastname
	} = Doctor;


	const [firstName] = processNames(firstname, lastname);

	return (
		<div className='border border-[#3A643B] rounded-3xl px-6 sm:px-4 md:px-6 py-8'>
			<div className='bg-[#EAF2EA] rounded-[14px] py-6'>
				<div className='flex justify-center'>
					<h2
						className='font-sans px-2 md:px-6 py-2 md:py-4 border-b border-[#3A643B7A] font-medium text-[#3A643B] text-lg sm:text-base md:text-lg'
					>
						Confirm Appointment Details
					</h2>
				</div>
				<div className='px-4 sm:w-full md:w-[80%] sm:px-2 mt-6 space-y-6 mx-auto text-sm sm:text-xs md:text-sm xl:text-lg font-nunito'>
					<div className='flex justify-between'>
						<p className='text-[#646665]'>Expert - </p>
						<p className='font-medium text-[#0C0C0C]'>Dr. {firstName}</p>
					</div>
					<div className='flex justify-between'>
						<p className='text-[#646665]'>Appointment Date - </p>
						<p className='font-medium text-[#0C0C0C]'>{DAYS[date.getDay()]}, {date.getDate()} {MONTHS[date.getMonth()]} {date.getFullYear()}</p>
					</div>
					<div className='flex justify-between'>
						<p className='text-[#646665]'>Appointment Time </p>
						<p className='font-medium text-[#0C0C0C]'>{appointmentDetails.appointmentTime}</p>
					</div>
					<div className='flex justify-between'>
						<p className='text-[#646665]'>Consultation Type</p>
						<p className='font-medium text-[#0C0C0C]'>{appointmentDetails.appointmentType[0].toUpperCase() + appointmentDetails.appointmentType.slice(1)} Consultation</p>
					</div>
				</div>
			</div>
			<button
				type='button'
				onClick={() => setStep(3)}
				className='block w-[100%] py-3 mt-6 font-medium md:text-[20px] font-inter bg-[#3A643B] hover:bg-[#305030] rounded-lg text-white'
			>
				Confirm Appointment
			</button>
		</div>

	)
}


function PhotoUploader({ appointmentDetails, setAppointmentDetails }) {
	const url = appointmentDetails.attachments?.[0];

	const [selectedFile, setSelectedFile] = useState('');
	const [attachmentUrl, setAttachmentUrl] = useState(url ?? '');
	const [previewUrl, setPreviewUrl] = useState(url ?? '');
	const fileInputRef = useRef(null);


	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setSelectedFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewUrl(reader.result);
			};
			reader.readAsDataURL(file);
		}


	};

	const handleDivClick = () => {
		fileInputRef.current.click();
	};


	useEffect(() => {
		console.log('attachementUrl ', attachmentUrl);
		console.log('appointmentDetails ', appointmentDetails);

		if (attachmentUrl && attachmentUrl !== appointmentDetails.attachments?.[0]) {
			setAppointmentDetails({
				...appointmentDetails,
				attachments: [
					attachmentUrl
				]
			})
		}
	}, [attachmentUrl])



	const { data, isLoading } = useQuery({
		queryFn: () => uploadFile(selectedFile),
		queryKey: ['file', selectedFile]
	});





	if (isLoading) {
		return <div>...Loading</div>
	}

	console.log('data ', data);

	if (data?.success && (!attachmentUrl || attachmentUrl !== data.data)) {
		console.log('This code run');
		setAttachmentUrl(data.data)
	}





	return (
		<div className="relative w-[300px] h-[300px] md:h-[340px] md:w-[340px] shrink-0  rounded-2xl  bg-center  bg-no-repeat">
			{previewUrl && (
				<img
					src={RedCross}
					alt='cross icon'
					onClick={() => {
						setPreviewUrl(null);
						setAppointmentDetails({
							...appointmentDetails,
							attachments: ['']
						})
						setSelectedFile(null);
					}}
					className="absolute right-0.5 top-0.5 z-50 block h-6 w-6 -translate-y-1/2 translate-x-1/2 transform]"
				/>
			)}
			<div
				onClick={handleDivClick}
				className="flex h-full w-full border border-dashed border-[#97AB97] bg-[#EAF2EA] rounded-2xl  flex-col items-center justify-center  gap-[8px] text-[14px] text-black"
			>
				<img
					alt="Frame"
					className={
						previewUrl
							? `z-30 h-[340px] w-[340px] rounded-2xl object-cover`
							: "w-[24px] h-[24px]"
					}
					src={previewUrl ? previewUrl : PhotoFrame}
				/>

				{!previewUrl && <div className='font-nunito text-[#0C140C] font-medium'>Upload Image</div>}
				<input
					type="file"
					className="hidden"
					ref={fileInputRef}
					onChange={handleFileChange}
				/>
			</div>
		</div>
	);
}


function AttachReports({ setStep, appointmentDetails, setAppointmentDetails }) {
	console.log('appointment Details ', appointmentDetails)

	const disabled = !appointmentDetails.attachments?.[0];

	return (
		<div className='relative'>
			<h2 className='text-[#161736] font-sans text-[20px] text-center '>
				Thank you! You have successfully booked your Appointment.
			</h2>
			<p className='w-[80%] mt-4 mx-auto text-center font-nunito font-medium text-sm text-[#797979]'>
				Please atttach your health report if you have any and
				fill your basic info to ensure a thorough and effective consultation.
			</p>

			<form
				className='px-2 sm:px-0 max-w-[500px] mx-auto bg-white rounded-[30px] mt-4 py-6 space-y-6 border border-[#3A643C]'
			>
				<h4 className='font-nunito font-bold text-[20px] text-center'>Attach Reports</h4>

				<div className='flex justify-center'>
					<PhotoUploader
						appointmentDetails={appointmentDetails}
						setAppointmentDetails={setAppointmentDetails}
					/>
				</div>
				<button
					type='submit'
					disabled={disabled}
					onClick={() => setStep(5)}
					className={`block w-[90%] md:w-[80%] mx-auto py-3 font-medium text-[20px] font-inter ${disabled ? 'bg-slate-200 text-black cursor-not-allowed' : 'bg-[#3A643B] hover:bg-[#305030] text-white'} rounded-lg `}
				>
					Proceed
				</button>
			</form>
			{/* <Confetti width={width} height={height} recycle={false} /> */}
			<p onClick={() => setStep(5)} className='text-[#3A643B] cursor-pointer hover:underline mt-6 font-inter font-semibold text-[20px] text-center'>Skip For Now</p>
		</div>
	)
}




export default AppointmentBookingForm;