import { useState } from "react";
import BulletinSvg from "./../../../assets/bulletin.svg?react";
import ConsultSvg from "./../../../assets/consult.svg?react";
import StoreSvg from "./../../../assets/store.svg?react";
import HomeSvg from "./../../../assets/home.svg?react";
import RoutineSvg from "./../../../assets/routine.svg?react";
import { useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const location = useLocation();
  const hideBottomNavigationBar =
    location.pathname === "/cart" ||
    location.pathname.startsWith("/prodDetail");
  console.log(hideBottomNavigationBar);

  const [screen, setScreen] = useState(1);
  const screenHandler = (id) => {
    setScreen(id);
  };

  const bottomBar = [
    {
      name: "Home",
      icon: <HomeSvg />,
    },
    {
      name: "Store",
      icon: <StoreSvg />,
    },
    {
      name: "Consult",
      icon: <ConsultSvg />,
    },
    {
      name: "Routine",
      icon: <RoutineSvg />,
    },
    {
      name: "Bulletin",
      icon: <BulletinSvg />,
    },
  ];
  return (
    <>
      {!hideBottomNavigationBar && (
        <div className="fixed -bottom-1 z-20 grid w-dvw grid-cols-5 gap-5 rounded-t-[30px] bg-customgreen-800 px-5 text-[10px] sm:hidden [&_div]:flex [&_div]:flex-col [&_div]:items-center [&_div]:justify-center [&_div]:gap-[6.25px]">
          {bottomBar.map((item, id) => (
            <div
              key={item.name}
              onClick={() => screenHandler(id)}
              className="my-2 rounded-[20px] px-3 py-1"
              style={{
                background: screen === id ? "#FFF7E247" : "transparent",
              }}
            >
              <span
                className={`${screen === id ? (item.name === "Bulletin" || item.name === "Routine" ? "[&_svg]:fill-white" : "[&_svg]:stroke-white") : ""}`}
              >
                {item.icon}
              </span>

              <span
                className={`font-nunito text-xs font-medium leading-[14.58px] tracking-[-0.01em] ${screen === id ? "text-[#FFF7E2]" : "text-customlightgreen-100"}`}
              >
                {item.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default BottomNavigation;
