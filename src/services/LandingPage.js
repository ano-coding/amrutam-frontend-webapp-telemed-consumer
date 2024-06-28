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