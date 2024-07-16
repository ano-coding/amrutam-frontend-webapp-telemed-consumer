/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import Razorpay from 'react-razorpay';
import { useQuery } from '@tanstack/react-query';
import Lottie from 'lottie-react';
import { useForm } from "react-hook-form";
import { useLocation } from 'react-router-dom';
import Confetti from '../../../assets/appointments/confetti.json';


import AppointmentSection from './AppointmentSection';
import AppointmentDetails from './SessionDetails.jsx';
import { DAYS, fetchSingleDoctor, processNames, MONTHS } from '../../../services/Doctor';
import { fetchSingleCouponStatus, uploadFile, bookAppointment, markAppointmentAsPaid } from '../../../services/Appointments';
import ProgressBar from './ProgressBar';
import Modal from './Modal.jsx';
import { SessionContext } from '../../../context/SessionDetailsContext.jsx';


import arrowR from '../../../assets/appointments/arrow-r.svg';
import PhotoFrame from '../../../assets/appointments/photo-frame.svg';
import RedCross from '../../../assets/appointments/red-cross.svg';
import Coupons from './Coupons';


function AppointmentBookingForm() {
	const location = useLocation();
	const from = location.state?.from;


	const [appointmentDetails, setAppointmentDetails] = useState({});
	const [currentStep, setCurrentStep] = useState(0);
	const { setSessionDetails } = useContext(SessionContext);
	const showConfetti = useRef(true);



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
	}, [currentStep]);



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
			appointmentDetails={appointmentDetails}
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



function Symptoms({ setStep, appointmentDetails, setAppointmentDetails }) {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const { sleepPattern, symptoms } = appointmentDetails;

	const concern = symptoms?.concern || '';
	const description = symptoms?.description || '';
	const severity = symptoms?.severity || '';	
	// let duration = '';
	// let timeUnit = ''

	// if (symptoms?.duration) {
	// 	duration = symptoms.duration?.[0];
	// 	// timeUnit = (symptoms.duration?.[1] ?? '')
	// }



	console.log('appointment Details ', appointmentDetails);

	function handleChange(e) {
		if (e.target.id === 'sleep-pattern') {
			setAppointmentDetails({
				...appointmentDetails,
				sleepPattern: e.target.value
			});

			return;
		} 

		if (e.target.id === 'duration') {
			const duration = appointmentDetails.symptoms?.duration;
			let newDuration = e.target.value;

			console.log('duration ', duration);

			if (duration) {
				newDuration = duration.split(' ')[0] + e.target.value + ' ' + (duration.split(' ')[1] ?? '')
			}
			// const newDuration = e.target.value + ' ' + duration.split(' ')[1];

			setAppointmentDetails({
				...appointmentDetails,
				symptoms: {
					...appointmentDetails.symptoms,
					duration: newDuration
				}
			})

			return;
		}


		if (e.target.id === 'time-unit') {
			const duration = appointmentDetails.symptoms.duration;
			let newDuration;

			if (duration) {
				newDuration = duration.split(' ')[0] + ' ' + e.target.value;
			}
			// const newDuration = duration.split(' ')[0] + ' ' + e.target.value;

			setAppointmentDetails({
				...appointmentDetails,
				symptoms: {
					...appointmentDetails.symptoms,
					duration: newDuration
				}
			})

			return;
		}

		setAppointmentDetails({
			...appointmentDetails,
			symptoms: {
				...appointmentDetails.symptoms,
				[e.target.id]: e.target.value
			}
		})
	}

	const onSubmit = (data) => {
		if (Object.keys(errors).length === 0) {

			

			setAppointmentDetails({
				...appointmentDetails,
				sleepPattern: data.sleepPattern,
				symptoms: {
					...appointmentDetails.symptoms,
					concern: data.concern,
					description: data.description,
					severity: data.severity,
					duration: `${data.duration} ${data.timeUnit}`,
				}

			})

			setStep(2);
		}
	}

	// console.log('errors ', errors);

	return (
		<div className='border-[1.5px] border-[#3A643B] rounded-[25px] px-4 py-6'>
			<h2 className='font-inter font-semibold mb-6 text-lg'>Symptoms</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='font-nunito space-y-4'
			>
				<div>
					<label className='flex-1 block px-4 py-2 text-xs text-[#646665] border border-[#CED8E0] rounded-2xl'>
						Concern
						<input
							{...register('concern', { required: 'Concern is required' })}
							id='concern'
							value={concern}
							onChange={handleChange}
							type='text'
							className='mt-1 block w-[100%] text-base text-[#2E2F2E] font-medium focus:outline-none'
						/>
					</label>
					<p className='px-2 mt-1 text-red-400 text-sm my-0 font-medium'>{errors.concern?.message}</p>
				</div>
				<div>
					<label className='flex-1 block px-4 py-2 text-xs text-[#646665] border border-[#CED8E0] rounded-2xl'>
						Description
						<input
							{...register('description', { required: 'Description is required' })}
							type='text'
							value={description}
							onChange={handleChange}
							id='description'
							className='mt-1 block w-[100%] text-base text-[#2E2F2E] font-medium focus:outline-none'
						/>
					</label>
					<p className='px-2 mt-1 text-red-400 text-sm font-medium'>{errors.description?.message}</p>
				</div>
				<div>
					<label className='flex-1 block px-4 py-2 text-xs text-[#646665] border border-[#CED8E0] rounded-2xl'>
						Severity
						<input
							{...register('severity', { required: 'Severity is required' })}
							type='text'
							value={severity}
							onChange={handleChange}
							id='severity'
							className='mt-1 block w-[100%] text-base text-[#2E2F2E] font-medium focus:outline-none'
						/>
					</label>
					<p className='px-2 mt-1 text-red-400 text-sm font-medium'>{errors.severity?.message}</p>
				</div>
				<div className='flex items-start gap-2'>
					<div className='flex-1'>
						<label className='block px-4 py-2 text-xs text-[#646665] border border-[#CED8E0] rounded-2xl'>
							Duration
							<input
								{...register('duration', { required: 'Duration is required' })}
								type='number'
								id='duration'
								// value={duration}
								onChange={handleChange}
								className='mt-1 block w-[100%] text-base text-[#2E2F2E] font-medium focus:outline-none'
							/>
						</label>
						<p className='px-2 mt-1 text-red-400 text-sm font-medium'>{errors.duration?.message}</p>
					</div>
					<div className='flex-1'>
						<label className='block px-4 py-2 text-xs text-[#646665] border border-[#CED8E0] rounded-2xl'>
							Time Unit
							<input
								{...register('timeUnit', { required: 'Time unit is required' })}
								type='text'
								id='time-unit'
								// value={timeUnit}
								// onChange={handleChange}
								className='mt-1 block w-[100%] text-base text-[#2E2F2E] font-medium focus:outline-none'
							/>
						</label>
						<p className='px-2 mt-1 text-red-400 text-sm font-medium'>{errors.timeUnit?.message}</p>
					</div>
				</div>
				<div>
					<label className='flex-1 block px-4 py-2 text-xs text-[#646665] border border-[#CED8E0] rounded-2xl'>
						Sleep Pattern
						<input
							{...register('sleepPattern', { required: 'Sleep Pattern is required' })}
							id='sleep-pattern'
							value={sleepPattern}
							onChange={handleChange}
							type='text' className='mt-1 block w-[100%] text-base text-[#2E2F2E] font-medium focus:outline-none'
						/>
					</label>
					<p className='px-2 mt-1 text-red-400 text-sm font-medium'>{errors.sleepPattern?.message}</p>
				</div>

				<button
					type='submit'
					className='block w-[100%] py-3 font-medium text-[20px] font-inter bg-[#3A643B] hover:bg-[#305030] rounded-lg text-white'
				>
					Proceed
				</button>
			</form>
		</div>

	)
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

function Payment({ setStep, appointmentDetails }) {
	const [show, setShow] = useState(true);
	const { doctorId } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const couponId = searchParams.get('couponId') || '';
	let couponStatus = 'Not Applied';


	// console.log('appointment Details ', appointmentDetails);


	async function handleClick() {
		console.log('Button clicked!');

		const record = await bookAppointment(doctorId, appointmentDetails);

		try {
			const { data: res } = await createRazorPayOrder(record);

			console.log('Data after razorpay order ', res);

			if (res) {
				const options = {
					key: 'rzp_test_D207uk5d0UfCfa',
					amount: record.slotBooked.amount,
					currency: "INR",
					name: "Amrutam Telemedicine",
					description: "Payment for consultation",
					order_id: res.data.id,
					image:
						"https://amstorage2024.blob.core.windows.net/amrutam-main-storage/1716861497754-310498919_424195159843924_6622146755335909308_n.jpg",
					handler: async function (response) {
						console.log('Data in razorpay handler ', response);
						try {
							const { data: markedAppointmentPaidRes } = await markAppointmentAsPaid(record._id);

							if (markedAppointmentPaidRes?.success) {

								console.log('markedPaidRes ', markedAppointmentPaidRes);

								setStep(4)

								// setBookingId(record?._id);

								// toast({ title: "Payment Successful 🎉" });

								// setNavigators(navigators.map((item) => {
								// 	if (item.id === 3) {
								// 		return { ...item, isCompleted: true };
								// 	}
								// 	return item;
								// }));

							} else {
								// handlePaymentFailure(res.id, record, "Payment not marked Paid. Please contact with internal team with the screenshot", "Marking_paid_step", "Marked_Unpaid");
								console.log("Payment not marked Paid. Please contact with internal team with the screenshot", "Marking_paid_step", "Marked_Unpaid");
							}
						} catch (error) {
							console.log('An error occurred ', error)
							// handlePaymentFailure(res.id, record, "An error occurred during payment marking", "Marking_paid_step", "Error");
						}
					},
					// prefill: {
					// 	name: patientProfile?.data?.first_name + " " + patientProfile?.data?.last_name,
					// 	email: patientProfile?.data?.email,
					// 	contact: patientProfile?.data?.phone,
					// },
					prefill: {
						name: 'John Doe',
						email: 'sample@gmail.com',
						contact: '9233451802',
					},
					notes: {
						address: "Razorpay Corporate Office",
					},
					theme: {
						color: "#F37254",
					},
				};

				const rzp = new window.Razorpay(options);
				rzp.open();

				rzp.on("payment.failed", function (response) {
					// toast({
					// 	title: "Payment Failed 😔",
					// 	description: "Please try again",
					// 	variant: "destructive",
					// });
					console.log('payment failed ', response);

					// handlePaymentFailure(res.id, record, response.error.description, response.error.step, response.error.reason, response.error.metadata.payment_id);
				});
			}
		} catch (e) {
			console.error("Error creating RazorPay order:", e);
		}

		async function createRazorPayOrder(record) {
			let data = JSON.stringify({
				"amount": record.slotBooked.amount,
				"notes": {
					"note": "Payment for consultation"
				},
				"id": record._id
			});

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'https://amrutam-dev-backend.azurewebsites.net/api/v1/patient/appointments/create-razorpay-order',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzQ2NTE5NDUyMDgyOSwiaWF0IjoxNzIwMTY1Nzk5LCJleHAiOjE3Mjc5NDE3OTl9.MfO4C3Jwwgdmg4SimpZLhfityZBdZVzqJG0OPnJgEFQ'
				},
				data: data
			};

			try {
				const res = await axios.request(config);

				console.log('data in createRazorpayOrder ', res);

				return res;
			} catch (e) {
				console.log(e);

				return e;
			}
		}

	} 

	const { data: doctor, isDoctorLoading } = useQuery({
		queryFn: () => fetchSingleDoctor(doctorId),
		queryKey: ['doctor', doctorId]
	});


	const { data, isCouponStatusLoading } = useQuery({
		queryFn: () => fetchSingleCouponStatus(couponId),
		queryKey: ['coupon', couponId]
	});



	if (isDoctorLoading || isCouponStatusLoading) {
		return <div>...Coupon status and Doctor details loading</div>
	}

	const Doctor = doctor.doctor;


	const {
		firstname,
		lastname
	} = Doctor;


	const [firstName] = processNames(firstname, lastname);

	function calculateDiscountAmount(totalAmount, discount) {
		switch (discount.type) {
			case 'PERCENTAGE':
				return Math.round(totalAmount * (discount.amount / 100))
			default:
				return Math.round(totalAmount - discount.amount);
		}
	}


	if (!data || data.noCouponCode) {
		couponStatus = 'Not Applied'
	} else if (!data.success) {
		couponStatus = 'Unsuccess';
	} else if (data.success) {
		couponStatus = 'Success'
	}


	let discount = { type: 'PERCENTAGE', amount: 0 };

	if (couponStatus === 'Success') {
		discount = data.data.discount;
	}


	return (
		<div className='border border-[#3A643B] space-y-4 rounded-3xl px-4 md:px-6 py-8'>
			<Helmet>
				<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
			</Helmet>
			<div className='bg-[#EAF2EA] rounded-[14px] py-6'>
				<div className='flex justify-center'>
					<h2
						className='font-sans px-2 md:px-6 py-2 md:py-4 border-b border-[#3A643B7A] font-medium text-[#3A643B] text-lg sm:text-base md:text-lg'
					>
						Appointment Details
					</h2>
				</div>
				<div className='w-[80%] mt-6 space-y-6 mx-auto text-sm sm:text-xs md:text-sm xl:text-lg font-nunito'>
					<div className='flex justify-between'>
						<p className='text-[#646665]'>Expert - </p>
						<p className='font-medium text-[#0C0C0C]'>Dr. {firstName}</p>
					</div>
					<div className='flex justify-between'>
						<p className='text-[#646665]'>Appointment Date - </p>
						<p className='font-medium text-[#0C0C0C]'>23 November 2023</p>
					</div>
					<div className='flex justify-between'>
						<p className='text-[#646665]'>Appointment Time -  </p>
						<p className='font-medium text-[#0C0C0C]'>10:00 AM</p>
					</div>
					<div className='flex justify-between'>
						<p className='text-[#646665]'>Consultation Type - </p>
						<p className='font-medium text-[#0C0C0C]'>{appointmentDetails.appointmentType[0].toUpperCase() + appointmentDetails.appointmentType.slice(1)} Consultation</p>
					</div>
					<div className='flex justify-between'>
						<p className='text-[#646665]'>Consultation Fee - </p>
						<p className='font-medium text-[#0C0C0C]'>Rs. {appointmentDetails.appointmentFee}</p>
					</div>
				</div>
			</div>

			{couponStatus === 'Success' ? (
				<AppliedCouponDetails data={data} setStep={setStep}></AppliedCouponDetails>
			) : (
				<SearchCoupons
					searchParams={searchParams}
					setSearchParams={setSearchParams}
					setStep={setStep}
					setShow={setShow}
				>
				</SearchCoupons>
			)}

			<div className='bg-[#EAF2EA] rounded-[14px] py-6'>
				<div className='w-[80%] space-y-6 mx-auto text-sm sm:text-xs md:text-sm xl:text-lg font-nunito'>
					<div className='relative flex justify-between'>
						<p className='text-[#646665]'>Saved - </p>
						<p className='font-medium text-[#0C0C0C]'>Rs.{calculateDiscountAmount(appointmentDetails.appointmentFee, discount)}</p>
						{couponStatus !== 'Success' && <p className='absolute text-[#646665] italic text-[10px] sm:text-[8px] md:text-xs xl:text-sm right-10 top-0 sm:top-[2px] xl:top-[5px]'>Apply Coupon to save upto 60%</p>}
					</div>
					<div className='flex justify-between'>
						<p className='text-[#646665]'>Total Fee - </p>
						<p className='font-medium text-[#0C0C0C]'>Rs.{appointmentDetails.appointmentFee - calculateDiscountAmount(appointmentDetails.appointmentFee, discount)}</p>
					</div>
				</div>
			</div>

			<button
				type='submit'
				onClick={handleClick}
				className='block w-[100%] py-3 mt-6 font-medium md:text-[20px] font-inter bg-[#3A643B] hover:bg-[#305030] rounded-lg text-white'
			>
				Proceed To Pay
			</button>

			{couponStatus === 'Unsuccess' && (
				<Modal show={show} setShow={setShow}>
					{data.data.message === 'Coupon is expired' ? (
						<ExpiredCoupon></ExpiredCoupon>
					) : <InvalidCoupon></InvalidCoupon>}
				</Modal>
			)}

			{couponStatus === 'Success' && (
				<Modal show={show} setShow={setShow}>
					<CouponAppliedCard 
						data={data}
						consultationType={appointmentDetails.appointmentType}
					/>
				</Modal>
			)}

		</div>

	)
}


function SearchCoupons({ searchParams, setSearchParams, setStep, setShow }) {
	const [couponId, setCouponId] = useState('');

	return (
		<div className='relative'>
			<input
				type='text'
				value={couponId}
				onChange={(e) => setCouponId(e.target.value)}
				placeholder='Enter Coupon Code'
				className='w-[100%] pl-6 pr-16 py-4 placeholder:text-[#A0A0A0] text-sm font-nunito focus:outline-none border border-[#A0A0A0] rounded-2xl'
			/>
			<button
				onClick={() => {
					searchParams.set('couponId', couponId);
					setSearchParams(searchParams);
					setShow(true);
				}}
				className='absolute top-4 right-4 text-[#28643B] text-sm font-bold'>Apply</button>
			<button
				onClick={() => setStep(6)}
				className='w-full flex items-center justify-between mt-2'
			>
				<p className='text-sm sm:text-xs md:text-sm font-dmsans text-[#3A643CB2] px-2'>See all available coupons for this consultation</p>
				<img src={arrowR} alt='Arrow Right' />
			</button>
		</div>
	)
}


function AppliedCouponDetails({ data, setStep }) {
	console.log('coupon ', data);
	
	return (
		<div className='bg-[#EAF2EA] rounded-2xl'>
			<div className='rounded-t-2xl border-[1.5px] border-dashed border-[#D9D9D9]'>
				<div className='w-[90%] mx-auto flex items-center py-4'>
					<img
						src='/appointments/leaves.png'
						alt='Leaf'
						className='shrink-0 scale-50 -mt-4'
					/>
					<div>
						<p className='text-[#101018] font-dmsans font-semibold text-sm'>{data.data.couponCode}</p>
						<p className='text-[#646665] font-sans text-[10px]'>{data.data.description}</p>
					</div>

					<p className='ml-auto text-[#28643B] font-nunito font-bold text-sm'>Applied</p>
				</div>
			</div>
			<button
				onClick={() => setStep(6)}
				className='mx-auto flex items-center justify-center gap-2 py-2'
			>
				<p className='text-[#797979] font-bold text-sm font-nunito'>View more Coupons</p>
				<img src={arrowR} alt='Arrow Right' />
			</button>
		</div>

	)
}


function BasicInfo({ appointmentDetails, setAppointmentDetails }) {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const navigate = useNavigate();
	const { doctorId } = useParams();
	// console.log('doctorId', doctorId)

	const patientDetails = appointmentDetails.patientDetails;

	let height = '';
	let weight = '';
	let age = '';

	if (patientDetails) {
		height = patientDetails.height;
		weight = patientDetails.weight;
		age = patientDetails.age;
	}

	function handleChange(e) {
		setAppointmentDetails({
			...appointmentDetails,
			patientDetails: {
				...appointmentDetails.patientDetails,
				[e.target.id]: e.target.value
			}
		})
	}

	const onSubmit = data => {
		if (Object.keys(errors).length === 0) {

			// setAppointmentDetails({
			// 	...appointmentDetails,
			// 	...data
			// })

			// console.log('appointment Data', {
			// 	...appointmentDetails,
			// 	...data
			// })

			navigate('/appointment-success', {
				state: {
					appointmentDetails: {
						...appointmentDetails,
						...data
					},
					doctorId
				}
			});
		}
	}

	return (
		<div>
			<div className='border-[1.5px] border-[#3A643B] rounded-[25px] px-8 py-6'>
				<h2 className='font-inter font-semibold mb-6 text-lg'>Basic Info</h2>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='font-nunito space-y-4'
				>
					<div>
						<label className='flex-1 block px-4 py-2 text-xs text-[#646665] border border-[#CED8E0] rounded-2xl'>
							Height
							<input
								{...register('height', { required: 'Height is required!'})}
								type='number'
								min='0'
								max='300'
								id='height'
								value={height}
								onChange={handleChange}
								className='mt-1 block w-[100%] text-base text-[#2E2F2E] font-medium focus:outline-none'
							/>
						</label>
						<p className='px-2 mt-1 text-red-400 text-sm my-0 font-medium'>{errors.height?.message}</p>
					</div>

					<div>
						<label className='flex-1 block px-4 py-2 text-xs text-[#646665] border border-[#CED8E0] rounded-2xl'>
							Weight
							<input
								{...register('weight', { required: 'Weight is required!' })}
								type='number'
								min='0'
								max='200'
								id='weight'
								value={weight}
								onChange={handleChange}
								className='mt-1 block w-[100%] text-base text-[#2E2F2E] font-medium focus:outline-none'
							/>
						</label>
						<p className='px-2 mt-1 text-red-400 text-sm my-0 font-medium'>{errors.weight?.message}</p>
					</div>

					<div>
						<label className='flex-1 block px-4 py-2 text-xs text-[#646665] border border-[#CED8E0] rounded-2xl'>
							Age
							<input
								{...register('age', { required: 'Height is required!'})}
								type='number'
								min='0'
								max='100'
								id='age'
								value={age}
								onChange={handleChange}
								className='mt-1 block w-[100%] text-base text-[#2E2F2E] font-medium focus:outline-none'
							/>
						</label>
						<p className='px-2 mt-1 text-red-400 text-sm my-0 font-medium'>{errors.age?.message}</p>
					</div>

					{/* <Link
						className='block'
						to='/appointment-success'
					> */}
					<button
						type='submit'
						className='block w-[100%] py-3 font-medium text-[20px] font-inter bg-[#3A643B] hover:bg-[#305030] rounded-lg text-white'
					>
						Proceed
					</button>
					{/* </Link> */}
				</form>
			</div>

			<Link
				// onClick={() => setStep(6)}
				to='/appointment-success'
				state={{
					appointmentDetails,
					doctorId
				}}
			>
				<p className='text-[#3A643B] mt-6 font-inter font-semibold text-[20px] text-center'>
					Skip For Now
				</p>
			</Link>

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
					className={`block w-[90%] md:w-[80%] mx-auto py-3 font-medium text-[20px] font-inter ${disabled? 'bg-slate-200 text-black cursor-not-allowed': 'bg-[#3A643B] hover:bg-[#305030] text-white'} rounded-lg `}
				>
					Proceed
				</button>
			</form>
			{/* <Confetti width={width} height={height} recycle={false} /> */}
			<p onClick={() => setStep(5)} className='text-[#3A643B] cursor-pointer hover:underline mt-6 font-inter font-semibold text-[20px] text-center'>Skip For Now</p>
		</div>
	)
}


function CouponAppliedCard({ data, consultationType }) {
	const discount = data.data.discount;

	return (
		<div className='relative p-10 bg-white flex flex-col justify-center space-y-6 rounded-2xl font-nunito border max-w-[350px] mx-auto'>
			<div className=''>
				<img
					className='mx-auto'
					src='/appointments/leaves.png'
					alt='Leaves'
				/>
				<p className='text-center text-[24px] text-[#28643B] font-extrabold'>
					{discount.amount}{discount.type === 'PERCENTAGE'? '%': discount.type.currency} OFF
				</p>
				<p className='text-center font-medium text-[#7D7878] text-xs'>
					{consultationType} Call Consultation
				</p>
			</div>
			<div className='mx-auto p-4 border border-dashed border-[#7D7878]'>
				<p className='text-[#7D7878] text-center text-sm'>Your coupon code</p>
				<p className='text-center text-[20px] font-semibold'>{data.data.couponCode}</p>
			</div>

			<p className='font-nunito font-medium text-center'>Coupon Applied</p>
			<div className='absolute top-0 left-0'>
				<Lottie loop={false} animationData={Confetti} />
			</div>


		</div>
	)
}


function ExpiredCoupon() {
	return (
		<div className='w-[337px] bg-white px-4 py-10 border font-nunito rounded-2xl'>
			<div className='flex justify-center mb-6'>
				<div className='relative pt-2'>
					<img
						className='absolute top-1'
						src='/appointments/exclamation.png'
						alt='Exclamation'
					/>
					<img
						src='/appointments/trees.png' alt='Leaf'
					/>
				</div>
			</div>
			<p className='font-extrabold text-center mb-4 text-[#BC0000]'>Oops! Your Coupon Has Expired</p>
			<p className='font-medium text-center mb-8 text-xs text-[#7D7878]'>
				It looks like the coupon you tried to use has expired. We’re sorry for the inconvenience!
			</p>
			<button className='block mx-auto font-medium rounded-[11px] bg-[#3A643B] text-white px-4 py-2 text-[20px]'>Browse Current Coupons</button>

		</div>
	)
}


function InvalidCoupon() {
	return (
		<div className='w-[337px] bg-white px-4 py-10 border font-nunito rounded-2xl'>
			<div className='flex justify-center mb-6'>
				<div className='relative pt-2'>
					<img
						className='absolute top-1'
						src='/appointments/exclamation.png'
						alt='Exclamation'
					/>
					<img
						src='/appointments/trees.png' alt='Leaf'
					/>
				</div>
			</div>
			<p className='font-extrabold text-center mb-4 text-[#BC0000]'>
				Oops! this coupon doesn&#39;t meet the criteria
			</p>
			<p className='font-medium text-center mb-8 text-xs text-[#7D7878]'>
				It looks like this Consultation doesn&#39;t match the coupon criteria.
				Make sure to check the terms and conditions, and try another code if you have one.
			</p>
			<button className='block mx-auto font-medium rounded-[11px] bg-[#3A643B] text-white px-4 py-[10px]  text-[20px]'>
				Browse Other Coupons
			</button>

		</div>
	)

}

export default AppointmentBookingForm;