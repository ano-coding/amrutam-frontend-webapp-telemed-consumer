import axios from 'axios';


// Theses constants are used in the ProfileDetails component


export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const FULL_MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];


// Functions to fetch data from an api start with fetch


export async function fetchFilteredDoctors(filters) {
	let queryString = '';

	for (let key in filters) {
		if (filters[key] !== null) {
			queryString += `${key}=${filters[key]}&`;
		}
	}


	console.log('querystring ', queryString);

	const config = {
		method: 'get',
		maxBodyLength: Infinity,
		url: 'https://amrutam-dev-backend.azurewebsites.net/api/v1/patient/doctors/all?' + queryString,
		headers: {
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzIwNTkwODQxNDcxNywiaWF0IjoxNzE4MTkyOTEyLCJleHAiOjE3MjU5Njg5MTJ9.tRK8eAF2AOh_GHNNzvMHR_6vqoa_Pf8kc7ylbg6b3C8'
		}
	};

	try {
		const response = await axios.request(config);
		// console.log('Response using axios', response.data);

		// For pagination
		// {
		// 	const data = response.data.data;

		// 	const {
		// 		currentPage,
		// 		totalPages,
		// 		doctors,
		// 		limit: doctorsPerPage,
		// 		totalDocs: totalDoctors
		// 	} = data;

		// 	console.log('currentPage ', currentPage)
		// 	console.log('totalPages ', totalPages)
		// 	console.log('doctors ', doctors)
		// 	console.log('doctorsPerPage ', doctorsPerPage)
		// 	console.log('totalDoctors ', totalDoctors)

		// }

		const doctors = response.data.data.doctors;

		console.log('doctors ', doctors);

		return doctors;
	} catch (e) {
		console.log(e);
	}
} 


export async function fetchSingleDoctor(doctorId) {
	let config = {
		method: 'get',
		maxBodyLength: Infinity,
		url: 'https://amrutam-dev-backend.azurewebsites.net/api/v1/patient/doctors/profile/' + doctorId,
		headers: {}
	};


	try {
		const res = await axios.request(config);
		const doctorDetails = res.data.data;

		return doctorDetails;
	} catch (e) {
		console.log(e);
	}
}


export async function fetchSingleDoctorConcerns(doctorId) {
	let config = {
		method: 'get',
		maxBodyLength: Infinity,
		url: 'https://amrutam-dev-backend.azurewebsites.net/api/v1/patient/doctors/concerns/' + doctorId,
		headers: {}
	};

	try {
		const res = await axios.request(config);
		const concerns = res.data.data.concerns;

		return concerns;
	} catch (e) {
		console.log(e);
	}
}

export async function fetchLanguages() {
	let config = {
		method: 'get',
		maxBodyLength: Infinity,
		url: 'https://amrutam-dev-backend.azurewebsites.net/api/v1/language',
		headers: {}
	};

	try {
		const res = await axios.request(config);
		const languages = res.data.data.docs;

		const lang = languages.map(language => ({
			label: language.name,
			value: language.name
		}));

		return lang;

	} catch (e) {
		console.log(e);
	}
}


export async function fetchDateByAppointmentType(appointmentType, doctorId) {
	// Return empty array if impossible values are sent
	if (!appointmentType || !doctorId) {
		console.log('Impossible appointmentType or doctorId');
		console.log('Appointment Type ', appointmentType);
		console.log('Doctor Id ', doctorId);

		return [];
	}
	let data = '';

	let config = {
		method: 'get',
		maxBodyLength: Infinity,
		// url: `https://amrutam-dev-backend.azurewebsites.net/api/v1/patient/appointments/booking/getDatesByAppointmentType?appointmentType=${appointmentType}&doctorId=${doctorId}`,
		url: `https://amrutam-dev-backend.azurewebsites.net/api/v1/patient/appointments/booking/getDatesByAppointmentType?appointmentType=chat&doctorId=667be8fc8afa6a4fdf19afd6`,
		headers: {
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzIwNTkwODQxNDcxNywiaWF0IjoxNzE4MTkyOTEyLCJleHAiOjE3MjU5Njg5MTJ9.tRK8eAF2AOh_GHNNzvMHR_6vqoa_Pf8kc7ylbg6b3C8'
		},
		data: data
	};

	try {
		const res = await axios.request(config);
		const dates = res.data.data;

		const sessions = [];

		for (let date of dates) {
			const slots = await fetchAppointmentsByDate(doctorId, date);

			sessions.push({
				date,
				slots
			});
		}

		console.log('sessions ', sessions);

		console.log('Dates ', dates);

		return dates;
	} catch (e) {
		console.log(e)
	}
}

export async function fetchReviewsOfDoctor(doctorId) {
	let data = {};

	let config = {
		method: 'get',
		maxBodyLength: Infinity,
		url: 'https://amrutam-dev-backend.azurewebsites.net/api/v1/patient/doctors/reviews/65eac0a7cd28590235ad12d0?limit=20',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzIwNTkwODQxNDcxNywiaWF0IjoxNzE4MTkyOTEyLCJleHAiOjE3MjU5Njg5MTJ9.tRK8eAF2AOh_GHNNzvMHR_6vqoa_Pf8kc7ylbg6b3C8'
		},
		data: data
	};

	try {
		const res = await axios.request(config);
		const reviews = res.data.data.review.docs;

		console.log('reviews ', reviews);

		return reviews;
	} catch (e) {
		console.log(e);
	}
}

export async function fetchAllSpecialities() {
	let config = {
		method: 'get',
		maxBodyLength: Infinity,
		url: 'https://amrutam-dev-backend.azurewebsites.net/api/v1/patient/speciality',
		headers: {
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzIwNTkwODQxNDcxNywiaWF0IjoxNzE4MTkyOTEyLCJleHAiOjE3MjU5Njg5MTJ9.tRK8eAF2AOh_GHNNzvMHR_6vqoa_Pf8kc7ylbg6b3C8'
		}
	};

	try {
		const res = await axios.request(config);
		const specialities = res.data.data;


		return specialities;
	} catch (e) {
		console.log(e)
	}
}


export async function fetchAppointmentsByDate(doctorId, date) {
	// Return an empty array if impossible values are received
	if (!doctorId || !date) {
		console.log('Impossible date or doctorId');
		console.log('Date', date);
		console.log('Doctor Id ', doctorId);

		return [];
	}


	let data = JSON.stringify({
		"requestedDate": "2024-04-04"
	});

	let config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: 'https://amrutam-dev-backend.azurewebsites.net/api/v1/patient/appointments/65e962ffcd28590235acfcf7/get-appointment-by-date',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzIwNTkwODQxNDcxNywiaWF0IjoxNzE4MTkyOTEyLCJleHAiOjE3MjU5Njg5MTJ9.tRK8eAF2AOh_GHNNzvMHR_6vqoa_Pf8kc7ylbg6b3C8'
		},
		data: data
	};

	try {
		const res = await axios.request(config);
		const slots = res.data.data[0].slots;

		console.log('slots ', slots);

		return slots;
	} catch (e) {
		console.log(e);
	}
}














// Helper functions to process the data from the api into required format

export function processSpecialities(specialities) {
	const filteredSpecialities = [];

	for (let item of specialities) {

		filteredSpecialities.push({
			value: item._id,
			label: extractSpeciality(item.name)
		});
	}

	return filteredSpecialities;
}


export function processNames(firstname, lastname) {
	let firstName = '';

	if (firstname.slice(0, 3) === 'Dr.') {
		firstName = firstname.slice(3);
	} else if (firstname.slice(0, 2) === 'Dr') {
		firstName = firstname.slice(2);
	} else {
		firstName = firstname;
	}

	firstName = firstName.trim();

	firstName = firstName[0].toUpperCase() + firstName.slice(1).toLowerCase();

	const lastName = lastname[0].toUpperCase() + lastname.slice(1).toLowerCase();

	return [firstName, lastName]
}

export function extractSpeciality(s){
	const firstIndex = s.indexOf('(');
	const lastIndex = s.indexOf(')');

	return s.slice(firstIndex + 1, lastIndex);
}


export function extractSessions(charges) {
	const sessions = []

	for (let key in charges) {
		if (charges[key] && typeof charges[key] === 'object') {

			const session = {};

			session.type = key;
			session.slots = charges[key].consult;

			sessions.push(session);
		}
	}

	return sessions;
}


export function calculateTotalExperience(experiences) {
	const currentYear = new Date().getFullYear();

	const fromYears = experiences.map(expreience => expreience.fromDate.split("-")[0]);
	const toYears = experiences.map(expreience => expreience.toDate.split("-")[0]);
	const firstYear = fromYears.reduce((leastYear, currentYear) => currentYear < leastYear ? currentYear : leastYear, currentYear);
	const lastYear = toYears.reduce((leastYear, currentYear) => currentYear > leastYear ? currentYear : leastYear, firstYear);

	return lastYear - firstYear;
}


export function getFilteredReviews(reviews) {
	const filteredReviews = reviews.filter(review => {
		return review.patient && review.reason && review.title;
	})

	return filteredReviews;
}

