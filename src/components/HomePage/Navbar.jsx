import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { UserContext } from "../../context/UserContext";

const NAV_LINKS = [
  {
    name: "Commune",
    path: "/commune",
  },
  {
    name: "Questionnaire",
    path: "/questionnaire",
  },
  {
    name: "Routine",
    path: "/routines",
  },
];

function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { token, phoneNumber, name } = useContext(UserContext);

  function toggleShowNav() {
    setShowNav(!showNav);
  }

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  return (
    <div className="relative bg-customyellow-200 py-6">
      {isLoggedIn ? (
        <div className="absolute left-5 top-8 flex items-center justify-start gap-3 max-sm:hidden">
          <img src="/phone.svg" alt="phone" />{" "}
          <span className="text-xl text-[#3A643C] max-lg:text-[16px] max-md:text-sm">
            {"+ " + phoneNumber}
          </span>
        </div>
      ) : (
        ""
      )}
      <img
        className="mx-auto max-sm:h-[24px] max-sm:w-[122px] sm:mb-8"
        src="/logo.png"
        alt="Amrutam Logo"
      />
      <div className="hidden items-center justify-center gap-8 sm:flex">
        <Link
          onClick={toggleShowNav}
          className="block text-customgray-700 hover:text-customgreen-800 focus:font-semibold md:text-[20px]"
          to={"/"}
        >
          Home
        </Link>
        <Link
          onClick={toggleShowNav}
          className="block text-customgray-700 hover:text-customgreen-800 focus:font-semibold md:text-[20px]"
          to={"/find-doctors"}
        >
          Find Doctors
        </Link>

        <Menu>
          <MenuButton
            as="div"
            className="flex cursor-pointer items-center justify-start text-customgray-700 hover:text-customgreen-800 focus:font-semibold md:text-[20px]"
          >
            <span>Services</span>
            <ChevronDownIcon className="h-[20px] w-[30px]" />
          </MenuButton>
          <MenuItems
            anchor="bottom"
            className="font-dinpro-medium absolute right-0 z-30 mt-2 w-full origin-top-right rounded-md bg-white py-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:w-40"
          >
            {NAV_LINKS.map((navlink, index) => {
              return (
                <MenuItem
                  key={index}
                  className="text-md block w-full px-4 py-2 text-left text-gray-900"
                >
                  <a
                    className="block data-[focus]:bg-whitesmoke-100"
                    href={navlink.path}
                  >
                    {navlink.name}
                  </a>
                </MenuItem>
              );
            })}
          </MenuItems>
        </Menu>
        <Link
          onClick={toggleShowNav}
          className="block text-customgray-700 hover:text-customgreen-800 focus:font-semibold md:text-[20px]"
          to={"/"}
        >
          About Us
        </Link>
        <Link
          onClick={toggleShowNav}
          className="block text-customgray-700 hover:text-customgreen-800 focus:font-semibold md:text-[20px]"
          to={"/store"}
        >
          Store
        </Link>
        {isLoggedIn ? (
          ""
        ) : (
          <Menu>
            <MenuButton
              as="div"
              className="flex cursor-pointer items-center justify-start text-customgray-700 hover:text-customgreen-800 focus:font-semibold md:text-[20px]"
            >
              <span>Login</span>
              <ChevronDownIcon className="h-[20px] w-[30px]" />
            </MenuButton>
            <MenuItems
              anchor="bottom"
              className="font-dinpro-medium absolute right-0 z-30 mt-2 w-full origin-top-right rounded-md bg-white py-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:w-40"
            >
              <MenuItem className="text-md block w-full px-4 py-2 text-left text-gray-900">
                <a
                  className="block data-[focus]:bg-whitesmoke-100"
                  href={"/login"}
                >
                  Login
                </a>
              </MenuItem>
              <MenuItem className="text-md block w-full px-4 py-2 text-left text-gray-900">
                <a
                  className="block data-[focus]:bg-whitesmoke-100"
                  href={"/signup"}
                >
                  Sign up
                </a>
              </MenuItem>
            </MenuItems>
          </Menu>
        )}
      </div>
      {isLoggedIn ? (
        <div className="absolute right-8 top-24 max-lg:right-4 max-sm:top-5">
          <Menu>
            <MenuButton
              as="div"
              className="flex cursor-pointer items-center justify-start gap-2"
            >
              <img
                src="/user.png"
                alt="dummy-user"
                className="h-[43px] w-[43px] rounded-full max-sm:h-[31px] max-sm:w-[31px]"
              />
              <span className="text-xl text-[#474747] max-xl:hidden">
                {name}
              </span>
              <ChevronDownIcon className="h-[20px] w-[30px] max-xl:hidden" />
            </MenuButton>
            <MenuItems
              anchor="bottom"
              className="font-dinpro-medium absolute right-0 z-30 mt-2 w-40 origin-top-right rounded-md bg-white py-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <MenuItem className="text-md block w-full px-4 py-2 text-left text-gray-900">
                <a className="block data-[focus]:bg-whitesmoke-100" href={"/"}>
                  View Profile
                </a>
              </MenuItem>
              <MenuItem className="text-md block w-full px-4 py-2 text-left text-gray-900">
                <a className="block data-[focus]:bg-whitesmoke-100" href={"/"}>
                  Logout
                </a>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      ) : (
        ""
      )}
      <div className="absolute right-4 top-6 hidden max-sm:block">
        {!isLoggedIn && (
          <Menu>
            <MenuButton
              as="div"
              className="flex cursor-pointer items-center justify-start text-customgray-700 hover:text-customgreen-800 focus:font-semibold max-sm:left-0 md:text-[20px]"
            >
              <span>Login</span>
              <ChevronDownIcon className="h-[20px] w-[30px]" />
            </MenuButton>
            <MenuItems
              anchor="bottom"
              className="font-dinpro-medium absolute right-0 z-30 mt-2 w-40 origin-top-right rounded-md bg-white py-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <MenuItem className="text-md block w-full px-4 py-2 text-left text-gray-900">
                <a
                  className="block data-[focus]:bg-whitesmoke-100"
                  href={"/login"}
                >
                  Login
                </a>
              </MenuItem>
              <MenuItem className="text-md block w-full px-4 py-2 text-left text-gray-900">
                <a
                  className="block data-[focus]:bg-whitesmoke-100"
                  href={"/signup"}
                >
                  Sign up
                </a>
              </MenuItem>
            </MenuItems>
          </Menu>
        )}
      </div>
      <div className="absolute left-2 top-2 flex h-[50px] w-[50px] items-center justify-center rounded-full sm:hidden">
        {showNav && (
          <img
            className="h-[30px] w-[30px]"
            onClick={toggleShowNav}
            src="/cross.svg"
            alt="Cross Icon"
          />
        )}
        {!showNav && (
          <img
            className="h-[30px] w-[30px]"
            onClick={toggleShowNav}
            src="/bars-3.svg"
            alt="hamburger"
          />
        )}
      </div>

      {showNav && (
        <div className="absolute left-0 right-0 top-16 z-20 space-y-4 bg-customyellow-200 px-8 py-4 sm:hidden">
          <Link
            onClick={toggleShowNav}
            className="block text-customgray-700 hover:text-customgreen-800 focus:font-semibold md:text-[20px]"
            to={"/"}
          >
            Home
          </Link>
          <Link
            onClick={toggleShowNav}
            className="block text-customgray-700 hover:text-customgreen-800 focus:font-semibold md:text-[20px]"
            to={"/find-doctors"}
          >
            Find Doctors
          </Link>

          <Menu>
            <MenuButton
              as="div"
              className="flex cursor-pointer items-center justify-start text-customgray-700 hover:text-customgreen-800 focus:font-semibold md:text-[20px]"
            >
              <span>Services</span>
              <ChevronDownIcon className="h-[20px] w-[30px]" />
            </MenuButton>
            <MenuItems
              as="div"
              anchor="bottom"
              className="font-dinpro-medium absolute right-0 z-30 mt-2 w-40 origin-top-right rounded-md bg-white py-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-sm:left-0"
            >
              {NAV_LINKS.map((navlink, index) => {
                return (
                  <MenuItem
                    key={index}
                    className="text-md block w-full px-4 py-2 text-left text-gray-900"
                  >
                    <a
                      className="block data-[focus]:bg-whitesmoke-100"
                      href={navlink.path}
                    >
                      {navlink.name}
                    </a>
                  </MenuItem>
                );
              })}
            </MenuItems>
          </Menu>
          <Link
            onClick={toggleShowNav}
            className="block text-customgray-700 hover:text-customgreen-800 focus:font-semibold md:text-[20px]"
            to={"/"}
          >
            About Us
          </Link>
          <Link
            onClick={toggleShowNav}
            className="block text-customgray-700 hover:text-customgreen-800 focus:font-semibold md:text-[20px]"
            to={"/store"}
          >
            Store
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
