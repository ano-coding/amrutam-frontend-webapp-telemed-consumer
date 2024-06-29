import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
const Navbar = () => {
	const location = useLocation();

	//States
	const [sidebar, setSidebar] = useState(false);
	const [size, setSize] = useState();

	//Handlers
	const showSidebarHandler = () => {
		setSidebar((prev) => !prev);
	};

	//Effects
	useEffect(() => {
		const handleResize = () => {
			setSize(window.innerWidth <= 640);
		};

		const isSmallScreen = window.innerWidth <= 640;
		setSize(
			(location.pathname === "/prodDetail" ||
				location.pathname === "/cart" ||
				location.pathname === "/success") &&
			isSmallScreen,
		);
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [location]);
	return (
		<div
			className="relative z-10 flex items-center justify-between bg-customWhite max-md:justify-center"
			style={{ display: size ? "none" : "flex" }}
		>
			<div className="ml-20 flex items-center justify-between max-xl:ml-[25px] max-xl:w-4/6 max-md:hidden">
				<img
					src="/logo.png"
					alt="logo"
					className="mb-[18.5px] mt-[26.5px] h-12 w-64 max-xl:w-48"
				/>
				<div className="ml-20 max-xl:ml-0 [&>*]:mr-10 [&>*]:font-nunito [&>*]:text-xl [&>*]:font-medium [&>*]:text-darkslategray-100 [&>*]:no-underline max-xl:[&>*]:text-lg max-[1080px]:[&>*]:mr-[15px]">
					<Link to="/">Home</Link>
					<Link to="/">Find Doctors</Link>
					<Link to="/">About Us</Link>
				</div>
			</div>
			<div className="mr-[104px] max-xl:mr-[25px] max-md:hidden [&>*]:cursor-pointer [&>*]:rounded-xl [&>*]:px-5 [&>*]:py-1.5 [&>*]:font-dinpro [&>*]:text-2xl [&>*]:font-medium max-xl:[&>*]:px-3.5 max-xl:[&>*]:py-1.5 max-xl:[&>*]:text-lg">
				<button className="mr-4 border border-customgreen-800 bg-customyellow-200 text-customgreen-800">
					Login
				</button>
				<button className="bg-customgreen-800 text-white">Sign-up</button>
			</div>
			<button
				className="hidden max-md:absolute max-md:left-5 max-md:mt-5 max-md:block max-md:h-3.5 max-md:w-8 max-md:p-0"
				onClick={showSidebarHandler}
			>
				<svg
					width="34"
					height="16"
					viewBox="0 0 34 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1 1H33"
						stroke="#3A643B"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<path
						d="M1.25 8H32.75"
						stroke="#3A643B"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<path
						d="M1.75 15H32.25"
						stroke="#3A643B"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</svg>
			</button>
			<img
				src="/logo.png"
				alt="logo"
				className="hidden max-md:mx-0 max-md:mb-[29px] max-md:mt-[51px] max-md:block max-md:max-h-8"
			/>
			<div
				className="[&>*]:mb-7.5 absolute left-4 top-20 w-[200px] rounded-lg bg-white shadow-md [&>*]:mx-0 [&>*]:mt-5 [&>*]:flex [&>*]:flex-col [&>*]:items-center [&>*]:justify-center [&>*]:gap-2.5"
				style={{ display: sidebar ? "block" : "none" }}
			>
				<div className="[&>*]:text-lg [&>*]:font-medium [&>*]:text-customgray-700">
					<Link to="/">Home</Link>
					<Link to="/">Find Doctors</Link>
					<Link to="/">About Us</Link>
				</div>
				<div className="mb-5 [&>*]:text-xl [&>*]:font-bold [&>*]:text-customgreen-800">
					<button>Login</button>
					<button>Sign-up</button>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
