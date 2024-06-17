import { Link } from "react-router-dom";

const ProfileCard = ({
	doctor,
}
) => {
	const {
		charges,
		first_name,
		image,
		languages,
		last_name,
		rating,
		speciality,
		title,
		years_of_experience,
		video_charge,
		chat_charge
	} = doctor;

	return (
		<div className="w-[80%] mx-auto border-b-2 border-[#E5E5E5] py-8">
			<div className="font-nunito relative pt-4 mb-2 box-border shrink-0  flex items-start justify-center flex-wrap gap-[32px] overflow-hidden  rounded-3xl px-7 pb-6 hover:shadow-[0px_4px_12.5px_rgba(0,_0,_0,_0.07)] duration-300 hover:border-slate-500">

				<div className="relative">
					<img
						className="object-cover"
						alt=""
						src={image}
					/>
					<button className="absolute top-4 left-4 z-10 flex cursor-pointer  items-start gap-[4px]  overflow-hidden rounded-2xl bg-[transparent] px-3 py-1 [background:linear-gradient(180deg,_#0b0b0b,_rgba(11,_11,_11,_0.79))] [border:none]">
						<div className=" min-w-[22px] pt-0.5  font-dinpro-bold text-base leading-[18px]  text-white">
							{rating}
						</div>

						<img
							className=" h-5 min-h-[20px] w-5 shrink-0 overflow-hidden"
							alt=""
							src="/materialsymbolsstar.svg"
						/>
					</button>
				</div>

				<div className="space-y-2">
					<h1 className=" line-clamp-2 text-[32px] font-bold leading-tight  text-darkslategray-300">
						{`${title} ${first_name} ${last_name}`}
					</h1>
					<div className="flex  items-center  gap-[15px]">
						<img
							className=" h-4 w-4 shrink-0 overflow-hidden"
							loading="lazy"
							alt=""
							src="/frame.svg"
						/>
						<div className="   text-base leading-[20px]  text-dimgray-100">
							{speciality}
						</div>
					</div>
					<div className="flex  items-center  gap-[7px]">
						<img
							className=" h-6 w-6 shrink-0 overflow-hidden"
							alt=""
							src="/hat.svg"
						/>
						<div className="   text-base font-semibold leading-[20px]  text-dimgray-100">
							{`${years_of_experience} years of Experience`}
						</div>
					</div>
					<div className="flex  items-center  gap-[12px] self-stretch">
						<img
							className=" h-4 w-[18px] object-cover"
							loading="lazy"
							alt=""
							src="/comment-1@2x.png"
						/>
						<div className="text-base leading-[20px]  text-dimgray-200">
							Speaks:{" "}
							{languages.length > 0 ? languages.join(", ") : "English"}
						</div>
					</div>

					<div className="flex items-center flex-wrap justify-center gap-[8px] self-stretch py-0">
						<div className="box-border flex  min-w-fit flex-1 flex-col items-center  gap-[4px] rounded-lg border border-[#E3E3E3]  px-[7px] pb-[3px] pt-1.5">
							<span className="whitespace-nowrap  text-sm font-semibold leading-[20px]  text-darkslategray-200">
								Video Consultation
							</span>
							<b className=" whitespace-nowrap  text-sm leading-[20px]  text-darkolivegreen-200">
								{`₹${video_charge}`}
							</b>
						</div>
						<div className="box-border flex min-w-fit flex-1 flex-col items-center  gap-[4px] rounded-lg border border-[#E3E3E3]  px-[7px] pb-[3px] pt-1.5">
							<span className="  text-sm font-semibold leading-[20px]  text-darkslategray-200">
								Chat Consultation
							</span>
							<b className=" whitespace-nowrap  text-sm leading-[20px]  text-darkolivegreen-200">
								{chat_charge === 0 ? "Free" : `₹${chat_charge}`}
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
						to={"/profile"}
						className="block w-[250px] py-4 cursor-pointer   rounded-lg border border-darkolivegreen-200   bg-white text-center   text-base font-semibold leading-[20px]  text-darkolivegreen-200 duration-100  hover:bg-whitesmoke-100    active:scale-95"
					>
						View Profile
					</Link>

					<Link
						to="/appointment-booking"
						className="block w-[250px] py-4  cursor-pointer  rounded-lg  bg-darkolivegreen-200  text-center text-base  font-semibold leading-[20px] text-white  duration-100 hover:bg-seagreen  active:scale-95"
					>
						Book a consultation
					</Link>
				</div>
			</div>
		</div>
		
	);
};

export default ProfileCard;
