import axios from 'axios';


export async function fetchFeaturedReviews() {
	let config = {
		method: 'get',
		maxBodyLength: Infinity,
		url: 'https://amrutam-dev-backend.azurewebsites.net/api/v1/featuredReview?lastest=true',
		headers: {}
	};

	try {
		const res = await axios.request(config);
		const reviews = res.data.data.reviews;

		return reviews;
	} catch (e) {
		console.log(e)
	}
}


export async function fetchAllConcerns() {
	let config = {
		method: 'get',
		maxBodyLength: Infinity,
		url: 'https://amrutam-dev-backend.azurewebsites.net/api/v1/patient/concerns',
		headers: {
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzIwNTkwODQxNDcxNywiaWF0IjoxNzE4MTkyOTEyLCJleHAiOjE3MjU5Njg5MTJ9.tRK8eAF2AOh_GHNNzvMHR_6vqoa_Pf8kc7ylbg6b3C8'
		}
	};

	try {
		const res = await axios.request(config);
		const concerns = res.data.data;

		return concerns;		
	} catch (e) {
		console.log(e);
	}		
}