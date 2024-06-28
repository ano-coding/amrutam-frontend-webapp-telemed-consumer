import { Fragment, useState } from "react";
import ModalWindow from "./ReportFormModal";

const reportTags = [
	'Offensive',
	'Inappropriate',
	'Plagiarism',
	'Disrespectful',
	'Terrorism',
	'Violation',
	'Inappropriate Content'
];



function ReportForm() {
	const [selectedTags, setSelectedTags] = useState([]);
	const disabled = selectedTags.length === 0;


	function toggleTagSelect(tag) {
		const tagIndex = selectedTags.indexOf(tag);
		const newTags = [...selectedTags];

		if (tagIndex === -1) {
			newTags.push(tag);
		} else {
			newTags.splice(tagIndex, 1);
		}

		setSelectedTags(newTags);
	}


	return (
		<ModalWindow>
			<div
				className="bg-white rounded py-4 space-y-4"
			>
				<h2 className="text-[20px] font-semibold">Report</h2>
				<p className="text-[18px] font-medium">Please select the appropriate problem to continue</p>

			</div>
			<form>
				<div className="flex items-center gap-4 flex-wrap">
					{
						reportTags.map((tag, index) => {
							const selected = selectedTags.includes(index);

							return (
								<Fragment key={index}>
									<label
										onClick={() => toggleTagSelect(index)}
										htmlFor={tag}
										className={`${selected ? 'text-[#FEFEFE] bg-customred-500' : 'text-[#B6B6B6] border-[#B6B6B6]'} sm:text-[18px] px-4 sm:px-[20px] py-1 border  rounded-[18px] cursor-pointer`}
									>
										{tag}
									</label>
									<input type='checkbox' id={tag} className="hidden" />
								</Fragment>
							)
						})
					}

				</div>
				
				<button
					type='submit'
					disabled={disabled}
					className={`block w-[300px] mx-auto ${disabled ? 'bg-slate-200 cursor-not-allowed' : 'bg-customgreen-800 text-white'} font-semibold  rounded-2xl my-4 p-4`}
				>
					Submit
				</button>

			</form>

		</ModalWindow>
	);
}

export default ReportForm;