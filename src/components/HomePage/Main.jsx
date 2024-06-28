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
		<div className='pt-16 pb-12'>
			<div className="flex justify-center">
				<h2 className='text-[#3A643B] mt-4 text-center sm:border-b-4 px-10 border-[#abdcac] text-[32px] lg:text-[48px] leading-none font-bold'>
					Discover Ayurveda’s Magic With Us
				</h2>
			</div>
			
			<p className='text-[#666666] w-[90%] max-w-[750px] mt-6 text-[14px] lg:text-[20px] mx-auto text-center '>
				Ayurvedic treatment aims to balance your body and mind, bringing harmony and vitality.
				It's like a journey to better health using ancient wisdom, a totally effective approach for a better life.
			</p>	

			<div className="md:hidden">
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


			
			{/* <div className="hidden md:flex items-center justify-center mt-12">
				<div className="space-y-24 relative">
					{
						cards.slice(0, cards.length / 2).map((item, index) => {
							return (
								<div key={index} className={`flex items-center gap-2 justify-end ${(index === 0 || index === 2) && 'relative left-8'}`}>
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

				<img src='/images/main-lg.png'  alt='Main logo' />


				<div className="space-y-24 relative">
					{
						cards.slice(cards.length / 2).map((item, index) => {
							return (
								<div key={index} className={`flex items-center gap-2 justify-end ${(index === 0 || index === 2) && 'relative right-8'}`}>
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
			</div>		 */}

			<div className="hidden md:grid grid-cols-3 mt-24 md:w-[90%] xl:w-[80%] mx-auto max-w-[1300px]">
				<div className="flex flex-col justify-between items-start space-y-10 lg:space-y-4">
					<div className="flex">
						<div className="lg:max-w-80 text-right mr-4">
							<h3 className="font-bold text-sm lg:text-lg text-black font-dinProBold">
								Personalized Wellness
							</h3>
							<p className="text-sm md:text-base text-[#6D6B6B] max-w-60">
								Get treatments made just for you based on your individual doshas (
								body type)
							</p>
						</div>
						<div className="bg-[#EDF5FA] flex justify-center items-center flex-shrink-1 rounded-full min-w-14 min-h-14 w-12 h-12 lg:min-h-20 lg:min-w-20">
							<img
								alt=""
								loading="lazy"
								width={65}
								height={55}
								decoding="async"
								data-nimg={1}
								className="w-9 h-9 m-auto lg:w-12 lg:h-12"
								src="/images/personalized.png"
								style={{ color: "transparent" }}
							/>
						</div>
					</div>
					<div className="flex mr-10 lg:mr-16">
						<div className="lg:max-w-80 text-right mr-4">
							<h3 className="font-bold text-sm lg:text-lg text-black font-dinProBold">
								Focus on prevention
							</h3>
							<p className="text-sm md:text-base text-[#6D6B6B] max-w-48">
								Stop problems even before they start.
							</p>
						</div>
						<div className="bg-[#EAF2EA] flex justify-center items-center rounded-full min-w-14 min-h-14 w-12 h-12 lg:min-h-20 lg:min-w-20">
							<img
								alt=""
								loading="lazy"
								width={64}
								height={64}
								decoding="async"
								data-nimg={1}
								className="w-9 h-9 lg:w-12 lg:h-12"
								src="/images/prevention.png"
								style={{ color: "transparent" }}
							/>
						</div>
					</div>
					<div className="flex">
						<div className="lg:max-w-80 text-right mr-4">
							<h3 className="font-bold text-sm lg:text-lg text-black font-dinProBold">
								Mind-Body Connection
							</h3>
							<p className="text-sm md:text-base text-[#6D6B6B] max-w-60">
								Keep your mind and body in sync for a happy life.
							</p>
						</div>
						<div className="bg-[#FCF1F1] flex justify-center items-center rounded-full min-w-14 min-h-14 w-12 h-12 lg:min-h-20 lg:min-w-20">
							<img
								alt=""
								loading="lazy"
								width={64}
								height={64}
								decoding="async"
								data-nimg={1}
								className="w-9 h-9 lg:w-12 lg:h-12"
								src="/images/mind-body.png"
								style={{ color: "transparent" }}
							/>
						</div>
					</div>
				</div>
				<img
					alt=""
					loading="lazy"
					width={503}
					height={522}
					decoding="async"
					data-nimg={1}
					className="m-auto w-72 h-72 lg:w-96 lg:h-96 lg:scale-110 xl:scale-125"
					src="/images/main-lg.png"
					style={{ color: "transparent" }}
				/>
				<div className="flex flex-col justify-between items-end">
					<div className="flex">
						<div className="bg-[#F5F3FC] flex justify-center items-center rounded-full min-w-14 min-h-14 w-12 h-12 lg:min-h-20 lg:min-w-20">
							<img
								alt=""
								loading="lazy"
								width={64}
								height={64}
								decoding="async"
								data-nimg={1}
								className="w-9 h-9 lg:w-12 lg:h-12"
								src="/images/healing.png"
								style={{ color: "transparent" }}
							/>
						</div>
						<div className="lg:max-w-80 text-left ml-4">
							<h3 className="font-bold text-sm lg:text-lg text-black font-dinProBold">
								Holistic Healing
							</h3>
							<p className="text-sm md:text-base text-[#6D6B6B] max-w-60">
								Fix the root problem for long-lasting health.
							</p>
						</div>
					</div>
					<div className="flex ml-20 md:ml-10 lg:ml-16 xl:ml-36">
						<div className="bg-[#FEF6ED] flex justify-center items-center rounded-full min-w-14 min-h-14 w-12 h-12 lg:min-h-20 lg:min-w-20">
							<img
								alt=""
								loading="lazy"
								width={56}
								height={56}
								decoding="async"
								data-nimg={1}
								className="w-9 h-9 lg:w-12 lg:h-12"
								src="/images/remedies.png"
								style={{ color: "transparent" }}
							/>
						</div>
						<div className="lg:max-w-80 text-left ml-4">
							<h3 className="font-bold text-sm lg:text-lg text-black font-dinProBold">
								Natural Remedies
							</h3>
							<p className="text-sm md:text-base text-[#6D6B6B] max-w-60">
								Using herbs and natural therapies for healing.
							</p>
						</div>
					</div>
					<div className="flex">
						<div className="bg-[#EAF2EA] flex justify-center items-center rounded-full min-w-14 min-h-14 w-12 h-12 lg:min-h-20 lg:min-w-20">
							<img
								alt=""
								loading="lazy"
								width={64}
								height={64}
								decoding="async"
								data-nimg={1}
								className="w-9 h-9 lg:w-12 lg:h-12"
								src="/images/immunity.png"
								style={{ color: "transparent" }}
							/>
						</div>
						<div className="lg:max-w-80 text-left ml-4">
							<h3 className="font-bold text-sm lg:text-lg text-black font-dinProBold">
								Boosting immunity
							</h3>
							<p className="text-sm md:text-base text-[#6D6B6B] max-w-60">
								Stay strong and healthy for life, not just for today.
							</p>
						</div>
					</div>
				</div>
			</div>

			
		</div>

	);
}


export default Main;