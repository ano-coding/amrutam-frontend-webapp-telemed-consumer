import { Fragment, useState } from "react";
import {
  Dialog,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  Popover,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useSearchParams } from "react-router-dom";
import { fetchLanguages } from "../../../services/Doctor";
import { useQuery } from "@tanstack/react-query";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// const filters = [
// 	{
// 		id: "speciality",
// 		name: "Expertise",
// 		options: [
// 			{ value: "Heart", label: "Heart" },
// 			{ value: "Head", label: "Head" },
// 			{ value: "Skin", label: "Skin" },
// 			{ value: "Bone", label: "Bone" },
// 		],
// 	},
// 	{
// 		id: "gender",
// 		name: "Gender",
// 		options: [
// 			{ value: "Female", label: "Female" },
// 			{ value: "Male", label: "Male" },
// 		],
// 	},
// 	{
// 		id: "fees",
// 		name: "Fees",
// 		options: [
// 			{ value: "0-500", label: "Rs.0 - Rs.500" },
// 			{ value: "500-1000", label: "Rs.500 - Rs.1000" },
// 			{ value: "1000-1500", label: "Rs.1000 - Rs.1500" },
// 		],
// 	},
// 	{
// 		id: "languages",
// 		name: "Languages",
// 		options: [
// 			{ value: "English", label: "English" },
// 			{ value: "Hindi", label: "Hindi" },
// 			{ value: "Sanskrit", label: "Sanskrit" },
// 		],
// 	},
// ];

function Filters({ filteredSpecialities }) {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({});
  const paramsObject = Object.fromEntries(searchParams);
  const paramsArray = Object.entries(paramsObject);

  const { data: languages, isLanguagesLoading } = useQuery({
    queryFn: () => fetchLanguages(),
    queryKey: ["languages"],
  });

  const filters = [
    {
      id: "specialities",
      name: "Expertise",
      options: filteredSpecialities,
    },
    {
      id: "gender",
      name: "Gender",
      options: [
        { value: "Female", label: "Female" },
        { value: "Male", label: "Male" },
      ],
    },
    {
      id: "fees",
      name: "Fees",
      options: [
        { value: "0-500", label: "Rs.0 - Rs.500" },
        { value: "500-1000", label: "Rs.500 - Rs.1000" },
        { value: "1000-1500", label: "Rs.1000 - Rs.1500" },
      ],
    },
    {
      id: "languages",
      name: "Languages",
      options: languages,
    },
  ];

  if (isLanguagesLoading) {
    return <div>...Languages are loading</div>;
  }

  return (
    <div>
      {/* Mobile filter dialog */}
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex md:hidden"
          onClose={setOpen}
        >
          <TransitionChild
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-[#676767] bg-opacity-25 transition-opacity"
            />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-[#e2e2e2] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/*Mobile Filters */}
              <form className="mt-4">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.name}
                    className="border-t border-[#767676] px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <DisclosureButton className="font-dinpro flex w-full items-center justify-between bg-white px-2 py-3 text-base text-[#e2e2e2]">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              <ChevronDownIcon
                                className={classNames(
                                  open ? "-rotate-180" : "rotate-0",
                                  "h-5 w-5 transform",
                                )}
                                aria-hidden="true"
                              />
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                          <div className="space-y-6">
                            {section.options?.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="font-dinpro flex items-center font-medium"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  onClick={() => {
                                    searchParams.set(
                                      `${section.id}`,
                                      `${option.value}`,
                                    );
                                    setSearchParams(searchParams);
                                  }}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="radio"
                                  className="h-4 w-4 rounded border-[#f0f0f0] text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-[#676767]"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </div>
          </TransitionChild>
        </Dialog>
      </Transition>
      <section className="border-whitesmoke-200 flex max-w-full items-center justify-center border-[1px] border-solid">
        <div className="mx-10 flex w-full items-center justify-end pb-3 pt-4 md:hidden">
          <button
            type="button"
            className="bg-whitesmoke-100 font-dinpro-medium rounded-lg px-4 py-[9px] text-end text-base text-gray-700 hover:text-gray-900 md:hidden"
            onClick={() => setOpen(true)}
          >
            Filters
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex w-3/4 flex-wrap items-center justify-between gap-3 bg-white pb-3 pt-4">
            <Popover.Group className="hidden space-x-6 md:flex md:items-baseline lg:space-x-8">
              {filters.map((section) => (
                <Menu
                  as="div"
                  key={section.name}
                  id="desktop-menu"
                  className="active:border-whitesmoke-100 relative z-10 inline-block text-left"
                >
                  <div>
                    <Menu.Button className="bg-whitesmoke-100 hover:bg-whitesmoke-200 group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-lg px-2 py-[9px] text-gray-700 hover:text-gray-900 focus:outline-none lg:gap-8 lg:px-[13px]">
                      <span className="font-dinpro-medium text-dimgray-300 text-base">
                        <span>{section.name}</span>
                        <span
                          className={`ml-1.5 rounded px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-900`}
                        >
                          {paramsArray
                            .filter((choice) => choice[0] === section.id)
                            .at(0)
                            ?.at(1) ? (
                            <span className="text-lg">&#9733;</span>
                          ) : (
                            ""
                          )}
                        </span>
                      </span>
                      <ChevronDownIcon
                        className="ml-1 mr-1 h-5 w-5 flex-shrink-0 text-[#e2e2e2] group-hover:text-gray-900"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="no-scrollbar font-dinpro-medium absolute right-0 z-50 mt-2 max-h-[40vh] w-44 origin-top-right overflow-y-scroll rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {section.options?.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={classNames(
                                  active
                                    ? "bg-whitesmoke-100 text-gray-900"
                                    : "text-gray-700",
                                  "block w-full px-4 py-2 text-left text-sm",
                                )}
                                onClick={() => {
                                  searchParams.set(
                                    `${section.id}`,
                                    `${option.value}`,
                                  );
                                  setSearchParams(searchParams);
                                }}
                              >
                                {option.label}
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              ))}
              <Popover
                as="div"
                id="desktop-menu"
                className="relative z-10 inline-block text-left"
              >
                <div>
                  <Popover.Button className="bg-beige text-darkolivegreen-200 hover:bg-primary-tint-1 hover:text-darkolivegreen-300 group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-lg px-2 py-[9px] lg:gap-8 lg:px-[13px]">
                    <span className="font-dinpro-medium text-dimgray-300 text-base">
                      {"All Filters"}
                    </span>
                    <ChevronDownIcon
                      className="ml-1 mr-1 h-5 w-5 flex-shrink-0 text-[#e2e2e2] group-hover:text-gray-900"
                      aria-hidden="true"
                    />
                  </Popover.Button>
                </div>
              </Popover>
            </Popover.Group>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Filters;
