import { createContext, useContext, useState } from "react";


export const AppointmentDetailsContext = createContext(null);


export function AppointmentContext({ children }) {
	const [appointmentDetails, setAppointmentDetails] = useState({
		sessionMode: '',
		sessionDuration: '',
		sessionDate: '',
		sessionTime: ''
	});

	return (
		<AppointmentDetailsContext.Provider value={{appointmentDetails, setAppointmentDetails}}>
			{children}
		</AppointmentDetailsContext.Provider>
	)
}


export function useAppointment() {
	return useContext(AppointmentDetailsContext);
}
