import {  useRef } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

function Header() {
  const ref = useRef(null);
  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div>
            <nav className="bg-oldlace">
              <div className="mx-auto max-w-7xl px-4 sm:px-4 lg:px-6">
                <div className="flex h-24 items-center justify-between">
                  <div className="block flex-shrink-0 lg:hidden">
                    <Link to={"/"}>
                      <img src="/logo.svg" />
                    </Link>
                  </div>
                  <div className="hidden w-full lg:flex">
                    <div className="flex w-full  flex-row items-center justify-around">
                      <nav className="flex  justify-between gap-5 lg:gap-16">
                        <Link to={"/"}>
                          <img src="/logo.svg" />
                        </Link>
                        <ul className=" hidden items-center gap-10 text-xl lg:flex">
                          <li className=" group font-dinpro-medium capitalize duration-200 active:scale-90 ">
                            <Link to={"/"}>Home</Link>
                            <span className="block h-0.5 max-w-0  rounded-full  bg-black transition-all  duration-500 ease-in-out  group-hover:max-w-full"></span>
                          </li>
                          <li className="group cursor-pointer font-dinpro-bold capitalize text-darkolivegreen-200  duration-200 active:scale-90 ">
                            <Link to={"/"}>Find Doctors</Link>
                            <span className="block h-0.5 max-w-0  rounded-full  bg-darkolivegreen-200 transition-all  duration-500 ease-in-out group-hover:max-w-full"></span>
                          </li>

                          <li className="group cursor-pointer font-dinpro-medium capitalize duration-200 active:scale-90">
                            About Us
                            <span className="block h-0.5 max-w-0  rounded-full  bg-black transition-all  duration-500 ease-in-out  group-hover:max-w-full"></span>
                          </li>
                        </ul>
                      </nav>
                      <div className="flex gap-4">
                        <button className=" rounded-xl border-2 border-darkolivegreen-200 bg-oldlace px-8 pb-3 pt-2 font-dinpro-bold text-2xl text-darkolivegreen-200 transition duration-100 ease-in-out hover:-translate-y-0.5  hover:border-darkolivegreen-300 hover:text-darkolivegreen-300  active:scale-90 ">
                          Login
                        </button>
                        <button className=" rounded-xl bg-darkolivegreen-200  px-8 pb-3 pt-2 font-dinpro-medium  text-2xl text-white transition delay-75 duration-100 ease-in-out  hover:-translate-y-0.5 hover:bg-darkolivegreen-300  active:scale-90  ">
                          Sign-Up
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="-mr-2 flex lg:hidden">
                    <Disclosure.Button
                      type="button"
                      className="mr-3 inline-flex items-center justify-center rounded-md bg-darkolivegreen-200 p-2 text-white  hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      aria-controls="mobile-menu"
                      aria-expanded="false"
                    >
                      {!open ? (
                        <svg
                          className="block h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="block h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Transition
                enter="transition ease-out duration-100 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Disclosure.Panel className="lg:hidden" id="mobile-menu">
                  <div ref={ref} className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    <Disclosure.Button
                      as={Link}
                      to={"/"}
                      className="block rounded-md px-7 py-2 font-dinpro text-lg   hover:bg-darkolivegreen-100"
                    >
                      Home
                    </Disclosure.Button>

                    <Disclosure.Button
                      as={Link}
                      to={"/"}
                      className="block rounded-md px-7 py-2  font-dinpro-bold text-lg   capitalize text-darkolivegreen-200 hover:bg-darkolivegreen-100 "
                    >
                      Find Doctors
                    </Disclosure.Button>

                    <Disclosure.Button
                      as={Link}
                      to={"#"}
                      className="block rounded-md px-7 py-2  font-dinpro  text-lg hover:bg-darkolivegreen-100 "
                    >
                      About Us
                    </Disclosure.Button>

                    <Disclosure.Button className="ml-7  block w-28 rounded-lg border-2 border-darkolivegreen-200 bg-oldlace px-1.5 pb-2 pt-1 font-dinpro-bold text-xl text-darkolivegreen-200">
                      Login
                    </Disclosure.Button>
                    <Disclosure.Button className="  ml-7  block w-28 rounded-lg bg-darkolivegreen-200 px-1.5 pb-2 pt-1 font-dinpro-medium  text-xl text-white ">
                      Sign-Up
                    </Disclosure.Button>
                  </div>
                </Disclosure.Panel>
              </Transition>
            </nav>
          </div>
        </>
      )}
    </Disclosure>
  );
}

export default Header;
