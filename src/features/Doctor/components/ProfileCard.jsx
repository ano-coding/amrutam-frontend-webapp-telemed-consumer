import { Link, useLocation } from "react-router-dom";
import { processNames } from "../../../services/Doctor";
// import { useDoctor } from "../useDoctor.js";

function ProfileCard({ doctor }) {
	// const { doctor: doc, setDoctor } = useDoctor();
	const location = useLocation();

	const {
		firstname,
		lastname,
		photo,
		lang,
		averageRating,
		specialities,
		experience,
		charges
	} = doctor;

	const videoCharge = charges?.video.consult[0]?.amount;
	const chatCharge = charges?.chat.consult[0]?.amount;
	const doctorId = charges?.doctor;



	const [firstName, lastName] = processNames(firstname, lastname);


	return (
		<div className="w-[80%] mx-auto border-b-2 border-[#E5E5E5] py-8">
			<div className="font-nunito relative pt-4 mb-2 box-border shrink-0  flex items-start justify-center lg:justify-start flex-wrap gap-6 overflow-hidden  rounded-3xl px-7 pb-6 hover:shadow-[0px_4px_12.5px_rgba(0,_0,_0,_0.07)] duration-300 hover:border-slate-500">

				<div className="relative">
					<div className='w-[250px] h-[250px] sm:w-[185px] sm:h-[185px] rounded-xl overflow-hidden'>
						<img
							className="w-full h-full object-cover"
							alt="Doctor photo"
							src={photo}
						/>
					</div>

					<button className="absolute top-2 left-2 z-10 h-[25px] flex items-center gap-1 cursor-pointer rounded-2xl bg-[transparent] px-2 [background:linear-gradient(180deg,_#0b0b0b,_rgba(11,_11,_11,_0.79))] [border:none]">
						<div className="min-w-[22px] font-dinpro font-bold text-base leading-[18px] text-white">
							{Math.round(averageRating * 10) / 10}
						</div>

						<img
							className="h-5 w-5 shrink-0 overflow-hidden"
							alt="star logo"
							src="/materialsymbolsstar.svg"
						/>
					</button>
				</div>

				<div className="space-y-2">
					<h1 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-[24px] sm:text-[28px] font-bold leading-tight  text-darkslategray-300">
						{`Dr. ${firstName} ${lastName}`}
					</h1>
					<div className="flex items-center gap-[15px]">
						<img
							className="h-4 w-4 shrink-0 overflow-hidden"
							loading="lazy"
							alt="speciality"
							src="/frame.svg"
						/>
						<div className="text-base leading-[20px] text-dimgray-100">
							{specialities.length > 0 ? specialities[0].name : 'General Practitioner'}
							{/* Family Physician */}
						</div>
					</div>
					<div className="flex items-center gap-[7px]">
						<img
							className="h-6 w-6 shrink-0 overflow-hidden"
							alt="experience"
							src="/hat.svg"
						/>
						<div className="text-base font-semibold leading-[20px] text-dimgray-100">
							{experience > 0 ? `${experience} years of Experience` : 'Recently Licensed'}

							{/* 
								Newly Qualified
								Recent Graduate
								Recently Licensed
								Fresh Graduate
								New Practitioner
								Early Career
								Newly Certified
							 */}
						</div>
					</div>
					<div className="flex  items-center  gap-[12px] self-stretch">
						<img
							className=" h-4 w-[18px] object-cover"
							loading="lazy"
							alt="languages"
							src="/comment-1@2x.png"
						/>
						<div className="text-base leading-[20px]  text-dimgray-200">
							Speaks:{" "}
							{lang.length > 0 ? lang.join(", ") : "English"}
						</div>
					</div>

					<div className="flex items-center flex-wrap justify-center gap-[8px] self-stretch py-0">
						<div className="box-border flex  min-w-fit flex-1 flex-col items-center  gap-[4px] rounded-lg border border-[#E3E3E3]  px-[7px] pb-[3px] pt-1.5">
							<span className="whitespace-nowrap  text-sm font-semibold leading-[20px]  text-darkslategray-200">
								Video Consultation
							</span>
							<b className=" whitespace-nowrap  text-sm leading-[20px]  text-darkolivegreen-200">
								{`₹${videoCharge}`}
							</b>
						</div>
						<div className="box-border flex min-w-fit flex-1 flex-col items-center  gap-[4px] rounded-lg border border-[#E3E3E3]  px-[7px] pb-[3px] pt-1.5">
							<span className="  text-sm font-semibold leading-[20px]  text-darkslategray-200">
								Chat Consultation
							</span>
							<b className=" whitespace-nowrap  text-sm leading-[20px]  text-darkolivegreen-200">
								{chatCharge === 0 ? "Free" : `₹${chatCharge}`}
							</b>
						</div>
					</div>
				</div>

				<div className="xl:ml-auto space-y-2">
					<p className="font-nunito text-[#7C7C7C] font-semibold">Next available slot:</p>
					<div className="flex items-center gap-2 pb-2">
						<img src='/calendar.png' alt='Calendar' />
						<p className="text-[#3A643B] text-[14px] font-semibold">Wed 28th Feb, 9:30 AM</p>
					</div>
					<Link
						to={`/profile/${doctorId}`}
						className="block w-[250px] py-4 cursor-pointer   rounded-lg border border-darkolivegreen-200   bg-white text-center   text-base font-semibold leading-[20px]  text-darkolivegreen-200 duration-100  hover:bg-whitesmoke-100    active:scale-95"
					>
						View Profile
					</Link>

					<Link
						to={`/appointment/${doctor._id}`}
						state={{ from: location }}
						className="block w-[250px] py-4  cursor-pointer  rounded-lg  bg-darkolivegreen-200  text-center text-base  font-semibold leading-[20px] text-white  duration-100 hover:bg-seagreen  active:scale-95"
					>
						Book a consultation
					</Link>
				</div>
			</div>
		</div>

	);
}

export default ProfileCard;
