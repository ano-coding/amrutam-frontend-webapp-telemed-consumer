import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [phoneNumber, setPhoneNumber] = useState(
    localStorage.getItem("phoneNumber") || null,
  );
  const [name, setName] = useState(localStorage.getItem("name") || null);
  const [email, setEmail] = useState(localStorage.getItem("email") || null);

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        userId,
        setUserId,
        phoneNumber,
        setPhoneNumber,
        name,
        setName,
        email,
        setEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
