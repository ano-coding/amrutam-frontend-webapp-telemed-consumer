import { fetchAllConcerns } from "../../services/LandingPage";
import { useQuery } from "@tanstack/react-query";


const concernList = [
	{
		title: 'Hairfall',
		info: `Ayurveda's core principles revolve around Vata, Pitta, 
		and Kapha doshas, guiding you with precise diagnosis and treatment.`,
		link_text: 'Concern'
	},
	{
		title: 'Skin Problems',
		info: `Ayurveda's core principles revolve around Vata, Pitta, 
		and Kapha doshas, guiding you with precise diagnosis and treatment.`,
		link_text: 'Consult now'

	},
	{
		title: 'Skin Problems',
		info: `Ayurveda's core principles revolve around Vata, Pitta, 
		and Kapha doshas, guiding you with precise diagnosis and treatment.`,
		link_text: 'Consult now'
	},
	{
		title: 'Hairfall',
		info: `Ayurveda's core principles revolve around Vata, Pitta, 
		and Kapha doshas, guiding you with precise diagnosis and treatment.`,
		link_text: 'Concern'
	},
	{
		title: 'Skin Problems',
		info: `Ayurveda's core principles revolve around Vata, Pitta, 
		and Kapha doshas, guiding you with precise diagnosis and treatment.`,
		link_text: 'Consult now'
	},
	{
		title: 'Skin Problems',
		info: `Ayurveda's core principles revolve around Vata, Pitta, 
		and Kapha doshas, guiding you with precise diagnosis and treatment.`,
		link_text: 'Consult now'
	}
]



function Concerns() {
	const { data: concerns, isLoading } = useQuery({
		queryFn: () => fetchAllConcerns(),
		queryKey: ['concerns']
	});

	if (isLoading) {
		return <div>...Concerns are loading</div>
	}



	return ( 
		<div className='px-2 py-8'>
			<div className="flex justify-center mb-12">
				<h3 className="text-[#3A643B] px-10 sm:border-b-[6px] border-[#C3D0C4] text-[32px] lg:text-[48px] leading-none font-bold font-robo">
					Tell us about your concern
				</h3>
			</div>

			<div className='w-[90%] max-w-[1500px] mx-auto'>
				<div className='flex items-center justify-center gap-8 flex-wrap'>
					{concernList.map((concern, index) => {
						return <Concern key={index} concern={concern} />
					})}
				</div>
				<div className='mt-10 sm:w-[90%] xl:w-[100%] mx-auto'>
					<p className="font-sans mb-6 mx-auto text-[18px] font-semibold text-[#3A643C]">
						Can’t find anything relatable ? Select it from here
					</p>
					<form className="flex flex-col sm:flex-row gap-4">
						<select
							className="sm:w-[80%] no-scrollbar px-2 sm:px-4 py-4 sm:py-6 font-sans rounded-[8px] text-[18px] text-[#A5A5A5] font-semibold focus:outline-none border-[1.5px] border-[#CED8E0]"
						>
							<option value="" disabled selected>Select your concern</option>
							{concerns?.map(concern => {
								return <option key={concern._id} value={concern.name}>{concern.name}</option>
							})}
						</select>
						<button
							type='submit'
							className="w-[100%] sm:w-[291px] py-4 sm:py-6 bg-[#3A643B] rounded-[8px] text-white font-sans text-[18px] font-semibold"
						>
							Consult Now
						</button>
					</form>
				</div>
			</div>
		</div>

	);
}


function Concern({ concern }) {
	return (
		<div className='relative w-[300px] md:w-[330px] sm:w-[397px] h-[395px] shrink-0 px-4 py-6 rounded-2xl font-sans bg-[#F1F5F2]'>
			<div className='flex gap-4 mb-4'>
				<div className='w-[50px] h-[50px] rounded-[50%] bg-[#D9D9D9]'></div>
				<p className="font-semibold text-[18px] mt-2">{concern.title}</p>
			</div>

			<p className="text-[#414141] text-[18px] px-2">{concern.info}</p>

			<div className='absolute bottom-6 left-4 flex items-center gap-4'>
				<p className="font-sans font-medium">{concern.link_text}</p>
				<img src='/arrow-right-long.png' alt='Arrow Right' />
			</div>
		</div>
	)
}

export default Concerns;