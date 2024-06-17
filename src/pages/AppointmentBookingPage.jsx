import { useState } from 'react';
import AppointmentForm from '../features/Appointments/components/AppointmentForm';
import AppointmentAttachReports from '../features/Appointments/components/AppointmentAttachReport';
import AppointmentPayment from '../features/Appointments/components/AppointmentPayment';
import AppointmentSelectTimeSlot from '../features/Appointments/components/AppointmentSelectTimeSlot';
import ProgressBar from '../components/ProgressBar';
const AppointmentBookingPage = () => {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({});
	const [reports, setReports] = useState(null);
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedTime, setSelectedTime] = useState(null);

	// const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM']; 

	const handleNextStep = (data) => {
		if (step === 1) setFormData(data);
		if (step === 2) setReports(data);
		if (step === 3) {
			setSelectedDate(data[0])
			setSelectedTime(data[1])
		}
		console.log(data);
		setStep(step + 1);
	};

	return (
		<div className="w-[100%] md:w-[80%] mx-auto lg:w-[60%] xl:w-[50%] p-4  my-8 rounded-lg flex justify-center items-center flex-col">
			<ProgressBar step={step} />
			{step === 1 && <AppointmentForm onNext={handleNextStep} />}
			{step === 2 && <AppointmentAttachReports onNext={handleNextStep} />}
			{step === 3 && <AppointmentSelectTimeSlot onNext={handleNextStep} />}
			{step === 4 && (
				<AppointmentPayment
					appointmentDetails={{
						...formData,
						reports,
						date: selectedDate,
						time: selectedTime,
						expert: 'Dr. Smith',
					}}
				/>
			)}
		</div>
	);
};

export default AppointmentBookingPage;
