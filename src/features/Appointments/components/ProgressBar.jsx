const progressBarSteps = [
	'Mode & Timeslot',
	'Symptoms',
	'Confirmation',
	'Make Payment',
	'Attach Reports',
	'Basic Info'
]


export function ProgressBar({ currentStep }) {
	const lastIndex = progressBarSteps.length - 1;
	return (
		<div className='px-10 pb-8 overflow-x-scroll border  flex justify-start gap-2 mx-auto'>
			{progressBarSteps.map((step, index) => {
				return (
					<div
						key={index}
						className='flex items-start gap-1 xl:gap-2'
					>
						<div className='relative flex flex-col items-center'>
							<div
								className={`w-[32px] h-[32px] text-[13px] flex items-center justify-center text-[#797979] ${index < currentStep && 'bg-[#3A643B]'} rounded-[50%] border-2 border-[#797979]`}
							>
								{index < currentStep ? (
									<img src='/appointments/tick.png' alt='Tick' />
								) : (
									index < 9 ? '0' + (index + 1) : index + 1
								)}
							</div>
							<p className={`min-w-[120px] block text-center text-[10px] xl:text-[13px] absolute top-10 font-sans ${index < currentStep ? 'font-semibold text-[#3A643B]' : 'font-medium text-[#797979]'} `}>{step}</p>
						</div>

						{index !== lastIndex && (
							<div className='min-w-[45px] xl:min-w-[55px] grow  mt-4 h-[2px] bg-[#797979] rounded'>
								<div className={`h-full duration-500 ${index < currentStep ? 'w-[100%] bg-[#3A643B]' : 'bg-[#797979]'} rounded`}></div>
							</div>
						)}
					</div>
				)
			})}
		</div>
	)

}

export default ProgressBar;