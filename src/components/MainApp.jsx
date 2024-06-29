import { Outlet } from "react-router-dom";
import Navbar from "./HomePage/Navbar";

function MainApp() {
	return (
		<>
			<Navbar></Navbar>
			<Outlet></Outlet>
		</>

	);
}

export default MainApp;