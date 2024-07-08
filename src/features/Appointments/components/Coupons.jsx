import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { fetchDoctorCoupons } from "../../../services/Appointments";

const COUPONS = [
	{
		id: 'AMU150',
		discount: '20',
		validDate: '01 February 2022'
	},
	{
		id: 'AMU150',
		discount: '40',
		validDate: '01 February 2022'
	},
	{
		id: 'AMU150',
		discount: '60',
		validDate: '01 February 2022'
	},
	{
		id: 'AMU150',
		discount: '60',
		validDate: '01 February 2022',
		img: '/appointments/trees.png'
	},
];

const couponImages = {
	'20': '/appointments/leaf.png',
	'40': '/appointments/leaves.png',
	'60': '/appointments/tree.png'
};

export function Coupons({ setStep }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [couponCode, setCouponCode] = useState('');

	return (
		<div className='border border-[#D7D7D7] rounded-[30px] p-2 md:p-8'>
			<h2 className='sm:text-center md:text-left font-sans text-[24px]'>Apply Coupon</h2>
			<div className='relative my-6'>
				<input
					type='text'
					value={couponCode}
					onChange={(e) => setCouponCode(e.target.value)}
					placeholder='Enter Coupon Code'
					className='w-[100%] pl-6 pr-20 py-4 placeholder:text-[#A0A0A0] font-bold font-nunito focus:outline-none border border-[#D7D7D7] rounded-2xl'
				/>
				<button
					onClick={() => {
						searchParams.set('couponId', couponCode);
						setSearchParams(searchParams);
						setStep(3);
					}}
					className='absolute top-[20px] right-6 text-[#28643B] text-sm font-bold'>
					Apply
				</button>
			</div>
			<BestCouponList
				searchParams={searchParams}
				setSearchParams={setSearchParams}
				setStep={setStep}>				
			</BestCouponList>
			
		</div>
	)
}


function BestCouponList({searchParams, setSearchParams, setStep}) {
	const { data: coupons, isLoading } = useQuery({
		queryFn: () => fetchDoctorCoupons(),
		queryKey: ['coupons']
	});


	if (isLoading) {
		return <div>... Coupons are loading</div>
	}

	return (
		<div>
			<h3 className='font-dmsans font-medium'>Best Coupons</h3>
			{coupons.map((coupon, index) => {
				return (
					<div key={index} className='flex'>
						<div className='relative h-[110px]'>
							<img
								src='/appointments/coupon.png'
								alt='Coupon'
								className='h-[100%]'
							/>
							<div
								className='absolute flex items-center justify-center pr-[8px] lg:pr-6 h-[80px] top-[14px] left-8 sm:left-6 lg:left-10 z-10 border-r-[2px] border-dashed border-[#66666633]'
							>
								<img
									src={'/appointments/leaf.png'}
									alt='Coupon Image'
									className='scale-75 lg:scale-100'
								/>
							</div>
							<div
								className='absolute font-montserrat z-10 left-[100px] sm:left-[80px] lg:left-[130px] top-6'
							>
								<h4 className='font-semibold lg:text-xl'>{coupon.couponDetails.couponCode}</h4>
								<p className='text-[10px] font-medium'>{coupon.couponDetails.description}</p>
								<p className='text-[10px] font-medium text-[#0000004D]'>Valid until </p>
							</div>

							<button
								onClick={() => {
									searchParams.set('couponId', coupon.couponDetails.couponCode);
									setSearchParams(searchParams);
									setStep(3);
								}}
								className='absolute top-[45px] lg:top-[42px] right-10 sm:right-6 md:right-10 lg:right-14 font-nunito font-bold text-[#28643B] text-xs lg:text-sm'
							>
								Apply
							</button>

						</div>
					</div>
				)
			})}
		</div>
	)

}



export default Coupons;