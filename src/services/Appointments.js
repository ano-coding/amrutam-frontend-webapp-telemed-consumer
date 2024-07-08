import axios from 'axios';
import fs from 'fs';
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

	console.log('coupon code ', couponCode);

	if (!couponCode) {
		console.log('No coupon code returned!')
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


export async function uploadFile(data) {

	// let data = new FormData();
	// data.append('file', fs.createReadStream('/C:/Users/Jude Apana Yinime/Downloads/Desktop - 75.png'));


	let config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: 'https://amrutam-dev-backend.azurewebsites.net/api/v1/patient/utils/upload/s3',
		headers: {
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzQ2NTE5NDUyMDgyOSwiaWF0IjoxNzIwMTY1Nzk5LCJleHAiOjE3Mjc5NDE3OTl9.MfO4C3Jwwgdmg4SimpZLhfityZBdZVzqJG0OPnJgEFQ',
			...data.getHeaders()
		},
		data: data
	};

	try {
		const res = await axios.request(config);

		console.log('res ', res);

	} catch (e) {
		console.log(e);
		return e;
	}
}