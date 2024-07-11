import AppointmentBookingForm from "../features/Appointments/components/AppointmentBookingForm";
import { useContext } from "react";
import { SessionProvider } from "../context/SessionDetailsContext";

function AppointmentBookingFormPage() {
	return ( 
		<SessionProvider>
			<AppointmentBookingForm></AppointmentBookingForm>
		</SessionProvider>
	);
}

export default AppointmentBookingFormPage;