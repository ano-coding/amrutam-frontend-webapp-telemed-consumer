import { useState, useEffect, useRef } from 'react';


const cards = [
	{
		title: 'Make Appointment',
		text: 'You must make an appointment in advance, to choose the service and date.'
	},
	{
		title: 'Consultations',
		text: 'The next stage involves a thorough consultation with an Ayurveda practitioner.'
	},
	{
		title: 'Treatment Planning',
		text: 'The Ayurvedic practitioner creates a personalized treatment plan for you'
	},
	{
		title: 'Maintenance',
		text: 'These visits allow for assessment of progress, adjustments to the treatment.'
	},
]


function Approach() {
	// const scrollContainer = useRef(null);
	const [scrollCard, setScrollCard] = useState(0);

	// function handleScroll(e) {

	// 	const currentCard = Math.min(Math.round(e.target.scrollLeft / 250), 3);
	// 	setScrollCard(currentCard);
	// }


	// useEffect(() => {
	// 	const scrollDiv = scrollContainer.current;
	// 	scrollDiv.addEventListener('scroll', handleScroll);

	// 	return () => {
	// 		scrollDiv.removeEventListener('scroll', handleScroll)
	// 	}

	// }, []);




	return (
		<div className="my-16">
			<div className='h-[514px]'>
				<div className="absolute  h-[514px] w-full -z-10">
					<img className='w-full h-full object-cover object-bottom' src='/images/bg2.png' alt='Ayurvedic oils' />
				</div>
				<div className="absolute w-full h-[514px] bg-gradient-to-b from-[#000000A8] to-[#0E0E0E8A] -z-10"></div>
				<div className="h-[100%] flex flex-col items-center justify-center border border-white gap-4">
					<p className="xl:w-[90%] mx-auto text-[#FFF7E2] text-[32px] lg:text-[64px]  px-8 lg:px-80 font-robo text-center leading-tight">Ready to restore harmony in your mind, body and spirit?</p>
					<button className="bg-[#3A643B] text-[#F0F0F0] text-[20px] font-medium rounded-2xl px-[25px] py-[20px]">Book a consultation</button>
				</div >
			</div>

			
			<div className="text-center p-8 mt-12 space-y-4">
				<div className="text-center mb-8">
					<h3 className="text-[#3A643B] text-[32px] lg:text-[48px] font-bold inline-block">
						Our Ayurvedic Approach
						<hr className='hidden lg:block -mt-[14px] text-center -z-10 bg-[#abdcac] h-2' />
					</h3>
				</div>
				<p className="text-[#323232]  mx-auto max-w-[775px]">
					At Amrutam we follow a unique and personalized approach to healing.
					Our expert practitioners begin each treatment process by conducting a
					thorough analysis of the patient’s body type, medical history, and current health conditions.
				</p>
			</div>
			<div
				// ref={scrollContainer}
				className="flex items-center md:justify-center md:flex-wrap mx-auto gap-4 overflow-x-scroll scrollbar-hide px-8 snap-x snap-mandatory"
			>

				{
					cards.map((item, index) => {
						return (
							<Card key={index} index={index} title={item.title} text={item.text} />
						);
					})

				}
			</div>


			<div className="mx-auto flex items-center justify-center mt-12 gap-4 md:hidden">
				{
					Array(4).map((_, index) => {
						return <div key={index} className={`w-[12px] h-[12px] rounded-[50%] ${index === scrollCard ? 'bg-[#3A643B]' : 'bg-[#C3C3C3]'} `}></div>					
					})
				}				
			</div>
		</div>
	);
}


function Card({ index, title, text }) {
	return (
		<div className="flex-none flex flex-col  py-4 gap-4 w-[290px] h-[315px] bg-[#FFF7E2] border-t-[10px] border-[#3A643B] rounded-[20px] shadow-lg snap-center">
			<div className="w-[90px] h-[90px] mx-auto rounded-[50%] font-robo flex items-center justify-center bg-[#3A643B] text-[48px] text-white font-bold">
				{index + 1}
			</div>
			<h3 className="text-[#3A643B] text-[24px] text-center font-bold">{title}</h3>
			<p className="text-[#2E2E2E] text-[18px] text-center px-4">{text}</p>
		</div>

	)
}

export default Approach;