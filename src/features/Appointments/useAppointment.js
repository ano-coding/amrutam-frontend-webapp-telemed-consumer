import { useContext } from "react";
import { AppointmentDetailsContext } from "./AppointmentContext";


export function useAppointment() {
	return useContext(AppointmentDetailsContext);
}