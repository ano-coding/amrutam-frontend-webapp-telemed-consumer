import { useState } from 'react';
import { categories } from "./ChatData";

function SearchBar() {
	const [selectedCategory, setSelectedCategory] = useState('');


	function handleChange(e) {
		setSelectedCategory(e.target.value);
	}


	return ( 
		<div className="min-h-[221px] py-8 bg-customgreen-100 flex items-center justify-center relative overflow-hidden">
			<div className='absolute w-[184px] h-[184px] left-[150px] -top-[50%] bg-[#CFEBCF80] rounded-[50%]'></div>
			<div className='absolute w-[184px] h-[184px] left-[320px] -bottom-[40%] bg-[#CFEBCF80] rounded-[50%]'></div>
			<div className='absolute w-[184px] h-[184px] right-[150px] -top-[50%] bg-[#CFEBCF80] rounded-[50%]'></div>
			<div className='absolute w-[184px] h-[184px] right-[230px] -bottom-[30%] bg-[#CFEBCF80] rounded-[50%]'></div>	
				

			<div className="space-y-4 z-10">
				<h2 className="font-medium text-[32px] text-center">Find Discussions Related to Ayurveda Here </h2>
				<form className="flex items-center flex-col gap-4 sm:flex-row sm:justify-between">
					<div className="relative w-[90%] sm:w-[65%] ">
						<input
							className="w-full pl-[10px] pr-12 py-[13px] rounded-[10px] border border-[#CDCDCD] focus:outline-none"
							type='text'
							placeholder='Search eg. Category,Thoughts, Questions'
						/>
						<img
							src='/arrow-forward.png'
							alt='Arrow Forward'
							className="absolute cursor-pointer right-3 top-[14px]"
						/>

					</div>
					
					<select
						value={selectedCategory}
						onChange={handleChange}
						className={`w-[90%] sm:w-[33%] ${selectedCategory === '' && 'text-[#7B7B7B]'} px-[10px] py-[13px] rounded-[10px] border border-[#CDCDCD] focus:outline-none`}
					>
						<option value="" disabled selected>Select by category</option>
						{
							categories.map((category, index) => {
								

								return (
									<optgroup key={index} label={category.category}>
										{
											category.categoryList.map((option, index) => {
												return <option key={index} value={option}>{option}</option>
											})
										}
									</optgroup>
								)
							})
						}
					</select>

				</form>
			</div>
		</div>

	);
}





export default SearchBar;