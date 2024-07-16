import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { fetchSingleCouponStatus, bookAppointment, markAppointmentAsPaid } from '../../../services/Appointments';
import Modal from './Modal.jsx';
import { Helmet } from 'react-helmet';
import { fetchSingleDoctor, processNames } from '../../../services/Doctor';
import arrowR from '../../../assets/appointments/arrow-r.svg';


import Lottie from 'lottie-react';
import Confetti from '../../../assets/appointments/confetti.json';


function Payment({ setStep, appointmentDetails, setAppointmentDetails, showCouponModal, previousCoupon }) {
	const [show, setShow] = useState(true);
	const { doctorId } = useParams();
	const { coupon, appointmentFee, appointmentType } = appointmentDetails;
	let couponStatus = 'Not Applied';

	console.log('appointmentDetails ', appointmentDetails)


	async function handleClick() {
		const requiredAppointmentDetails = {
			...appointmentDetails,
			symptoms: {
				...appointmentDetails.symptoms,
				duration: appointmentDetails.symptoms.duration + ' ' + appointmentDetails.symptoms.timeUnit
			}
		}

		if (requiredAppointmentDetails.coupon && couponStatus !== 'Success') {
			console.log('coupon status ', couponStatus)
			requiredAppointmentDetails.coupon = null;
		}

		const record = await bookAppointment(doctorId, requiredAppointmentDetails);

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

								setStep(4);
								setAppointmentDetails({
									...appointmentDetails,
									appointmentId: markedAppointmentPaidRes.data.id
								})

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
		queryFn: () => fetchSingleCouponStatus(coupon, appointmentFee, appointmentType, doctorId),
		queryKey: ['coupon', coupon]
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

	console.log('coupon data ', data);


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

	// console.log('showCouponModal ', showCouponModal.current);
	// console.log('coupon Status ', couponStatus);


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
				<AppliedCouponDetails
					data={data}
					setStep={setStep}
				/>
			) : (
				<SearchCoupons
					setStep={setStep}
					setShow={setShow}
					appointmentDetails={appointmentDetails}
					setAppointmentDetails={setAppointmentDetails}
				/>
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

			{couponStatus === 'Unsuccess' && showCouponModal.current && (
				<Modal show={show} setShow={setShow}>
					{data.data.message === 'Coupon is expired' ? (
						<ExpiredCoupon
							appointmentDetails={appointmentDetails}
							setAppointmentDetails={setAppointmentDetails}
						/>
					) : <InvalidCoupon
						appointmentDetails={appointmentDetails}
						setAppointmentDetails={setAppointmentDetails}
					/>}
				</Modal>
			)}

			{couponStatus === 'Success' && showCouponModal.current && (
				<Modal show={show} setShow={setShow}>
					<CouponAppliedCard
						data={data}
						consultationType={appointmentDetails.appointmentType}
						appointmentDetails={appointmentDetails}
						setAppointmentDetails={setAppointmentDetails}
					/>
				</Modal>
			)}

		</div>

	)
}

function CouponAppliedCard({ data, consultationType, appointmentDetails, setAppointmentDetails }) {
	const discount = data.data.discount;


	useEffect(() => {
		setAppointmentDetails({
			...appointmentDetails,
			coupon: data.data.couponCode
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data.data.couponCode])

	return (
		<div className='relative p-10 bg-white flex flex-col justify-center space-y-6 rounded-2xl font-nunito border max-w-[350px] mx-auto'>
			<div className=''>
				<img
					className='mx-auto'
					src='/appointments/leaves.png'
					alt='Leaves'
				/>
				<p className='text-center text-[24px] text-[#28643B] font-extrabold'>
					{discount.amount}{discount.type === 'PERCENTAGE' ? '%' : discount.type.currency} OFF
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


function ExpiredCoupon({ appointmentDetails, setAppointmentDetails }) {
	// setting coupon to null when it is expired 
	// useEffect(() => {
	// 	return () => {
	// 		setAppointmentDetails({
	// 			...appointmentDetails,
	// 			coupon: null
	// 		})
	// 	}

	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [])

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


function InvalidCoupon({ appointmentDetails, setAppointmentDetails }) {
	// setting coupon to null when the applied coupon is invalid
	// useEffect(() => {
	// 	return () => {
	// 		setAppointmentDetails({
	// 			...appointmentDetails,
	// 			coupon: null
	// 		})
	// 	}
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [])

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

function SearchCoupons({ setStep, setShow, appointmentDetails, setAppointmentDetails }) {
	const [couponId, setCouponId] = useState('');

	// useEffect(() => {
	// 	setAppointmentDetails({
	// 		...appointmentDetails,
	// 		coupon: null
	// 	})
	// }, [])

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
					setAppointmentDetails({
						...appointmentDetails,
						coupon: couponId
					})
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


export default Payment;