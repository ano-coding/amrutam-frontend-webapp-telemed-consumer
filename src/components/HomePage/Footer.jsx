const links = [
	'About Us',
	'Terms and Conditions',
	'Privacy Policy',
	'Privacy Policy for Mobile Apps',
	'Shipping and Returns Policy',
	'International Delivery',
	'For Businesses, Hotels and Resorts'
];


const socialIcons = [
	'facebook',
	'instagram',
	'youtube',
	'twitter',
	'linkedin',
	'pinterest'
];



function Footer() {
	return ( 
		<div className="bg-[#3A643B2E] px-4 md:px-2 py-12 flex flex-col flex-wrap  gap-8 md:flex-row md:justify-center ">
			<div className="space-y-4 max-w-[300px]">
				<h4 className="text-[#3A643B] text-[18px] font-bold">Get in touch</h4>
				<div className="text-[18px] space-y-8">
					<p>support@amrutam.co.in</p>
					<p>Amrutam Pharmaceuticals Pvt Ltd., chitragupt ganj, Nai Sadak, Lashkar, Gwalior - 474001</p>
					<p>+91 9713171999</p>
				</div>
				<div className="flex gap-2">
					{
						socialIcons.map((icon, index) => {
							return <img  className='cursor-pointer' key={index} src={`/images/${icon}.png`} alt={icon} />
						})
					}

				</div>
				
			</div>
			<div className="space-y-4 max-w-[300px]">
				<h4 className="text-[#3A643B] text-[18px] font-bold">Information</h4>
				<div className="text-[#474747] space-y-2">
					{
						links.map((link, index) => {
							return <a className="no-underline block" key={index} href={`${link}`}>{link}</a>
						})
					}					
					
				</div>
			</div>
			<div className="max-w-[400px] space-y-4">
				<h4 className="text-[#3A643B] text-[18px] font-bold">Subscribe to our Newsletter and join Amrutam Family today!</h4>
				<div className="flex items-center">
					<input
						type='email'
						className="w-[200px] sm:w-auto px-6 py-4 rounded-l-[40px] focus:outline-none border border-[#3A643B] placeholder:text-[14px] sm:placeholder:text-[18px]"
						placeholder='Your Email Address'
					/>
					<button className="text-white bg-black px-2 py-4 font-bold rounded-r-[40px]">Subscribe</button>
				</div>
			</div>
		</div>

	);
}

export default Footer;
