import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

  return (
    <UserContext.Provider value={{ token, setToken, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
