import axios from 'axios';
import FormData from 'form-data';
 


export async function fetchDoctorCoupons(appointmentType, amount, doctorId) {
	let data = JSON.stringify({
		"appointmentType": "chat",
		"amount": 50,
		"doctor": "65eac0a7cd28590235ad12d0"
	});

	let config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: 'https://amrutam-dev-backend.azurewebsites.net/api/v1/patient/appointments/coupon/doctor/findCoupons',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzQ2NTE5NDUyMDgyOSwiaWF0IjoxNzIwMTY1Nzk5LCJleHAiOjE3Mjc5NDE3OTl9.MfO4C3Jwwgdmg4SimpZLhfityZBdZVzqJG0OPnJgEFQ'
		},
		data: data
	};


	try {
		const res = await axios.request(config);
		console.log('coupons ', res.data.data);
		return res.data.data;
	} catch (e) {
		console.log(e);
	}
}

export async function fetchSingleCouponStatus(couponCode, amount, appointmentType, doctorId ) {
	// If no coupon is selected

	// console.log('coupon code ', couponCode);

	if (!couponCode) {
		console.log('No coupon code entered!')
		return {
			noCouponCode: true
		}
	}


	let data = JSON.stringify({
		"couponCode": couponCode,
		"amount": 50,
		"appointmentType": "chat",
		"doctor": "65eac0a7cd28590235ad12d0"
	});

	let config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: 'https://amrutam-dev-backend.azurewebsites.net/api/v1/patient/appointments/coupon/doctor/findSingleCoupon',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzQ2NTE5NDUyMDgyOSwiaWF0IjoxNzIwMTY1Nzk5LCJleHAiOjE3Mjc5NDE3OTl9.MfO4C3Jwwgdmg4SimpZLhfityZBdZVzqJG0OPnJgEFQ'
		},
		data: data
	};

	try {
		const res = await axios.request(config);
		const couponStatus = res.data;

		console.log('coupon data ', couponStatus);

		return couponStatus;
	} catch (e) {
		console.log(e);
		return e.response.data;
	}

}


// export async function uploadFile(file) {
// 	console.log('file ', file);

// 	if (!file) {
// 		console.log('please select a file');
// 		return ;
// 	}

// 	let data = new FormData();
// 	data.append('file', file);


// 	let config = {
// 		method: 'post',
// 		maxBodyLength: Infinity,
// 		url: 'https://amrutam-dev-backend.azurewebsites.net/api/v1/patient/utils/upload/s3',
// 		headers: {
// 			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzQ2NTE5NDUyMDgyOSwiaWF0IjoxNzIwMTY1Nzk5LCJleHAiOjE3Mjc5NDE3OTl9.MfO4C3Jwwgdmg4SimpZLhfityZBdZVzqJG0OPnJgEFQ',
// 			...data.getHeaders()
// 		},
// 		data: data
// 	};

// 	try {
// 		const res = await axios.request(config);

// 		console.log('res ', res);

// 	} catch (e) {
// 		console.log(e);
// 		return e;
// 	}
// }


export async function uploadFile(file) {
	if (!file) {
		return {};
	}

	const formData = new FormData();
	formData.append('file', file);

	try {
		const myHeaders = new Headers();
		myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzQ2NTE5NDUyMDgyOSwiaWF0IjoxNzIwNTE4MjAyLCJleHAiOjE3MjgyOTQyMDJ9.d4fH9Krn4Fi_ALT-OY2u7eASLZtXCLxTd8Zsb1UsGXA");

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: formData,
			redirect: "follow"
		};

		const response = await fetch('https://amrutam-dev-backend.azurewebsites.net/api/v1/patient/utils/upload/s3', requestOptions);

		if (!response.ok) {
			throw new Error('Upload failed');
		}

		const result = await response.json();


		return result;
		//see the results object for url of uploaded file
	} catch (error) {
		console.error('Error uploading file:', error);
		return error;
	}

}


export async function bookAppointment(doctorId, appointmentDetails) {	
	let data = JSON.stringify({
		"sleepPattern": "Once a day",
		"attachments": [
			"https://www.google.com"
		],
		"symptoms": {
			"concern": "Headache",
			"description": "Pains at night",
			"severity": "Very bad",
			"duration": "2 weeks"
		},
		"patientId": "666a8ad38b46507633759035",
		"source": "app-android",
		"fromTiming": "03:20 PM",
		"requestedDate": "2024-07-29",
		"appointmentType": "chat",
		"bookedBy": "admin"
	});

	// let data = JSON.stringify(appointmentDetails);

	// console.log('appointmentDetails ', appointmentDetails);

	let config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: `https://amrutam-dev-backend.azurewebsites.net/api/v1/patient/appointments/664c9cdb82f45439bf5e4ff5/book-appointment`,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzQ2NTE5NDUyMDgyOSwiaWF0IjoxNzIwMTY1Nzk5LCJleHAiOjE3Mjc5NDE3OTl9.MfO4C3Jwwgdmg4SimpZLhfityZBdZVzqJG0OPnJgEFQ'
		},
		data: data
	};

	try {
		const res = await axios.request(config);

		const data = res.data.data.data;

		console.log('Data in bookAppointment ', data);

		return data;
	} catch (e) {
		console.log(e);
		return e;
	}
}


// async function createRazorPayOrder(record) {
// 	let data = JSON.stringify({
// 		"amount": record.slotBooked.amount,
// 		"notes": {
// 			"note": "Payment for consultation"
// 		},
// 		"id": record._id
// 	});

// 	let config = {
// 		method: 'post',
// 		maxBodyLength: Infinity,
// 		url: 'https://amrutam-dev-backend.azurewebsites.net/api/v1/patient/appointments/create-razorpay-order',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzQ2NTE5NDUyMDgyOSwiaWF0IjoxNzIwMTY1Nzk5LCJleHAiOjE3Mjc5NDE3OTl9.MfO4C3Jwwgdmg4SimpZLhfityZBdZVzqJG0OPnJgEFQ'
// 		},
// 		data: data
// 	};

// 	try {
// 		const res = await axios.request(config);

// 		console.log('data in createRazorpayOrder ', res);

// 		return res;
// 	} catch (e) {
// 		console.log(e);

// 		return e;
// 	}
// }


export async function markAppointmentAsPaid(appointmentId) {
	let data = '';

	let config = {
		method: 'post',
		maxBodyLength: Infinity,
		// url: 'https://amrutam-dev-backend.azurewebsites.net/api/v1/patient/appointments/659146c48417a0c563b4718d/markPaid',
		url: `https://amrutam-dev-backend.azurewebsites.net/api/v1/patient/appointments/${appointmentId}/markPaid`,
		headers: {
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzIwNTkwODQxNDcxNywiaWF0IjoxNzE4MTkyOTEyLCJleHAiOjE3MjU5Njg5MTJ9.tRK8eAF2AOh_GHNNzvMHR_6vqoa_Pf8kc7ylbg6b3C8'
		},
		data: data
	};

	try {
		const res = await axios.request(config);

		console.log('result in mark apppointment paid ', res);
		return res;
	} catch (e) {
		console.log(e);
		return e;
	}
}







