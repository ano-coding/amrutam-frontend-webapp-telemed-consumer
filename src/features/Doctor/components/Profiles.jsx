import { useSearchParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import ProfileCard from "./ProfileCard";
import { fetchFilteredDoctors } from "../../../services/Doctor";
// import { DoctorContext } from '../../Appointments/DoctorContext';

// import { Bars } from "react-loader-spinner";

// const doctorList = {

// 	doctors: [
// 		{
// 			video_charge: 800,
// 			chat_charge: 0,
// 			first_name: 'Prerna',
// 			last_name: 'Narang',
// 			image: '/prerna1.png',
// 			languages: ['English', 'Hindi', 'Marathi'],
// 			rating: 4.5,
// 			speciality: 'Male-Female Infertility',
// 			title: 'Dr',
// 			years_of_experience: 7,
// 		},
// 		{
// 			video_charge: 800,
// 			chat_charge: 0,
// 			first_name: 'Prerna',
// 			last_name: 'Narang',
// 			image: '/prerna2.png',
// 			languages: ['English', 'Hindi', 'Marathi'],
// 			rating: 4.5,
// 			speciality: 'Male-Female Infertility',
// 			title: 'Dr',
// 			years_of_experience: 7,
// 		},
// 		{
// 			video_charge: 800,
// 			chat_charge: 0,
// 			first_name: 'Prerna',
// 			last_name: 'Narang',
// 			image: '/prerna3.png',
// 			languages: ['English', 'Hindi', 'Marathi'],
// 			rating: 4.5,
// 			speciality: 'Male-Female Infertility',
// 			title: 'Dr',
// 			years_of_experience: 7,
// 		},
// 	],
// 	total: 3

// }


function Profiles() {
	const [searchParams] = useSearchParams();
	const location = searchParams.get("location");
	// const name = searchParams.get("name");
	const gender = searchParams.get("gender");
	const specialities = searchParams.get("specialities");
	const language = searchParams.get("languages");
	const fees = searchParams.get("fees");


	let minVideoCharge = null;
	let minChatCharge = null;
	let maxChatCharge = null;
	let maxVideoCharge = null;

	if (fees) {
		const [minFees, maxFees] = fees.split("-");

		minChatCharge = +minFees;
		minVideoCharge = +minFees;
		maxChatCharge = +maxFees;
		maxVideoCharge = +maxFees;
	}


	const filters = { gender, language, location, minChatCharge, minVideoCharge, maxChatCharge, maxVideoCharge, specialities }

	const { data: doctors, isLoading } = useQuery({
		queryFn: () => fetchFilteredDoctors(filters),
		queryKey: ['doctors', gender, language, location, fees, specialities],
	});


	if (isLoading) {
		return <div>...Loading</div>
	}

// 	return (
// 		<div className="mt-10 flex w-full items-center justify-center">
// 			<Bars
// 				height="80"
// 				width="80"
// 				color="#3a643b"
// 				ariaLabel="bars-loading"
// 				visible={true}
// 			/>
// 		</div>
// 	);
// }

// if (isError)
// 	return (
// 		<div className="flex w-full items-center justify-center">
// 			<h1 className=" font-dinpro-bold text-xl">
// 				⚠️ Something Went Wrong! Please Try Again.
// 			</h1>
// 		</div>
// 	);

return (
	<div className="my-8 w-full">
		{/* <DoctorContext> */}
			{
				doctors.map(doctor => <ProfileCard key={doctor._id} doctor={doctor} />)
			}
		{/* </DoctorContext> */}
	</div>
);
}

export default Profiles;
