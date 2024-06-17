import { useReport } from "./ReportContext";

const options = [
	{
		name: 'Share',
		logo: '/share.png'
	},
	{
		name: 'Add answer',
		logo: '/add-answer.png'
	},
	{
		name: 'Report',
		logo: '/report.png'
	}
]


function QuestionPopUp({togglePopUp}) {
	const { showReportForm, setShowReportForm } = useReport();

	function toggleShowForm() {
		setShowReportForm(!showReportForm);
		togglePopUp();
	}

	return (
		<div className='absolute -right-1 top-16 sm:right-12 sm:top-0 w-[175px] border border-[#EDEDED] rounded-xl bg-white overflow-hidden'>
			{
				options.map((option, index) => {
					return (
						<div
							onClick={option.name === 'Report'? toggleShowForm: null}
							key={index}
							className='flex items-center gap-4 px-4 py-2.5 hover:bg-[#EDEDED] cursor-pointer bottom-border'
						>
							<img src={option.logo} alt='Share logo' />
							<p>{option.name}</p>
						</div>
					)
				})
			}

		</div>

	);
}

export default QuestionPopUp;