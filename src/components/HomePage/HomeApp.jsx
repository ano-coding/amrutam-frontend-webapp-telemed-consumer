
function HomeApp() {
	return ( 
		<div className="bg-[#FFF7E2] py-12 px-8 lg:px-20 lg:flex items-center justify-center gap-4">
			<div className='space-y-8'>
				<h3 className="text-[#3A643B] leading-none text-center lg:text-left font-robo text-[32px] lg:text-[48px] font-bold">Amrutam Home App</h3>
				<p className="text-[#676767] mx-auto lg:mx-0 text-[14px] lg:text-[16px] max-w-[450px]">
					The Amrutam Home App is your one-stop app for all things Ayurveda!
					Apart from mimicking the significant characteristics of our website,
					this app offers a wide range of additional features.
				</p>
				<img className="lg:hidden mx-auto" src='/images/mobile-small.png' alt='mobile' />
				<p className="text-[20px] lg:text-[32px] max-w-[400px] lg:max-w-[800px]  font-medium mx-auto lg:mx-0 text-center lg:text-left">Get a diet & lifestyle consultation with ayurvedic experts across the globe </p>
				<p className="font-bold text-[36px] text-center lg:text-left font-robo ">Get the App now</p>
				<div className='flex flex-col lg:flex-row items-center gap-4'>
					<img className='cursor-pointer' src='/images/playstore.png' alt='play store' />
					<img className='cursor-pointer' src='/images/appstore.png' alt='app store' />
				</div>				
			</div>

			
			<div className='hidden lg:block'>
				<img className='object-cover' src='/images/mobile-large.png' alt='mobile' />
			</div>
		</div>

	);
}


export default HomeApp;