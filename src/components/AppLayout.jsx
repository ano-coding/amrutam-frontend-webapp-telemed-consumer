import { Outlet } from "react-router-dom";
// import Navbar from "./Navbar";
import Navbar from "./HomePage/Navbar";
// import Navbar from "../features/Store/components/Navbar";
import { SideBarToggleProvider } from "../context/SidebarToggleContext";
import BottomNavigation from "../features/Store/components/BottomNavigation";

const AppLayout = () => {
	return (
		<SideBarToggleProvider>
			<div className="flex h-dvh flex-col">
				<Navbar />
				<div className="flex-1">
					<Outlet />
				</div>
				<BottomNavigation />
			</div>
		</SideBarToggleProvider>
	);
};

export default AppLayout;
