import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateAppointmentDetails } from "../../../services/Appointments";

function BasicInfo({ appointmentDetails, setAppointmentDetails }) {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const navigate = useNavigate();
	const { doctorId } = useParams();

	const  onSubmit = async (data) => {
		if (Object.keys(errors).length === 0) {
			setAppointmentDetails({
				...appointmentDetails,
				patientDetails: {
					...data
				}
			});

			const newAppointmentDetails = {
				...appointmentDetails,
				patientDetails: {
					...data
				}
			}

			console.log('newAppointmentDetails ', newAppointmentDetails);

			try {
				const res = await updateAppointmentDetails(newAppointmentDetails);

				console.log('res ', res);
			} catch (e) {
				console.log(e);
			}

	
			navigate('/appointment-success', {
				state: {
					appointmentDetails: {
						...appointmentDetails,
						...data
					},
					doctorId
				}
			});
		}
	}

	return (
		<div>
			<div className='border-[1.5px] border-[#3A643B] rounded-[25px] px-8 py-6'>
				<h2 className='font-inter font-semibold mb-6 text-lg'>Basic Info</h2>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='font-nunito space-y-4'
				>
					<div>
						<label className='flex-1 block px-4 py-2 text-xs text-[#646665] border border-[#CED8E0] rounded-2xl'>
							Height
							<input
								{...register('height',
									{
										required: 'Height is required!',
										min: {
											value: 1,
											message: 'Height must be atleast 30cm'
										},
										max: {
											value: 300,
											message: 'Height cannot be greater than 300cm'
										}
									})}
								type='number'
								list='height'
								className='mt-1 block w-[100%] text-base text-[#2E2F2E] font-medium focus:outline-none'
							/>
							<datalist id="height" className="">
								{Array(271).fill(undefined).map((_, index) => {
									return <option key={index + 30}  value={index + 30} />
								})}
							</datalist>
						</label>
						<p className='px-2 mt-1 text-red-400 text-sm my-0 font-medium'>{errors.height?.message}</p>
					</div>

					<div>
						<label className='flex-1 block px-4 py-2 text-xs text-[#646665] border border-[#CED8E0] rounded-2xl'>
							Weight
							<input
								{...register('weight',
									{
										required: 'Weight is required!',
										min: {
											value: 1,
											message: 'Weight must be atleast 1kg'
										},
										max: {
											value: 300,
											message: 'Weight cannot be greater than 300kg'
										}
									}
								)}
								type='number'
								list='weight'
								className='mt-1 block w-[100%] text-base text-[#2E2F2E] font-medium focus:outline-none'
							/>
							<datalist id='weight'>
								{Array(300).fill(undefined).map((_, index) => {
									return <option key={index + 1} value={index + 1} />
								})}
							</datalist>
						</label>
						<p className='px-2 mt-1 text-red-400 text-sm my-0 font-medium'>{errors.weight?.message}</p>
					</div>

					<div>
						<label className='flex-1 block px-4 py-2 text-xs text-[#646665] border border-[#CED8E0] rounded-2xl'>
							Age
							<input
								{...register('age',
									{
										required: 'Age is required!',
										min: {
											value: 1,
											message: 'Age must be atleast 1'
										},
										max: {
											value: 100,
											message: 'Age cannot be greater than 100'
										}
									})}
								type='number'
								list='age'
								className='mt-1 block w-[100%] text-base text-[#2E2F2E] font-medium focus:outline-none'
							/>
							<datalist id='age'>
								{Array(100).fill(undefined).map((_, index) => {
									return <option key={index + 1} value={index + 1} />
								})}
							</datalist>
						</label>
						<p className='px-2 mt-1 text-red-400 text-sm my-0 font-medium'>{errors.age?.message}</p>
					</div>
					<button
						type='submit'
						className='block w-[100%] py-3 font-medium text-[20px] font-inter bg-[#3A643B] hover:bg-[#305030] rounded-lg text-white'
					>
						Proceed
					</button>
				</form>
			</div>

			<Link
				to='/appointment-success'
				state={{
					appointmentDetails,
					doctorId
				}}
				onClick={() => onSubmit(appointmentDetails)}
			>
				<p className='text-[#3A643B] mt-6 font-inter font-semibold text-[20px] text-center'>
					Skip For Now
				</p>
			</Link>

		</div>

	)
}

export default BasicInfo;