import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  //States
  const [size, setSize] = useState();

  //Handlers
  const cartHandler = () => {
    navigate("/cart");
  };

  //Effects
  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth <= 640);
    };

    const isSmallScreen = window.innerWidth <= 640;
    setSize(
      (location.pathname === "/prodDetail" || location.pathname === "/cart") &&
        isSmallScreen,
    );
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [location]);

  return (
    <div
      className="bg-header-leaves max-md:bg-fill bg-customgreen-100 bg-cover bg-center bg-no-repeat max-md:bg-top max-sm:bg-transparent max-sm:bg-none"
      style={{ display: size ? "none" : "block" }}
    >
      <h1
        style={{ padding: props.padding }}
        className="m-0 py-9 text-center text-4xl font-semibold leading-[54px] max-sm:hidden"
      >
        {props.name}
      </h1>
      {props.show ? (
        <div className="flex items-center justify-center gap-5 pb-10 max-sm:mt-10 max-sm:pb-0">
          <div className="flex h-12 w-[539px] items-center justify-start gap-2 rounded-xl border border-gray-300 bg-white max-md:w-[16rem]">
            <svg
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-3 ml-3 mr-0 mt-2"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.5 8C2.5 4.68629 5.18629 2 8.5 2C11.8137 2 14.5 4.68629 14.5 8C14.5 11.3137 11.8137 14 8.5 14C5.18629 14 2.5 11.3137 2.5 8ZM8.5 0C4.08172 0 0.5 3.58172 0.5 8C0.5 12.4183 4.08172 16 8.5 16C10.3487 16 12.051 15.3729 13.4056 14.3199L16.7929 17.7071C17.1834 18.0976 17.8166 18.0976 18.2071 17.7071C18.5976 17.3166 18.5976 16.6834 18.2071 16.2929L14.8199 12.9056C15.8729 11.551 16.5 9.84871 16.5 8C16.5 3.58172 12.9183 0 8.5 0Z"
                fill="#2E2F2E"
              />
            </svg>
            <input
              type="text"
              placeholder="Search for Kuntal Care"
              className="bg-transparent placeholder:font-nunito placeholder:text-base placeholder:font-normal placeholder:tracking-tight placeholder:text-darkslategray-300 max-sm:placeholder:text-sm"
            />
          </div>
          <div
            className="rounded-lg bg-white py-[6px] pl-[8.5px] pr-[7.5px] hover:cursor-pointer"
            onClick={cartHandler}
          >
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="max-sm:h-[24px] max-sm:w-[24px]"
            >
              <path
                d="M8.5 2.83325L4.25 8.49992V28.3333C4.25 29.0847 4.54851 29.8054 5.07986 30.3367C5.61122 30.8681 6.33189 31.1666 7.08333 31.1666H26.9167C27.6681 31.1666 28.3888 30.8681 28.9201 30.3367C29.4515 29.8054 29.75 29.0847 29.75 28.3333V8.49992L25.5 2.83325H8.5Z"
                stroke="black"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.25 8.5H29.75"
                stroke="black"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22.6666 14.1667C22.6666 15.6696 22.0696 17.111 21.0069 18.1737C19.9442 19.2364 18.5028 19.8334 16.9999 19.8334C15.497 19.8334 14.0557 19.2364 12.993 18.1737C11.9303 17.111 11.3333 15.6696 11.3333 14.1667"
                stroke="black"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
