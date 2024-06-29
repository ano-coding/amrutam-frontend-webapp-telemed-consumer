
function Specialities() {
	return (
		<div className="bg-[#FFFAEC] font-dinpro py-12 px-2">
			<div className="flex justify-center mb-8">
				<h2 className="text-[#3A643B] text-[32px] lg:text-[48px] sm:border-b-4 px-8 border-[#abdcac] text-center font-bold leading-tight ">
					What sets Ayurvedic consultations apart?
				</h2>
			</div>


			<div className='flex flex-col md:flex-row md:flex-wrap justify-center  items-center gap-4'>
				<div className='md:flex-none md:w-[650px] xl:w-[600px] text-[#3A643B] w-[328px] px-16 py-[45px] shadow-lg rounded-[20px] border-t-[5px] border-[#3A643B] space-y-4'>
					<h3 className='text-[24px] md:text-[32px] font-semibold text-center'>स्वस्थस्य स्वास्थ्य रक्षणं, आतुरस्य विकार प्रशमनं ।"</h3>
					<p className='text-[15px] md:text-[18px] w-[95%] text-center mx-auto'>
						[ Meaning: The Goal of Ayurveda is to maintain the health of a healthy person and
						to cure the disease of a diseased person. ]
					</p>
				</div>
				<div className='md:flex md:items-center md:flex-wrap md:gap-4'>
					<div className='sm:flex-none w-[328px] rounded-[20px] overflow-hidden pb-2 md:pb-0'>
						<img className='w-[100%] h-[100%] scale-105' src='/images/hair-oil1.png' alt='hair medicine' />
					</div>
					<div className='sm:flex-none text-[#3A643B] w-[328px] md:w-[320px] h-[285px] px-[28px] py-[45px] shadow-lg rounded-[20px] border-t-[5px] border-[#3A643B] space-y-4'>
						<h3 className='text-[20px] font-semibold '>Precise Diagnosis</h3>
						<p className='text-[16px]'>
							Ayurveda's core principles revolve around Vata, Pitta,
							and Kapha doshas, guiding you with precise diagnosis and treatment.
						</p>
					</div>
				</div>
			</div>

			<div className='flex flex-col md:flex-row md:flex-wrap items-center justify-center mt-4 gap-4'>
				<div className='flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-4'>
					<div className='sm:flex-none w-[328px] rounded-[20px] overflow-hidden'>
						<img className='w-[100%] h-[100%] scale-105' src='/images/herbs.png' alt='hair medicine' />
					</div>
					<div className='w-[328px] md:w-[293px] h-[277px] rounded-[20px] px-[20px] py-[40px] border-t-[5px] border-[#3A643B] shadow-lg space-y-4'>
						<h3 className='text-[#3A643B] text-[20px] font-bold'>Zero side-effects</h3>
						<p className='text-[16px] text-[#414141]'>Ayurvedic treatments are devoid of chemicals, and are based completely on natural herbs </p>
					</div>					
				</div>
				<div className='flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-4'>
					<div className='sm:flex-none w-[328px] rounded-[20px] overflow-hidden'>
						<img className='w-[100%] h-[100%] scale-105' src='/images/hair-oil2.png' alt='hair medicine' />
					</div>
					<div className='w-[328px] md:w-[293px] h-[277px] rounded-[20px] px-[20px] py-[40px] border-t-[5px] border-[#3A643B] shadow-lg space-y-4'>
						<h3 className='text-[#3A643B] text-[20px] font-bold'>Individual Treatment</h3>
						<p className='text-[16px] text-[#414141]'>all Treatments are personalized based on a person's unique constitution and health concerns.</p>
					</div>					
				</div>
				
				
			</div>

			

		</div>
		
	);
}


export default Specialities;