import { useState } from 'react';

const AppointmentForm = ({ onNext }) => {
	const [formData, setFormData] = useState({
		mode: 'Video',
		height: '',
		weight: '',
		age: '',
		sleepPattern: '',
		concern: '',
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleModeChange = (mode) => {
		setFormData({
			...formData,
			mode,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onNext(formData);
	};

	return (
		<div className="bg-white p-8 min-w-[90%] rounded-xl ">
			<div className="fee w-full flex justify-between items-center p-4 my-3 border border-gray-400 rounded-lg">
				<h1>Appointment Fee</h1>
				<span>₹699.00</span>
			</div>
			<form className="space-y-4  w-full" onSubmit={handleSubmit}>

				<div className="flex justify-between my-4 bg-[#F3F3F3]">
					{['In-Clinic', 'Video', 'Chat'].map((mode) => (
						<button
							type="button"
							key={mode}
							onClick={() => handleModeChange(mode)}
							className={`flex-1 p-2 text-center  ${formData.mode === mode ? ' border-[--primary] text-[--primary]' : '  text-gray-600'} border rounded mx-1`}
						>
							{mode}
							{formData.mode === mode && (
								<span className="ml-2 text-[--primary]">&#10003;</span>
							)}
						</button>
					))}
				</div>

				<div className="w-full border border-gray-400 rounded-lg p-2">
					<label htmlFor="">Height</label>
					<input
						className="border-none  w-full outline-none bg-white"
						type="text"
						name="height"
						value={formData.height}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="w-full border border-gray-400 rounded-lg p-2">
					<label htmlFor="">Weight</label>
					<input
						className="border-none  w-full outline-none bg-white"
						type="text"
						name="weight"
						value={formData.weight}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="w-full border border-gray-400 rounded-lg p-2">
					<label htmlFor="">Age</label>
					<input
						className="border-none  w-full outline-none bg-white"
						type="text"
						name="age"
						value={formData.age}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="w-full border border-gray-400 rounded-lg p-2">
					<label htmlFor="">Sleep Pattern</label>
					<input
						className="border-none  w-full outline-none bg-white"
						type="text"
						name="sleepPattern"
						value={formData.sleepPattern}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="w-full border border-gray-400 rounded-lg p-2">
					<label htmlFor="">Concern</label>

					<textarea
						className="outline-none  w-full"
						name="concern"
						value={formData.concern}
						onChange={handleChange}
					/>
				</div>



				<button className="bg-[--primary] text-white p-2 w-full" type="submit">
					Proceed
				</button>
			</form>
		</div>
	);
};

export default AppointmentForm;
