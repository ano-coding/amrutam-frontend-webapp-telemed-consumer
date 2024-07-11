import { Link } from "react-router-dom";

function PageNotFound() {
	return (
		<>
			<div className="hidden px-10 xl:px-20 py-20 bg-[#F7FCFA] lg:flex items-end justify-between w-full h-full border">
				<div className="font-sans space-y-4">
					<h1 className="text-[64px]">Page not found</h1>
					<p className="max-w-[420px]">The page you are looking for was moved, removed, renamed, or might never have existed.
						If you are still lost. Try using a search in the top menu or return to the homepage.
					</p>
					<Link
						to='/'
						className='flex items-center justify-center w-[374px] bg-[#3A643B] text-white font-semibold py-4 rounded-xl'
					>
						Return to Home
					</Link>
				</div>
				<div className="relative shrink-0  w-[400px] h-[400px]">
					<img
						src='/pageNotFound/background.png'
						alt='Background'
						className="absolute"
					/>
					<img
						src='/pageNotFound/base.png'
						alt='Base'
						className="absolute bottom-[-20px]"
					/>
					<img
						src='/pageNotFound/cloud1.png'
						alt='cloud1'
						className="absolute top-[50px] right-5"
					/>
					<img
						src='/pageNotFound/cloud2.png'
						alt='cloud2'
						className="absolute top-[120px] left-[-20px]"
					/>
					<img
						src='/pageNotFound/bird.png'
						alt='cloud2'
						className="absolute top-[180px] left-[100px]"
					/>
					<img
						src='/pageNotFound/tree1.png'
						alt='tree1'
						className="absolute bottom-[-10px] right-20"
					/>
					<img
						src='/pageNotFound/tree2.png'
						alt='tree2'
						className="absolute bottom-[-10px] right-10"
					/>
				</div>
			</div>
			<div className="w-full h-full flex flex-col items-center space-y-10 lg:hidden pb-[100px] pt-10 sm:pt-0 sm:pb-10 bg-[#F7FCFA]  border">
				<div className="relative shrink-0  w-[300px] sm:w-[400px] h-[400px]">
					<img
						src='/pageNotFound/background.png'
						alt='Background'
						className="absolute"
					/>
					<img
						src='/pageNotFound/base.png'
						alt='Base'
						className="absolute bottom-[-20px]"
					/>
					<img
						src='/pageNotFound/cloud1.png'
						alt='cloud1'
						className="absolute top-[50px] right-5"
					/>
					<img
						src='/pageNotFound/cloud2.png'
						alt='cloud2'
						className="absolute top-[120px] left-[-20px]"
					/>
					<img
						src='/pageNotFound/bird.png'
						alt='cloud2'
						className="absolute top-[180px] left-[100px]"
					/>
					<img
						src='/pageNotFound/tree1.png'
						alt='tree1'
						className="absolute bottom-[-10px] right-20"
					/>
					<img
						src='/pageNotFound/tree2.png'
						alt='tree2'
						className="absolute bottom-[-10px] right-10"
					/>
				</div>
				<div className="font-sans space-y-4">
					<h1 className="text-[40px] md:text-[64px] px-4">Page not found</h1>
					<p className="max-w-[420px] px-4">The page you are looking for was moved, removed, renamed, or might never have existed.
						If you are still lost. Try using a search in the top menu or return to the homepage.
					</p>
					<Link
						to='/'
						className='flex items-center justify-center w-[350px] mx-auto sm:mx-0 sm:w-[374px] bg-[#3A643B] text-white font-semibold py-4 rounded-xl'
					>
						Return to Home
					</Link>
				</div>
				

			</div>
		</>



	);
}

export default PageNotFound;