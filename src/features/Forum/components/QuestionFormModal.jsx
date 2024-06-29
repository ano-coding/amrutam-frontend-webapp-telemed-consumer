import {
	Dialog,
	DialogPanel,
	Transition,
	TransitionChild,
} from "@headlessui/react";


export default function QuestionFormModalWindow({ showForm, setShowForm, children }) {

	return (
		<Transition show={showForm}>
			<Dialog className="relative z-10" onClose={setShowForm}>
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
					<div className="flex min-h-full justify-center p-4 items-center sm:p-0">
						<TransitionChild
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<DialogPanel className="w-[100%] sm:w-[90%] relative py-4 pl-4 pr-4 sm:pr-16 transform  overflow-hidden rounded-[8px] bg-white shadow-xl transition-all max-w-[1250px]">
								<img src='/close-circle.png' alt='close circle' className="absolute right-4 top-2 cursor-pointer" onClick={() => setShowForm(false)} />
								{children}
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}