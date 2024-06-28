import { extractSpeciality, fetchSingleDoctor, fetchSingleDoctorConcerns } from "../../../services/Doctor";
import Banner from "./Banner";
import ProfileDetails from "./ProfileDetails";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { processNames } from "../../../services/Doctor";

const doctor = {
	name: "Dr. Bruce Willis",
	specialization: "Gynecologist",
	about:
		"Hello, I am Dr. Bruce Willis, a Gynaecologist at Sanjivni Hospital in Surat. I love collaborating with all my hospital staff and senior doctors to provide exceptional care to our patients. I completed my graduation in Gynaecology Medicine, where I gained comprehensive knowledge and skills in women's health. I am dedicated to staying updated with the latest advancements in gynaecological care to ensure that my patients receive the best possible treatments. It's a privilege to serve the community and contribute to women's wellness through my practice at Sanjivni Hospital.",
	ratings: 4.2,
	followers: "850",
	following: "18K",
	posts: "250",
	languages: ["English", "Hindi", "Telugu"],
	socials: {
		facebook: "#",
		instagram: "#",
		youtube: "#",
		twitter: "#",
	},
	specializationList: ["Women's Health", "Skin Care", "Immunity", "Hair Care"],
	treatments: [
		"Skin Treatment",
		"Pregnancy",
		"Period Doubts",
		"Endometriosis",
		"Pelvic Pain",
		"Ovarian Cysts",
		"Menopause Management",
		"Fertility Issues",
		"Pap Smear",
		"Vaginal Infections",
		"Contraception Counseling",
	],
	workExperience: {
		years: "7+",
		hospitals: [
			{
				name: "Midtown Medical Clinic",
				role: "Senior doctor",
				years: "2016-PRESENT",
			},
			{
				name: "Midtown Medical Clinic",
				role: "Junior doctor",
				years: "2010-2015",
			},
		],
	},
	featuredReviews: [
		{
			name: "Alicent Hightower",
			picture: "demoprofile.png",
			consultedFor: "Skin care",
			stars: 5,
			description:
				"Might be bit early to confirm but yes I can see noticeable difference in my hairfall. will write again after using it for longer periods",
			date: "25 January 2024",
		},
		{
			name: "Alice Sinek",
			picture: "demoprofile.png",
			consultedFor: "Pregnancy",
			stars: 4,
			description:
				"Might be bit early to confirm but yes I can see noticeable difference in my hairfall. will write again after using it for longer periods",
			date: "20 January 2023",
		},
	],
	sessionMode: [
		{
			type: "In-Clinic",
			time: "45 Mins",
		},
		{
			type: "Video",
			time: "45 Mins",
		},
		{
			type: "Chat",
			time: "10 Mins",
		},
	],
	bookingSlots: [
		{
			part: "Morning",
			timing: [
				"09:00 AM",
				"09:30 AM",
				"10:00 AM",
				"10:15 AM",
				"10:45 AM",
				"11:00 AM",
			],
		},
		{
			part: "evening",
			timing: [
				"04:00 PM",
				"04:15 PM",
				"04:30 PM",
				"04:45 PM",
				"05:00 PM",
				"05:15 PM",
			],
		},
	],
};

function Profile() {
	const { id: doctorId } = useParams();
	const { data, isLoading: doctorLoading } = useQuery({
		queryFn: () => fetchSingleDoctor(doctorId),
		queryKey: ['doctor']
	});

	const { data: concerns, isLoading: concernsLoading } = useQuery({
		queryFn: () => fetchSingleDoctorConcerns(doctorId),
		queryKey: ['concerns']
	})


	if (doctorLoading || concernsLoading) {
		return <div>...Loading</div>
	}



	const Doctor = data.doctor;
	const charges = data.charges;
	const qualifications = data.qualifications;
	const reviews = data.reviews;
	const specialities = data.specialities.map(extractSpeciality);
	const workExperience = data.workExperiences;
	const followers = data.followersCount;
    
	// console.log('Doctor ', Doctor)
	// console.log('qualifications ', qualifications)
	// console.log('reviews ', reviews)
	// console.log('specialities ', specialities)
	// console.log('WorkExperience ', workExperience)

	/* 
		--> No following and posts count
		--> No social media links
		--> No images for specialities
		--> Images are present for concerns [Not needed as per design]
	 */




	const {
		ratings,
		specialization,
		// followers,
		following,
		posts,
		languages,
		socials,
		about,
		specializationList,
		treatments,
		// workExperience,
		featuredReviews,
		sessionMode,
		bookingSlots,
	} = doctor;

	const {
		firstname,
		lastname,
		photo,
		bio,
		lang,
	} = Doctor;

	const {
		averageRating
	} = reviews;
    
	fetchSingleDoctorConcerns(doctorId);

	const [firstName, lastName] = processNames(firstname, lastname);	

	return (
		<main className=" my-16 flex w-full items-center justify-center ">
			<div className="flex w-[85%] flex-col items-center justify-center">
				<Banner
					name={`Dr. ${firstName} ${lastName}`} //
					followers={followers} //
					following={following}
					posts={posts}
					specialization={specialities[0]}
					ratings={averageRating} //
					photo={photo} //
				/>
				<ProfileDetails
					specializationList={specialities} //
					about={bio} //
					languages={lang} //
					socials={socials}
					concerns={concerns} //
					workExperience={workExperience} //
					featuredReviews={featuredReviews}
					charges={charges} //
					bookingSlots={bookingSlots}
				/>
			</div>
		</main>
	);
}

export default Profile;
