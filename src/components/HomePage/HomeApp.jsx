
function HomeApp() {
	return ( 
		<div className="bg-[#FFF7E2] py-12 px-8 lg:px-20 sm:flex items-center justify-center gap-4">
			<div className='flex-1'>
				<h3 className="text-[#3A643B] leading-none mb-2 lg:mb-6 text-center sm:text-left text-[28px] lg:text-[48px] font-bold">Amrutam Home App</h3>
				<p className="text-[#676767] mx-auto lg:mx-0  mb-2 lg:mb-6 text-[14px] lg:text-[16px] max-w-[450px]">
					The Amrutam Home App is your one-stop app for all things Ayurveda!
					Apart from mimicking the significant characteristics of our website,
					this app offers a wide range of additional features.
				</p>
				<img className="sm:hidden mx-auto" src='/images/mobile-small.png' alt='mobile' />
				<p className="text-[16px] lg:text-[32px]  lg:max-w-[800px] mb-8 lg:mb-12 font-bold text-center sm:text-left">Get a diet & lifestyle consultation with ayurvedic experts across the globe </p>
				<p className="font-bold text-[26px] lg:text-[36px] text-center sm:text-left">Get the App now</p>
				<div className='flex flex-col sm:flex-row items-center sm:-ml-4 lg:-ml-10'>
					<div>
						<img className='cursor-pointer scale-75' src='/images/playstore.png' alt='play store' />
					</div>
					<div>
						<img className='cursor-pointer scale-75' src='/images/appstore.png' alt='app store' />
					</div>
				</div>				
			</div>

			
			<div className='flex-1 hidden sm:block'>
				<img className='object-cover object-center' src='/images/mobile-large.png' alt='mobile' />
			</div>
		</div>

	);
}


export default HomeApp;