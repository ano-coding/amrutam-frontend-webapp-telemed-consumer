const bookAppointment = async () => {
	// send event to GTM
	sendGTMEvent({
		category: "Booking",
		event: "Appointment Booking Initiated_click",
		action: "Appointment Booking Initiated Click",
		label: "Appointment Booking Initiated Click",
		value: {
			...appointmentInfo,
			patientId,
			coupon: selectedCoupon?.couponCode || "",
			savedAmount: selectedCoupon?.savedAmount || 0,
		},
	});

	const url = ${ config.apiUrl }/patient/appointments / ${ doctorId }/book-appointment;

	const headerConfig = {
		headers: {
			"Content-Type": "application/json",
			Authorization: Bearer ${ token },
},
    };

try {
	const responseData = await axios.post(url,
		{
			...appointmentInfo,
			patientId,
			coupon: selectedCoupon?.couponCode || ""
		}, headerConfig);

	if (responseData?.data?.success) {
		// send event to GTM
		sendGTMEvent({
			category: "Booking",
			event: "Appointment Booked-Unpaid Successfully_click",
			label: "Appointment Booked-Unpaid Successfully Click",
			action: "Appointment Booked-Unpaid Successfully Click",
		});

		toast.success("Congratulations 🎉, Your appointment is booked successfully.", {
			duration: 5000,
			position: 'top-right',
			icon: '🎉',
			style: {
				borderRadius: '10px',
				background: '#333',
				color: '#fff',
			},
		})

		paymentGateway(responseData?.data?.data?.data);
	}
} catch (error) {
	sendGTMEvent({
		event: "Appointment Booking Failed_click",
		category: "Booking",
		action: Appointment Booking Failed Click,
		label: Appointment Booking Failed Click,
		reason: error?.response?.data?.message,
		patient: patientProfile?.data ? patientProfile?.data : "Guest",
	});
	toast.error(error?.response?.data?.message, {
		duration: 5000,
		position: 'top-right',
		icon: '😢',
		style: {
			borderRadius: '10px',
			background: '#333',
			color: '#fff',
		},
	})
}
  };


const paymentGateway = async (record) => {
	const body = {
		amount: record.slotBooked.amount,
		notes: { note: "Payment for consultation" },
		id: record._id,
	};

	try {
		const { data: res } = await createRazorPayOrder({ data: body });

		if (res) {
			const options = {
				key: config.razorPayKey,
				amount: record.slotBooked.amount,
				currency: "INR",
				name: "Amrutam Telemedicine",
				description: "Payment for consultation",
				order_id: res.data.id,
				image:
					"https://amstorage2024.blob.core.windows.net/amrutam-main-storage/1716861497754-310498919_424195159843924_6622146755335909308_n.jpg",
				handler: async function (response) {
					try {
						const { data: markedAppointmentPaidRes } = await markAppointmentAsPaid({
							appointmentId: record?._id,
							data: body,
						});

						if (markedAppointmentPaidRes?.success) {

							setBookingId(record?._id);

							toast({ title: "Payment Successful 🎉" });

							setNavigators(navigators.map((item) => {
								if (item.id === 3) {
									return { ...item, isCompleted: true };
								}
								return item;
							}));

							setCurrentPage('final');

							sendGTMEvent({
								category: "Booking",
								event: "Payment Completed with Booking-Paid_click",
								action: "Payment Completed with Booking-Paid Click",
								label: "Payment Completed with Booking-Paid Click",
								value: {
									paymentSuccessfulData: {
										doctorId: markedAppointmentPaidRes.data.doctor,
										date: markedAppointmentPaidRes.data?.slotBooked?.dateBooked,
										time: markedAppointmentPaidRes.data?.slotBooked?.fromTiming,
										amount: markedAppointmentPaidRes.data?.slotBooked?.amount + " " + markedAppointmentPaidRes.data?.slotBooked?.currency,
										source: "Web",
										bookedBy: "Patient",
										appointmentType: markedAppointmentPaidRes.data?.appointmentType + ", " + markedAppointmentPaidRes.data?.slotBooked?.consultDuration + " min",
										concern: markedAppointmentPaidRes.data?.symptoms[0]?.concern,
										description: markedAppointmentPaidRes.data?.symptoms[0]?.description,
										severity: markedAppointmentPaidRes.data?.symptoms[0]?.severity,
										duration: markedAppointmentPaidRes.data?.symptoms[0]?.duration,
										sleepPattern: markedAppointmentPaidRes.data?.symptoms[0]?.sleepPattern,
										appointmentStatus: markedAppointmentPaidRes?.data?.bookingStatus,
										createdAt: markedAppointmentPaidRes.data?.createdAt,
										totalFee: selectedCoupon?.totalFee,
										savedAmount: selectedCoupon?.savedAmount || 0,
										couponCode: selectedCoupon?.couponCode || "NA",
									},
								},
							});
						} else {
							handlePaymentFailure(res.id, record, "Payment not marked Paid. Please contact with internal team with the screenshot", "Marking_paid_step", "Marked_Unpaid");
						}
					} catch (error) {
						handlePaymentFailure(res.id, record, "An error occurred during payment marking", "Marking_paid_step", "Error");
					}
				},
				prefill: {
					name: patientProfile?.data?.first_name + " " + patientProfile?.data?.last_name,
					email: patientProfile?.data?.email,
					contact: patientProfile?.data?.phone,
				},
				notes: {
					address: "Razorpay Corporate Office",
				},
				theme: {
					color: "#F37254",
				},
			};

			const rzp = new Razorpay(options);
			rzp.open();

			rzp.on("payment.failed", function (response) {
				toast({
					title: "Payment Failed 😔",
					description: "Please try again",
					variant: "destructive",
				});

				handlePaymentFailure(res.id, record, response.error.description, response.error.step, response.error.reason, response.error.metadata.payment_id);
			});
		}
	} catch (error) {
		console.error("Error creating RazorPay order:", error);
	}
};



const handlePaymentFailure = (orderId, record, description, step, reason, paymentId = "NA") => {
	router.push(/payment-failure?description=${description}&source=Web&step=${step}&reason=${reason}&orderId=${orderId}&paymentId=${paymentId}&date=${record?.slotBooked?.dateBooked}&time=${record?.slotBooked?.fromTiming}&createdAt=${record?.createdAt}&doctorId=${record.doctor}&appointmentType=${record?.appointmentType + ", " + record?.slotBooked?.consultDuration + " min"}&amount=${record?.slotBooked?.amount + " " + record?.slotBooked?.currency});

	sendGTMEvent({
		category: "Booking",
		event: "Payment failed_click",
		label: "Payment failed Click",
		action: "Payment failed Click",
		value: {
			paymentFailedData: {
				description,
				source: "Web",
				step,
				reason,
				orderId,
				paymentId,
				date: record?.slotBooked?.dateBooked,
				time: record?.slotBooked?.fromTiming,
				createdAt: record?.createdAt,
				doctorId: record.doctor,
				appointmentType: record?.appointmentType + ", " + record?.slotBooked?.consultDuration + " min",
				amount: record?.slotBooked?.amount + " " + record?.slotBooked?.currency,
				totalFee: selectedCoupon?.totalFee,
				savedAmount: selectedCoupon?.savedAmount || 0,
				couponCode: selectedCoupon?.couponCode || "NA",
			},
		},
	});
};