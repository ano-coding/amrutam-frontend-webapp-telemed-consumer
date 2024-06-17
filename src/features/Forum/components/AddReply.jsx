import { Fragment, useRef, useState } from "react";
import useForumPost from "./useForumPost";
import ReactPlayer from "react-player";
import AttachmentSvg from "../../../assets/attachment.svg?react";
import RedCrossSvg from "../../../assets/red-cross.svg?react";
import TrashSvg from "../../../assets/trash.svg?react";
import DocumentSvg from "../../../assets/document.svg?react";
import DownloadSvg from "../../../assets/download.svg?react";
import PopOverMenu from "./PopOverMenu";
import { CloseButton } from "@headlessui/react";

const AddReply = () => {
	const { setIsShowAddReply } = useForumPost();
	const fileInputRef = useRef(null);
	const [files, setFiles] = useState([]);
	console.log(files);

	const handleButtonClick = () => {
		fileInputRef.current.click();
	};

	const handleFileChange = (event) => {
		const selectedFiles = Array.from(event.target.files);
		setFiles(selectedFiles);
	};

	return (
		<div className="mt-5 block w-11/12 space-y-5 md:flex md:gap-[41px] md:space-y-0">
			<img src="/person2.png" className="size-[52px] rounded-full" />
			<div className="flex flex-1 flex-col gap-3">
				<textarea
					rows={6}
					className="box-border w-full rounded-[11px] border-[1px] border-solid border-[#E0E0E0] px-[14px] py-6 font-poppins text-[15.2px] leading-[19.77px] text-gray-600 placeholder:text-[#7B7B7B] focus:outline-none"
					placeholder="Write your answer"
				/>
				<div className={`relative ${files.length ? "hidden" : "block"}`}>
					<input
						onClick={handleButtonClick}
						className="h-[49px] w-full cursor-pointer rounded-[11px] border-[1px] border-solid border-[#E0E0E0] px-[14px] font-poppins text-[15.2px] leading-[19.77px] text-neutral-500 caret-transparent placeholder:text-[#7B7B7B] focus:outline-none disabled:bg-white"
						placeholder="Add attachments"
						readOnly
					/>
					<AttachmentSvg
						onClick={handleButtonClick}
						className="absolute right-3 top-[12px] size-5"
					/>
					<input
						type="file"
						ref={fileInputRef}
						className="hidden"
						onChange={handleFileChange}
						multiple
						accept="image/*,video/*,.pdf"
					/>
				</div>
				<div className="flex flex-wrap gap-4">
					{files.map((file, index) => (
						<Fragment key={index}>
							{file.type.startsWith("image/") && (
								<div className="relative">
									<img
										src={URL.createObjectURL(file)}
										alt={file.name}
										className="size-[250px] rounded-xl object-cover"
									/>
									<RedCrossSvg
										onClick={() =>
											setFiles((files) =>
												files.filter((f) => f.name !== file.name),
											)
										}
										className="absolute right-2 top-2 z-50 block h-6 w-6 cursor-pointer"
									/>
								</div>
							)}
						</Fragment>
					))}
				</div>
				<div className="flex flex-wrap gap-4 overflow-hidden">
					{files.map((file) => {
						if (file.type.startsWith("video/")) {
							return (
								<div
									key={file.name}
									className="relative overflow-hidden rounded-xl"
								>
									<ReactPlayer
										width={"320px"}
										height={"180px"}
										controls={true}
										url={URL.createObjectURL(file)}
									/>
									<RedCrossSvg
										onClick={() =>
											setFiles((files) =>
												files.filter((f) => f.name !== file.name),
											)
										}
										className="absolute right-2 top-2 z-50 block h-6 w-6 cursor-pointer"
									/>
								</div>
							);
						}
					})}
				</div>
				<div className="flex flex-wrap gap-4 overflow-hidden">
					{files.map((file, index) => (
						<Fragment key={index}>
							{file.type === "application/pdf" && (
								<Fragment>
									<div className="relative hidden aspect-video w-full overflow-hidden rounded-xl border-2 border-solid border-neutral-600 sm:h-[200px] sm:w-[320px] md:block">
										<embed
											src={`${URL.createObjectURL(file)}`}
											type="application/pdf"
											className="h-full w-full"
										/>
										<RedCrossSvg
											onClick={() =>
												setFiles((files) =>
													files.filter((f) => f.name !== file.name),
												)
											}
											className="absolute right-2 top-2 z-50 block h-6 w-6 cursor-pointer"
										/>
									</div>
									<div
										className="flex w-full gap-4 overflow-hidden rounded-lg border-[1.8px] border-solid border-neutral-300 px-[17px] py-[16px] sm:gap-[22px] md:hidden md:w-[432px]"
										key={URL.createObjectURL(file)}
									>
										<div className="box-border rounded-lg bg-[#3a643b] px-[21px] py-[18px]">
											<DocumentSvg className="fill-neutral-300" />
										</div>
										<div className="flex w-full flex-col overflow-hidden">
											<div className="overflow-hidden overflow-ellipsis whitespace-nowrap font-poppins text-lg font-medium tracking-[-0.01em] text-black sm:text-[20px]">
												{file.name}
											</div>
											<div className="flex gap-3 font-poppins text-[16px] font-medium tracking-[-0.01em] text-[#8D8D8D]">
												<span>1.2 MB</span>
												<span className="uppercase">pdf</span>
											</div>
										</div>
										<PopOverMenu
											render={() => (
												<>
													<CloseButton
														onClick={() => {
															window.open(URL.createObjectURL(file), "_blank");
														}}
														className="flex w-full cursor-pointer items-center justify-start gap-[21px] border-b-[1.5px] border-solid border-[#EDEDED] px-[20px] pb-[11px] pt-[10px] text-base"
													>
														<DownloadSvg className="h-[21px] cursor-pointer" />
														<span className="cursor-pointer select-none">
															Download
														</span>
													</CloseButton>
													<CloseButton
														onClick={() =>
															setFiles((files) =>
																files.filter((f) => f.name !== file.name),
															)
														}
														className="flex w-full cursor-pointer items-center justify-start gap-[21px] border-b-[1.5px] border-solid border-[#EDEDED] px-[20px] pb-[11px] pt-[10px] text-base"
													>
														<TrashSvg className="h-[21px] cursor-pointer" />
														<span className="cursor-pointer select-none">
															Remove
														</span>
													</CloseButton>
												</>
											)}
											dotClassNames={"size-5 fill-[#8D8D8D]"}
											panelWidth="150px"
										/>
									</div>
								</Fragment>
							)}
						</Fragment>
					))}
				</div>
				<div className="mt-1.5 flex gap-5 self-end">
					<button
						onClick={() => setIsShowAddReply(false)}
						className="rounded-lg border border-solid border-[#3a643b] px-4 py-2.5 text-center font-poppins text-[14px] font-medium tracking-[-0.01em] text-[#3a643b] sm:w-[116px]"
					>
						Cancel
					</button>
					<button className="rounded-lg bg-[#3a643b] px-4 py-2.5 text-center font-poppins text-[14px] font-medium tracking-[-0.01em] text-white sm:w-[116px]">
						Upload
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddReply;
