const cards = [
	{
		title: 'Personalized Wellness',
		text: 'Get treatments made just for you based on your individual doshas, (body type)',
		logo: '/images/personalized.png'
	},
	{
		title: 'Focus on prevention',
		text: 'Stop problems even before they start.',
		logo: '/images/prevention.png'
	},
	{
		title: 'Mind-Body Connection',
		text: 'Keep your mind and body in sync for a happy life.',
		logo: '/images/mind-body.png'
	},
	{
		title: 'Holistic Healing',
		text: 'Fix the root problem for long-lasting health.',
		logo: '/images/healing.png'
	},
	{
		title: 'Natural Remedies',
		text: 'Using herbs and natural therapies for healing.',
		logo: '/images/remedies.png'
	},
	{
		title: 'Boosting immunity',
		text: 'Stay strong and healtht for life, not just for today.',
		logo: '/images/immunity.png'
	},
]


function Main() {
	return ( 
		<div className='pt-16 pb-12 border border-black'>
			<div className="text-center">
				<h2 className='text-[#3A643B] inline-block mt-4  text-center text-[32px] lg:text-[48px] leading-none font-bold font-robo'>
					Discover Ayurveda’s Magic With Us
					<hr className='hidden lg:block -mt-[8px] text-center -z-10 bg-[#abdcac] h-1.5' />
				</h2>
			</div>
			
			<p className='text-[#666666] w-[90%] max-w-[750px] mt-6 text-[14px] lg:text-[20px] mx-auto text-center '>
				Ayurvedic treatment aims to balance your body and mind, bringing harmony and vitality.
				It's like a journey to better health using ancient wisdom, a totally effective approach for a better life.
			</p>	

			<div className="xl:hidden">
				<img className='mx-auto mt-12' src='/images/main.png' alt='Main logo' />
				<div className="flex items-center justify-center flex-wrap gap-4 mt-4">
					{
						cards.map((item, index) => {
							return (
								<div key={index}  className="w-[154px] h-[218px] flex flex-col justify-center py-4 gap-2 rounded-xl border border-[#E4E4E4]">
									<img src={item.logo} className="mx-auto" alt='logo' />
									<h3 className="text-[15px] px-2 font-robo font-semibold text-center">{item.title}</h3>
									<p className="text-[#6D6B6B] w-[90%] mx-auto text-[12px] font-medium text-center">{item.text}</p>
								</div>
							)
						})
					}

				</div>
			</div>


			
			<div className="hidden xl:flex items-center justify-center mx-auto mt-12">
				<div className="space-y-24 relative">
					{
						cards.slice(0, cards.length / 2).map((item, index) => {
							return (
								<div key={index} className={`flex items-center gap-2 justify-end w-[370px] ${(index === 0 || index === 2) && 'relative left-8'}`}>
									<div className="text-right">
										<p className="text-[18px] font-bold font-robo">{item.title}</p>
										<p className="text-[#515151] text-[13px] w-[80%] ml-auto">{item.text}</p>
									</div>
									<img src={item.logo} alt='logo' />
								</div>
							)
						})
					}
				</div>
	

				<img src='/images/main-lg.png' alt='Main logo' />

				<div className="space-y-24 relative">
					{
						cards.slice(cards.length / 2).map((item, index) => {
							return (
								<div key={index} className={`flex items-center gap-2 justify-end w-[370px] ${(index === 0 || index === 2) && 'relative right-8'}`}>
									<img src={item.logo} alt='logo' />
									<div className="text-left">
										<p className="text-[18px] font-bold font-robo">{item.title}</p>
										<p className="text-[#515151] text-[13px] w-[80%] mr-auto">{item.text}</p>
									</div>
								</div>
							)
						})
					}
				</div>
			</div>		
			
		</div>

	);
}


export default Main;