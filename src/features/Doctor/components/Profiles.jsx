import { useSearchParams } from "react-router-dom";
// import { useDoctorListQuery } from "../services/api";
import ProfileCard from "./ProfileCard";
// import { Bars } from "react-loader-spinner";

const doctorList = {
	
	doctors: [
		{
			video_charge: 800,
			chat_charge: 0,
			first_name: 'Prerna',
			last_name: 'Narang',
			image: '/prerna1.png',
			languages: ['English', 'Hindi', 'Marathi'],
			rating: 4.5,
			speciality: 'Male-Female Infertility',
			title: 'Dr',
			years_of_experience: 7,
		},
		{
			video_charge: 800,
			chat_charge: 0,
			first_name: 'Prerna',
			last_name: 'Narang',
			image: '/prerna2.png',
			languages: ['English', 'Hindi', 'Marathi'],
			rating: 4.5,
			speciality: 'Male-Female Infertility',
			title: 'Dr',
			years_of_experience: 7,
		},
		{
			video_charge: 800,
			chat_charge: 0,
			first_name: 'Prerna',
			last_name: 'Narang',
			image: '/prerna3.png',
			languages: ['English', 'Hindi', 'Marathi'],
			rating: 4.5,
			speciality: 'Male-Female Infertility',
			title: 'Dr',
			years_of_experience: 7,
		},	
	],
	total: 3
	
}
	




function Profiles () {
  const [searchParams] = useSearchParams();
  const location = searchParams.get("location");
  const name = searchParams.get("name");
  const gender = searchParams.get("gender");
  const speciality = searchParams.get("speciality");
  const languages = searchParams.get("languages");
 

 /*  if (isFetching) {
    return (
      <div className="mt-10 flex w-full items-center justify-center">
        <Bars
          height="80"
          width="80"
          color="#3a643b"
          ariaLabel="bars-loading"
          visible={true}
        />
      </div>
    );
  }

  if (isError)
    return (
      <div className="flex w-full items-center justify-center">
        <h1 className=" font-dinpro-bold text-xl">
          ⚠️ Something Went Wrong! Please Try Again.
        </h1>
      </div>
    ); */

    return (
      <div className="my-8 w-full">
        <div className="">
          {!doctorList.total ? (
            <h1 className=" font-dinpro-bold text-xl">No Doctors Found!</h1>
          ) : (
            doctorList.doctors.map(
              (doctor, i ) => <ProfileCard key={i} doctor={doctor} />,
            )
          )}
        </div>
      </div>
    );
}

export default Profiles;
