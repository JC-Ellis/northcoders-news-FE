import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("weegembump");

  return (
    <UserContext.Provider value={user}>{children}</UserContext.Provider>
  );
};
