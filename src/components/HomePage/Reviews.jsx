import { useQuery } from "@tanstack/react-query";
import { fetchFeaturedReviews } from "../../services/LandingPage";

// const feedbacks = [
// 	{
// 		consultedFor: 'Skin',
// 		patientDetails: {
// 			name: 'Sophie Moore',
// 			city: 'Chennai',
// 		},
// 		date: '17/02/24',
// 		rating: 5,
// 		title: '“One of a kind service”',
// 		text: 'Ultrices eros in cursus turpis massa tincidunt sem nulla pharetra diam sit amet nisl suscipit adipis.'
// 	},
// 	{
// 		consultedFor: 'hair',
// 		patientDetails: {
// 			name: 'Sophie Moore',
// 			city: 'Mumbai',
// 		},
// 		date: '17/02/24',
// 		rating: 5,
// 		title: '“One of a kind service”',
// 		text: 'Ultrices eros in cursus turpis massa tincidunt sem nulla pharetra diam sit amet nisl suscipit adipis.'
// 	},
// 	{
// 		consultedFor: 'hair',
// 		patientDetails: {
// 			name: 'Sophie Moore',
// 			city: 'Chennai',
// 		},
// 		date: '17/02/24',
// 		rating: 5,
// 		title: '“One of a kind service”',
// 		text: 'Ultrices eros in cursus turpis massa tincidunt sem nulla pharetra diam sit amet nisl suscipit adipis.'
// 	},
// 	{
// 		consultedFor: 'Skin',
// 		patientDetails: {
// 			name: 'Sophie Moore',
// 			city: 'Chennai',
// 		},
// 		date: '17/02/24',
// 		rating: 5,
// 		title: '“One of a kind service”',
// 		text: 'Ultrices eros in cursus turpis massa tincidunt sem nulla pharetra diam sit amet nisl suscipit adipis.'
// 	},
// 	{
// 		consultedFor: 'hair',
// 		patientDetails: {
// 			name: 'Sophie Moore',
// 			city: 'Mumbai',
// 		},
// 		date: '17/02/24',
// 		rating: 5,
// 		title: '“One of a kind service”',
// 		text: 'Ultrices eros in cursus turpis massa tincidunt sem nulla pharetra diam sit amet nisl suscipit adipis.'
// 	},
// 	{
// 		consultedFor: 'hair',
// 		patientDetails: {
// 			name: 'Sophie Moore',
// 			city: 'Chennai',
// 		},
// 		date: '17/02/24',
// 		rating: 5,
// 		title: '“One of a kind service”',
// 		text: 'Ultrices eros in cursus turpis massa tincidunt sem nulla pharetra diam sit amet nisl suscipit adipis.'
// 	},
// ]


function Reviews() {
	const { data, isLoading } = useQuery({
		queryFn: () => fetchFeaturedReviews(),
		queryKey: ['reviews']
	});

	const reviews = [];

	if (data) {
		for (let review of data) {
			if (review.manualReview) {
				reviews.push(review.manualReview);
			}
		}
	}

		console.log('Reviews', reviews)


	if (isLoading) {
		return <div>... Reviews are loading</div>
	}



	return ( 
		<div className="bg-[#FFF7E2] py-12">
			<div className="flex justify-center mb-12">
				<h3 className="text-[#3A643B]  text-[32px] lg:text-[48px] leading-none sm:border-b-4 border-[#abdcac] px-10 text-center font-bold my-8">
					Stories from our valued customers!
				</h3>

			</div>

	
			<div className="mx-auto max-w-[1230px] px-8 overflow-x-scroll flex gap-8 no-scrollbar">	
				{reviews.map(review => {
					return <Review key={review._id} review={review} />
				})}
				
			</div>

		</div>

	);
}





function Review({review}) {
	return (
		<div className="flex-none w-[304px] h-[390px] lg:w-[388px] lg:h-[371px]  rounded-[20px] bg-white">
			<div className={`bg-[#F5F3FC] font-semibold rounded-t-[20px] h-[55px] flex items-center px-8 lg:text-[18px]`}>
				<p>Consulted for Skin</p>
			</div>

			<div className="flex items-center my-8 px-6 gap-4">
				<div className="w-[50px] h-[50px] rounded-[50%] overflow-hidden border">
					<img src={review.patient.img} alt='User' />
				</div>
				<div>
					<p className="text-[#414141] font-semibold lg:text-[20px]">{review.patient.fullName}</p>
					<p className="text-[15px] font-nexalight  lg:text-[18px]">{review.patient.location}</p>
				</div>
				<div className="text-[12px] lg:text-[16px] self-start mt-1.5 ml-auto">10/10/2010</div>
			</div>

			<div>
				<div className="flex items-center px-8 gap-1">
					
					{
						Array(Math.round(review.review.rating)).fill(undefined).map((_, index) => {
							return (
								<img key={index} src='/images/star.png' alt='star' />
							)
						})
					}
				

				</div>
				<div className="mt-2">
					<h3 className="text-[#333333] text-[20px] lg:text-[22px] font-bold mb-2 font-dm pl-8">{`"${review.review.title}"`}</h3>
					<p className="text-[#555555] font-dm px-4 lg:text-[18px] leading-[30px]">
						{review.review.message}
					</p>
				</div>
			</div>
		</div>
	)
}

export default Reviews;