import { createContext, useState } from "react";

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
	const [sessionDetails, setSessionDetails] = useState({
		sessionModeIndex: -1,
		slotIndex: 0, 
		slotDateIndex: -1,
		slotTime: '',
	});


	return (
		<SessionContext.Provider value={{ sessionDetails, setSessionDetails }}>
			{children}
		</SessionContext.Provider>
	);
};

export { SessionProvider, SessionContext };
