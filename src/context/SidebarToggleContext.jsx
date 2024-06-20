import { createContext, useState } from "react";

const SideBarToggleContext = createContext();

const SideBarToggleProvider = ({ children }) => {
  const [toggled, setToggled] = useState(false);

  return (
    <SideBarToggleContext.Provider value={{ setToggled, toggled }}>
      {children}
    </SideBarToggleContext.Provider>
  );
};

export { SideBarToggleProvider, SideBarToggleContext };
