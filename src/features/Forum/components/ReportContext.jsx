import { useState, createContext, useContext } from "react";


const ReportContext = createContext(null);




export function ReportFormContext({ children }) {
	const [showReportForm, setShowReportForm] = useState(false);


	return (
		<ReportContext.Provider
			value={{ showReportForm, setShowReportForm }}
		>
			{children}
		</ReportContext.Provider>
	);
}


export function useReport() {
	return useContext(ReportContext);
}