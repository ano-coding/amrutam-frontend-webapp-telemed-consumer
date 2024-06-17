import {
	Dialog,
	DialogPanel,
	Transition,
	TransitionChild,
} from "@headlessui/react";
import { useReport } from "./ReportContext";


export default function ReportFormModalWindow({ children }) {
	const { showReportForm, setShowReportForm } = useReport();

	return (
		<Transition show={showReportForm}>
			<Dialog className="relative z-10" onClose={setShowReportForm}>
				<TransitionChild
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" />
				</TransitionChild>

				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
						<TransitionChild
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<DialogPanel className="relative p-4 transform  overflow-hidden rounded-[8px] bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
								<img src='/close-circle.png' alt='close circle' className="absolute right-4 top-2 cursor-pointer" onClick={() => setShowReportForm(false)} />
								{children}
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}