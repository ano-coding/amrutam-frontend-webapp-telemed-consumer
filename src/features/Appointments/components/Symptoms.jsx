import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { fetchSingleDoctorConcerns } from '../../../services/Doctor';


const durationUnitList = ['days', 'weeks', 'months', 'years'];
const sleepPatterns = [
	{
		label: 'One Big Sleep: Sleeping all at once during the night.',
		value: 'One Big Sleep: Sleeping all at once during the night.',
	},
	{
		label:
			'Two-Part Sleep: Splitting sleep into a long nighttime sleep and a short nap during the day.',
		value:
			'Two-Part Sleep: Splitting sleep into a long nighttime sleep and a short nap during the day.',
	},
	{
		label: 'Napping: Taking short sleeps during the day.',
		value: 'Napping: Taking short sleeps during the day.',
	},
	{
		label: 'Late Bedtime: Going to bed late and waking up late.',
		value: 'Late Bedtime: Going to bed late and waking up late.',
	},
	{
		label: 'Early Bird: Going to bed and waking up early.',
		value: 'Early Bird: Going to bed and waking up early.',
	},
	{
		label: 'Mixed-Up Sleep: Having no regular sleep pattern.',
		value: 'Mixed-Up Sleep: Having no regular sleep pattern.',
	},
	{
		label:
			'Shift Work Sleep: Having trouble sleeping because of working odd hours.',
		value:
			'Shift Work Sleep: Having trouble sleeping because of working odd hours.',
	},
];
const severityList = [
	{
		label: 'Mild',
		value: 'Mild'
	},
	{
		label: 'Moderate',
		value: 'Moderate'
	},
	{
		label: 'Severe',
		value: 'Severe'
	}
];



function Symptoms({ setStep, appointmentDetails, setAppointmentDetails }) {
	const { register, handleSubmit, watch, formState: { errors } } = useForm();
	const { doctorId } = useParams();
	const flag = useRef(0);

	let concern = watch('concern');
	let description = watch('description');
	let severity = watch('severity');
	let duration = watch('duration');
	let timeUnit = watch('timeUnit');
	let sleepPattern = watch('sleepPattern');

	if (flag.current === 0) {
		concern = appointmentDetails.symptoms?.concern;
		description = appointmentDetails.symptoms?.description;
		severity = appointmentDetails.symptoms?.severity;
		duration = appointmentDetails.symptoms?.duration;
		timeUnit = appointmentDetails.symptoms?.timeUnit;
		sleepPattern = appointmentDetails.sleepPattern;
	}

	useEffect(() => {
		flag.current += 1;
	}, [])


	const { data: concerns, isLoading } = useQuery({
		queryFn: () => fetchSingleDoctorConcerns(doctorId),
		queryKey: ['concerns', doctorId]
	})

	if (isLoading) {
		return <div>...Concerns are loading</div>
	}


	const onSubmit = (data) => {
		if (Object.keys(errors).length === 0) {

			setAppointmentDetails({
				...appointmentDetails,
				sleepPattern: data.sleepPattern,
				symptoms: {
					...appointmentDetails.symptoms,
					concern: data.concern,
					description: data.description,
					severity: data.severity,
					duration: data.duration,
					timeUnit: data.timeUnit,
				}
			})

			setStep(2);
		}
	}


	return (
		<div className='border-[1.5px] border-[#3A643B] rounded-[25px] px-4 py-6'>
			<h2 className='font-inter font-semibold mb-6 text-lg'>Symptoms</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='font-nunito space-y-4'
			>
				<div>
					<div className='flex-1 block px-4 py-2 text-xs text-[#646665] border border-[#CED8E0] rounded-2xl'>
						Concern
						<select
							{...register('concern', { required: 'Concern is Required!' })}
							id='concern'
							value={concern}
							className='mt-1 block w-[100%] text-base text-[#2E2F2E] font-medium focus:outline-none'
						>
							<option value="" selected disabled>Select a Concern</option>
							{concerns.map(concern => {
								return <option key={concern.id} value={concern.name}>{concern.name}</option>
							})}

						</select>
					</div>
					<p className='px-2 mt-1 text-red-400 text-sm my-0 font-medium'>{errors.concern?.message}</p>
				</div>
				<div>
					<label className='flex-1 block px-4 py-2 text-xs text-[#646665] border border-[#CED8E0] rounded-2xl'>
						Description
						<input
							{...register('description', { required: 'Description is required!' })}
							type='text'
							id='description'
							value={description}
							className='mt-1 block w-[100%] text-base text-[#2E2F2E] font-medium focus:outline-none'
						/>
					</label>
					<p className='px-2 mt-1 text-red-400 text-sm font-medium'>{errors.description?.message}</p>
				</div>
				<div>
					<div className='flex-1 block px-4 py-2 text-xs text-[#646665] border border-[#CED8E0] rounded-2xl'>
						Severity
						<select
							{...register('severity', { required: 'Severity is Required!' })}
							id='severity'
							value={severity}
							className='mt-1 block w-[100%] text-base text-[#2E2F2E] font-medium focus:outline-none'
						>
							<option value="" selected disabled>Select Severity</option>
							{severityList.map(item => {
								return <option key={item.value} value={item.value}>{item.label}</option>
							})}

						</select>
					</div>
					<p className='px-2 mt-1 text-red-400 text-sm font-medium'>{errors.severity?.message}</p>
				</div>
				<div className='flex items-start gap-2'>
					<div className='flex-1'>
						<label className='block px-4 py-2 text-xs text-[#646665] border border-[#CED8E0] rounded-2xl'>
							Duration
							<input
								{...register('duration', { required: 'Duration is required' })}
								value={duration}
								type='number'
								id='duration'
								className='mt-1 block w-[100%] text-base text-[#2E2F2E] font-medium focus:outline-none'
							/>
						</label>
						<p className='px-2 mt-1 text-red-400 text-sm font-medium'>{errors.duration?.message}</p>
					</div>
					<div className='flex-1'>
						<div className='block px-4 py-2 text-xs text-[#646665] border border-[#CED8E0] rounded-2xl'>
							Time Unit
							<select
								{...register('timeUnit', { required: 'Time Unit is required' })}
								value={timeUnit}
								className='mt-1 block w-[100%] text-base text-[#2E2F2E] font-medium focus:outline-none'
							>
								<option value="" selected disabled>Select Time Unit</option>
								{durationUnitList.map(item => {
									return <option key={item} value={item}>{item}</option>
								})}
							</select>
						</div>
						<p className='px-2 mt-1 text-red-400 text-sm font-medium'>{errors.timeUnit?.message}</p>
					</div>
				</div>
				<div>
					<div className='flex-1 block px-4 py-2 text-xs text-[#646665] border border-[#CED8E0] rounded-2xl'>
						Sleep Pattern
						<select
							{...register('sleepPattern', { required: 'Sleep Pattern is required' })}
							id='sleep-pattern'
							value={sleepPattern}
							className='mt-1 block w-[100%] text-base text-[#2E2F2E] font-medium focus:outline-none'
						>
							<option value="" selected disabled>Select Sleep Pattern</option>
							{sleepPatterns.map((item, index) => {
								return <option key={index} value={item.value}>{item.label}</option>
							})}
						</select>
					</div>
					<p className='px-2 mt-1 text-red-400 text-sm font-medium'>{errors.sleepPattern?.message}</p>
				</div>

				<button
					type='submit'
					className='block w-[100%] py-3 font-medium text-[20px] font-inter bg-[#3A643B] hover:bg-[#305030] rounded-lg text-white'
				>
					Proceed
				</button>
			</form>
		</div>

	)
}


export default Symptoms;