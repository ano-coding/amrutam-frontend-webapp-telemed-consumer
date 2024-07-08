import Coupons from "../features/Appointments/components/Coupons";
import AppointmentDetails from "../features/Appointments/components/AppointmentDetails";

function CouponsPage() {
	return ( 
		<div className='sm:grid grid-cols-2'>
			<AppointmentDetails></AppointmentDetails>
			<div className='px-2 xl:w-[80%] mx-auto py-16'>
				<Coupons></Coupons>
			</div>
		</div>

	);
}

export default CouponsPage;