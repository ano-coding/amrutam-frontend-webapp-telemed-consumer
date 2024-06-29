import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import { useSearchParams } from "react-router-dom";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const SEARCH_OPTIONS = [
	"India",
	"Ghana",
	"Fort Paulmouth",
	"Nienowton",
	"East Maxinestead",
	"Enosboro",
	"Fort Savannahport",
	"Beckerchester",
	"Port Mable",
	"Vernicestad",
	"East Dashawnport",
	"Hoegerside",
	"Lake Estabury",
];

function SearchBar() {
	const [searchParams, setSearchParams] = useSearchParams();
	const location = searchParams.get("location") || "";
	const name = searchParams.get("name") || "";

	const [search, setSearch] = useState(name || "");
	return (
		<section className="relative h-56 max-w-full  bg-primary-tint-2">
			<div className="absolute bottom-[50%] flex h-28 w-full items-end justify-around gap-[30%] overflow-hidden  lg:gap-[50%]">
				<div className="h-44 w-44 rounded-[50%] bg-beige" />
				<div className="h-44 w-44 rounded-[50%] bg-beige" />
			</div>
			<div className="absolute top-[50%] flex h-28 w-full justify-around gap-[1%] overflow-hidden lg:gap-[20%]">
				<div className="h-44 w-44 rounded-[50%] bg-beige" />
				<div className="h-44 w-44 rounded-[50%] bg-beige" />
			</div>


			<div className="  flex h-full flex-col items-center justify-center">
				<h1 className="z-10 pb-2 text-center font-gotham text-xl capitalize md:text-2xl lg:text-4xl">
					Find expert Doctors for an In-clinic session here
				</h1>

				<div className="  flex  max-w-full shrink-0 flex-row  px-20 py-0">
					<div className="flex max-w-full flex-1 shrink-0 flex-row flex-wrap items-start justify-center gap-1 ">
						<div className="flex flex-col items-start justify-start pb-0 pl-0 pr-[4.9px] pt-2">
							<Menu as="div" className="relative inline-block text-left">
								<Menu.Button className="relative flex flex-row items-start justify-start">
									<div className="z-10 flex  flex-row items-start justify-start gap-2 rounded-lg border-[1px] border-solid border-lightgray-100 bg-white py-[13px]  pl-3 pr-2.5">
										<img
											className="relative h-6 min-h-[24px] w-6 shrink-0 overflow-hidden"
											alt="Location"
											src="/location.svg"
										/>
										<div className=" relative inline-block min-w-[120px] text-left  text-base leading-[24px] tracking-[0.01em] text-gray-200">
											{location ? location : `Select Location`}
										</div>
										<div className="flex flex-col items-start justify-start px-0 pb-0 pt-0.5">
											<ChevronDownIcon className="relative h-5 w-5 shrink-0 overflow-hidden" />
										</div>
									</div>
								</Menu.Button>
								<Transition
									as={Fragment}
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items className="absolute right-0 z-30 mt-2 w-full sm:w-56 origin-top-right rounded-md bg-white font-dinpro-medium shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
										<div className="z-30 py-1 max-h-[50vh] overflow-y-scroll no-scrollbar">
											{SEARCH_OPTIONS.length > 0 &&
												SEARCH_OPTIONS.map((option) => (
													<div key={option}>
														<Menu.Item>
															{({ active }) => (
																<button
																	onClick={() => {
																		searchParams.set("location", option);
																		setSearchParams(searchParams);
																	}}
																	className={classNames(
																		active
																			? "bg-whitesmoke-100 text-gray-900"
																			: "text-gray-700",
																		"block w-full px-4 py-2 text-left text-sm",
																	)}
																>
																	{option}
																</button>
															)}
														</Menu.Item>
													</div>
												))}
										</div>
									</Menu.Items>
								</Transition>
							</Menu>
						</div>
						<div className="box-border flex min-w-[309px] max-w-full flex-1 flex-col items-start justify-start px-0 pb-0 pt-2">
							<div className=" z-10 box-border flex max-w-full flex-row items-start justify-between gap-[20px] self-stretch overflow-hidden rounded-lg border-[1px] border-solid border-lightgray-200 bg-white py-[13px] pl-[9px] pr-[11px]">
								<input
									className="box-border flex h-[21.5px] w-[321.8px] max-w-[calc(100%_-_48px)] flex-col items-start justify-start bg-[transparent] px-0 pb-0 pt-[2.5px] text-base text-gray-100 [border:none] [outline:none] focus:ring-0  "
									placeholder="eg. Doctor, specialisation, clinic name"
									type="text"
									value={search}
									onKeyDown={(event) => {
										if (event.key === "Enter") {
											searchParams.set("name", search);
											setSearchParams(searchParams);
											setSearch("");
										}
									}}
									onChange={(e) => {
										setSearch(e.target.value);
									}}
								/>
								<img
									className="relative h-6 min-h-[24px] w-7 duration-75 hover:opacity-60 active:scale-90"
									alt="Right Arrow"
									src="/iconsarrow-forward-24px.svg"
									onClick={() => {
										searchParams.set("name", search);
										setSearchParams(searchParams);
										setSearch("");
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SearchBar;
