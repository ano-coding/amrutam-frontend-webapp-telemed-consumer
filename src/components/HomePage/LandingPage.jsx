import { Link } from 'react-router-dom';


const listItems = [
	{
		content: 'Convenient online & In-clinic consultations',
		img: '/images/speech-bubble.png'
	},
	{
		content: 'Safe and effective treatment',
		img: '/images/shield.png'
	},
	{
		content: 'Experienced Ayurvedic Practitioners',
		img: '/images/doctor.png'
	},
	{
		content: 'Personalized Treatment Plans & Guidance',
		img: '/images/prescription.png'
	},
]

function LandingPage() {
	return (
		<>
			<div className="w-full h-[640px] sm:h-[700px] relative flex items-center">

				<div className='md:hidden absolute w-full h-full top-0 left-0 -z-10'>
					<img className='object-cover w-full h-full' src='/images/bg1-small.png' alt='Person' />
				</div>

				<div className="hidden md:flex absolute w-full h-full top-0 left-0 -z-10">
					<div className='flex-1  bg-gradient-tor from-[#333333] to-[#411010de] bg-[#5a3535]'></div>
					<div className="flex-1 h-full">
						<img className='w-full h-full object-cover object-center' src='/images/bg1-large.png' alt='Person' />
					</div>
				</div>


				<div className='-z-10 absolute inset-0 bg-gradient-to-b from-[#000000] to-[#2222227A]  sm:bg-gradient-to-r md:from-[#000] md:via-[#000] md:to-[#01010100]' ></div>
				{/* sm:from-[#121212E0]   sm:via-[#121212EB]  sm:to-[#01010100] from-[#181818DE] to-[#2222227A] */}

				<div className='w-full sm:w-[90%] mx-auto text-white px-8 sm:px-0 -mt-[100px]'>
					<div className='lg:w-[90%] max-w-[1000px]'>
						<p className='text-[#FFF7E2] sm:text-[28px] font-nexalight mb-2 sm:mb-4'>Namaste, Welcome to Amrutam </p>
						<div className='mb-2 sm:mb-4'>
							<p className='text-[20px] mb-2 font-bold sm:text-[30px] xl:text-[48px] leading-none'>
								Step into Holistic Healing with <span className='underline cursor-pointer'>Ayurveda</span>
							</p>
							<p className='text-[20px] font-bold sm:text-[30px] xl:text-[48px] leading-normal'>
								Book Consultation with certified Experts.
							</p>
						</div>

						<p className='w-[90%] md:w-[80%] xl:w-[75%] text-[14px] text-[#C9C9C9] font-medium sm:text-[20px] mb-10 sm:mb-16'>
							Dive into the world of ayurveda and Experience Personalized Health Solutions and Holistic Guidance from Trusted Ayurvedic Doctors Anytime, anywhere.
						</p>

						<Link to='/find-doctors' className='inline-block bg-[#3A643B] hover:bg-[#1a301a] rounded-[10px] px-[30px] py-[15px] text-[14px] sm:text-[20px]  font-bold'>BOOK AN APPOINTMENT</Link>

					</div>
				</div>
			</div>
			<div className='bg-[#FFF7E2] md:flex items-center justify-center'>
				{
					listItems.map((item, index) => {
						return (
							<div key={index} className='flex items-center px-2 py-4 gap-2 font-robo'>
								<img src={item.img} alt='logo' />
								<p className='text-[#3A643B] font-bold text-[18px] md:text-[16px] xl:text-[18px] '>{item.content}</p>
							</div>
						)
					})
				}
			</div>
		</>

	);
}

export default LandingPage





