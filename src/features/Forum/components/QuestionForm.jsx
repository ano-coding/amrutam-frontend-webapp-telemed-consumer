import { useEffect, useState } from "react";
import ModalWindow from "./QuestionFormModal";
import { categories } from './ChatData';

const initialFormData = {
	question: '',
	description: '',
	category: '',
	subcategory: '',
	visibility: ''
}

const MAX_QUESTION_WORDS = 12;
const MAX_DESCRIPTION_WORDS = 50;




function QuestionForm(props) {
	const [formData, setFormData] = useState(initialFormData);
	const [uploadedFiles, setUploadedFiles] = useState([]);
	
	const showCategoryRequest = formData.category === 'other';
	const showSubCategoryRequest = formData.subcategory === 'other';

	const subcategories = categories.find(category => category.category === formData.category)?.categoryList;


	function handleDataChange(e) {
		const newFormData = {
			...formData,
			[e.target.id]: e.target.value
		};

		setFormData(newFormData);
	}


	function handleFileUpload(e) {
		const file = e.target.files[0];

		if (file) {
			setUploadedFiles(prevFiles => [...prevFiles, file]);
		}

	}

	function handleRemoveFile(e, index) {
		e.preventDefault();

		const newFiles = [...uploadedFiles];

		newFiles.splice(index, 1);

		setUploadedFiles(newFiles);
	}


	useEffect(() => {
		const input = document.querySelector('#file');

		input.addEventListener('change', handleFileUpload);

		return () => input.removeEventListener('change', handleFileUpload);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return ( 
		<ModalWindow {...props}>
			<div className="flex flex-1 items-start flex-col sm:flex-row gap-4">
				
				<div className='flex items-center justify-center gap-4 mx-auto px-4'>
					<img src='/priya.png' alt='Person' />
					<p className='text-[#3A643B] font-semibold min-w-fit'>Priya Singh</p>
				</div>

				<form className='w-[100%] *:flex-1 *:relative space-y-2 mx-auto'>
					<div className='flex flex-wrap gap-2 items-center  justify-between'>
						<select
							id='visibility'
							value={formData.visibility}
							onChange={handleDataChange}
							className='w-[100%] md:w-[200px] p-2 text-[12px] sm:text-[14px] rounded-[10px] border border-[#E0E0E0] focus:outline-none'
						>
							<option value='public'>Public</option>
							<option value='private'>Private</option>
						</select>
						<button
							type='submit'
							className='w-[100%] md:w-[200px] bg-[#3A643B] px-8 py-2 text-white rounded-lg'
						>Ask</button>
					</div>

					<div>
						<input
							type='text'
							id='question'
							value={formData.question}
							onChange={(e) => {
								const totalWords = e.target.value.split(' ').length;

								if (totalWords <= MAX_QUESTION_WORDS) {
									handleDataChange(e)
								} else {
									console.log('max question words length reached!!')
								}
							}}
							placeholder='Ask your question here'
							className='w-[100%] rounded-[11px] placeholder:text-[12px] sm:placeholder:text-[15px] text-[12px] sm:text-[14px] pl-4 pr-[100px] py-2 border border-[#E0E0E0]  focus:outline-none'
						/>
						<p className='absolute top-[13px] right-2 text-xs text-customgray-500'>max 12 words</p>
					</div>

					<div>
						<textarea
							type='text'
							id='description'
							value={formData.description}
							onChange={(e) => {
								const totalWords = e.target.value.split(' ').length;

								if (totalWords <= MAX_DESCRIPTION_WORDS) {
									handleDataChange(e)
								} else {
									console.log('max question words length reached!!')
								}
							}}
							placeholder='Add description'
							className='w-[100%] h-[120px] text-[12px] sm:text-[14px] resize-none rounded-[11px] pl-4 pr-[100px] py-2 border border-[#E0E0E0] placeholder:text-[12px] sm:placeholder:text-[15px] focus:outline-none'
						></textarea>
						<p className='absolute bottom-4 right-2 text-xs text-customgray-500'>max 50 words</p>
					</div>

					<div>
						<label 
							htmlFor='file'
							className={`block w-[100%] text-customgray-500 rounded-[11px] text-[12px] sm:text-[14px]  pr-[50px] ${uploadedFiles.length === 0 ? 'py-2 pl-4': 'py-1 pl-1'} border border-[#E0E0E0] cursor-pointer`}
						>
							{uploadedFiles.length === 0 && <p>Add attachments</p>}
							<div className="flex items-center gap-2 flex-wrap">
								{
									uploadedFiles.map((file, index) => {
										return (
											<div
												onClick={e => e.preventDefault()}
												key={file.name}
												className="inline-flex items-center justify-center gap-2 px-2 py-1 border border-[#E0E0E0] rounded"
											>
												<p className="text-[10px] sm:text-[12px]">{file.name}</p>
												<img
													onClick={(e) => handleRemoveFile(e, index)}
													className='w-[15px] h-[15px]'
													src='/cross-icon.png' alt='cross'
												/>
											</div>
										)
									})
								}
							</div>
							

						</label>
						<input
							type='file'
							id='file'
							name='file'
							className="hidden"
						/>
					{/* 	<input
							type='file'
							placeholder='Add attachments'
							className='w-[100%] rounded-[11px] text-[12px] sm:text-[14px] pl-4 pr-[100px] py-2 border border-[#E0E0E0] placeholder:text-[12px] sm:placeholder:text-[15px] focus:outline-none'
						/> */}
						<img src='/gallery.png' alt='gallery' className='absolute top-[13px] right-2 text-xs text-customgray-500' />
					</div>

					<div className='flex flex-wrap items-center gap-2'>
						<select
							id='category'
							value={formData.category}
							onChange={handleDataChange}
							className={`w-[100%] md:w-[200px] p-2 ${formData.category === '' && 'text-customgray-500'} text-[12px] sm:text-[14px] rounded-[10px] border border-[#E0E0E0] focus:outline-none`}
						>
							<option value="" disabled selected>Add your category</option>
							{
								categories.map((category, index) => {
									return <option key={index} value={category.category}>{category.category}</option>
								})
							}
							
							<option value="other">Other</option>
						</select>
						
						<div className={`${showCategoryRequest? 'block': 'hidden'} flex-1 relative`}>
							<input
								type='text'
								placeholder='Write your category'
								className='w-[100%] rounded-[11px]  text-[12px] sm:text-[14px] pl-4 pr-[100px] sm:pr-[125px] py-2 border border-[#E0E0E0] placeholder:text-[12px] sm:placeholder:text-[15px] focus:outline-none'
							/>
							<button
								type='button'
								className='w-[100px] sm:w-[120px] absolute right-0 text-[12px] sm:text-[14px] bg-[#3A643B] px-4 sm:px-8 py-2 text-white rounded-lg'
							>Request</button>
						</div>
							

					</div>

					<div className='flex flex-wrap items-center gap-2'>
						<select
							id='subcategory'
							value={formData.subcategory}
							onChange={handleDataChange}
							className={`w-[100%] md:w-[200px] p-2 ${formData.subcategory === '' && 'text-customgray-500'} text-[14px] rounded-[10px] border border-[#E0E0E0] focus:outline-none`}
						>
							<option value="" disabled selected>Add your subcategory</option>
							{
								subcategories?.map(category => {
									return <option key={category}  value={category}>{category}</option>
								})
							
							}
						
							<option value="other">Other</option>
						</select>
						
						<div className={`${showSubCategoryRequest ? ' block' : 'hidden'} flex-1 relative`}>
							<input
								type='text'
								placeholder='Write your subcategory'
								className='w-[100%] rounded-[11px] text-[12px] sm:text-[14px] pl-4 pr-[100px] sm:pr-[125px] py-2 border border-[#E0E0E0] placeholder:text-[12px] sm:placeholder:text-[15px] focus:outline-none'
							/>
							<button
								type='button'
								className='w-[100px] sm:w-[120px] absolute right-0 text-[12px] sm:text-[14px] bg-[#3A643B] px-4 sm:px-8 py-2 text-white rounded-lg'
							>Request</button>
						</div>
			

					</div>
				</form>
			</div>
			
		</ModalWindow>
	
	);
}

export default QuestionForm;